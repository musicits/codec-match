// 기기 데이터 정합성 검사.
//
// 과거에 aptX 를 지원하는 이어폰을 추가하면 결과 카드가 터지는 버그가 있었습니다
// (CODEC_INFO 에 aptX 항목이 없어 undefined 참조). 그 부류의 실수를 막기 위해
// 모든 폰 × 이어폰 조합을 실제로 한 번씩 돌려봅니다.
import { CODEC_INFO, CODEC_PRIORITY, PHONE_CODEC_SETS, AUDIO_CODEC_SETS, codecsOf } from '../src/data/codecs.js'
import { PHONES } from '../src/data/phones.js'
import { AUDIO_DEVICES } from '../src/data/audio.js'
import { resolveMatch, sscTier } from '../src/lib/match.js'
import { CHANGELOG } from '../src/data/changelog.js'

const errors = []
const check = (condition, message) => { if (!condition) errors.push(message) }

// 1. 우선순위에 있는 코덱은 모두 설명이 있어야 합니다.
for (const codec of CODEC_PRIORITY) {
  check(codec in CODEC_INFO, `CODEC_INFO 에 "${codec}" 항목이 없습니다`)
}
check('LC3' in CODEC_INFO, 'CODEC_INFO 에 "LC3" 항목이 없습니다')

// 2. 프리셋에 쓰인 코덱 이름에 오타가 없어야 합니다.
const known = new Set(Object.keys(CODEC_INFO))
for (const [group, sets] of [['폰', PHONE_CODEC_SETS], ['이어폰', AUDIO_CODEC_SETS]]) {
  for (const [name, codecs] of Object.entries(sets)) {
    for (const codec of codecs) {
      check(known.has(codec), `${group} 프리셋 "${name}" 의 "${codec}" 은 CODEC_INFO 에 없는 코덱입니다`)
    }
  }
}

// 3. 기기가 참조하는 프리셋이 실재해야 하고, id 가 겹치면 안 됩니다.
for (const [label, devices, sets] of [
  ['폰', PHONES, PHONE_CODEC_SETS],
  ['이어폰', AUDIO_DEVICES, AUDIO_CODEC_SETS],
]) {
  const seen = new Map()
  for (const device of devices) {
    check(device.codecSet in sets, `${label} "${device.name}" 의 코덱셋 "${device.codecSet}" 이 정의돼 있지 않습니다`)
    if (seen.has(device.id)) {
      errors.push(`${label} id 중복: "${device.id}" (${seen.get(device.id)} / ${device.name})`)
    }
    seen.set(device.id, device.name)
    check(device.id.length > 0, `${label} "${device.name}" 의 id 가 비어 있습니다`)
  }
}

// 4. 삼성 이어폰은 SSC 등급이 있어야 하고, 비삼성 기기에는 없어야 합니다.
for (const device of AUDIO_DEVICES) {
  const hasSsc = codecsOf(device).includes('SSC')
  check(
    hasSsc === Boolean(device.sscMax),
    `이어폰 "${device.name}": SSC 지원(${hasSsc})과 sscMax(${device.sscMax}) 가 맞지 않습니다`,
  )
  if (device.sscMax) {
    check(
      ['scalable', 'hifi', 'uhq'].includes(device.sscMax),
      `이어폰 "${device.name}" 의 sscMax "${device.sscMax}" 는 알 수 없는 등급입니다`,
    )
  }
}

// 5. 모든 조합을 실제로 계산해 봅니다.
let pairs = 0
const codecUsage = new Map()
for (const p of PHONES) {
  for (const a of AUDIO_DEVICES) {
    pairs += 1
    const { codec, common } = resolveMatch(p, a)
    check(codec !== null, `"${p.name}" + "${a.name}" 조합에 공통 코덱이 없습니다`)
    if (!codec) continue
    check(CODEC_INFO[codec] !== undefined, `"${p.name}" + "${a.name}" → "${codec}" 설명이 CODEC_INFO 에 없습니다`)
    check(common.includes(codec), `"${p.name}" + "${a.name}" → "${codec}" 이 공통 목록에 없습니다`)
    if (codec === 'SSC') {
      const tier = sscTier(p, a)
      check(Boolean(tier?.name && tier?.bitrate !== undefined), `"${p.name}" + "${a.name}" 의 SSC 등급 계산 실패`)
    }
    codecUsage.set(codec, (codecUsage.get(codec) ?? 0) + 1)
  }
}

// 6. 변경 이력의 맨 위 항목은 현재 데이터와 대수가 맞아야 합니다.
//    기기만 추가하고 이력 갱신을 잊는 실수를 막습니다.
const latest = CHANGELOG[0]
check(
  latest.phones === PHONES.length,
  `변경 이력 ${latest.version} 의 폰 대수(${latest.phones})가 실제(${PHONES.length})와 다릅니다`,
)
check(
  latest.audio === AUDIO_DEVICES.length,
  `변경 이력 ${latest.version} 의 이어폰 대수(${latest.audio})가 실제(${AUDIO_DEVICES.length})와 다릅니다`,
)
const versions = CHANGELOG.map((entry) => entry.version)
check(new Set(versions).size === versions.length, `변경 이력에 중복된 버전이 있습니다: ${versions}`)
for (const entry of CHANGELOG) {
  check(
    /^\d{4}-\d{2}-\d{2}$/.test(entry.date),
    `변경 이력 ${entry.version} 의 날짜 "${entry.date}" 형식이 YYYY-MM-DD 가 아닙니다`,
  )
  check(entry.changes.length > 0, `변경 이력 ${entry.version} 에 변경 내용이 비어 있습니다`)
}

console.log(`폰 ${PHONES.length}종 · 이어폰 ${AUDIO_DEVICES.length}종 · 조합 ${pairs.toLocaleString()}건 검사`)
console.log(`변경 이력 ${CHANGELOG.length}개 버전 (최신 ${latest.version})`)
console.log('결과 코덱 분포:')
for (const [codec, count] of [...codecUsage].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${codec.padEnd(15)} ${count.toLocaleString()}`)
}

if (errors.length) {
  console.error(`\n실패 ${errors.length}건:`)
  for (const message of errors) console.error(`  - ${message}`)
  process.exit(1)
}
console.log('\n이상 없음')

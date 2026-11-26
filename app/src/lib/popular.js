// 자주 찾는 조합 — 빌드 때 index.html 의 <noscript> 에 적어 두는 글자(AI·검색엔진용)가
// 같은 함수에서 나옵니다. 판정은 결과 카드와 똑같이 resolveMatch 를 씁니다.
// 기기 이름이 데이터에서 바뀌면 그 칸은 조용히 빠집니다(빌드가 깨지지 않게).
import { PHONES } from '../data/phones.js'
import { AUDIO_DEVICES } from '../data/audio.js'
import { CODEC_INFO } from '../data/codecs.js'
import { resolveMatch, sscTier } from './match.js'

export const POPULAR_PHONES = ['갤럭시 S26 울트라', '아이폰 17 프로', '픽셀 11', '샤오미 17']
export const POPULAR_AUDIO = ['갤럭시 버즈4 프로', '에어팟 프로 3', 'WF-1000XM6', 'QC 울트라 이어버드 2세대']

// 이름만으로 브랜드가 안 보이는 기기는 앞에 브랜드를 붙입니다
const label = (device) =>
  /^(갤럭시|에어팟|아이폰|픽셀|샤오미)/.test(device.name) ? device.name : `${device.brand} ${device.name}`

function cell(phone, audio) {
  const m = resolveMatch(phone, audio)
  if (!m.codec) return { codec: '연결 안 됨', detail: '' }
  if (m.codec === 'SSC') {
    const t = sscTier(phone, audio)
    return { codec: t.name.replace(/\s*\(.*\)$/, ''), detail: t.quality, latency: '' }
  }
  const info = CODEC_INFO[m.codec] ?? {}
  return {
    codec: (info.name ?? m.codec).replace(/\s*\(.*\)$/, ''),
    detail: info.bitrate ?? '',
    latency: info.latency ?? '',
  }
}

export function popularTable() {
  const phones = POPULAR_PHONES.map((n) => PHONES.find((d) => d.name === n)).filter(Boolean)
  const audio = POPULAR_AUDIO.map((n) => AUDIO_DEVICES.find((d) => d.name === n)).filter(Boolean)
  return {
    audio: audio.map((a) => ({ id: a.id, label: label(a) })),
    rows: phones.map((p) => ({
      id: p.id,
      label: label(p),
      cells: audio.map((a) => ({ audioId: a.id, audioLabel: label(a), ...cell(p, a) })),
    })),
  }
}

// 자주 묻는 질문. 답의 숫자도 판정 함수에서 그대로 가져옵니다.
export function popularFaq() {
  const find = (list, n) => list.find((d) => d.name === n)
  const iphone = find(PHONES, '아이폰 17 프로')
  const galaxy = find(PHONES, '갤럭시 S26 울트라')
  const xm6 = find(AUDIO_DEVICES, 'WF-1000XM6')
  const buds = find(AUDIO_DEVICES, '갤럭시 버즈4 프로')
  const out = []
  if (iphone && xm6) {
    const c = cell(iphone, xm6)
    out.push({
      q: '아이폰에서도 LDAC이 되나요?',
      a: `안 됩니다. 아이폰은 SBC와 AAC만 씁니다. 소니 WF-1000XM6처럼 LDAC을 지원하는 이어폰도 아이폰에서는 ${c.codec}(${c.detail})로 연결됩니다.`,
    })
  }
  if (galaxy && xm6) {
    const c = cell(galaxy, xm6)
    out.push({
      q: '갤럭시 S26 울트라에 소니 WF-1000XM6를 쓰면 어떤 코덱인가요?',
      a: `${c.codec}로 연결됩니다. ${c.detail}, 지연은 ${c.latency}입니다.`,
    })
  }
  if (galaxy && buds) {
    const t = sscTier(galaxy, buds)
    out.push({
      q: '갤럭시 버즈4 프로를 갤럭시에 쓰면 어떤 코덱인가요?',
      a: `삼성 전용 SSC로 연결되고, 최대 ${t.name.replace(' (', '(')}까지 올라갑니다${t.note ? `(${t.note})` : ''}.`,
    })
  }
  return out
}

import { CODEC_PRIORITY, codecsOf } from '../data/codecs.js'

// 실측으로 확인한 조합. `${phoneId}:${audioId}` 형태로 넣으면 결과 카드에 "실측 확인" 배지가 붙습니다.
export const VERIFIED_PAIRS = []

export const isVerified = (phoneId, audioId) => VERIFIED_PAIRS.includes(`${phoneId}:${audioId}`)

/**
 * 두 기기가 실제로 협상할 것으로 예상되는 코덱을 고릅니다.
 *
 * 기본 규칙은 "공통 코덱 중 CODEC_PRIORITY 상 가장 앞선 것"이고,
 * 아래 두 가지 제조사 고유 동작만 예외로 둡니다.
 */
export function resolveMatch(phone, audioDevice) {
  const phoneCodecs = codecsOf(phone)
  const audioCodecs = codecsOf(audioDevice)
  const common = CODEC_PRIORITY.filter(
    (codec) => phoneCodecs.includes(codec) && audioCodecs.includes(codec),
  )
  const lc3Available = phoneCodecs.includes('LC3') && audioCodecs.includes('LC3')

  // 삼성 폰 + 삼성 이어폰은 One UI 가 SSC 를 우선 협상합니다.
  if (phone.brand === '삼성' && audioDevice.brand === '삼성' && common.includes('SSC')) {
    return { codec: 'SSC', common, lc3Available }
  }

  // 아이폰은 SBC / AAC 외에는 협상하지 않습니다.
  if (phone.brand === '애플') {
    const codec = common.includes('AAC') ? 'AAC' : common.includes('SBC') ? 'SBC' : null
    return { codec, common, lc3Available }
  }

  return { codec: common[0] ?? null, common, lc3Available }
}

/** SSC 는 폰의 심리스 지원 여부와 이어폰 등급에 따라 표시가 달라집니다. */
export function sscTier(phone, audioDevice) {
  if (!phone.seamless) {
    return { name: 'SSC (16bit 44.1kHz)', bitrate: '최대 512 kbps', note: '' }
  }
  if (audioDevice.sscMax === 'uhq') {
    return {
      name: 'SSC-UHQ (24bit 96kHz)',
      bitrate: '고음질 설정 필요',
      note: 'One UI 6.1.1 이상, 갤럭시 웨어러블 > 고급 음질에서 켜야 적용',
    }
  }
  if (audioDevice.sscMax === 'hifi') {
    return {
      name: 'SSC Hi-Fi (24bit 48kHz, 최대 2,304kbps)',
      bitrate: '최대 2,304 kbps',
      note: 'One UI 4.0 이상',
    }
  }
  return { name: 'SSC (Scalable)', bitrate: '최대 512 kbps', note: '' }
}

// 브랜드명이 모델명에 안 들어가는 기기가 많아서(예: 보스 "QC 울트라 이어버드")
// 검색어는 모델명과 브랜드명 양쪽에 대조합니다.
export const filterDevices = (devices, brand, query) => {
  const keyword = query.trim().toLowerCase()
  return devices.filter(
    (device) =>
      (!brand || device.brand === brand) &&
      (!keyword ||
        device.name.toLowerCase().includes(keyword) ||
        device.brand.toLowerCase().includes(keyword)),
  )
}

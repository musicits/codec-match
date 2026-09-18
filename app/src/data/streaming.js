// 스트리밍 서비스가 상시로 내보내는 음질 상한.
//
// region: 'kr' 은 한국에서 정식으로 결제해 쓸 수 있는 서비스(해외 회사라도 포함),
// 'global' 은 한국 정식 서비스가 없는 곳입니다.
//
// 국내 서비스는 대부분 CD 급(16bit 44.1kHz)에서 멈춥니다. 24bit 음원은 일부 곡이나
// 상위 요금제에만 있어서, 그런 경우는 maxNote 에 사정을 적습니다.
// 단계를 임의로 만들어 넣지 않습니다 — 상한 하나와 코덱 상한을 견주기만 합니다.
export const STREAMING = [
  {
    region: 'kr', name: '멜론', en: 'Melon', won: 8690,
    depth: 16, rate: 44.1, format: 'FLAC', price: '스트리밍클럽 월 8,690원',
    maxNote: 'FLAC 은 Hi-Fi 13,200원 · 앱 표기는 16bit',
  },
  {
    region: 'kr', name: '벅스', en: 'Bugs', won: 8690,
    depth: 24, rate: 96, format: 'FLAC', price: '무제한 듣기 월 8,690원',
    maxNote: '24bit 96kHz 는 FLAC Premium 13,200원',
  },
  {
    region: 'kr', name: '지니뮤직', en: 'Genie', won: 15400,
    depth: 24, rate: 192, format: 'FLAC', price: '초고음질 월 15,400원',
    maxNote: '앱에서 FLAC 24bit 선택 · 192kHz 음원',
  },
  {
    region: 'kr', name: '플로', en: 'FLO', won: 7900,
    depth: 16, rate: 44.1, format: 'FLAC', price: '무제한 듣기 월 7,900원',
    maxNote: '앱에는 고음질·대용량 표기만',
  },
  {
    region: 'kr', name: '애플 뮤직', en: 'Apple Music', won: 8900,
    depth: 24, rate: 192, format: 'ALAC', price: '월 8,900원',
    maxNote: '무손실 24bit 48kHz · 하이레조 24bit 192kHz',
  },
  {
    region: 'kr', name: '스포티파이', en: 'Spotify', won: 11990,
    depth: 24, rate: 44.1, format: 'FLAC', price: '프리미엄 월 11,990원',
  },
  {
    region: 'kr', name: '유튜브 뮤직', en: 'YouTube Music', won: 11990,
    lossy: '256 kbps', format: 'AAC', price: '월 11,990원',
  },
  {
    region: 'global', name: '타이달', en: 'TIDAL',
    depth: 24, rate: 192, format: 'FLAC', price: '월 19.99$ (Max)',
    maxNote: 'High 16bit · Max 24bit',
  },
  {
    region: 'global', name: '코부즈', en: 'Qobuz',
    depth: 24, rate: 192, format: 'FLAC', price: '월 12.99$',
  },
  {
    region: 'global', name: '아마존 뮤직', en: 'Amazon Music',
    depth: 24, rate: 192, format: 'FLAC', price: '월 9.99$ (Unlimited)',
    maxNote: 'HD 16bit · Ultra HD 24bit',
  },
]

export const REGIONS = [
  { id: 'kr', label: '국내' },
  { id: 'global', label: '해외' },
]

/** '24bit 96kHz' 같은 문구에서 비트심도와 샘플레이트를 꺼냅니다. */
export const parseCeiling = (quality) => {
  if (!quality) return null
  const depth = quality.match(/(\d+)\s*bit/i)
  const rate = quality.match(/([\d.]+)\s*kHz/i)
  if (!depth || !rate) return null
  return { depth: Number(depth[1]), rate: Number(rate[1]) }
}

/** 서비스 상한을 그대로 적은 문구. */
export const maxQuality = (service) => service.lossy ?? `${service.depth}bit ${service.rate}kHz`

/** 실제로 귀에 닿는 음질 — 서비스 상한과 코덱 상한 중 낮은 쪽입니다. */
export const heardQuality = (service, ceiling) => {
  if (service.lossy) return service.lossy
  if (!ceiling) return maxQuality(service)
  return `${Math.min(service.depth, ceiling.depth)}bit ${Math.min(service.rate, ceiling.rate)}kHz`
}

/** 코덱이 서비스 상한을 다 받아내는지. */
export const fits = (service, ceiling) => {
  if (!ceiling) return null
  if (service.lossy) return true
  return service.depth <= ceiling.depth && service.rate <= ceiling.rate
}

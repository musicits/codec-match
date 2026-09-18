// 스트리밍 서비스가 보내주는 원본의 상한.
//
// 여기 적힌 값은 '그 서비스가 낼 수 있는 최고' 입니다. 요금제·음원마다 다르고,
// 블루투스로 들으면 폰이 코덱으로 다시 압축하기 때문에 이 값이 그대로 귀에
// 닿지는 않습니다 — 그 비교가 이 화면이 하는 일입니다.
//
// depth/rate 는 무손실 서비스의 상한, lossy 는 손실 압축만 되는 서비스입니다.
// region: 'kr' 은 한국에서 정식으로 결제해 쓸 수 있는 서비스(해외 회사라도 포함),
// 'global' 은 한국 정식 서비스가 없는 곳입니다.
//
// tiers 는 그 서비스가 내보내는 음질 단계입니다. 무손실 서비스라도 음원마다
// 44.1 · 48 · 96 · 192kHz 가 섞여 있어서, 코덱 상한에 따라 실제로 닿는 단계가 달라집니다.
export const STREAMING = [
  {
    region: 'kr', name: '멜론', won: 12000, en: 'Melon', depth: 24, rate: 192, format: 'FLAC',
    price: '하이파이 월 12,000원',
    tiers: ['320 kbps', '16bit 44.1kHz', '24bit 48kHz', '24bit 96kHz', '24bit 192kHz'],
  },
  {
    region: 'kr', name: '벅스', won: 12000, en: 'Bugs', depth: 24, rate: 192, format: 'FLAC',
    price: '프리미엄 월 12,000원',
    tiers: ['320 kbps', '16bit 44.1kHz', '24bit 48kHz', '24bit 96kHz', '24bit 192kHz'],
  },
  {
    region: 'kr', name: '지니뮤직', won: 12000, en: 'Genie', depth: 24, rate: 192, format: 'FLAC',
    price: '무제한 월 12,000원',
    tiers: ['320 kbps', '16bit 44.1kHz', '24bit 48kHz', '24bit 96kHz', '24bit 192kHz'],
  },
  {
    region: 'kr', name: '애플 뮤직', won: 8900, en: 'Apple Music', depth: 24, rate: 192, format: 'ALAC',
    price: '월 8,900원',
    tiers: ['16bit 44.1kHz', '24bit 48kHz', '24bit 96kHz', '24bit 192kHz'],
  },
  {
    region: 'kr', name: '스포티파이', won: 11990, en: 'Spotify', depth: 24, rate: 44.1, format: 'FLAC',
    price: '프리미엄 월 11,990원',
    tiers: ['320 kbps', '24bit 44.1kHz'],
  },
  {
    region: 'kr', name: '플로', won: 11000, en: 'FLO', depth: 16, rate: 44.1, format: 'FLAC',
    price: '무제한 월 11,000원',
    tiers: ['320 kbps', '16bit 44.1kHz'],
  },
  {
    region: 'kr', name: '유튜브 뮤직', won: 11990, en: 'YouTube Music', lossy: '256 kbps', format: 'AAC',
    price: '월 11,990원',
    tiers: ['128 kbps', '256 kbps'],
  },
  {
    region: 'global', name: '타이달', en: 'TIDAL', depth: 24, rate: 192, format: 'FLAC',
    price: '월 19.99$ (Max)',
    tiers: ['320 kbps', '16bit 44.1kHz', '24bit 48kHz', '24bit 96kHz', '24bit 192kHz'],
  },
  {
    region: 'global', name: '코부즈', en: 'Qobuz', depth: 24, rate: 192, format: 'FLAC',
    price: '월 12.99$',
    tiers: ['16bit 44.1kHz', '24bit 96kHz', '24bit 192kHz'],
  },
  {
    region: 'global', name: '아마존 뮤직', en: 'Amazon Music', depth: 24, rate: 192, format: 'FLAC',
    price: '월 9.99$ (Unlimited)',
    tiers: ['16bit 44.1kHz', '24bit 48kHz', '24bit 96kHz', '24bit 192kHz'],
  },
]

/** 코덱 상한 안에 들어오는 가장 높은 단계. 실제로 귀에 닿는 음질입니다. */
export const bestTier = (service, ceiling) => {
  if (!ceiling) return null
  const fitsTier = (tier) => {
    const depth = tier.match(/(\d+)bit/)
    const rate = tier.match(/([\d.]+)kHz/)
    if (!depth || !rate) return true // kbps 단계는 손실 압축이라 상한을 넘지 않습니다
    return Number(depth[1]) <= ceiling.depth && Number(rate[1]) <= ceiling.rate
  }
  const usable = service.tiers.filter(fitsTier)
  return usable[usable.length - 1] ?? service.tiers[0]
}

export const REGIONS = [
  { id: 'kr', label: '국내에서 쓸 수 있는 곳' },
  { id: 'global', label: '해외 전용 · 국내 정식 서비스 없음' },
]


/** '24bit 96kHz' 같은 문구에서 비트심도와 샘플레이트를 꺼냅니다. */
export const parseCeiling = (quality) => {
  if (!quality) return null
  const depth = quality.match(/(\d+)\s*bit/i)
  const rate = quality.match(/([\d.]+)\s*kHz/i)
  if (!depth || !rate) return null
  return { depth: Number(depth[1]), rate: Number(rate[1]) }
}

/**
 * 서비스의 원본이 지금 코덱을 그대로 건너가는지 봅니다.
 * 코덱이 손실 압축이라 '같은 숫자' 라도 원본 그대로는 아니지만,
 * 여기서는 담을 수 있는 그릇의 크기만 견줍니다.
 */
export const fits = (service, ceiling) => {
  if (!ceiling) return null
  if (service.lossy) return true
  return service.depth <= ceiling.depth && service.rate <= ceiling.rate
}

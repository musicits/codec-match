// 코덱 카탈로그와 기기별 코덱 조합 프리셋.
//
// 새 기기를 추가할 때 지원 코덱이 기존 프리셋과 정확히 겹치면 그 프리셋을 재사용하고,
// 겹치지 않으면 여기에 프리셋을 새로 만든 뒤 phones.js / audio.js 에서 참조하세요.

// 협상 우선순위. 양쪽이 공통으로 지원하는 코덱 중 이 순서에서 가장 앞선 것이 선택됩니다.
export const CODEC_PRIORITY = [
  'SSC',
  'LDAC',
  'LHDC',
  'aptX Adaptive',
  'aptX HD',
  'aptX',
  'AAC',
  'SBC',
]

// 결과 카드에 표시되는 코덱 설명.
// CODEC_PRIORITY 에 있는 모든 코덱은 여기에도 반드시 항목이 있어야 합니다.
export const CODEC_INFO = {
  SBC: {
    name: 'SBC',
    bitrate: '최대 345 kbps',
    latency: '약 170–250 ms',
    fallback: '연결 안정성이 우선될 때',
  },
  AAC: {
    name: 'AAC',
    bitrate: '최대 약 250 kbps',
    latency: '약 140–220 ms',
    fallback: '상위 공통 코덱을 사용할 수 없을 때 SBC로 전환될 수 있어요',
  },
  aptX: {
    name: 'aptX',
    bitrate: '최대 352 kbps',
    latency: '약 80–120 ms',
    fallback: '전파 간섭이 심하거나 aptX 협상에 실패하면 SBC로 전환될 때',
  },
  'aptX HD': {
    name: 'aptX HD (24bit 48kHz)',
    bitrate: '최대 576 kbps',
    latency: '약 100–150 ms',
    fallback: '대역폭이 부족하면 aptX 또는 SBC로 낮아질 때',
  },
  'aptX Adaptive': {
    name: 'aptX Adaptive',
    bitrate: '279–420 kbps 가변',
    latency: '약 50–80 ms',
    fallback: '전파 환경에 따라 비트레이트가 실시간으로 조정되며, 조건이 무너지면 AAC·SBC로 전환될 때',
  },
  LDAC: {
    name: 'LDAC',
    bitrate: '최대 990 kbps',
    latency: '약 180–250 ms',
    fallback: '연결 품질이 낮아지면 660/330 kbps로 낮아지거나 SBC로 전환될 때',
  },
  LHDC: {
    name: 'LHDC',
    bitrate: '최대 900 kbps',
    latency: '약 100–160 ms',
    fallback: '지원 조합이 아니거나 연결이 불안정하면 AAC·SBC로 전환될 때',
  },
  SSC: {
    name: 'SSC (삼성 코덱)',
    bitrate: '기기 등급에 따라 다름',
    latency: '약 100–150 ms',
    fallback: '삼성 기기 간 전용 조건이 충족되지 않거나 연결 상태가 불안정할 때 SBC로 전환될 수 있어요',
  },
  LC3: {
    name: 'LC3 (LE Audio)',
    bitrate: '최대 약 345 kbps',
    latency: '약 20–40 ms',
    fallback: 'LE Audio 모드가 꺼져 있거나 한쪽이 지원하지 않으면 기존 코덱으로 돌아갈 때',
  },
}

export const PHONE_CODEC_SETS = {
  iphone: ['SBC', 'AAC'],
  galaxy_classic: ['SBC', 'AAC', 'aptX', 'LDAC', 'SSC'],
  galaxy_le: ['SBC', 'AAC', 'aptX', 'LDAC', 'SSC', 'LC3'],
  pixel_classic: ['SBC', 'AAC', 'aptX', 'aptX HD', 'LDAC'],
  pixel_le: ['SBC', 'AAC', 'aptX', 'aptX HD', 'LDAC', 'LC3'],
  snapdragon_flagship: ['SBC', 'AAC', 'aptX', 'aptX HD', 'aptX Adaptive', 'LDAC', 'LHDC', 'LC3'],
  // LE Audio 이전 세대 스냅드래곤 (낫싱 폰 (1) 등)
  snapdragon_hires: ['SBC', 'AAC', 'aptX', 'aptX HD', 'aptX Adaptive', 'LDAC', 'LHDC'],
  // 미디어텍 디멘시티 계열은 aptX 라이선스가 없어 LDAC·LHDC 위주입니다 (낫싱 폰 (2a) 등)
  mediatek_hires: ['SBC', 'AAC', 'LDAC', 'LHDC', 'LC3'],
  xperia_le: ['SBC', 'AAC', 'aptX', 'aptX HD', 'aptX Adaptive', 'LDAC', 'LC3'],
  lg_legacy: ['SBC', 'AAC', 'aptX', 'aptX HD', 'LDAC'],
}

// aptX Lossless 는 aptX Adaptive 의 상위 모드라 별도 코덱으로 나누지 않고
// aptX Adaptive 로 묶습니다. (지원 기기: 슈어 AONIC 50 Gen 2, 데논 PerL Pro, 이어펀 Air Pro 4 등)
export const AUDIO_CODEC_SETS = {
  sbc_only: ['SBC'],
  aac: ['SBC', 'AAC'],
  aac_le: ['SBC', 'AAC', 'LC3'],
  ssc: ['SBC', 'AAC', 'SSC'],
  ssc_le: ['SBC', 'AAC', 'SSC', 'LC3'],
  ldac: ['SBC', 'AAC', 'LDAC'],
  ldac_le: ['SBC', 'AAC', 'LDAC', 'LC3'],
  lhdc: ['SBC', 'AAC', 'LHDC'],
  ldac_lhdc: ['SBC', 'AAC', 'LDAC', 'LHDC'],
  aptx_adaptive: ['SBC', 'AAC', 'aptX', 'aptX Adaptive'],
  aptx_adaptive_le: ['SBC', 'AAC', 'aptX', 'aptX Adaptive', 'LC3'],
  aptx_adaptive_hd: ['SBC', 'AAC', 'aptX', 'aptX HD', 'aptX Adaptive'],
  aptx_adaptive_ldac_le: ['SBC', 'AAC', 'aptX', 'aptX Adaptive', 'LDAC', 'LC3'],
  aptx_full: ['SBC', 'AAC', 'aptX', 'aptX HD', 'aptX Adaptive', 'LDAC'],
}

export const codecsOf = (device) =>
  device.codecSet in PHONE_CODEC_SETS
    ? PHONE_CODEC_SETS[device.codecSet]
    : AUDIO_CODEC_SETS[device.codecSet]

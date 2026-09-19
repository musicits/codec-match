// 코덱 카탈로그와 기기별 코덱 조합 프리셋.
//
// 새 기기를 추가할 때 지원 코덱이 기존 프리셋과 정확히 겹치면 그 프리셋을 재사용하고,
// 겹치지 않으면 여기에 프리셋을 새로 만든 뒤 phones.js / audio.js 에서 참조하세요.

// 협상 우선순위. 양쪽이 공통으로 지원하는 코덱 중 이 순서에서 가장 앞선 것이 선택됩니다.
export const CODEC_PRIORITY = [
  'SSC',
  'L2HC',
  'LDAC',
  'LHDC',
  'aptX Adaptive',
  'aptX HD',
  'aptX',
  'AAC',
  'SBC',
]

// 결과 카드에 표시되는 코덱 설명.
// quality/kbps/ms 는 코덱 비교 막대를 그리는 데 씁니다 — kbps 는 사양상 최대치,
// ms 는 latency 범위의 가운데값입니다. 실측이 아니라 사양 기준이라는 점을 화면에도 적어 둡니다.
// CODEC_PRIORITY 에 있는 모든 코덱은 여기에도 반드시 항목이 있어야 합니다.
export const CODEC_INFO = {
  SBC: {
    name: 'SBC',
    quality: '16bit 48kHz',
    kbps: 345,
    ms: 210,
    bitrate: '최대 345 kbps',
    latency: '약 170–250 ms',
    fallback: '연결 안정성이 우선될 때',
  },
  AAC: {
    name: 'AAC',
    quality: '16bit 44.1kHz',
    kbps: 250,
    ms: 180,
    bitrate: '최대 약 250 kbps',
    latency: '약 140–220 ms',
    fallback: '더 나은 공통 코덱이 없을 때',
  },
  aptX: {
    name: 'aptX',
    quality: '16bit 48kHz',
    kbps: 352,
    ms: 100,
    bitrate: '최대 352 kbps',
    latency: '약 80–120 ms',
    fallback: '전파 간섭이 심하거나 aptX 로 못 붙어 SBC 로 내려갈 때',
  },
  'aptX HD': {
    name: 'aptX HD (24bit 48kHz)',
    quality: '24bit 48kHz',
    kbps: 576,
    ms: 125,
    bitrate: '최대 576 kbps',
    latency: '약 100–150 ms',
    fallback: '보낼 길이 좁아 aptX 나 SBC 로 내려갈 때',
  },
  'aptX Adaptive': {
    name: 'aptX Adaptive',
    quality: '24bit 96kHz',
    kbps: 420,
    ms: 65,
    bitrate: '279–420 kbps 가변',
    latency: '약 50–80 ms',
    fallback: '전파 상태에 따라 전송률이 오르내리고, 그마저 안 되면 AAC·SBC 로 내려갈 때',
  },
  L2HC: {
    name: 'L2HC (화웨이 코덱)',
    quality: '24bit 192kHz',
    kbps: 2300,
    ms: 120,
    bitrate: '320–960 kbps 가변',
    bitrateNote: 'L2HC 4.0 무손실은 최대 2.3 Mbps',
    latency: '약 90–150 ms',
    fallback: '화웨이 폰·태블릿(EMUI 15·하모니OS) 조합이 아니거나, 조건이 안 맞아 LDAC·AAC 로 내려갈 때',
  },
  LDAC: {
    name: 'LDAC',
    quality: '24bit 96kHz',
    kbps: 990,
    ms: 215,
    bitrate: '최대 990 kbps',
    bitrateNote: '‘음질 우선’ 설정 기준 · 기본 적응형은 660/330 kbps',
    latency: '약 180–250 ms',
    fallback: '연결이 나빠져 660/330 kbps 로 내려가거나 SBC 로 바뀔 때',
  },
  LHDC: {
    name: 'LHDC',
    quality: '24bit 192kHz',
    kbps: 900,
    ms: 130,
    bitrate: '최대 900 kbps',
    latency: '약 100–160 ms',
    fallback: '지원 조합이 아니거나 연결이 불안정해 AAC·SBC 로 내려갈 때',
  },
  SSC: {
    name: 'SSC (삼성 코덱)',
    quality: '등급에 따라 다름',
    kbps: 512,
    ms: 125,
    bitrate: '기기 등급에 따라 다름',
    latency: '약 100–150 ms',
    fallback: '삼성 기기끼리가 아니거나 연결이 불안정해 SBC 로 내려갈 때',
  },
  LC3: {
    name: 'LC3 (LE Audio)',
    quality: '16–24bit 48kHz',
    kbps: 345,
    ms: 30,
    bitrate: '최대 약 345 kbps',
    latency: '약 20–40 ms',
    fallback: 'LE Audio 가 꺼져 있거나 한쪽이 지원하지 않아 예전 코덱으로 돌아갈 때',
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
  // 기린 칩은 퀄컴 aptX 라이선스가 없어 LDAC 과 자체 코덱 L2HC 위주입니다 (화웨이 메이트 X7 등)
  kirin_l2hc: ['SBC', 'AAC', 'LDAC', 'L2HC'],
  // 보급형 스냅드래곤 (POCO M8 5G 의 6 Gen 3 등). aptX 는 되지만 HD·Adaptive 는 없고,
  // 블루투스 5.1 이라 LE Audio 도 빠집니다.
  snapdragon_mid: ['SBC', 'AAC', 'aptX', 'LDAC'],
  // aptX Adaptive 없이 aptX HD 까지만 되는 LHDC 조합 (오포 파인드 N5)
  snapdragon_lhdc: ['SBC', 'AAC', 'aptX', 'aptX HD', 'LDAC', 'LHDC'],
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
  ldac_l2hc: ['SBC', 'AAC', 'LDAC', 'L2HC'],
  aptx_classic: ['SBC', 'AAC', 'aptX'],
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

// 코덱 하나가 여러 등급·모드로 갈리는 경우를 따로 모았습니다.
// 칩을 눌렀을 때 "이 코덱 안에서 내 조합은 어디쯤인가" 를 보여주는 데 씁니다.
//
// family 가 같은 코덱(aptX 3형제)은 사다리 하나를 같이 씁니다 —
// 고른 코덱이 그 사다리의 몇 번째 칸인지 보이게 하려고요.
export const CODEC_TIERS = {
  SBC: {
    label: '연결 품질에 따른 단계',
    rows: [
      { id: 'sbc-high', name: '고품질', quality: '16bit 48kHz', value: '최대 345 kbps' },
      { id: 'sbc-base', name: '기본', quality: '16bit 44.1kHz', value: '약 229 kbps' },
    ],
  },
  AAC: {
    label: '실제 전송률',
    // os 가 붙은 줄은 고른 폰이 그 OS 일 때만 보여 줍니다 — 아이폰을 골랐는데
    // 안드로이드 줄이 같이 뜨면 읽는 사람에게는 남의 이야기입니다.
    rows: [
      { id: 'aac-ios', os: 'apple', name: '아이폰 · 아이패드', quality: '16bit 44.1kHz', value: '256 kbps 고정' },
      { id: 'aac-android', os: 'android', name: '안드로이드', quality: '16bit 44.1kHz', value: '128–320 kbps', note: '제조사마다 다름' },
    ],
  },
  LDAC: {
    label: '전송률 단계',
    rows: [
      { id: 'ldac-990', name: '음질 우선', quality: '24bit 96kHz', value: '990 kbps' },
      { id: 'ldac-660', name: '표준', quality: '24bit 96kHz', value: '660 kbps' },
      { id: 'ldac-330', name: '연결 우선', quality: '24bit 96kHz', value: '330 kbps' },
    ],
  },
  LHDC: {
    label: '버전별 상한',
    rows: [
      { id: 'lhdc-5', name: 'LHDC 5.0', quality: '24bit 192kHz', value: '최대 1,000 kbps' },
      { id: 'lhdc-4', name: 'LHDC 4.0', quality: '24bit 96kHz', value: '최대 900 kbps' },
    ],
  },
  L2HC: {
    label: '버전별 상한',
    rows: [
      { id: 'l2hc-4', name: 'L2HC 4.0', note: '무손실', quality: '24bit 192kHz', value: '최대 2.3 Mbps' },
      { id: 'l2hc-3', name: 'L2HC 3.0', note: '가변', quality: '24bit 96kHz', value: '320–960 kbps' },
    ],
  },
  SSC: {
    label: '삼성 SSC 코덱 등급',
    rows: [
      { id: 'uhq', name: 'SSC-UHQ', quality: '24bit 96kHz', value: '고음질 설정 필요' },
      { id: 'hifi', name: 'SSC Hi-Fi', quality: '24bit 48kHz', value: '최대 2,304 kbps' },
      { id: 'scalable', name: 'SSC Scalable', quality: '16bit 44.1kHz', value: '88–512 kbps 가변' },
    ],
  },
  // aptX 3형제는 사다리를 함께 씁니다. 무손실은 별도 코덱이 아니라 Adaptive 의 모드입니다.
  aptX: {
    label: 'aptX 계열에서 이 조합의 자리',
    rows: [
      { id: 'aptx-lossless', name: 'aptX Lossless', quality: '16bit 44.1kHz 무손실', value: '최대 약 1.2 Mbps', need: '양쪽 다 Snapdragon Sound' },
      { id: 'aptX Adaptive', name: 'aptX Adaptive', quality: '24bit 96kHz', value: '279–420 kbps 가변' },
      { id: 'aptX HD', name: 'aptX HD', quality: '24bit 48kHz', value: '576 kbps' },
      { id: 'aptX', name: 'aptX', quality: '16bit 44.1kHz', value: '352 kbps' },
    ],
  },
}

/** 코덱 이름으로 등급표를 찾습니다. aptX 3형제는 한 표를 같이 씁니다. */
export const tiersOf = (codec) =>
  CODEC_TIERS[codec] ?? (codec?.startsWith('aptX') ? CODEC_TIERS.aptX : null)

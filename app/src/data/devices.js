// 기기 목록의 공통 헬퍼.
//
// id 는 연도와 모델명으로 자동으로 만들어지므로 직접 지정하지 않습니다.
// 화면에 보이는 이름은 모델명만 씁니다 — 연도를 앞에 붙이면 목록이 읽기 힘들어집니다.
// 연도는 정렬과 id 에만 쓰고 year 로 남겨 둡니다.

export const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/\+/g, '-plus')
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-|-$/g, '')

/**
 * 스마트폰 한 대.
 * seamless: 삼성 Seamless 코덱(Scalable 상위 등급) 협상이 가능한 기기인지. 삼성 기기에만 의미가 있습니다.
 * note: 기기 선택란에 함께 보여줄 한 줄 주석. (출시 예정·내수 전용처럼 코덱 표기 밖의 사정)
 */
export const phone = (
  year,
  brand,
  codecSet,
  model,
  { seamless = false, aptxLossless = false, note } = {},
) => ({
  id: slugify(`${year}-${model}`),
  name: model,
  year,
  brand,
  codecSet,
  seamless: brand === '삼성' ? seamless : undefined,
  aptxLossless,
  note,
})

/**
 * 이어폰·헤드폰 한 대.
 * sscMax: 'scalable' | 'hifi' | 'uhq' — 삼성 기기에만 의미가 있습니다.
 * leAudioNote: LE Audio 하드웨어는 있으나 제조사가 LC3 지원을 명시하지 않은 경우.
 * note: 기기 선택란에 함께 보여줄 한 줄 주석. 코덱 표기만으로 오해가 생기는 기기에 씁니다.
 * aptxLossless: aptX Adaptive 의 무손실 모드까지 지원하는지. 양쪽 다 참일 때만 의미가 있습니다.
 * multipoint: true(두 기기 동시 연결) | 'auto'(같은 제조사 기기끼리 자동 전환).
 *   애플·삼성은 일반 멀티포인트가 아니라 자기 기기끼리 넘어가는 방식이라 따로 적습니다.
 *   모르는 기기는 비워 둡니다 — 비어 있으면 화면에 아무것도 걸리지 않습니다.
 */
export const audio = (
  year,
  brand,
  codecSet,
  model,
  { sscMax, leAudioNote = false, note, aptxLossless = false, multipoint } = {},
) => ({
  id: slugify(`${year}-${model}`),
  name: model,
  year,
  brand,
  codecSet,
  sscMax,
  leAudioNote,
  note,
  aptxLossless,
  multipoint,
})

/** 같은 연도·브랜드·코덱셋을 공유하는 모델을 한 번에 정의합니다. */
export const phoneGroup = (year, brand, codecSet, models, options) =>
  models.map((model) => phone(year, brand, codecSet, model, options))

export const audioGroup = (year, brand, codecSet, models, options) =>
  models.map((model) => audio(year, brand, codecSet, model, options))

/** 데이터에 실제로 등장하는 브랜드를 등장 순서대로 뽑아 필터 드롭다운에 씁니다. */
export const brandsOf = (devices) => [...new Set(devices.map((device) => device.brand))]

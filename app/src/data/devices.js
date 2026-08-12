// 기기 목록의 공통 헬퍼.
//
// id 는 이름에서 자동으로 만들어지므로 직접 지정하지 않습니다.
// 표시 이름은 "<출시연도> <모델명>" 형태입니다. (예: "2026 갤럭시 S26")

export const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/\+/g, '-plus')
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-|-$/g, '')

/**
 * 스마트폰 한 대.
 * seamless: 삼성 심리스 코덱(Scalable 상위 등급) 협상이 가능한 기기인지. 삼성 기기에만 의미가 있습니다.
 */
export const phone = (year, brand, codecSet, model, { seamless = false } = {}) => ({
  id: slugify(`${year}-${model}`),
  name: `${year} ${model}`,
  brand,
  codecSet,
  seamless: brand === '삼성' ? seamless : undefined,
})

/**
 * 이어폰·헤드폰 한 대.
 * sscMax: 'scalable' | 'hifi' | 'uhq' — 삼성 기기에만 의미가 있습니다.
 * leAudioNote: LE Audio 하드웨어는 있으나 제조사가 LC3 지원을 명시하지 않은 경우.
 */
export const audio = (year, brand, codecSet, model, { sscMax, leAudioNote = false } = {}) => ({
  id: slugify(`${year}-${model}`),
  name: `${year} ${model}`,
  brand,
  codecSet,
  sscMax,
  leAudioNote,
})

/** 같은 연도·브랜드·코덱셋을 공유하는 모델을 한 번에 정의합니다. */
export const phoneGroup = (year, brand, codecSet, models, options) =>
  models.map((model) => phone(year, brand, codecSet, model, options))

export const audioGroup = (year, brand, codecSet, models, options) =>
  models.map((model) => audio(year, brand, codecSet, model, options))

/** 데이터에 실제로 등장하는 브랜드를 등장 순서대로 뽑아 필터 드롭다운에 씁니다. */
export const brandsOf = (devices) => [...new Set(devices.map((device) => device.brand))]

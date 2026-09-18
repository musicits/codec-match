// 기기 이름으로 겉모양을 가립니다. 데이터에 필드를 따로 두지 않고 이름 규칙으로 판단합니다.
// 아이콘과 '형태 고르기' 필터가 모두 이 판정을 씁니다.
//
// 새 기기를 넣었는데 아이콘이나 형태 분류가 어긋나면 아래 정규식에 이름 조각을 더하세요.
// 이름에 '폴드'·'플립' 이 안 들어가는 폴더블(오포 파인드 N·화웨이 메이트 X 같은)을 넣을 때
// 특히 주의해야 합니다 — 그냥 두면 바형으로 잡힙니다.
const FOLD = /폴드|듀오|폴더|파인드 N|메이트 X/
const FLIP = /플립/

// 오버이어·온이어 헤드폰. 나머지 오디오 기기는 전부 무선 이어폰으로 봅니다.
// '프로 맥스'(사운드코어 리버티 5 프로 맥스)는 이어폰이라 '에어팟 맥스'만 따로 잡습니다.
const HEADPHONE = /^WH-|헤드폰|모멘텀 \d 와이어리스|Px\d|에어팟 맥스|QC45|스튜디오 프로|투어 원|스페이스 원|메이저|모니터 I|Beoplay H|AONIC/

const model = (device) => device.name

export const phoneForm = (device) => {
  const name = model(device)
  if (FOLD.test(name)) return 'fold'
  if (FLIP.test(name)) return 'flip'
  return 'bar'
}

export const audioForm = (device) => (HEADPHONE.test(model(device)) ? 'headphones' : 'earbuds')

// 형태 고르기 드롭다운에 쓰는 목록. 순서가 곧 화면 순서입니다.
export const PHONE_FORMS = [
  { id: 'bar', label: '바형' },
  { id: 'fold', label: '폴더블' },
  { id: 'flip', label: '플립' },
]

export const AUDIO_FORMS = [
  { id: 'earbuds', label: '무선 이어폰' },
  { id: 'headphones', label: '헤드폰' },
]

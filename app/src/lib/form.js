// 기기 이름으로 겉모양(아이콘 종류)을 가립니다. 데이터에 필드를 따로 두지 않고 이름 규칙으로 판단합니다.
// 새 기기를 넣었는데 아이콘이 어긋나면 아래 정규식에 이름 조각을 더하세요.

const FOLD = /폴드/
const FLIP = /플립/

// 오버이어·온이어 헤드폰. 나머지 오디오 기기는 전부 무선 이어폰으로 봅니다.
// '프로 맥스'(사운드코어 리버티 5 프로 맥스)는 이어폰이라 '에어팟 맥스'만 따로 잡습니다.
const HEADPHONE = /^WH-|헤드폰|모멘텀 \d 와이어리스|Px\d|에어팟 맥스|QC45|스튜디오 프로|투어 원|스페이스 원|메이저|모니터 I|Beoplay H|AONIC/

const model = (device) => device.name.replace(/^\d{4}\s+/, '')

export const phoneForm = (device) => {
  const name = model(device)
  if (FOLD.test(name)) return 'fold'
  if (FLIP.test(name)) return 'flip'
  return 'bar'
}

export const audioForm = (device) => (HEADPHONE.test(model(device)) ? 'headphones' : 'earbuds')

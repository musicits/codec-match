// music ITs 도구 목록. 세 도구가 같은 목록을 들고 서로를 가리킵니다.
// 도구가 늘면 여기 한 줄만 더하면 머리말 전환기와 푸터 카드에 동시에 나타납니다.
//
// (폰 목업·매거진 커버 쪽에도 같은 파일을 두고, 자기 자신은 id 로 걸러 냅니다)
export const SELF = 'codec-match'

export const TOOLS = [
  {
    id: 'codec-match',
    name: '코덱 매치',
    tagline: '내 폰과 이어폰은 어떤 코덱으로 연결될까',
    url: 'https://tools.musicits.com/codec-match/',
    icon: 'codec',
  },
  {
    id: 'phone-mockup-studio',
    name: '폰 목업 스튜디오',
    tagline: '스크린샷을 기기 프레임에 맞춰 합성',
    url: 'https://tools.musicits.com/phone-mockup-studio/',
    icon: 'phone',
  },
  {
    id: 'magazine-cover-maker',
    name: '매거진 커버 메이커',
    tagline: '사진을 넣으면 바로 매거진 표지로',
    url: 'https://tools.musicits.com/magazine-cover-maker/',
    icon: 'cover',
  },
]

/** 도구 모음 첫 화면. 머리말 로고를 누르면 여기로 갑니다. */
export const HUB = 'https://tools.musicits.com/'

/** 만든이 블로그. 도구 목록 맨 아래와 푸터에서 가리킵니다. */
export const BLOG = {
  name: '쭈뉘의 뮤직잇츠 music ITs',
  tagline: '테크 · 스마트폰 · 음향기기 리뷰',
  url: 'https://blog.naver.com/musicits',
}

export const OTHERS = TOOLS.filter((tool) => tool.id !== SELF)

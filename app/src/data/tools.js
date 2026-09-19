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
    tagline: '스크린샷을 아이폰·갤럭시 목업에 넣어 PNG 로',
    url: 'https://tools.musicits.com/phone-mockup-studio/',
    icon: 'phone',
  },
  {
    id: 'magazine-cover-maker',
    name: '매거진 커버 메이커',
    tagline: '사진을 끌어다 놓으면 바로 잡지 표지로',
    url: 'https://tools.musicits.com/magazine-cover-maker/',
    icon: 'cover',
  },
  {
    id: 'photo-exam',
    name: '사진기능사 필기 예상문제',
    tagline: '예상문제 398문항 · 60분 모의고사',
    url: 'https://tools.musicits.com/photo-exam/',
    icon: 'exam',
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

/** 이 도구 자신. 머리말 이름을 누르면 여기로 — 어디까지 들어와 있든 첫 화면으로 돌아옵니다. */
export const ME = TOOLS.find((tool) => tool.id === SELF)

export const OTHERS = TOOLS.filter((tool) => tool.id !== SELF)

/** 기기 추가 요청을 받는 곳.
 *  깃허브 이슈는 계정이 있어야 해서, 구글 폼·네이버 폼 주소가 생기면
 *  kind 를 'form' 으로 바꾸고 url 한 줄만 갈아 끼우면 됩니다. */
export const REQUEST = {
  kind: 'github',
  url: 'https://github.com/musicits/codec-match/issues/new',
}

/** 적어 준 기기 이름을 요청 창에 미리 채워 둡니다 — 한 번 더 적지 않게. */
export const requestUrl = (text = '') => {
  const name = text.trim()
  if (REQUEST.kind !== 'github') return REQUEST.url
  const params = new URLSearchParams({
    title: name ? `기기 추가 요청 — ${name}` : '기기 추가 요청',
    body: [
      `추가했으면 하는 기기: ${name}`,
      '',
      '함께 쓰는 조합 (알면 적어 주세요)',
      '- 스마트폰: ',
      '- 이어폰 · 헤드폰: ',
      '',
      '참고할 사양 링크 (있으면)',
      '- ',
    ].join('\n'),
  })
  return `${REQUEST.url}?${params.toString()}`
}

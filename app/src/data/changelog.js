// 실제 커밋 기록에서 뽑은 변경 이력입니다.
//
// 새 버전을 낼 때:
//   1. 맨 위에 항목을 추가하고 phones/audio 에 그 시점의 실제 등록 대수를 적습니다.
//      (맨 위 항목의 대수는 npm run check 가 실제 데이터와 대조합니다)
//   2. 직전 버전을 아카이브하고 archiveUrl 을 채웁니다.
//      node scripts/archive-version.mjs v4 <직전 배포 커밋>
//
// archiveUrl 이 있으면 사이트에 "열어보기" 링크가 붙습니다. 최신 버전은 루트가 곧 그 버전이라 비워둡니다.

export const CHANGELOG = [
  {
    version: 'v4',
    date: '2026-08-12',
    phones: 126,
    audio: 89,
    changes: [
      '앤커 사운드코어 리버티 5 프로·리버티 5·P31i·P40i 추가',
      '젠하이저 모멘텀 5 와이어리스 추가',
      '이전 버전(v1~v3)을 당시 화면 그대로 열어볼 수 있도록 보관',
    ],
  },
  {
    version: 'v3',
    date: '2026-08-12',
    phones: 126,
    audio: 84,
    archiveUrl: './v3/',
    changes: [
      '낫싱 폰 (1)~(3) 시리즈 7종 추가',
      'LG 톤프리·자브라·마샬·뱅앤올룹슨·AKG·슈어·파이널·데논·QCY·이어펀 추가',
      '낫싱 Ear (2) 를 LDAC 에서 LHDC 5.0 으로 정정',
      '검색창에서 브랜드명으로도 찾을 수 있도록 개선',
    ],
  },
  {
    version: 'v2',
    date: '2026-08-12',
    phones: 119,
    audio: 55,
    archiveUrl: './v2/',
    changes: [
      '구글 픽셀·샤오미·소니 엑스페리아·LG 스마트폰 추가',
      '보스·젠하이저·JBL·낫싱·비츠·앤커 사운드코어·테크닉스 이어폰 추가',
      'aptX·aptX HD·aptX Adaptive·LHDC·LC3 코덱 설명 추가',
      '브랜드 목록을 기기 데이터에서 자동으로 수집하도록 변경',
    ],
  },
  {
    version: 'v1',
    date: '2026-08-11',
    phones: 82,
    audio: 29,
    archiveUrl: './v1/',
    changes: [
      '갤럭시·아이폰 스마트폰과 갤럭시 버즈·에어팟·소니 1000X 이어폰으로 첫 공개',
      'SBC·AAC·LDAC·삼성 SSC 코덱 비교 지원',
    ],
  },
]

export const CURRENT_VERSION = CHANGELOG[0].version

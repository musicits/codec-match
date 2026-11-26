// 기기 형태 아이콘 — 제조사 사진 대신 직접 그린 선 그림(48×48, 선 굵기 2)입니다.
const PATHS = {
  bar: (
    <>
      <rect x="14" y="5" width="20" height="38" rx="4.5" />
      <path d="M21.5 9h5" />
    </>
  ),
  fold: (
    <>
      <rect x="6" y="9" width="36" height="30" rx="3.5" />
      <path d="M24 9v30" strokeDasharray="2.4 3" />
      <path d="M36.5 13.5h.01" />
    </>
  ),
  flip: (
    <>
      <rect x="14" y="5" width="20" height="38" rx="4.5" />
      <path d="M14 24h20" />
      <rect x="18.5" y="9" width="11" height="9" rx="2" />
    </>
  ),
  earbuds: (
    <>
      <path d="M11 17.5a6 6 0 1 1 9.4 4.9l.9 13.1a2.5 2.5 0 0 1-5 .3l-.7-11.4A6 6 0 0 1 11 17.5Z" />
      <path d="M37 17.5a6 6 0 1 0-9.4 4.9l-.9 13.1a2.5 2.5 0 0 0 5 .3l.7-11.4A6 6 0 0 0 37 17.5Z" />
    </>
  ),
  // 갤럭시 버즈 온처럼 귀 가장자리에 끼우는 귀찌형. 삼성 공식 사진의 옆모습을 따라
  // 안쪽 작은 공과 바깥 스피커 공(구멍 셋)을 넓은 C 자 띠가 잇게 그렸습니다.
  cuff: (
    <>
      <circle cx="15" cy="15" r="5" />
      <circle cx="15" cy="32" r="7" />
      <path d="M18.5 11.4C30 5 41 14 38 25.5c-1.3 5-6 7.6-16 7.4" />
      <path d="M19.7 16.7C28 13.5 33 19 31.5 24.5c-.8 2.6-3.2 3.8-9.6 4.5" />
      <path d="M12 31.5h.01M15 34.5h.01M18 31.5h.01" />
    </>
  ),
  // 파워비츠 프로처럼 고리를 귀 위로 걸치는 귀걸이형. 몸통과 이어팁, 귀 뒤로 넘어가는 고리.
  hook: (
    <>
      <circle cx="17" cy="30" r="7" />
      <path d="M10 30H7.5" />
      <path d="M18.5 23.2C19 13 26 7.5 32.5 9.5c6 2 7 9.5 3.5 17-1.8 4-3 8.5-3 13" />
    </>
  ),
  // 샥즈 오픈런처럼 머리 뒤로 두르는 골전도. 뒤로 감기는 밴드와 귀 앞에 닿는 진동판 둘.
  bone: (
    <>
      <path d="M13.5 19.5c-1 9 3 18.5 10.5 18.5s11.5-9.5 10.5-18.5" />
      <path d="M13.5 19.5c.5-4 2.5-7 5.5-8.5M34.5 19.5c-.5-4-2.5-7-5.5-8.5" />
      <rect x="9" y="10.5" width="7" height="10" rx="3.5" />
      <rect x="32" y="10.5" width="7" height="10" rx="3.5" />
    </>
  ),
  headphones: (
    <>
      <path d="M9 28v-5a15 15 0 0 1 30 0v5" />
      <rect x="6" y="26" width="8.5" height="14" rx="3.5" />
      <rect x="33.5" y="26" width="8.5" height="14" rx="3.5" />
    </>
  ),
}

export default function DeviceIcon({ form, className = '' }) {
  return (
    <svg
      className={`device-icon ${className}`}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[form] ?? PATHS.bar}
    </svg>
  )
}

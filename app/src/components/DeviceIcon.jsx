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
  // 갤럭시 버즈 온처럼 귀 가장자리에 끼우는 클립형. 삼성 공식 사진의 옆모습을 따라
  // 안쪽 작은 공과 바깥 스피커 공(구멍 셋)을 넓은 C 자 띠가 잇게 그렸습니다.
  clip: (
    <>
      <circle cx="15" cy="15" r="5" />
      <circle cx="15" cy="32" r="7" />
      <path d="M18.5 11.4C30 5 41 14 38 25.5c-1.3 5-6 7.6-16 7.4" />
      <path d="M19.7 16.7C28 13.5 33 19 31.5 24.5c-.8 2.6-3.2 3.8-9.6 4.5" />
      <path d="M12 31.5h.01M15 34.5h.01M18 31.5h.01" />
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

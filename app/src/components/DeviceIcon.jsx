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

// 목록에 없는 기기를 알려 달라는 칸. 설정 칸 바로 아래에 답니다.
//
// 기기 이름은 여기서 받지 않고 네이버 폼에서 받습니다 — 여기서 적고 폼에서
// 또 적으면 두 번 적는 꼴이라, 이 칸은 안내와 단추만 둡니다.
import { useId } from 'react'
import { REQUEST } from '../data/tools.js'

export default function AskDevice() {
  const headingId = useId()

  return (
    <section className="ask" aria-labelledby={headingId}>
      <h2 className="ask__title" id={headingId}>
        <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.6-.7L3 21l1.9-4.9A8.3 8.3 0 0 1 4 11.5 8.4 8.4 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5Z" />
          <path d="M12.5 8.4v4" />
          <path d="M10.5 10.4h4" />
        </svg>
        찾는 기기가 없나요?
      </h2>
      <a className="ask__send" href={REQUEST.url} target="_blank" rel="noopener">
        {REQUEST.name}
        <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"
          fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 5 7 7-7 7" />
        </svg>
      </a>
    </section>
  )
}

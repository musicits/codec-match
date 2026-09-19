// 목록에 없는 기기를 적어 두는 칸. 설정 칸 맨 아래에 한 줄짜리로 붙습니다.
//
// 이 판은 붙박이(sticky)라 키가 커지면 스크롤을 내릴 때 위가 머리말 밑으로
// 밀려 들어갑니다. 그래서 다른 칸처럼 큰 아이콘 머리말을 달지 않고,
// 줄 하나 + 입력 칸으로만 둡니다.
import { useId, useState } from 'react'
import { requestUrl } from '../data/tools.js'

export default function AskDevice() {
  const [text, setText] = useState('')
  const headingId = useId()
  const name = text.trim()

  const send = (event) => {
    event.preventDefault()
    window.open(requestUrl(name), '_blank', 'noopener')
    setText('')
  }

  return (
    <section className="ask" aria-labelledby={headingId}>
      <h2 className="ask__title" id={headingId}>
        <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.6-.7L3 21l1.9-4.9A8.3 8.3 0 0 1 4 11.5 8.4 8.4 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5Z" />
          <path d="M12.5 8.4v4" />
          <path d="M10.5 10.4h4" />
        </svg>
        찾는 기기가 없나요
        <em>적어 주시면 다음 판에 넣습니다</em>
      </h2>
      <form className="ask__form" onSubmit={send}>
        <label className="field field--ask">
          <span className="sr-only">추가를 바라는 기기 이름</span>
          <input
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="예: 갤럭시 Z 플립 8"
          />
        </label>
        <button type="submit" className="ask__send" disabled={!name}>
          요청 남기기
        </button>
      </form>
    </section>
  )
}

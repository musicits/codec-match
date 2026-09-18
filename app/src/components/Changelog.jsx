// 업데이트 기록 — 버전마다 한 줄, 누르면 그 버전의 상세가 펼쳐집니다.
//
// 버전이 쌓일수록 목록이 한없이 길어져서 표로 바꿨습니다. 평소에는 요약 한 줄만
// 보이고 궁금한 버전만 열어보는 식이라, 상세를 버리지 않고도 짧게 유지됩니다.
// 좁은 화면에서는 기기 수 두 칸을 숨깁니다 (CSS).
import { useState } from 'react'
import { CHANGELOG } from '../data/changelog.js'

const PER_PAGE = 5

/** 바로 아래(이전) 버전과 견준 증가분. 늘지 않았으면 표시하지 않습니다. */
const gain = (current, previous) => {
  if (previous === undefined) return null
  const diff = current - previous
  return diff > 0 ? `+${diff}` : null
}

export default function Changelog() {
  const [page, setPage] = useState(0)
  const pages = Math.ceil(CHANGELOG.length / PER_PAGE)
  const from = page * PER_PAGE
  const rows = CHANGELOG.slice(from, from + PER_PAGE)

  return (
    <section className="changelog" aria-labelledby="changelog-title">
      <h2 id="changelog-title">업데이트 기록</h2>

      <table className="log">
        <thead>
          <tr>
            <th className="log__ver">버전</th>
            <th className="log__date">날짜</th>
            <th className="log__num">스마트폰</th>
            <th className="log__num">이어폰</th>
            <th>업데이트 내역</th>
            <th className="log__open"><span className="sr-only">이 버전 열어보기</span></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((entry, row) => {
            // 증가분은 전체 목록 기준으로 셉니다 — 쪽이 나뉘어도 이어지도록.
            const index = from + row
            const previous = CHANGELOG[index + 1]
            const phoneGain = gain(entry.phones, previous?.phones)
            const audioGain = gain(entry.audio, previous?.audio)
            return (
              <tr key={entry.version} className={index === 0 ? 'now' : undefined}>
                <td className="log__ver">
                  <span className="log__version">{entry.version}</span>
                  {index === 0 && <span className="badge">현재</span>}
                </td>
                <td className="log__date">
                  <time dateTime={entry.date}>{entry.date.slice(5)}</time>
                </td>
                <td className="log__num">
                  {entry.phones}
                  {phoneGain && <em>{phoneGain}</em>}
                </td>
                <td className="log__num">
                  {entry.audio}
                  {audioGain && <em>{audioGain}</em>}
                </td>
                <td>
                  <details>
                    <summary>{entry.summary ?? entry.changes[0]}</summary>
                    <ul>
                      {entry.changes.map((change) => (
                        <li key={change}>{change}</li>
                      ))}
                    </ul>
                  </details>
                </td>
                <td className="log__open">
                  {entry.archiveUrl && (
                    <a href={entry.archiveUrl}>
                      열어보기<span className="sr-only"> — {entry.version}</span>
                    </a>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <nav className="log-page" aria-label="업데이트 기록 쪽 넘기기">
        <div className="log-page__btns">
          <button type="button" onClick={() => setPage(0)} disabled={page === 0}>« 맨 앞</button>
          <button type="button" onClick={() => setPage(page - 1)} disabled={page === 0}>‹ 이전</button>
          {Array.from({ length: pages }, (unused, index) => (
            <button
              type="button"
              key={index}
              className={index === page ? 'on' : undefined}
              aria-current={index === page ? 'page' : undefined}
              onClick={() => setPage(index)}
            >
              {index + 1}
            </button>
          ))}
          <button type="button" onClick={() => setPage(page + 1)} disabled={page === pages - 1}>다음 ›</button>
          <button type="button" onClick={() => setPage(pages - 1)} disabled={page === pages - 1}>맨 뒤 »</button>
        </div>
        <p className="log-page__count">
          {CHANGELOG.length}개 중 {from + 1}–{from + rows.length}
        </p>
      </nav>
    </section>
  )
}

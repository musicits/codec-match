import { CHANGELOG } from '../data/changelog.js'

export default function Changelog() {
  return (
    <section className="changelog" aria-labelledby="changelog-title">
      <p className="eyebrow">03 · 업데이트 기록</p>
      <h2 id="changelog-title">무엇이 바뀌었나요</h2>

      <ol className="changelog__list">
        {CHANGELOG.map((entry, index) => (
          <li key={entry.version} className="changelog__item">
            <div className="changelog__head">
              <span className="changelog__version">{entry.version}</span>
              <time dateTime={entry.date}>{entry.date}</time>
              {index === 0 && <span className="changelog__current">현재</span>}
            </div>
            <p className="changelog__counts">
              스마트폰 {entry.phones}종 · 이어폰 {entry.audio}종
            </p>
            <ul className="changelog__changes">
              {entry.changes.map((change) => (
                <li key={change}>{change}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  )
}

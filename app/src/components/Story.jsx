// 코덱 이야기 — 누가 만들었고 숫자는 어떻게 읽는지.
//
// 결과 화면은 '내 조합이 뭐로 붙느냐'만 답합니다. 왜 aptX 는 스냅드래곤에만
// 많은지, SSC 는 왜 삼성끼리만 되는지는 만든 곳을 알아야 납득이 됩니다.
import { MAKERS, NUMBERS } from '../data/story.js'

export default function Story() {
  return (
    <div className="story">
      <div className="result__head">
        <p className="result__label">숫자 읽는 법</p>
      </div>
      <div className="story__numbers">
        {NUMBERS.map((item) => (
          <div key={item.word}>
            <p className="story__num">
              {item.word}
              <em>{item.en}</em>
              <b>{item.unit}</b>
            </p>
            <p className="story__body">{item.body}</p>
          </div>
        ))}
      </div>

      <div className="result__head">
        <p className="result__label">코덱을 만든 곳</p>
      </div>
      <ul className="story__list">
        {MAKERS.map((item) => (
          <li key={item.codec}>
            <p className="story__head">
              <b>{item.codec}</b>
              <em>{item.by}</em>
              <span>{item.year}</span>
            </p>
            <p className="story__body">{item.body}</p>
          </li>
        ))}
      </ul>

      <p className="disclaimer">제조사 공개 사양 기준 예상값이며 OS 버전·설정에 따라 달라질 수 있습니다</p>
    </div>
  )
}

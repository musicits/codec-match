// 코덱 이야기 — 숫자 읽는 법 · 코덱을 만든 곳 · 용어 설명.
//
// 기기 사이에 있는 그 파형을 그대로 가져다 씁니다. 같은 그림으로 설명해야
// '아까 본 그거' 로 이어집니다.
//   비트레이트 — 막대 높이 (초당 보내는 양)
//   샘플레이트 — 막대 개수 (1초를 몇 번 잘랐나)
//
// 비트심도는 막대로 그리지 않습니다. 양자화 단계는 이 그림으로 안 보여서,
// 억지로 계단을 만들면 사실과 다른 그림이 됩니다.
import { GROUPS, MAKERS, NUMBERS, TERMS } from '../data/story.js'

const norm = (values) => {
  const low = Math.min(...values)
  const high = Math.max(...values)
  return values.map((value) => 0.28 + 0.72 * ((value - low) / (high - low)))
}

// 막대 개수가 달라도 같은 모양이 나오게, 자리를 56개 기준으로 환산합니다.
const wave = (count) =>
  norm(Array.from({ length: count }, (unused, index) => {
    const k = index * (56 / count)
    return Math.sin(k * 0.42) * 30 + Math.sin(k * 1.31) * 14 + (Math.round(k) % 4) * 7
  }))

function DemoWave({ bars = 56, amp = 1, levels }) {
  let heights = wave(bars)
  if (levels) heights = heights.map((value) => Math.round(value * levels) / levels)
  return (
    <div className="pair__link storywave" aria-hidden="true">
      {heights.map((value, index) => (
        <i
          key={index}
          style={{
            height: `${(value * amp * 100).toFixed(1)}%`,
            animationDelay: `${-1.9 + index * 0.026}s`,
          }}
        />
      ))}
    </div>
  )
}

const DEMOS = {
  비트레이트: [['250 kbps', <DemoWave amp={0.4} />], ['990 kbps', <DemoWave amp={1} />]],
  샘플레이트: [['44.1 kHz', <DemoWave bars={16} />], ['96 kHz', <DemoWave bars={56} />]],
}

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
            {DEMOS[item.word] && <div className="story__demo">
              {(DEMOS[item.word] ?? []).map(([label, node]) => (
                <div key={label}>
                  {node}
                  <span>{label}</span>
                </div>
              ))}
            </div>}
            <p className="story__aside">{item.aside}</p>
          </div>
        ))}
      </div>

      {GROUPS.map((group) => (
        <section key={group.id}>
          <div className="result__head">
            <p className="result__label">{group.name}</p>
          </div>
          <p className="story__note">{group.note}</p>
          <ul className="story__list">
            {MAKERS.filter((item) => item.group === group.id).map((item) => (
              <li key={item.codec}>
                <p className="story__head">
                  <b>{item.codec}</b>
                  <em>{item.by}</em>
                  <span>{item.year}</span>
                </p>
                <p className="story__spec">{item.spec}</p>
                <p className="story__body">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <div className="result__head">
        <p className="result__label">용어 설명</p>
      </div>
      <dl className="story__terms">
        {TERMS.map((term) => (
          <div key={term.word}>
            <dt>
              {term.word}
              <em>{term.en}</em>
            </dt>
            <dd>{term.body}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

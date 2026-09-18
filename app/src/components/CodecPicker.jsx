// 공통 지원 코덱 고르기.
//
// 칩 하나에 글자만 있던 것을 카드로 바꿨습니다. 카드마다 그 코덱의 파형을 작게
// 그려 두어, 누르기 전에도 어느 쪽이 큰 소리를 담는지 눈에 보입니다.
import { CODEC_INFO, CODEC_PRIORITY } from '../data/codecs.js'

// 파형 모양은 두 벌입니다. 최적 코덱은 굴곡이 크고, 나머지는 잔잔합니다.
// 모양은 자기 안에서만 눌러 두고, 실제 높이는 오로지 등급(strength)이 정합니다.
const norm = (values, floor) => {
  const low = Math.min(...values)
  const high = Math.max(...values)
  return values.map((value) => floor + (1 - floor) * ((value - low) / (high - low)))
}

const MINI = {
  rich: norm(Array.from({ length: 26 }, (unused, index) =>
    Math.sin(index * 0.62) * 34 + Math.sin(index * 1.7) * 14 + (index % 4) * 8), 0.3),
  calm: norm(Array.from({ length: 26 }, (unused, index) =>
    Math.sin(index * 0.34) * 16 + (index % 3) * 6), 0.45),
}

/**
 * 카드에 그릴 높이를 한 번에 정합니다.
 *
 * 사양 숫자(비트레이트·샘플레이트)를 그대로 쓰면 이 조합에서 실제로 붙는 코덱이
 * 아래로 깔립니다 — 아이폰은 AAC 로 협상되는데 SBC 가 16bit 48kHz 라 더 높게
 * 그려지는 식입니다. 그래서 협상 순서(CODEC_PRIORITY)를 그대로 높이로 옮깁니다.
 * 최적 코덱이 맨 위 100%, 아래로 한 계단씩 내려와 맨 끝이 30% 입니다.
 */
export const strengthsOf = (common = [], best) => {
  const order = [...common].sort(
    (a, b) => CODEC_PRIORITY.indexOf(a) - CODEC_PRIORITY.indexOf(b),
  )
  if (best && order.includes(best)) {
    order.splice(order.indexOf(best), 1)
    order.unshift(best)
  }
  const top = 1
  const bottom = 0.3
  const step = order.length > 1 ? (top - bottom) / (order.length - 1) : 0
  const heights = {}
  order.forEach((item, index) => { heights[item] = top - step * index })
  return heights
}

function MiniWave({ strength, rich }) {
  // 높이만 다르고 다 같은 박자로 움직이면 줄 맞춘 것처럼 보입니다.
  // 위에 선 코덱일수록 빠르고 크게, 아래로 갈수록 느리고 잔잔하게 숨 쉬게 합니다.
  const style = {
    '--pulse-time': `${(3.1 - strength * 1.5).toFixed(2)}s`,
    '--pulse-low': (0.96 - strength * 0.14).toFixed(3),
  }
  return (
    <span className="mini" style={style} aria-hidden="true">
      {(rich ? MINI.rich : MINI.calm).map((height, index) => (
        <i key={index} style={{ height: `${(height * strength * 100).toFixed(1)}%` }} />
      ))}
    </span>
  )
}

export default function CodecPicker({ common, codec, picked, onPick, qualityOf, kbpsOf }) {
  if (!common?.length) return null
  const heights = strengthsOf(common, codec)

  // 카드는 화면 아래쪽에 있습니다. 눌러 놓고 위를 못 보면 무엇이 바뀌었는지 알 수 없어
  // 결과 판 머리로 부드럽게 올려 줍니다.
  const pick = (item) => {
    onPick(item)
    const stage = document.querySelector('.stage')
    if (!stage) return
    const style = getComputedStyle(document.documentElement)
    const head = parseInt(style.getPropertyValue('--hh'), 10) || 60
    const nav = parseInt(style.getPropertyValue('--nh'), 10) || 52
    const top = stage.getBoundingClientRect().top + window.scrollY - head - nav - 12
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section className="picker" aria-label="공통 지원 코덱">
      <p className="picker__label">
        공통 지원 코덱
        <span>눌러서 바꿔 보기</span>
      </p>
      <div className="picker__row">
        {common.map((item) => {
          const info = CODEC_INFO[item]
          return (
            <button
              type="button"
              key={item}
              className={`codecard${item === picked ? ' on' : ''}${item === codec ? ' best' : ''}`}
              aria-pressed={item === picked}
              onClick={() => pick(item)}
            >
              <MiniWave
                strength={heights[item]}
                rich={item === codec}
              />
              <span className="codecard__name">
                {item}
                {item === codec && <em>최적</em>}
              </span>
              <span className="codecard__quality">{qualityOf?.(item) ?? info?.quality}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

// 공통 지원 코덱 고르기.
//
// 칩 하나에 글자만 있던 것을 카드로 바꿨습니다. 카드마다 그 코덱의 파형을 작게
// 그려 두어, 누르기 전에도 어느 쪽이 큰 소리를 담는지 눈에 보입니다.
import { CODEC_INFO } from '../data/codecs.js'

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
 * 코덱 등급을 0.26~1 사이 높이로 옮깁니다.
 *
 * 비트레이트 하나만 보면 16bit 44.1kHz(AAC)와 16bit 48kHz(SBC)가 거의 붙어 버려
 * 눈으로는 구분이 안 됩니다. 그래서 비트심도·샘플레이트·비트레이트에 각각 점수를
 * 매겨 0~6 계단으로 끊고, 계단 하나를 12% 씩 벌려 놨습니다.
 */
export const waveStrength = (kbps = 300, quality) => {
  const rate = Number(quality?.match(/([\d.]+)\s*kHz/i)?.[1] ?? 44.1)
  const depth = Number(quality?.match(/(\d+)\s*bit/i)?.[1] ?? 16)
  const byDepth = depth >= 24 ? 2 : 0
  const byRate = rate >= 96 ? 2 : rate >= 48 ? 1 : 0
  const byKbps = kbps >= 900 ? 2 : kbps >= 500 ? 1 : 0
  return 0.26 + (0.74 * (byDepth + byRate + byKbps)) / 6
}

/**
 * 카드에 그릴 높이를 한 번에 정합니다.
 *
 * 사양 숫자만 따르면 이 조합에서 실제로 쓰이는 코덱이 아래로 깔리는 일이 생깁니다
 * — 아이폰은 AAC 로 붙는데 SBC 가 16bit 48kHz 라 더 높게 그려지는 식입니다.
 * 그래서 최적 코덱은 나머지보다 항상 한 뼘 위, 그리고 최소 0.7 은 되게 올립니다.
 */
export const strengthsOf = (common = [], best, kbpsOf, qualityOf) => {
  const heights = {}
  common.forEach((item) => {
    const info = CODEC_INFO[item]
    heights[item] = waveStrength(kbpsOf?.(item) ?? info?.kbps, qualityOf?.(item) ?? info?.quality)
  })
  if (!best || heights[best] === undefined) return heights
  const others = common.filter((item) => item !== best).map((item) => heights[item])
  const top = others.length ? Math.max(...others) : 0
  heights[best] = Math.min(1, Math.max(heights[best], top + 0.3, 0.7))
  return heights
}

function MiniWave({ strength, rich }) {
  return (
    <span className="mini" aria-hidden="true">
      {(rich ? MINI.rich : MINI.calm).map((height, index) => (
        <i key={index} style={{ height: `${(height * strength * 100).toFixed(1)}%` }} />
      ))}
    </span>
  )
}

export default function CodecPicker({ common, codec, picked, onPick, qualityOf, kbpsOf }) {
  if (!common?.length) return null
  const heights = strengthsOf(common, codec, kbpsOf, qualityOf)

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

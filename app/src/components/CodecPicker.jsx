// 공통 지원 코덱 고르기.
//
// 칩 하나에 글자만 있던 것을 카드로 바꿨습니다. 카드마다 그 코덱의 파형을 작게
// 그려 두어, 누르기 전에도 어느 쪽이 큰 소리를 담는지 눈에 보입니다.
import { CODEC_INFO } from '../data/codecs.js'

// 최적 코덱 카드는 굴곡이 큰 파형, 나머지는 잔잔한 파형을 씁니다.
const MINI = {
  rich: Array.from({ length: 26 }, (unused, index) =>
    30 + Math.sin(index * 0.62) * 34 + Math.sin(index * 1.7) * 14 + (index % 4) * 8),
  calm: Array.from({ length: 26 }, (unused, index) =>
    30 + Math.sin(index * 0.34) * 16 + (index % 3) * 6),
}

/**
 * 코덱 등급을 0.15~1 사이로 옮깁니다.
 *
 * 비트레이트만 보면 16bit 44.1kHz(AAC)와 16bit 48kHz(SBC)가 거의 같아 보입니다.
 * 그래서 비트심도와 샘플레이트도 함께 셉니다 — 셋을 6:2:2 로 섞습니다.
 */
export const waveStrength = (kbps = 300, quality) => {
  const rate = Number(quality?.match(/([\d.]+)\s*kHz/i)?.[1] ?? 44.1)
  const depth = Number(quality?.match(/(\d+)\s*bit/i)?.[1] ?? 16)
  const byRate = Math.min(1, Math.max(0, Math.log(rate / 44.1) / Math.log(96 / 44.1)))
  const byKbps = Math.min(1, Math.max(0, Math.log(Math.max(kbps, 200) / 200) / Math.log(2304 / 200)))
  const byDepth = depth >= 24 ? 1 : 0
  return 0.15 + 0.85 * (byKbps * 0.6 + byDepth * 0.2 + byRate * 0.2)
}

function MiniWave({ strength, rich }) {
  const scale = Math.pow(strength, 1.6)
  return (
    <span className="mini" aria-hidden="true">
      {(rich ? MINI.rich : MINI.calm).map((height, index) => (
        <i key={index} style={{ height: `${Math.min(100, 8 + height * scale * 1.5)}%` }} />
      ))}
    </span>
  )
}

export default function CodecPicker({ common, codec, picked, onPick, qualityOf, kbpsOf }) {
  if (!common?.length) return null

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
              onClick={() => onPick(item)}
            >
              <MiniWave
                strength={waveStrength(kbpsOf?.(item) ?? info?.kbps, qualityOf?.(item) ?? info?.quality)}
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

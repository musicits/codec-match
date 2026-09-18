// 공통 지원 코덱 고르기.
//
// 칩 하나에 글자만 있던 것을 카드로 바꿨습니다. 카드마다 그 코덱의 파형을 작게
// 그려 두어, 누르기 전에도 어느 쪽이 큰 소리를 담는지 눈에 보입니다.
import { CODEC_INFO } from '../data/codecs.js'

const MINI = Array.from({ length: 22 }, (unused, index) => 40 + Math.sin(index * 0.7) * 34 + (index % 3) * 10)

/** 코덱 등급을 0.22~1 사이로 옮깁니다. 로그를 쓰는 건 SBC 와 LDAC 이 붙어 보이지 않게 하려고요. */
export const waveStrength = (kbps = 300) => {
  const ratio = Math.log(Math.max(kbps, 200) / 200) / Math.log(2304 / 200)
  return 0.3 + 0.7 * Math.min(1, ratio)
}

function MiniWave({ strength }) {
  return (
    <span className="mini" aria-hidden="true">
      {MINI.map((height, index) => (
        <i key={index} style={{ height: `${12 + height * strength}%` }} />
      ))}
    </span>
  )
}

export default function CodecPicker({ common, codec, picked, onPick, qualityOf, kbpsOf }) {
  if (!common?.length) return null

  return (
    <section className="picker" aria-label="공통 지원 코덱">
      <p className="picker__label">공통 지원 코덱 · 눌러서 바꿔 보기</p>
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
              <MiniWave strength={waveStrength(kbpsOf?.(item) ?? info?.kbps)} />
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

// 공통 코덱을 나란히 눕혀 비교하는 막대.
//
// '코덱별 파형' 은 실제로 정해진 그림이 없어서(코덱마다 파형이 다르게 생긴 게 아닙니다)
// 대신 사양에 있는 수치 — 최대 비트레이트와 대략적 지연시간 — 를 길이로 보여줍니다.
// 눈으로 바로 비교되면서 근거가 있는 그림이 됩니다.
import { CODEC_INFO } from '../data/codecs.js'

const BITRATE_CEILING = 2304 // SSC Hi-Fi · L2HC 4.0 이 이 근처라 여기에 맞춰 눕힙니다
const LATENCY_CEILING = 250 // SBC 가 제일 느립니다

export default function CodecCompare({ common, picked, onPick, metric, onMetric, tierOf }) {
  const rows = common.map((codec) => {
    const info = CODEC_INFO[codec]
    const tier = codec === 'SSC' ? tierOf?.() : null
    return {
      codec,
      quality: tier?.quality ?? info.quality,
      kbps: tier?.kbps ?? info.kbps,
      ms: info.ms,
    }
  })

  const isRate = metric === 'kbps'
  const max = isRate ? BITRATE_CEILING : LATENCY_CEILING

  return (
    <section className="compare" aria-label="공통 코덱 비교">
      <div className="compare__head">
        <h3>코덱 비교</h3>
        <div className="seg" role="group" aria-label="비교 기준">
          <button
            type="button"
            className={isRate ? 'on' : ''}
            onClick={() => onMetric('kbps')}
            aria-pressed={isRate}
          >
            비트레이트
          </button>
          <button
            type="button"
            className={isRate ? '' : 'on'}
            onClick={() => onMetric('ms')}
            aria-pressed={!isRate}
          >
            지연시간
          </button>
        </div>
      </div>

      <ul className="compare__list">
        {rows.map((row) => {
          const value = isRate ? row.kbps : row.ms
          const width = Math.max(4, Math.round((value / max) * 100))
          return (
            <li key={row.codec} className={row.codec === picked ? 'on' : ''}>
              <button type="button" onClick={() => onPick(row.codec)}>
                <span className="compare__name">{row.codec}</span>
                <span className="compare__track">
                  <i style={{ width: `${width}%` }} />
                </span>
                <span className="compare__value">
                  {isRate ? `${value.toLocaleString()} kbps` : `약 ${value} ms`}
                  <em>{isRate ? row.quality : '왕복 기준'}</em>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
      <p className="compare__foot">
        막대는 제조사 사양의 최대치({isRate ? '비트레이트' : '지연시간 범위의 가운데값'}) 기준입니다 ·
        코덱을 누르면 위 카드가 그 코덱 기준으로 바뀝니다
      </p>
    </section>
  )
}

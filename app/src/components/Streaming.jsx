// 음악 스트리밍 서비스 화면.
//
// 코덱 화면에서 고른 조합이 그대로 넘어옵니다. 기기 한 쌍을 그대로 얹고,
// 그 아래에 코덱·비트레이트·음질 상한을 적은 다음 서비스별로 견줍니다.
import { REGIONS, STREAMING, fits, parseCeiling } from '../data/streaming.js'
import DevicePair from './DevicePair.jsx'

export default function Streaming({ codec, quality, bitrate, phone, audio, strength = 1 }) {
  const ceiling = parseCeiling(quality)
  const rows = STREAMING.map((service) => ({ ...service, ok: fits(service, ceiling) }))

  return (
    <div className="stream">
      <DevicePair phone={phone} audio={audio} linked={Boolean(codec)} strength={strength} />

      <dl className="metrics">
        <div>
          <dt>연결 코덱</dt>
          <dd>{codec ?? '연결 불가'}</dd>
        </div>
        <div>
          <dt>최대 비트레이트</dt>
          <dd>{bitrate ?? '—'}</dd>
        </div>
        <div>
          <dt>음질 상한</dt>
          <dd>{quality ?? '—'}</dd>
        </div>
      </dl>

      <h2 className="stream__title">음악 스트리밍 서비스</h2>
      <p className="stream__sub">서비스별 최적 조합 · 이 기기로 들을 때 어디까지 건너가는지</p>

      <table className="stream__table">
        <thead>
          <tr>
            <th>서비스</th>
            <th className="stream__q">최고 음질</th>
            <th className="stream__fmt">포맷</th>
            <th className="stream__price">요금(최소)</th>
            <th className="stream__verdict">블루투스 전송</th>
          </tr>
        </thead>
        {REGIONS.map((region) => (
          <tbody key={region.id}>
            <tr className="stream__group">
              <th colSpan={5}>{region.label}</th>
            </tr>
            {rows
              .filter((row) => row.region === region.id)
              .map((row) => (
                <tr key={row.name}>
                  <td>
                    <b>{row.name}</b>
                    <em>{row.en}</em>
                  </td>
                  <td className="stream__q">{row.lossy ?? `${row.depth}bit ${row.rate}kHz`}</td>
                  <td className="stream__fmt">{row.format}</td>
                  <td className="stream__price">{row.price}</td>
                  <td className="stream__verdict">
                    <span className={`pill${row.ok ? ' pill--ok' : ' pill--cut'}`}>
                      {row.ok ? '원음 그대로' : `${ceiling?.rate}kHz 까지`}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        ))}
      </table>

      <p className="stream__foot">
        무손실 요금제를 켜도 블루투스로는 위 상한까지만 건너갑니다. 원음 그대로 들으려면 유선으로 연결하세요.
      </p>
    </div>
  )
}

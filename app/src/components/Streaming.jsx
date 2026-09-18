// 스트리밍 음질 화면.
//
// 고른 기기 조합의 코덱 상한을 기준으로, 각 서비스의 원본이 그대로 건너가는지
// 아니면 깎여서 들어오는지 함께 보여 줍니다. 오른쪽 기기 칸은 그대로 두기 때문에
// 폰·이어폰을 바꾸면 이 표도 따라 바뀝니다.
import { STREAMING, fits, parseCeiling } from '../data/streaming.js'

export default function Streaming({ codec, quality, phone, audio }) {
  const ceiling = parseCeiling(quality)
  const rows = STREAMING.map((service) => ({ ...service, ok: fits(service, ceiling) }))
  const kept = rows.filter((row) => row.ok).length

  return (
    <div className="stream">
      <p className="stream__label">스트리밍 음질</p>
      <h2 className="stream__title">지금 조합에서 어디까지 들리나</h2>
      <p className="stream__sub">
        {phone.name} + {audio.name} 는 <b>{codec ?? '연결 불가'}</b>
        {quality && <> · 담을 수 있는 상한은 <b>{quality}</b></>}
      </p>

      <div className="stream__sum">
        <div>
          <dt>그대로 담기는 서비스</dt>
          <dd>{kept}곳</dd>
        </div>
        <div>
          <dt>깎여서 들어오는 서비스</dt>
          <dd>{rows.length - kept}곳</dd>
        </div>
      </div>

      <table className="stream__table">
        <thead>
          <tr>
            <th>서비스</th>
            <th className="stream__q">최고 음질</th>
            <th className="stream__fmt">포맷</th>
            <th className="stream__price">요금(최소)</th>
            <th className="stream__verdict">이 조합에서</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td>
                <b>{row.name}</b>
                <em>{row.en}</em>
              </td>
              <td className="stream__q">
                {row.lossy ?? `${row.depth}bit ${row.rate}kHz`}
              </td>
              <td className="stream__fmt">{row.format}</td>
              <td className="stream__price">{row.price}</td>
              <td className="stream__verdict">
                <span className={`pill${row.ok ? ' pill--ok' : ' pill--cut'}`}>
                  {row.ok ? '그대로' : `${ceiling?.rate}kHz 로 깎임`}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="stream__foot">
        블루투스로 들으면 앱이 보낸 원본을 폰이 코덱으로 다시 압축합니다.
        무손실 요금제를 켜도 이 조합의 상한을 넘겨 건너가지는 않습니다 — 원본 그대로 들으려면 유선으로 연결해야 합니다.
      </p>
    </div>
  )
}

// 음악 스트리밍 서비스 화면.
//
// 코덱 화면에서 고른 조합이 그대로 넘어옵니다. 서비스마다 음질 단계가 여럿이라
// (320kbps · CD · 하이레조) 그 단계를 모두 걸어 두고, 지금 코덱으로 실제로 닿는
// 단계를 따로 표시합니다.
import { useState } from 'react'
import { REGIONS, STREAMING, bestTier, fits, parseCeiling } from '../data/streaming.js'
import DevicePair from './DevicePair.jsx'

const FILTERS = [
  { id: 'all', label: '전체' },
  { id: 'kr', label: '국내' },
  { id: 'global', label: '해외' },
]

const SORTS = {
  name: (a, b) => a.name.localeCompare(b.name, 'ko'),
  max: (a, b) => (a.lossy ? 0 : a.depth * a.rate) - (b.lossy ? 0 : b.depth * b.rate),
  price: (a, b) => (a.won ?? Infinity) - (b.won ?? Infinity),
}

export default function Streaming({ codec, quality, bitrate, phone, audio, strength = 1 }) {
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState(null)

  const ceiling = parseCeiling(quality)
  const rows = STREAMING.filter((service) => filter === 'all' || service.region === filter).map(
    (service) => ({ ...service, ok: fits(service, ceiling), heard: bestTier(service, ceiling) }),
  )

  const sorted = sort ? [...rows].sort((a, b) => SORTS[sort.key](a, b) * sort.dir) : rows
  // 정렬을 걸지 않았고 전체를 볼 때만 국내·해외로 묶어 보여 줍니다.
  const grouped = !sort && filter === 'all'

  const toggle = (key) =>
    setSort((current) =>
      current?.key === key ? (current.dir === 1 ? { key, dir: -1 } : null) : { key, dir: 1 },
    )

  const arrow = (key) => (sort?.key === key ? (sort.dir === 1 ? '▲' : '▼') : '⇅')

  const Row = ({ row }) => (
    <tr>
      <td>
        <b>{row.name}</b>
        <em>{row.en}</em>
      </td>
      <td className="stream__tiers">
        {row.tiers.map((tier) => (
          <span key={tier} className={tier === row.heard ? 'on' : undefined}>{tier}</span>
        ))}
      </td>
      <td className="stream__fmt">{row.format}</td>
      <td className="stream__price">{row.price}</td>
      <td className="stream__verdict">
        <span className={`pill${row.ok ? ' pill--ok' : ' pill--cut'}`}>{row.heard}</span>
      </td>
    </tr>
  )

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

      <div className="stream__head">
        <div>
          <h2 className="stream__title">음악 스트리밍 서비스</h2>
          <p className="stream__sub">서비스별 최적 조합</p>
        </div>
        <div className="seg">
          {FILTERS.map((item) => (
            <button
              type="button"
              key={item.id}
              className={item.id === filter ? 'on' : undefined}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="stream__panel">
        <table className="stream__table">
          <thead>
            <tr>
              <th>
                <button type="button" onClick={() => toggle('name')}>서비스 <i>{arrow('name')}</i></button>
              </th>
              <th className="stream__tiers">
                <button type="button" onClick={() => toggle('max')}>음질 단계 <i>{arrow('max')}</i></button>
              </th>
              <th className="stream__fmt">포맷</th>
              <th className="stream__price">
                <button type="button" onClick={() => toggle('price')}>요금(최소) <i>{arrow('price')}</i></button>
              </th>
              <th className="stream__verdict">블루투스 전송</th>
            </tr>
          </thead>

          {grouped ? (
            REGIONS.map((region) => (
              <tbody key={region.id}>
                <tr className="stream__group">
                  <th colSpan={5}>{region.label}</th>
                </tr>
                {sorted
                  .filter((row) => row.region === region.id)
                  .map((row) => <Row key={row.name} row={row} />)}
              </tbody>
            ))
          ) : (
            <tbody>
              {sorted.map((row) => <Row key={row.name} row={row} />)}
            </tbody>
          )}
        </table>
      </div>

      <p className="stream__foot">
        칠해진 단계가 이 조합에서 실제로 닿는 음질입니다 · 원음은 유선 연결에서만
      </p>
    </div>
  )
}

// 음악 스트리밍 서비스 화면.
//
// 코덱 화면에서 고른 조합이 그대로 넘어옵니다. 서비스 상한과 코덱 상한을 견줘
// 실제로 귀에 닿는 음질을 적습니다. 국내·해외를 갈라서 보여 주고, 표는 머리를
// 눌러 정렬할 수 있습니다.
import { useEffect, useState } from 'react'
import {
  REGIONS, STREAMING, bestServices, gradeOf, heardQuality, maxQuality, parseCeiling, serviceId,
} from '../data/streaming.js'
import CodecPicker, { strengthsOf } from './CodecPicker.jsx'
import DevicePair from './DevicePair.jsx'

const FILTERS = [{ id: 'all', label: '전체' }, ...REGIONS]

const SORTS = {
  name: (a, b) => a.name.localeCompare(b.name, 'ko'),
  max: (a, b) => (a.lossy ? 0 : a.depth * a.rate) - (b.lossy ? 0 : b.depth * b.rate),
  price: (a, b) => (a.won ?? Infinity) - (b.won ?? Infinity),
}

export default function Streaming({
  codec, common = [], nameOf, qualityOf, kbpsOf, titleOf, bitrateOf, latencyOf, phone, audio,
}) {
  const [filter, setFilter] = useState('kr')
  const [sort, setSort] = useState(null)
  const [picked, setPicked] = useState(codec)
  // 위에서 서비스 이름을 누르면 아래 표의 그 줄로 내려가 잠깐 불이 들어옵니다.
  const [target, setTarget] = useState(null)
  useEffect(() => { setPicked(codec) }, [codec, phone.id, audio.id])

  const shown = common.includes(picked) ? picked : codec
  const heights = strengthsOf(common, codec)
  const quality = qualityOf?.(shown)
  const ceiling = parseCeiling(quality)
  const rows = STREAMING.filter((service) => filter === 'all' || service.region === filter).map(
    (service) => {
      const heard = heardQuality(service, ceiling)
      return { ...service, heard, grade: gradeOf(heard) }
    },
  )
  // 24bit 로 들어오는 줄만 또렷하게 둡니다. 사람들이 궁금해하는 선이 거기입니다.
  //
  // 두 가지는 흐리게 하지 않습니다.
  //   · 유튜브 뮤직처럼 kbps 로만 오는 곳 — 견줄 값이 아니라 주황 알약으로만 둡니다
  //   · 24bit 로 오는 줄이 하나도 없을 때 — 코덱이 낮아 다 같은 처지라 가릴 게 없습니다
  const anyHi = rows.some((row) => !row.lossy && row.heard.startsWith('24bit'))
  const marked = rows.map((row) => ({
    ...row,
    dim: anyHi && !row.lossy && !row.heard.startsWith('24bit'),
  }))
  const sorted = sort ? [...marked].sort((a, b) => SORTS[sort.key](a, b) * sort.dir) : marked
  const grouped = !sort && filter === 'all'

  const picks = bestServices(ceiling)
  // CD 급에서 멈추는 코덱이면 어떤 요금제를 켜도 거기까지라, 고를 것이 없습니다.
  const capped = ceiling && ceiling.depth <= 16 && ceiling.rate <= 48

  // 해외 서비스를 눌렀는데 국내만 보고 있으면 먼저 그쪽으로 걸러 줍니다.
  const jump = (service) => {
    if (filter !== 'all' && filter !== service.region) setFilter(service.region)
    setTarget(service)
  }

  useEffect(() => {
    if (!target) return undefined
    const row = document.getElementById(serviceId(target))
    if (row) {
      const style = getComputedStyle(document.documentElement)
      const head = parseInt(style.getPropertyValue('--hh'), 10) || 60
      const nav = parseInt(style.getPropertyValue('--nh'), 10) || 52
      const top = row.getBoundingClientRect().top + window.scrollY - head - nav - 16
      window.scrollTo({ top, behavior: 'smooth' })
    }
    const timer = setTimeout(() => setTarget(null), 1800)
    return () => clearTimeout(timer)
  }, [target, filter])

  const toggle = (key) =>
    setSort((current) =>
      current?.key === key ? (current.dir === 1 ? { key, dir: -1 } : null) : { key, dir: 1 },
    )
  const arrow = (key) => (sort?.key === key ? (sort.dir === 1 ? '▲' : '▼') : '⇅')

  const Row = ({ row }) => (
    <tr
      id={serviceId(row)}
      className={`${row.dim ? 'dim' : ''}${target?.name === row.name ? ' flash' : ''}`.trim() || undefined}
    >
      <td className="stream__name">
        <b>{row.name}</b>
        <em>{row.en}</em>
      </td>
      <td className="stream__max">
        <span>{maxQuality(row)}</span>
        {row.maxNote && <em>{row.maxNote}</em>}
      </td>
      <td className="stream__fmt">{row.format}</td>
      <td className="stream__price">{row.price}</td>
      <td className="stream__verdict">
        <span className={`pill pill--${row.grade}`}>{row.heard}</span>
      </td>
    </tr>
  )

  return (
    <div className="stream">
      <DevicePair phone={phone} audio={audio} linked={Boolean(codec)} strength={heights[shown] ?? 0.35} best={shown === codec}>
        {/* 지금 코덱으로 제값 하는 곳. 누르면 아래 표의 그 줄로 내려갑니다. */}
        {capped ? (
          <p className="picks picks--flat">모든 서비스 동일</p>
        ) : picks.length > 0 && (
          <p className="picks">
            {picks.map((service) => (
              <button type="button" key={service.name} onClick={() => jump(service)}>
                {service.name}
              </button>
            ))}
          </p>
        )}
      </DevicePair>

      {/* 코덱 화면과 같은 머리말·지표를 씁니다. 화면을 바꿔도 코덱 카드가 같은
          자리에 서고, 두 화면이 한 도구로 읽힙니다. */}
      <div className="result__head">
        <p className="result__label">{shown === codec ? '이 조합의 최적 코덱' : '다른 코덱으로 보는 중'}</p>
        {shown !== codec && (
          <button type="button" className="badge badge--btn" onClick={() => setPicked(codec)}>
            {codec} 다시 보기
          </button>
        )}
      </div>
      <h2 className="result__codec">{shown ? titleOf?.(shown) ?? shown : '연결 불가'}</h2>

      <dl className="metrics">
        <div>
          <dt>최대 비트레이트</dt>
          <dd>{bitrateOf?.(shown) ?? '—'}</dd>
        </div>
        <div>
          <dt>대략적 지연시간</dt>
          <dd>{latencyOf?.(shown) ?? '—'}</dd>
        </div>
        <div>
          <dt>음질 상한</dt>
          <dd>{quality ?? '—'}</dd>
        </div>
      </dl>

      <CodecPicker
        common={common}
        codec={codec}
        picked={shown}
        onPick={setPicked}
        qualityOf={qualityOf}
        kbpsOf={kbpsOf}
      />

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
              <th className="stream__name">
                <button type="button" onClick={() => toggle('name')}>서비스 <i>{arrow('name')}</i></button>
              </th>
              <th className="stream__max">
                <button type="button" onClick={() => toggle('max')}>서비스 상한 <i>{arrow('max')}</i></button>
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
                  <th colSpan={5}>{region.id === 'kr' ? '국내에서 쓸 수 있는 곳' : '해외 전용'}</th>
                </tr>
                {sorted
                  .filter((row) => row.region === region.id)
                  .map((row) => <Row key={row.name} row={row} />)}
              </tbody>
            ))
          ) : (
            <tbody>{sorted.map((row) => <Row key={row.name} row={row} />)}</tbody>
          )}
        </table>
      </div>

    </div>
  )
}

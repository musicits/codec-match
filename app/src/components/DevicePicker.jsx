import { useId, useMemo, useState } from 'react'
import { codecsOf } from '../data/codecs.js'
import { filterDevices } from '../lib/match.js'
import DeviceIcon from './DeviceIcon.jsx'

export default function DevicePicker({ title, formLabel = '형태', formOf, forms = [], devices, selectedId, onChange, brands }) {
  const [query, setQuery] = useState('')
  const [brand, setBrand] = useState('')
  const [form, setForm] = useState('')
  const [allCodecs, setAllCodecs] = useState(false)
  const headingId = useId()

  // 형태로 거르기 전의 목록. 여기에 실제로 있는 형태만 드롭다운에 올립니다.
  // (애플에는 플립이 없고 낫싱에는 폴더블이 없는 식이라, 고를 수 없는 선택지를 보여주지 않습니다)
  const pool = useMemo(() => filterDevices(devices, brand, query), [devices, brand, query])
  const options = useMemo(() => {
    if (!formOf) return []
    const present = new Set(pool.map(formOf))
    return forms.filter((item) => present.has(item.id))
  }, [forms, formOf, pool])

  const visible = useMemo(
    () => filterDevices(devices, brand, query, form, formOf),
    [devices, brand, query, form, formOf],
  )

  // 필터 결과에서 벗어난 선택은 목록 첫 항목으로 되돌립니다.
  const currentId = visible.some((device) => device.id === selectedId)
    ? selectedId
    : (visible[0]?.id ?? '')
  const current = visible.find((device) => device.id === currentId)

  const syncSelection = (next) => {
    if (next.length && !next.some((device) => device.id === selectedId)) onChange(next[0].id)
  }

  // 브랜드·검색어를 바꾼 뒤 고르고 있던 형태가 그 안에 없으면 형태 조건을 풉니다.
  // (플립을 보다가 애플로 바꾸면 '결과 없음' 이 되는 것을 막습니다)
  const keepForm = (next) =>
    form && formOf && next.some((device) => formOf(device) === form) ? form : ''

  const handleBrand = (value) => {
    const next = filterDevices(devices, value, query)
    const nextForm = keepForm(next)
    setBrand(value)
    setForm(nextForm)
    syncSelection(filterDevices(devices, value, query, nextForm, formOf))
  }

  const handleQuery = (value) => {
    const next = filterDevices(devices, brand, value)
    const nextForm = keepForm(next)
    setQuery(value)
    setForm(nextForm)
    syncSelection(filterDevices(devices, brand, value, nextForm, formOf))
  }

  const handleForm = (value) => {
    setForm(value)
    syncSelection(filterDevices(devices, brand, query, value, formOf))
  }

  return (
    <section className="grp" aria-labelledby={headingId}>
      <h2 id={headingId}>
        <span className="grp__icon">
          <DeviceIcon form={current ? formOf(current) : undefined} />
        </span>
        {title}
      </h2>

      <label className="field field--search">
        <span className="sr-only">{title} 이름 필터</span>
        <input
          type="search"
          value={query}
          onChange={(event) => handleQuery(event.target.value)}
          placeholder={title === '스마트폰' ? '예: S24, 아이폰 15, 픽셀' : '예: 버즈, 에어팟, 보스'}
        />
      </label>

      <div className="field-row">
        <label className="field">
          <span className="sr-only">{title} 브랜드 선택</span>
          <select value={brand} onChange={(event) => handleBrand(event.target.value)}>
            <option value="">브랜드 전체</option>
            {brands.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </label>

        {options.length > 1 && (
          <label className="field">
            <span className="sr-only">{title} {formLabel} 선택</span>
            <select value={form} onChange={(event) => handleForm(event.target.value)}>
              <option value="">{formLabel} 전체</option>
              {options.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </label>
        )}
      </div>

      <label className="field">
        <span className="sr-only">{title} 모델 선택</span>
        <select
          value={currentId}
          onChange={(event) => onChange(event.target.value)}
          disabled={!visible.length}
        >
          {visible.map((device) => (
            <option key={device.id} value={device.id}>{device.name}</option>
          ))}
        </select>
      </label>

      {!visible.length && <p className="filter-empty">일치하는 기기가 없어요.</p>}

      {current && (() => {
        // 첫 줄은 넘기지 않습니다 — 넉 대까지만 걸고 나머지는 '+N' 으로 접습니다.
        // 펼치면 남은 칩이 그 줄 아래에 따로 깔립니다.
        const codecs = codecsOf(current)
        const head = codecs.slice(0, 4)
        const rest = codecs.slice(4)
        // 칩은 이름표 오른쪽 한 칸에 모아 둡니다. 그래야 줄이 넘어가도
        // 둘째 줄 첫 칩이 첫째 줄 첫 칩 바로 아래에 떨어집니다.
        return (
          <div className="codec-list">
            <span className="codec-list__label">지원 코덱</span>
            <div className="codec-list__chips">
              {(allCodecs ? codecs : head).map((codec) => (
                <span key={codec} className="chip">{codec}</span>
              ))}
              {rest.length > 0 && (
                <button
                  type="button"
                  className="chip chip--btn chip--more"
                  aria-expanded={allCodecs}
                  onClick={() => setAllCodecs((value) => !value)}
                >
                  {allCodecs ? '접기' : `+${rest.length}`}
                </button>
              )}
            </div>
          </div>
        )
      })()}

      {current && (() => {
        // 코덱 말고도 고를 때 따지는 것들. 모르는 기기는 비워 두었으니 아무것도 걸리지 않습니다.
        const marks = []
        if (current.multipoint === true) marks.push('멀티포인트')
        if (current.multipoint === 'auto') marks.push(`${current.brand} 기기 간 자동 전환`)
        if (codecsOf(current).includes('LC3')) marks.push('LE Audio')
        if (!marks.length) return null
        return (
          <div className="codec-list">
            <span className="codec-list__label">기능</span>
            <div className="codec-list__chips">
              {marks.map((mark) => (
                <span key={mark} className="chip chip--mark">{mark}</span>
              ))}
            </div>
          </div>
        )
      })()}

      {current?.leAudioNote && <p className="device-note">LE Audio 지원 · LC3 명시 없음</p>}
      {current?.note && <p className="device-note">{current.note}</p>}
    </section>
  )
}

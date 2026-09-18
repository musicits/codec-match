import { useId, useMemo, useState } from 'react'
import { codecsOf } from '../data/codecs.js'
import { filterDevices } from '../lib/match.js'
import DeviceIcon from './DeviceIcon.jsx'

export default function DevicePicker({ title, formOf, forms = [], devices, selectedId, onChange, brands }) {
  const [query, setQuery] = useState('')
  const [brand, setBrand] = useState('')
  const [form, setForm] = useState('')
  const headingId = useId()

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

  const handleBrand = (value) => {
    setBrand(value)
    syncSelection(filterDevices(devices, value, query, form, formOf))
  }

  const handleQuery = (value) => {
    setQuery(value)
    syncSelection(filterDevices(devices, brand, value, form, formOf))
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

        {forms.length > 0 && (
          <label className="field">
            <span className="sr-only">{title} 형태 선택</span>
            <select value={form} onChange={(event) => handleForm(event.target.value)}>
              <option value="">형태 전체</option>
              {forms.map((item) => (
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

      {current && (
        <div className="codec-list">
          <span className="codec-list__label">지원 코덱</span>
          {codecsOf(current).map((codec) => (
            <span key={codec} className="chip">{codec}</span>
          ))}
        </div>
      )}

      {current?.leAudioNote && <p className="device-note">LE Audio 지원 · LC3 명시 없음</p>}
      {current?.note && <p className="device-note">{current.note}</p>}
    </section>
  )
}

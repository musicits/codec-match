import { useMemo, useState } from 'react'
import { codecsOf } from '../data/codecs.js'
import { filterDevices } from '../lib/match.js'

export default function DevicePicker({ title, icon, devices, selectedId, onChange, brands }) {
  const [query, setQuery] = useState('')
  const [brand, setBrand] = useState('')

  const visible = useMemo(() => filterDevices(devices, brand, query), [devices, brand, query])

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
    syncSelection(filterDevices(devices, value, query))
  }

  const handleQuery = (value) => {
    setQuery(value)
    syncSelection(filterDevices(devices, brand, value))
  }

  return (
    <section className="picker" aria-labelledby={`${title}-title`}>
      <div className="picker__heading">
        <span className="picker__icon" aria-hidden="true">{icon}</span>
        <div>
          <p className="eyebrow">{title}</p>
          <h2 id={`${title}-title`}>기기를 선택하세요</h2>
        </div>
      </div>

      <label className="search-label">
        <span className="sr-only">{title} 이름 필터</span>
        <input
          value={query}
          onChange={(event) => handleQuery(event.target.value)}
          placeholder={title === '스마트폰' ? '예: S24, 아이폰 15, 픽셀' : '예: 버즈, 에어팟, 보스'}
        />
      </label>

      <label className="select-label">
        <span className="sr-only">{title} 브랜드 선택</span>
        <select value={brand} onChange={(event) => handleBrand(event.target.value)}>
          <option value="">브랜드 전체</option>
          {brands.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </label>

      <label className="select-label">
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

      <div className="codec-list" aria-label="지원 코덱">
        {current && codecsOf(current).map((codec) => (
          <span key={codec} className="codec-chip">{codec}</span>
        ))}
      </div>

      {current?.leAudioNote && (
        <p className="device-note">LE Audio 지원 · LC3 명시 없음</p>
      )}
    </section>
  )
}

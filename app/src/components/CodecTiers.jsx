// 고른 코덱 안에서 내 조합이 어느 등급인지 보여주는 표.
//
// SSC 는 Scalable / Hi-Fi / UHQ, LDAC 은 330·660·990, aptX 는 3형제 + 무손실 모드처럼
// 이름 하나에 여러 단계가 숨어 있어서, 칩만 봐서는 "그래서 내 건 몇이냐" 를 알 수 없습니다.
import { tiersOf } from '../data/codecs.js'

export default function CodecTiers({ codec, activeId, unlocked, platform }) {
  const table = tiersOf(codec)
  if (!table) return null

  // 고른 폰과 상관없는 OS 줄은 빼고 보여 줍니다.
  const rows = table.rows.filter((row) => !row.os || row.os === platform)
  if (!rows.length) return null

  return (
    <section className="tiers" aria-label={`${codec} 등급`}>
      <p className="tiers__label">{table.label}</p>
      <ul>
        {rows.map((row) => {
          // need 가 달린 줄(무손실 모드)은 조건이 충족된 조합에서만 불이 들어옵니다.
          const blocked = Boolean(row.need) && !unlocked
          const here = !blocked && (row.id === activeId || (row.os && rows.length === 1))
          return (
            <li key={row.id} className={`${here ? 'on' : ''}${blocked ? ' off' : ''}`}>
              <span className="tiers__dot" aria-hidden="true" />
              <span className="tiers__name">{row.name}</span>
              <span className="tiers__quality">{row.quality}</span>
              <span className="tiers__value">{row.value}</span>
              {here && <span className="tiers__here">지금 조합</span>}
              {row.need && !blocked && <span className="tiers__here">이 조합에서 열림</span>}
              {blocked && <span className="tiers__need">{row.need} 필요</span>}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

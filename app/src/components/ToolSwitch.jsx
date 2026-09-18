// 머리말 오른쪽 도구 전환기. 폰 목업의 도움말 단추·매거진의 테마 단추와 같은 자리입니다.
import { useEffect, useRef, useState } from 'react'
import { SELF, TOOLS } from '../data/tools.js'

const ICONS = {
  codec: <path d="M4 12h3l2.5-6 3 12 2.5-6H20" />,
  phone: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M10.5 5h3" />
    </>
  ),
  cover: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h5" />
    </>
  ),
}

export default function ToolSwitch() {
  const [open, setOpen] = useState(false)
  const boxRef = useRef(null)

  // 바깥을 누르거나 Esc 를 누르면 닫습니다.
  useEffect(() => {
    if (!open) return undefined
    const onDown = (event) => {
      if (!boxRef.current?.contains(event.target)) setOpen(false)
    }
    const onKey = (event) => { if (event.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="toolswitch" ref={boxRef}>
      <button
        type="button"
        className="toolswitch__btn"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="currentColor">
          <circle cx="6" cy="6" r="1.7" /><circle cx="12" cy="6" r="1.7" /><circle cx="18" cy="6" r="1.7" />
          <circle cx="6" cy="12" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="18" cy="12" r="1.7" />
          <circle cx="6" cy="18" r="1.7" /><circle cx="12" cy="18" r="1.7" /><circle cx="18" cy="18" r="1.7" />
        </svg>
        도구
      </button>

      {open && (
        <div className="toolswitch__menu" role="menu">
          <p className="toolswitch__label">music ITs 도구</p>
          {TOOLS.map((tool) => {
            const here = tool.id === SELF
            return (
              <a
                key={tool.id}
                href={tool.url}
                className={`toolswitch__item${here ? ' on' : ''}`}
                role="menuitem"
                aria-current={here ? 'page' : undefined}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"
                  fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {ICONS[tool.icon]}
                </svg>
                <span>
                  <b>{tool.name}</b>
                  <em>{tool.tagline}</em>
                </span>
                {here && <span className="toolswitch__here">지금 보는 중</span>}
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}

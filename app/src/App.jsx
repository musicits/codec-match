import { useEffect, useMemo, useRef, useState } from 'react'
import Changelog from './components/Changelog.jsx'
import Glossary from './components/Glossary.jsx'
import Streaming from './components/Streaming.jsx'
import DevicePicker from './components/DevicePicker.jsx'
import ResultCard from './components/ResultCard.jsx'
import { PHONES } from './data/phones.js'
import { AUDIO_DEVICES } from './data/audio.js'
import { brandsOf } from './data/devices.js'
import { AUDIO_FORMS, PHONE_FORMS, audioForm, phoneForm } from './lib/form.js'
import { isVerified, resolveMatch, sscTier } from './lib/match.js'
import { CODEC_INFO } from './data/codecs.js'
import { waveStrength } from './components/CodecPicker.jsx'

// 화면(카테고리) 목록. 주소 뒤 #streaming 으로도 바로 열립니다.
// 아이콘은 블로그 분석실 메뉴와 같은 자리·같은 크기로 답니다.
const VIEWS = [
  {
    id: 'codec',
    name: '코덱 매치',
    hash: '',
    icon: <path d="M3 12h3l2.5-6 3 12 2.5-6H21" />,
  },
  {
    id: 'stream',
    name: '스트리밍 음질',
    hash: '#streaming',
    icon: (
      <>
        <path d="M9 18V6l10-2v12" />
        <circle cx="6.5" cy="18" r="2.5" />
        <circle cx="16.5" cy="16" r="2.5" />
      </>
    ),
  },
]

const PHONE_BRANDS = brandsOf(PHONES)
const AUDIO_BRANDS = brandsOf(AUDIO_DEVICES)

export default function App() {
  const [phoneId, setPhoneId] = useState(PHONES[0].id)
  const [audioId, setAudioId] = useState(AUDIO_DEVICES[0].id)
  const headRef = useRef(null)
  const navRef = useRef(null)

  const [view, setView] = useState(() =>
    typeof window !== 'undefined' && window.location.hash === '#streaming' ? 'stream' : 'codec',
  )
  const phone = PHONES.find((device) => device.id === phoneId) ?? PHONES[0]
  const audio = AUDIO_DEVICES.find((device) => device.id === audioId) ?? AUDIO_DEVICES[0]
  const match = useMemo(() => resolveMatch(phone, audio), [phone, audio])

  // 스트리밍 화면이 견줄 상한. SSC 는 등급에 따라 달라집니다.
  const tier = match.codec === 'SSC' ? sscTier(phone, audio) : null
  const quality = tier?.quality ?? CODEC_INFO[match.codec]?.quality
  const shortName = (name) => name?.replace(/\s*\(.*\)$/, '')
  const nameOf = (codec) =>
    shortName(codec === 'SSC' ? sscTier(phone, audio).name : CODEC_INFO[codec]?.name) ?? codec
  const qualityOf = (codec) =>
    codec === 'SSC' ? sscTier(phone, audio).quality : CODEC_INFO[codec]?.quality
  const kbpsOf = (codec) =>
    codec === 'SSC' ? sscTier(phone, audio).kbps : CODEC_INFO[codec]?.kbps
  // 코덱 화면 제목이 'SSC-UHQ (24bit 96kHz)' 면 스트리밍 화면도 같은 이름을 씁니다.
  // 뒤 괄호는 음질 상한 칸과 같은 말이라 떼고 씁니다.


  const openView = (next) => {
    setView(next)
    const hash = VIEWS.find((item) => item.id === next)?.hash ?? ''
    window.history.replaceState(null, '', hash || window.location.pathname)
  }

  // 뒤로 가기로 화면이 바뀌어도 따라갑니다.
  useEffect(() => {
    const sync = () => setView(window.location.hash === '#streaming' ? 'stream' : 'codec')
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  // 고른 스마트폰 제조사에 따라 주색을 바꿉니다: 애플 에메랄드 · 삼성 블루 · 그 밖 앰버
  useEffect(() => {
    const accent = phone.brand === '삼성' ? 'blue' : phone.brand === '애플' ? 'emerald' : 'amber'
    document.documentElement.dataset.accent = accent
  }, [phone.brand])

  // 머리말과 카테고리 줄의 실제 높이를 재서 --hh · --nh 로 씁니다.
  // 둘 다 붙박이라, 그 아래 붙는 설정 칸과 결과 판이 이 값을 기준으로 자리를 잡습니다.
  useEffect(() => {
    const head = headRef.current
    const nav = navRef.current
    if (!head || !nav) return undefined
    const set = () => {
      document.documentElement.style.setProperty('--hh', `${head.offsetHeight}px`)
      document.documentElement.style.setProperty('--nh', `${nav.offsetHeight}px`)
    }
    set()
    const observer = new ResizeObserver(set)
    observer.observe(head)
    observer.observe(nav)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <header className="topbar" ref={headRef}>
        <img className="logo" src="./logo.png" width="1471" height="353" alt="music ITs" />
        <h1>코덱 매치</h1>
        <p>내 기기 조합에서 들리는 최적의 블루투스 코덱</p>
        {/* 도구 전환기(components/ToolSwitch.jsx)와 아래 형제 도구 카드는 만들어 두고 껐습니다.
            폰 목업·매거진 커버·루트 랜딩까지 같은 목록을 붙인 다음 셋을 한꺼번에 켭니다. */}
      </header>

      <nav className="cats" aria-label="화면 고르기" ref={navRef}>
        {VIEWS.map((item) => (
          <button
            type="button"
            key={item.id}
            className={item.id === view ? 'on' : undefined}
            aria-current={item.id === view ? 'page' : undefined}
            onClick={() => openView(item.id)}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"
              fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              {item.icon}
            </svg>
            {item.name}
          </button>
        ))}
      </nav>

      <main>
        <div className="work">
          <section className="stage" aria-label={view === 'codec' ? '호환 결과' : '스트리밍 음질'}>
            {view === 'codec' ? (
              <ResultCard
                codec={match.codec}
                common={match.common}
                lc3Available={match.lc3Available}
                losslessAvailable={match.losslessAvailable}
                verified={isVerified(phoneId, audioId)}
                phone={phone}
                audio={audio}
                onOpenStreaming={() => openView('stream')}
              />
            ) : (
              <Streaming
                codec={match.codec}
                common={match.common}
                nameOf={nameOf}
                qualityOf={qualityOf}
                kbpsOf={kbpsOf}
                phone={phone}
                audio={audio}
                strength={waveStrength(kbpsOf(match.codec))}
              />
            )}
          </section>

          <aside className="rail" aria-label="기기 선택">
            <DevicePicker
              title="스마트폰"
              formOf={phoneForm}
              forms={PHONE_FORMS}
              formLabel="모양"
              devices={PHONES}
              selectedId={phoneId}
              onChange={setPhoneId}
              brands={PHONE_BRANDS}
            />
            <DevicePicker
              title="이어폰 · 헤드폰"
              formOf={audioForm}
              forms={AUDIO_FORMS}
              formLabel="종류"
              devices={AUDIO_DEVICES}
              selectedId={audioId}
              onChange={setAudioId}
              brands={AUDIO_BRANDS}
            />
          </aside>
        </div>

        {/* 업데이트 기록은 붙박이 설정 칸과 같은 격자에 두지 않습니다.
            같은 격자에 있으면 스크롤할 때 기록 판이 설정 칸 위로 올라타 이어폰 칸이 잘립니다. */}
        <div className="bottom">
          <Changelog />
          <Glossary />
        </div>
      </main>

      <footer className="credit">
        <p>코덱 매치 · 제조사 공개 사양 기준</p>
        <p>
          Crafted by{' '}
          {/* rel 에 noreferrer 를 넣지 않습니다. 넣으면 블로그 유입 통계에 출처가 안 잡힙니다. */}
          <a href="https://blog.naver.com/musicits" target="_blank" rel="author noopener">
            쭈뉘의 뮤직잇츠 music ITs
          </a>
        </p>
        <p>© 2026 music ITs. All rights reserved.</p>
      </footer>
    </>
  )
}

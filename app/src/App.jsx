import { useEffect, useMemo, useRef, useState } from 'react'
import Changelog from './components/Changelog.jsx'
import DevicePicker from './components/DevicePicker.jsx'
import ResultCard from './components/ResultCard.jsx'
import { CURRENT_VERSION } from './data/changelog.js'
import { PHONES } from './data/phones.js'
import { AUDIO_DEVICES } from './data/audio.js'
import { brandsOf } from './data/devices.js'
import { audioForm, phoneForm } from './lib/form.js'
import { isVerified, resolveMatch } from './lib/match.js'

const PHONE_BRANDS = brandsOf(PHONES)
const AUDIO_BRANDS = brandsOf(AUDIO_DEVICES)

export default function App() {
  const [phoneId, setPhoneId] = useState(PHONES[0].id)
  const [audioId, setAudioId] = useState(AUDIO_DEVICES[0].id)
  const headRef = useRef(null)

  const phone = PHONES.find((device) => device.id === phoneId) ?? PHONES[0]
  const audio = AUDIO_DEVICES.find((device) => device.id === audioId) ?? AUDIO_DEVICES[0]
  const match = useMemo(() => resolveMatch(phone, audio), [phone, audio])

  // 고른 스마트폰 제조사에 따라 주색을 바꿉니다: 애플 에메랄드 · 삼성 블루 · 그 밖 앰버
  useEffect(() => {
    const accent = phone.brand === '삼성' ? 'blue' : phone.brand === '애플' ? 'emerald' : 'amber'
    document.documentElement.dataset.accent = accent
  }, [phone.brand])

  // 붙박이 머리말의 실제 높이를 재서 설정 칸이 붙는 자리(--hh)로 씁니다. 폰 목업 스튜디오와 같은 방식입니다.
  useEffect(() => {
    const head = headRef.current
    if (!head) return undefined
    const set = () => document.documentElement.style.setProperty('--hh', `${head.offsetHeight}px`)
    set()
    const observer = new ResizeObserver(set)
    observer.observe(head)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <header className="topbar" ref={headRef}>
        <img className="logo" src="./logo.png" width="1471" height="353" alt="music ITs" />
        <h1>코덱 매치</h1>
        <p>내 기기 조합에서 들리는 최적의 블루투스 코덱</p>
      </header>

      <main className="work">
        <section className="stage" aria-label="호환 결과">
          <ResultCard
            codec={match.codec}
            common={match.common}
            lc3Available={match.lc3Available}
            losslessAvailable={match.losslessAvailable}
            verified={isVerified(phoneId, audioId)}
            phone={phone}
            audio={audio}
          />
        </section>

        <aside className="rail" aria-label="기기 선택">
          <DevicePicker
            title="스마트폰"
            formOf={phoneForm}
            devices={PHONES}
            selectedId={phoneId}
            onChange={setPhoneId}
            brands={PHONE_BRANDS}
          />
          <DevicePicker
            title="이어폰 · 헤드폰"
            formOf={audioForm}
            devices={AUDIO_DEVICES}
            selectedId={audioId}
            onChange={setAudioId}
            brands={AUDIO_BRANDS}
          />
        </aside>

        <Changelog />
      </main>

      <footer className="credit">
        <p>코덱 매치 {CURRENT_VERSION} · 제조사 공개 사양을 바탕으로 정리했습니다</p>
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

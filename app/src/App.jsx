import { useMemo, useState } from 'react'
import DevicePicker from './components/DevicePicker.jsx'
import ResultCard from './components/ResultCard.jsx'
import { PHONES } from './data/phones.js'
import { AUDIO_DEVICES } from './data/audio.js'
import { brandsOf } from './data/devices.js'
import { isVerified, resolveMatch } from './lib/match.js'

const PHONE_BRANDS = brandsOf(PHONES)
const AUDIO_BRANDS = brandsOf(AUDIO_DEVICES)

export default function App() {
  const [phoneId, setPhoneId] = useState(PHONES[0].id)
  const [audioId, setAudioId] = useState(AUDIO_DEVICES[0].id)

  const phone = PHONES.find((device) => device.id === phoneId) ?? PHONES[0]
  const audio = AUDIO_DEVICES.find((device) => device.id === audioId) ?? AUDIO_DEVICES[0]
  const match = useMemo(() => resolveMatch(phone, audio), [phone, audio])

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="brand-mark" aria-hidden="true">⌁</div>
        <div>
          <p className="eyebrow">BLUETOOTH AUDIO</p>
          <h1>코덱 매치</h1>
        </div>
        <p>내 기기 조합에서 들리는<br />최적의 블루투스 코덱</p>
      </header>

      <main>
        <section className="intro">
          <p className="eyebrow">01 · 기기 선택</p>
          <h2>어떤 조합인가요?</h2>
          <p>각 기기의 지원 코덱을 비교해 우선 적용될 것으로 예상되는 코덱을 알려드려요.</p>
        </section>

        <div className="selection-grid">
          <DevicePicker
            title="스마트폰"
            icon="▯"
            devices={PHONES}
            selectedId={phoneId}
            onChange={setPhoneId}
            brands={PHONE_BRANDS}
          />
          <div className="connector" aria-hidden="true">＋</div>
          <DevicePicker
            title="이어폰 · 헤드폰"
            icon="◉"
            devices={AUDIO_DEVICES}
            selectedId={audioId}
            onChange={setAudioId}
            brands={AUDIO_BRANDS}
          />
        </div>

        <section className="results">
          <p className="eyebrow">02 · 호환 결과</p>
          <ResultCard
            codec={match.codec}
            common={match.common}
            lc3Available={match.lc3Available}
            verified={isVerified(phoneId, audioId)}
            phone={phone}
            audio={audio}
          />
        </section>
      </main>

      <footer>CODEC MATCH · 제조사 공개 사양을 바탕으로 정리했습니다</footer>
    </div>
  )
}

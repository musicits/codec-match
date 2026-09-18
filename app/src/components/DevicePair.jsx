// 두 기기를 잇는 파형과 기기 한 쌍. 코덱 화면과 스트리밍 화면이 함께 씁니다.
// 화면을 넘어가도 고른 조합이 그대로 따라온다는 것을 눈으로 보여 주는 자리입니다.
import DeviceIcon from './DeviceIcon.jsx'
import { audioForm, phoneForm } from '../lib/form.js'

// 두 기기를 잇는 파형. 막대가 순서대로 커졌다 작아져 왼쪽에서 오른쪽으로
// 신호가 건너가는 모양이 됩니다. strength 는 코덱 등급으로, 좋은 코덱일수록
// 파형이 크게 출렁입니다.
const BAR_COUNT = 40
const BARS = Array.from({ length: BAR_COUNT }, (unused, index) => ({
  base: 30 + Math.sin(index * 0.55) * 26 + (index % 3) * 6,
  delay: -1.9 + index * 0.035,
}))

function Wave({ strength = 1, best = true }) {
  return (
    <div className={`pair__link${best ? '' : ' pair__link--other'}`} aria-hidden="true">
      {BARS.map((bar, index) => (
        <i
          key={index}
          style={{
            height: `${8 + bar.base * strength * 1.3}%`,
            animationDelay: `${bar.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function DevicePair({ phone, audio, linked, strength, best = true }) {
  return (
    <div className={`pair${linked ? '' : ' pair--broken'}`}>
      <figure className="pair__device">
        <DeviceIcon form={phoneForm(phone)} />
        <figcaption>{phone.name}</figcaption>
      </figure>
      <Wave key={`${phone.id}-${audio.id}`} strength={strength} best={best} />
      <figure className="pair__device">
        <DeviceIcon form={audioForm(audio)} />
        <figcaption>{audio.name}</figcaption>
      </figure>
    </div>
  )
}

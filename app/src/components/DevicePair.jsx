// 두 기기를 잇는 파형과 기기 한 쌍. 코덱 화면과 스트리밍 화면이 함께 씁니다.
// 화면을 넘어가도 고른 조합이 그대로 따라온다는 것을 눈으로 보여 주는 자리입니다.
import DeviceIcon from './DeviceIcon.jsx'
import { audioForm, phoneForm } from '../lib/form.js'

// 두 기기를 잇는 파형. 막대가 순서대로 커졌다 작아져 왼쪽에서 오른쪽으로
// 신호가 건너가는 모양이 됩니다. strength 는 코덱 등급으로, 좋은 코덱일수록
// 파형이 크게 출렁입니다.
const BAR_COUNT = 56

// 파형을 두 벌 씁니다.
// 최적 코덱은 사인파 둘을 겹쳐 굴곡이 크고, 그 밖의 코덱은 잔잔한 한 줄짜리입니다.
// 거기에 진폭까지 등급을 따라 벌어집니다 — 좋은 코덱은 크게, 낮은 코덱은 납작하게.
const shape = (index, rich) =>
  rich
    ? 24 + Math.sin(index * 0.42) * 30 + Math.sin(index * 1.31) * 14 + (index % 4) * 7
    : 26 + Math.sin(index * 0.3) * 14 + (index % 3) * 5

const BARS = {
  rich: Array.from({ length: BAR_COUNT }, (unused, index) => ({
    base: shape(index, true),
    delay: -1.9 + index * 0.026,
  })),
  calm: Array.from({ length: BAR_COUNT }, (unused, index) => ({
    base: shape(index, false),
    delay: -1.9 + index * 0.026,
  })),
}

function Wave({ strength = 1, best = true }) {
  const scale = Math.pow(strength, 1.6)
  return (
    <div
      className={`pair__link${best ? '' : ' pair__link--other'}`}
      style={{ '--wave-speed': `${2.9 - strength * 1.1}s` }}
      aria-hidden="true"
    >
      {(best ? BARS.rich : BARS.calm).map((bar, index) => (
        <i
          key={index}
          style={{
            height: `${Math.min(100, 8 + bar.base * scale * 1.55)}%`,
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

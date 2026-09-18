// 두 기기를 잇는 파형과 기기 한 쌍. 코덱 화면과 스트리밍 화면이 함께 씁니다.
// 화면을 넘어가도 고른 조합이 그대로 따라온다는 것을 눈으로 보여 주는 자리입니다.
import DeviceIcon from './DeviceIcon.jsx'
import { audioForm, phoneForm, phoneScale } from '../lib/form.js'

// 두 기기를 잇는 파형. 막대가 순서대로 커졌다 작아져 왼쪽에서 오른쪽으로
// 신호가 건너가는 모양이 됩니다. strength 는 코덱 등급으로, 좋은 코덱일수록
// 파형이 크게 출렁입니다.
const BAR_COUNT = 56

// 카드 안 파형과 같은 규칙입니다 — 모양은 두 벌, 높이는 등급이 정합니다.
const norm = (values, floor) => {
  const low = Math.min(...values)
  const high = Math.max(...values)
  return values.map((value) => floor + (1 - floor) * ((value - low) / (high - low)))
}

const shape = (index, rich) =>
  rich
    ? Math.sin(index * 0.42) * 30 + Math.sin(index * 1.31) * 14 + (index % 4) * 7
    : Math.sin(index * 0.3) * 14 + (index % 3) * 5

const bars = (rich) => {
  const heights = norm(Array.from({ length: BAR_COUNT }, (unused, index) => shape(index, rich)), rich ? 0.3 : 0.45)
  return heights.map((base, index) => ({ base, delay: -1.9 + index * 0.026 }))
}

const BARS = { rich: bars(true), calm: bars(false) }

function Wave({ strength = 1, best = true }) {
  // 기기 사이 파형은 한 번에 한 코덱만 보여 주는 자리라, 가장 낮은 코덱이라도
  // 선 한 줄로 뭉개지지 않게 바닥을 조금 올려 둡니다. 나란히 견주는 비교는
  // 아래 코덱 카드가 맡습니다.
  const amp = 0.35 + 0.65 * strength
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
            height: `${(bar.base * amp * 100).toFixed(1)}%`,
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
      <figure className="pair__device" style={{ '--icon-scale': phoneScale(phone) }}>
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

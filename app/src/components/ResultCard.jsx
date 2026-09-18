import { useEffect, useState } from 'react'
import { CODEC_INFO } from '../data/codecs.js'
import { sscTier } from '../lib/match.js'
import { bestServices, parseCeiling } from '../data/streaming.js'
import CodecPicker, { strengthsOf } from './CodecPicker.jsx'
import CodecCompare from './CodecCompare.jsx'
import CodecTiers from './CodecTiers.jsx'
import DevicePair from './DevicePair.jsx'

/**
 * 이 조합에 어울리는 스트리밍을 고릅니다.
 *
 * '코덱 상한 아래라서 그대로 들어오는 것' 이 아니라 '코덱 상한을 꽉 채우는 것' 이
 * 어울리는 서비스입니다. 스포티파이(24bit 44.1kHz)가 SSC-UHQ(24bit 96kHz) 아래에
 * 있다고 해서 그 조합에 어울리는 건 아니니까요 — 그릇이 남습니다.
 */
function Recommend({ quality, onOpen }) {
  const ceiling = parseCeiling(quality)
  const picks = bestServices(ceiling)
  // CD 급에서 멈추는 코덱이면 어떤 요금제를 켜도 거기까지입니다.
  const capped = ceiling && ceiling.depth <= 16 && ceiling.rate <= 48

  return (
    <section className="recommend">
      <div>
        <p className="recommend__label">{capped ? '이 조합의 스트리밍 음질' : `${quality} 서비스`}</p>
        <p className="recommend__body">
          {picks.length === 0
            ? '공통 코덱 없음'
            : capped
              ? `${quality} · 전 서비스 동일`
              : picks.map((service) => service.name).join(' · ')}
        </p>
      </div>
      <button type="button" onClick={onOpen}>스트리밍 음질 보기 →</button>
    </section>
  )
}


export default function ResultCard({
  codec,
  common,
  verified,
  phone,
  audio,
  lc3Available,
  losslessAvailable,
  onOpenStreaming,
}) {
  // 공통 코덱 칩을 누르면 그 코덱 기준으로 카드를 다시 그립니다.
  // 기기를 바꾸면 실제 협상될 코덱으로 되돌립니다.
  const [picked, setPicked] = useState(codec)
  const [metric, setMetric] = useState('kbps')
  useEffect(() => { setPicked(codec) }, [codec, phone.id, audio.id])

  if (!codec) {
    return (
      <div className="result result--empty">
        <DevicePair phone={phone} audio={audio} linked={false} strength={0.35} />
        <h2 className="result__codec">공통 지원 코덱이 없어요</h2>
        <p className="result__sub">다른 기기 조합을 선택해 다시 확인해 주세요.</p>
      </div>
    )
  }

  const shown = common.includes(picked) ? picked : codec
  const info = CODEC_INFO[shown]
  const tier = shown === 'SSC' ? sscTier(phone, audio) : null
  const preview = shown !== codec
  const qualityOf = (item) => (item === 'SSC' ? sscTier(phone, audio).quality : CODEC_INFO[item]?.quality)
  const kbpsOf = (item) => (item === 'SSC' ? sscTier(phone, audio).kbps : CODEC_INFO[item]?.kbps)
  const heights = strengthsOf(common, codec)

  return (
    <div className="result" aria-live="polite">
      <DevicePair phone={phone} audio={audio} linked strength={heights[shown]} best={!preview} />

      <div className="result__head">
        <p className="result__label">{preview ? '다른 코덱으로 보는 중' : '이 조합의 최적 코덱'}</p>
        {preview ? (
          <button type="button" className="badge badge--btn" onClick={() => setPicked(codec)}>
            {codec} 다시 보기
          </button>
        ) : (
          verified && <span className="badge">실측 확인</span>
        )}
      </div>
      <h2 className="result__codec">{tier?.name ?? info.name}</h2>

      <dl className="metrics">
        <div>
          <dt>최대 비트레이트</dt>
          <dd>{tier?.bitrate ?? info.bitrate}</dd>
          {info.bitrateNote && <p className="metrics__note">{info.bitrateNote}</p>}
        </div>
        <div>
          <dt>대략적 지연시간</dt>
          <dd>{info.latency}</dd>
        </div>
        <div>
          <dt>음질 상한</dt>
          <dd>{tier?.quality ?? info.quality}</dd>
        </div>
      </dl>

      {/* 고른 코덱 안의 등급. SSC 는 내 조합의 등급을, aptX 는 3형제 중 어디인지를 짚어 줍니다. */}
      <CodecTiers
        codec={shown}
        activeId={shown === 'SSC' ? tier?.id : shown}
        unlocked={shown === 'aptX Adaptive' && losslessAvailable}
        platform={phone.brand === '애플' ? 'apple' : 'android'}
      />

      {tier?.note && <p className="note">{tier.note}</p>}

      <CodecPicker
        common={common}
        codec={codec}
        picked={shown}
        onPick={setPicked}
        qualityOf={qualityOf}
        kbpsOf={kbpsOf}
      />

      {/* 매번 볼 내용은 아니라 접어 둡니다. 카드가 길어져 모바일에서 스크롤이 늘어났습니다. */}
      <details className="fallback">
        <summary>하위 코덱으로 떨어지는 조건</summary>
        <p>{info.fallback}</p>
      </details>

      {audio.leAudioNote && !lc3Available && (
        <p className="note">
          <b>LE Audio 지원</b>
          <span>제조사 자료에 LC3 지원이 명시되어 있지 않습니다</span>
        </p>
      )}
      {lc3Available && (
        <p className="note">
          <b>LE Audio 사용 가능</b>
          <span>LE Audio 모드로 전환 시 LC3 사용 가능</span>
        </p>
      )}
      {losslessAvailable && (
        <p className="note note--strong">
          <b>aptX Lossless 사용 가능</b>
          <span>
            양쪽 다 Snapdragon Sound 인증 · aptX Adaptive 로 연결될 때 16bit 44.1kHz 무손실 전송,
            전파 상태가 나빠지면 손실 압축으로 자동 전환
          </span>
        </p>
      )}

      <CodecCompare
        common={common}
        picked={shown}
        onPick={setPicked}
        metric={metric}
        onMetric={setMetric}
        tierOf={() => sscTier(phone, audio)}
      />

      {/* 코덱만 좋아도 소용없고 앱이 보내는 원본도 그만큼 돼야 합니다. 여기서는
          한 줄만 걸고 자세한 것은 스트리밍 음질 화면으로 넘깁니다. */}
      <Recommend quality={tier?.quality ?? info.quality} onOpen={onOpenStreaming} />

      <p className="disclaimer">제조사 공식 스펙 기준 예상값이며 OS 버전·설정에 따라 달라질 수 있습니다</p>
    </div>
  )
}

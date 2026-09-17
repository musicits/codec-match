import { CODEC_INFO } from '../data/codecs.js'
import { audioForm, phoneForm } from '../lib/form.js'
import { sscTier } from '../lib/match.js'
import DeviceIcon from './DeviceIcon.jsx'

function Pair({ phone, audio, linked }) {
  return (
    <div className={`pair${linked ? '' : ' pair--broken'}`}>
      <figure className="pair__device">
        <DeviceIcon form={phoneForm(phone)} />
        <figcaption>{phone.name}</figcaption>
      </figure>
      {/* key 가 바뀌면 신호 점이 한 번 다시 흐릅니다 */}
      <div className="pair__link" key={`${phone.id}-${audio.id}`} aria-hidden="true">
        <i />
      </div>
      <figure className="pair__device">
        <DeviceIcon form={audioForm(audio)} />
        <figcaption>{audio.name}</figcaption>
      </figure>
    </div>
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
}) {
  if (!codec) {
    return (
      <div className="result result--empty">
        <Pair phone={phone} audio={audio} linked={false} />
        <h2 className="result__codec">공통 지원 코덱이 없어요</h2>
        <p className="result__sub">다른 기기 조합을 선택해 다시 확인해 주세요.</p>
      </div>
    )
  }

  const info = CODEC_INFO[codec]
  const tier = codec === 'SSC' ? sscTier(phone, audio) : null

  return (
    <div className="result" aria-live="polite">
      <Pair phone={phone} audio={audio} linked />

      <div className="result__head">
        <p className="result__label">예상 적용 코덱</p>
        {verified && <span className="badge">실측 확인</span>}
      </div>
      <h2 className="result__codec">{tier?.name ?? info.name}</h2>

      <dl className="metrics">
        <div>
          <dt>최대 비트레이트</dt>
          <dd>{tier?.bitrate ?? info.bitrate}</dd>
          {codec === 'LDAC' && (
            <p className="metrics__note">
              990kbps는 ‘음질 우선’ 설정 기준이며, 기본 적응형에서는 660/330kbps로 조정됩니다
            </p>
          )}
        </div>
        <div>
          <dt>대략적 지연시간</dt>
          <dd>{info.latency}</dd>
        </div>
      </dl>

      {tier?.note && <p className="note">{tier.note}</p>}

      <div className="fallback">
        <strong>하위 코덱으로 떨어지는 조건</strong>
        <p>{info.fallback}</p>
      </div>

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

      <div className="common">
        <span className="common__label">공통 지원</span>
        {common.map((item) => (
          <span key={item} className={`chip${item === codec ? ' chip--on' : ''}`}>{item}</span>
        ))}
      </div>

      <p className="disclaimer">제조사 공식 스펙 기준 예상값이며 OS 버전·설정에 따라 달라질 수 있습니다</p>
    </div>
  )
}

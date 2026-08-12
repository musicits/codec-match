import { CODEC_INFO } from '../data/codecs.js'
import { sscTier } from '../lib/match.js'

export default function ResultCard({ codec, common, verified, phone, audio, lc3Available }) {
  if (!codec) {
    return (
      <section className="result-card result-card--empty">
        <p className="eyebrow">호환 결과</p>
        <h2>공통 지원 코덱이 없어요</h2>
        <p>다른 기기 조합을 선택해 다시 확인해 주세요.</p>
      </section>
    )
  }

  const info = CODEC_INFO[codec]
  const tier = codec === 'SSC' ? sscTier(phone, audio) : null

  return (
    <section className="result-card" aria-live="polite" aria-labelledby="result-title">
      <div className="result-card__topline">
        <p className="eyebrow">예상 적용 코덱</p>
        {verified && <span className="verified">✓ 실측 확인</span>}
      </div>

      <h2 id="result-title">{tier?.name ?? info.name}</h2>
      <p className="match-copy">{phone.name} · {audio.name}</p>

      <div className="metric-grid">
        <article>
          <span>최대 비트레이트</span>
          <strong>{tier?.bitrate ?? info.bitrate}</strong>
          {codec === 'LDAC' && (
            <small className="ldac-note">
              990kbps는 ‘음질 우선’ 설정 기준이며, 기본 적응형에서는 660/330kbps로 조정됩니다
            </small>
          )}
        </article>
        <article>
          <span>대략적 지연시간</span>
          <strong>{info.latency}</strong>
        </article>
      </div>

      {tier?.note && <p className="ssc-note">{tier.note}</p>}

      <div className="fallback-box">
        <span className="fallback-icon" aria-hidden="true">↘</span>
        <div>
          <strong>하위 코덱으로 떨어지는 조건</strong>
          <p>{info.fallback}</p>
        </div>
      </div>

      {audio.leAudioNote && !lc3Available && (
        <p className="le-audio-note">
          <b>LE Audio 지원</b>
          <span>제조사 자료에 LC3 지원이 명시되어 있지 않습니다</span>
        </p>
      )}
      {lc3Available && (
        <p className="le-audio-note">
          <b>LE Audio 사용 가능</b>
          <span>LE Audio 모드로 전환 시 LC3 사용 가능</span>
        </p>
      )}

      <div className="common-codecs">
        <span>공통 지원</span>
        {common.map((item) => <b key={item}>{item}</b>)}
      </div>

      <p className="disclaimer">
        제조사 공식 스펙 기준 예상값이며 OS 버전·설정에 따라 달라질 수 있습니다
      </p>
    </section>
  )
}

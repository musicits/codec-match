// 머리말 오른쪽 물음표에 들어 있는 용어 설명.
//
// 결과 카드에서 잔주석을 다 걷어냈으니 처음 보는 말은 여기서 한 번에 설명합니다.
// 영어를 나란히 적는 이유는, 제품 상세 페이지나 해외 기사에서 만난 말이 바로
// 이 말이라는 걸 잇게 하려는 것입니다.
//
// 넣는 기준은 '사전에 실릴 만한 말' 입니다. 화면에 이미 문장으로 쓰여 있는 설명
// (하위 코덱으로 떨어진다 같은)은 넣지 않습니다.
import { useEffect, useRef, useState } from 'react'

const TERMS = [
  { word: '코덱', en: 'Codec', body: '소리를 압축해 보내는 방식. 폰과 이어폰 둘 다 지원해야 쓰입니다.' },
  { word: '비트레이트', en: 'Bitrate', body: '1초에 보내는 데이터 양(kbps). 클수록 덜 깎아서 보냅니다.' },
  { word: '비트심도', en: 'Bit Depth', body: '소리의 크고 작음을 몇 단계로 나누는지. 16bit·24bit 로 적습니다.' },
  { word: '샘플레이트', en: 'Sample Rate', body: '1초를 몇 번 잘라 담는지. 44.1kHz·96kHz 로 적습니다.' },
  { word: '손실 압축', en: 'Lossy', body: '안 들릴 만한 소리를 덜어내 용량을 줄이는 방식. 블루투스 코덱 대부분이 여기 속합니다.' },
  { word: '무손실', en: 'Lossless', body: '원본을 깎지 않고 그대로 보내는 것. aptX Lossless 는 CD 음질까지입니다.' },
  { word: '하이 레졸루션', en: 'Hi-Res', body: 'CD(16bit 44.1kHz)를 넘는 음원. 24bit 96kHz 가 흔합니다.' },
  { word: '지연시간', en: 'Latency', body: '소리가 귀에 닿기까지 걸리는 시간. 영상·게임에서 체감됩니다.' },
  { word: 'A2DP', en: 'Audio Distribution Profile', body: '블루투스로 음악을 보내는 규격. 코덱은 이 위에서 정해집니다.' },
  { word: 'LE Audio · LC3', en: 'Low Complexity Communication Codec', body: '블루투스 새 규격과 그 기본 코덱. 지연이 짧고 소리가 낫습니다.' },
  { word: '멀티포인트', en: 'Multipoint', body: '이어폰 한 대가 폰·노트북 두 대에 동시에 붙어 있는 것.' },
  { word: '오라캐스트', en: 'Auracast', body: 'LE Audio 의 방송 기능. 한 소리를 여러 사람이 같이 받습니다.' },
  { word: '페어링', en: 'Pairing', body: '두 기기가 서로를 처음 알아보고 등록하는 과정.' },
  { word: '트랜스코딩', en: 'Transcoding', body: '이미 압축된 음원을 다른 코덱으로 다시 압축하는 것. 한 번 더 깎입니다.' },
  { word: '스트리밍 음질', en: 'Streaming Quality', body: '앱이 보내주는 원본의 상한. 이게 낮으면 코덱이 좋아도 소용없습니다.' },
]

export default function Glossary() {
  const [open, setOpen] = useState(false)
  const boxRef = useRef(null)

  // 바깥을 누르거나 Esc 를 누르면 닫습니다 — 도구 목록과 같은 규칙입니다.
  useEffect(() => {
    if (!open) return undefined
    const onDown = (event) => { if (!boxRef.current?.contains(event.target)) setOpen(false) }
    const onKey = (event) => { if (event.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="help" ref={boxRef}>
      <button
        type="button"
        className="help__btn"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="용어 설명"
      >
        ?
      </button>

      {open && (
        <div className="help__panel" role="dialog" aria-label="용어 설명">
          <p className="help__label">용어 설명<span>{TERMS.length}</span></p>
          <dl>
            {TERMS.map((term) => (
              <div key={term.word}>
                <dt>
                  {term.word}
                  <em>{term.en}</em>
                </dt>
                <dd>{term.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  )
}

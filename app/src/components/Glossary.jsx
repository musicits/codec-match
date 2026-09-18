// 업데이트 기록 옆에 붙는 용어 설명.
//
// 결과 카드에서 잔주석을 다 걷어냈기 때문에, 처음 보는 말(비트심도·폴백 같은)은
// 여기서 한 번에 설명합니다. 카드마다 같은 말을 반복하지 않아도 됩니다.
const TERMS = [
  { word: '코덱', body: '소리를 압축해 보내는 방식. 폰과 이어폰 둘 다 지원해야 쓰입니다.' },
  { word: '비트레이트', body: '1초에 보내는 데이터 양(kbps). 클수록 덜 깎아서 보냅니다.' },
  { word: '비트심도 · 샘플링', body: '담을 수 있는 음질의 상한. 24bit 96kHz 처럼 적습니다.' },
  { word: '지연시간', body: '소리가 귀에 닿기까지 걸리는 시간. 영상·게임에서 체감됩니다.' },
  { word: '무손실', body: '원본을 깎지 않고 그대로. aptX Lossless 는 CD 음질까지입니다.' },
  { word: 'LE Audio · LC3', body: '블루투스 새 규격과 기본 코덱. 지연이 짧고 소리가 낫습니다.' },
  { word: '하위 코덱으로 떨어진다', body: '전파가 나쁠 때 아래 등급으로 알아서 내려가는 것.' },
]

export default function Glossary() {
  return (
    <aside className="glossary" aria-labelledby="glossary-title">
      <h2 id="glossary-title">용어 설명</h2>
      <dl>
        {TERMS.map((term) => (
          <div key={term.word}>
            <dt>{term.word}</dt>
            <dd>{term.body}</dd>
          </div>
        ))}
      </dl>
    </aside>
  )
}

# 코덱 매치

스마트폰과 이어폰·헤드폰을 고르면 두 기기가 실제로 협상할 것으로 예상되는 블루투스 코덱과
최대 비트레이트·지연시간을 알려주는 도구입니다.

**https://musicits.github.io/codec-match/**

검색엔진 등록·애널리틱스·릴리즈 태그 등 운영 작업은 [운영 가이드](docs/운영-가이드.md) 를 보세요.

## 저장소 구조

```
/                 GitHub Pages 가 서빙하는 빌드 결과 (직접 수정하지 마세요)
  index.html
  assets/
  og-image.png
/app              React 원본 소스
  src/data/       기기·코덱 데이터 ← 기기 추가는 여기만 고치면 됩니다
  src/lib/        코덱 협상 로직
  src/components/ UI
  scripts/        데이터 검사 · 배포 스크립트
```

루트의 `index.html` 과 `assets/` 는 `app/` 을 빌드해서 만들어진 결과물입니다.
직접 편집해도 다음 배포 때 덮어써지므로, 항상 `app/` 쪽 소스를 고치세요.

## 개발

```bash
cd app
npm install
npm run dev      # 로컬 개발 서버
npm run check    # 기기 데이터 정합성 검사
npm run deploy   # 검사 → 빌드 → 저장소 루트로 배포
```

`npm run deploy` 후 루트에 바뀐 파일들을 커밋·푸시하면 GitHub Pages 에 반영됩니다.

## 기기 추가하기

### 1. 기존 브랜드에 모델만 추가할 때

`app/src/data/phones.js` 또는 `app/src/data/audio.js` 의 해당 연도 그룹에 모델명만 넣습니다.

```js
// app/src/data/audio.js
...audioGroup(2026, '삼성', 'ssc_le', ['갤럭시 버즈4', '갤럭시 버즈4 프로'], { sscMax: 'uhq' }),
audio(2026, '소니', 'ldac_le', 'WF-1000XM6'),
```

- 표시 이름은 `"<연도> <모델명>"` 으로 자동 생성됩니다. (`2026 갤럭시 버즈4`)
- `id` 도 이름에서 자동 생성되므로 직접 쓰지 않습니다.
- 삼성 이어폰은 `sscMax` 가 **필수**입니다: `'scalable'` / `'hifi'` / `'uhq'`
- 삼성 폰은 심리스 코덱 협상이 되면 `{ seamless: true }` 를 넣습니다.
- 코덱 목록만으로 오해가 생기는 기기에는 `{ note: '...' }` 로 한 줄 주석을 답니다.
  (예: 자브라 엘리트 10 Gen 2 는 LC3 를 케이스→이어버드 구간에만 쓰고 폰 연결은 SBC/AAC입니다)
- aptX Adaptive 의 무손실 모드까지 되는 기기에는 `{ aptxLossless: true }` 를 답니다.
  양쪽 다 참일 때만 결과 카드에 안내가 뜹니다. 해당 모델에 aptX Lossless 가 **명시된 자료가
  있을 때만** 다세요 — 같은 시리즈여도 모델·펌웨어에 따라 갈립니다.

검색창은 모델명과 브랜드명 양쪽을 훑기 때문에, 브랜드명이 모델명에 들어가지 않아도
("보스" → "QC 울트라 이어버드") 검색으로 찾을 수 있습니다.

### 2. 지원 코덱 조합이 기존에 없는 기기일 때

`app/src/data/codecs.js` 의 `PHONE_CODEC_SETS` / `AUDIO_CODEC_SETS` 에 프리셋을 추가한 뒤
그 이름을 기기에서 참조합니다.

```js
export const AUDIO_CODEC_SETS = {
  // ...
  lhdc: ['SBC', 'AAC', 'LHDC'],
}
```

프리셋에 쓰는 코덱 이름은 **`CODEC_INFO` 에 있는 키와 정확히 같아야** 합니다.
새 코덱을 쓰려면 `CODEC_INFO` 에 설명(이름·비트레이트·지연시간·폴백 조건)을 먼저 추가하고,
협상 순서를 정하기 위해 `CODEC_PRIORITY` 에도 넣어야 합니다.

> `CODEC_INFO` 에 없는 코덱이 결과로 선택되면 결과 카드가 렌더링 중 터집니다.
> `npm run check` 가 모든 조합을 미리 돌려보며 이 경우를 잡아줍니다.

### 3. 새 브랜드일 때

브랜드 필터 드롭다운은 데이터에 등장하는 브랜드를 자동으로 수집하므로
**따로 등록할 곳이 없습니다.** 기기만 추가하면 목록에 나타납니다.

단, 협상 로직에 제조사 고유 규칙이 두 가지 있습니다 (`app/src/lib/match.js`):

- 삼성 폰 + 삼성 이어폰 → SSC 우선
- 애플 폰 → SBC / AAC 만 협상

그 외 브랜드는 `CODEC_PRIORITY` 순서에 따라 공통 코덱 중 가장 앞선 것이 선택됩니다.
새 제조사에 특별한 협상 규칙이 있다면 이 함수에 분기를 추가하세요.

### 4. 변경 이력 갱신

`app/src/data/changelog.js` 맨 위에 새 버전을 추가합니다. 이 배열이 사이트 하단의
"업데이트 기록" 섹션과 푸터의 버전 표기를 만듭니다.

```js
{
  version: 'v4',
  date: '2026-09-01',
  commit: 'abc1234',
  phones: 130,          // 그 시점의 실제 등록 대수
  audio: 90,
  changes: ['...'],
}
```

맨 위 항목의 `phones` / `audio` 는 `npm run check` 가 실제 데이터와 대조하므로,
기기만 추가하고 이력 갱신을 잊으면 빌드가 실패합니다.

`app/index.html` 의 JSON-LD 안에 있는 `softwareVersion` 과 `dateModified` 도 함께 맞춰 주세요.
검색엔진에 노출되는 값이라 자동 검사가 걸리지 않습니다.

### 5. 배포

```bash
cd app && npm run deploy
```

### 6. 직전 버전 보관 (선택)

새 버전을 배포하기 전에 직전 배포본을 `/vN/` 으로 남겨두면
사이트의 "업데이트 기록"에서 그 버전을 그대로 열어볼 수 있습니다.

```bash
cd app && node scripts/archive-version.mjs v3 a2ecddf   # <버전> <그 시점의 배포 커밋>
```

보관본은 검색엔진 색인에서 제외되고(noindex) 최신 버전으로 돌아가는 배너가 붙습니다.
보관 후 `changelog.js` 의 해당 항목에 `archiveUrl: './v3/'` 을 넣으면 링크가 노출됩니다.
`npm run deploy` 는 루트의 `assets/` 만 교체하므로 보관본을 건드리지 않습니다.

`npm run check` 가 자동으로 먼저 돌면서 다음을 확인합니다.

- `CODEC_PRIORITY` 의 모든 코덱에 `CODEC_INFO` 설명이 있는지
- 프리셋에 오타난 코덱 이름이 없는지
- 기기가 참조하는 코덱셋이 실재하는지, `id` 가 중복되지 않는지
- 삼성 이어폰의 SSC 등급이 빠지지 않았는지
- **모든 폰 × 이어폰 조합**이 오류 없이 결과를 내는지

## 데이터 출처와 한계

각 기기의 지원 코덱은 제조사 공개 사양을 기준으로 정리한 것이며,
실제 적용 코덱은 OS 버전·개발자 옵션·연결 상태에 따라 달라질 수 있습니다.
특히 aptX 계열은 같은 모델이라도 지역·칩셋 버전에 따라 지원 여부가 갈리는 경우가 있습니다.

실측으로 확인한 조합은 `app/src/lib/match.js` 의 `VERIFIED_PAIRS` 에
`'<폰id>:<이어폰id>'` 형태로 넣으면 결과 카드에 "✓ 실측 확인" 배지가 붙습니다.

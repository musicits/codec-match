// 코덱 이야기 — 숫자 읽는 법과 코덱을 만든 곳.
//
// 결과 화면은 '내 조합이 뭐로 붙느냐'만 답합니다. 왜 aptX 는 스냅드래곤에
// 많은지, SSC 는 왜 삼성끼리만 되는지는 만든 곳을 알아야 납득이 됩니다.
//
// 뜻을 먼저 쓰고 견줄 거리는 한 줄만 답니다. 비유가 앞서면 정확도가 흐려집니다.
// 숫자는 제조사 공개 자료로 확인한 것만 적습니다.
export const NUMBERS = [
  {
    word: '비트레이트', en: 'Bitrate', unit: 'kbps',
    body: '1초에 몇 킬로비트를 보내는지. 파형 높이가 곧 이 값입니다. 다만 코덱이 다르면 같은 숫자라도 소리가 다릅니다 — AAC 250kbps 를 SBC 345kbps 보다 낫게 보는 이유입니다.',
    aside: '영상 해상도와 같습니다. 1080p 와 4K 의 파일 크기 차이가 곧 이 값입니다.',
  },
  {
    word: '샘플레이트', en: 'Sample Rate', unit: 'kHz',
    body: '1초를 몇 번 잘라 담는지. 막대 개수가 곧 이 값입니다. 44.1kHz 는 1초를 44,100번 끊어 기록한다는 뜻입니다.',
    aside: '카메라 연사와 같습니다. 1초에 여러 장을 찍어 두면 순간을 놓칠 확률이 줄어듭니다.',
  },
  {
    word: '비트심도', en: 'Bit Depth', unit: 'bit',
    body: '크고 작음을 몇 단계로 나누는지. 높이가 몇 칸으로 끊기는지가 이 값입니다. 16bit 는 약 6만 5천 단계, 24bit 는 약 1,670만 단계입니다.',
    aside: '커피 사이즈에 견주면 톨과 그란데 차이. 톨도 충분하지만 원액에 가까운 쪽은 큰 잔입니다.',
  },
]

// 묶음 순서가 곧 화면 순서입니다.
export const GROUPS = [
  { id: 'base', name: '규격이 정한 바탕', note: '블루투스 규격에 함께 들어간 것들. 어느 기기에나 있습니다' },
  { id: 'lossy', name: '손실 압축 · 16bit', note: '안 들릴 만한 소리를 덜어내 보냅니다. CD 선에서 멈춥니다' },
  { id: 'hi', name: '24bit 이상', note: '하이 레졸루션을 담거나 아예 깎지 않습니다. 대부분 조합을 탑니다' },
]

export const MAKERS = [
  {
    group: 'base', codec: 'SBC', by: '블루투스 SIG', year: '2003',
    spec: '16bit 48kHz · 최대 345 kbps',
    what: 'SBC 는 블루투스 음악 규격(A2DP)에 기본으로 포함된 코덱입니다.',
    need: '별도 조건이 없습니다. 모든 블루투스 기기가 의무적으로 지원합니다.',
    diff: '음질 상한이 가장 낮습니다. 두 기기가 함께 쓸 상위 코덱이 없을 때 SBC 로 연결됩니다.',
  },
  {
    group: 'base', codec: 'LC3', by: '블루투스 SIG', year: '2019',
    spec: '16–24bit 48kHz · 최대 345 kbps',
    what: 'LC3 는 블루투스 새 규격인 LE Audio 의 기본 코덱입니다.',
    need: '폰과 이어폰이 모두 LE Audio 를 지원해야 합니다.',
    diff: '같은 전송률에서 SBC 보다 음질이 좋고 지연이 짧습니다. 오라캐스트 방송 기능도 LC3 를 사용합니다.',
  },
  {
    group: 'lossy', codec: 'AAC', by: 'MPEG · 애플이 채택', year: '1997',
    spec: '16bit 44.1kHz · 약 250 kbps',
    what: 'AAC 는 블루투스 전용 코덱이 아니라 ISO/IEC 가 표준으로 정한 음악 파일 규격입니다.',
    need: '별도 조건이 없습니다. 대부분의 기기가 지원합니다.',
    diff: '애플이 아이튠즈와 아이폰에 채택했습니다. 아이폰은 이어폰과 이 코덱으로 연결됩니다.',
  },
  {
    group: 'lossy', codec: 'aptX', by: '퀄컴 (전 CSR · APT)', year: '1988',
    spec: '16bit 48kHz · 최대 352 kbps',
    what: 'aptX 는 방송 장비용 압축 기술에서 출발한 코덱입니다. 영국 퀸즈대 벨파스트의 연구가 시작이었습니다.',
    need: '폰과 이어폰이 모두 aptX 를 지원해야 합니다.',
    diff: '2010년 CSR 이, 2015년 퀄컴이 권리를 인수했습니다. 스냅드래곤 폰에서 자주 보이는 이유입니다.',
  },
  {
    group: 'hi', codec: 'aptX HD · Adaptive · Lossless', by: '퀄컴', year: '2016 ~',
    spec: 'HD 24bit 48kHz · Adaptive 24bit 96kHz',
    what: '퀄컴이 aptX 를 확장한 상위 갈래입니다. HD 는 24bit 로 올렸고, Adaptive 는 전파 상태에 따라 전송률을 조절하며, Lossless 는 CD 음질을 손실 없이 전송합니다.',
    need: 'HD 는 양쪽 지원만으로 충분합니다. Adaptive 와 Lossless 는 폰과 이어폰이 모두 스냅드래곤 사운드 인증을 받아야 합니다.',
    diff: 'HD 는 오픈소스로 공개돼 인증 없이도 쓸 수 있습니다.',
  },
  {
    group: 'hi', codec: 'LDAC', by: '소니', year: '2015',
    spec: '24bit 96kHz · 330 / 660 / 990 kbps',
    what: 'LDAC 은 소니가 2015년에 발표한 하이 레졸루션 전송 코덱입니다.',
    need: '최고 단계인 990kbps 로 쓰려면 안드로이드 설정에서 ‘음질 우선’ 을 선택해야 합니다.',
    diff: '구글과 협력해 안드로이드 8.0 에 기본 탑재됐습니다. 소니 제품이 아니어도 사용할 수 있습니다.',
  },
  {
    group: 'hi', codec: 'SSC', by: '삼성', year: '2018',
    spec: 'Scalable 16bit 44.1kHz · Seamless 24bit 48kHz · UHQ 24bit 96kHz',
    what: 'SSC(Samsung Seamless Codec)는 삼성이 갤럭시 기기 사이에 사용하는 코덱입니다.',
    need: '폰과 이어폰이 모두 갤럭시여야 합니다. UHQ 등급은 갤럭시 웨어러블 앱에서 고급 음질을 켜야 적용됩니다.',
    diff: '갤럭시가 아닌 폰에 버즈를 연결하면 AAC 나 SBC 로 연결됩니다.',
  },
  {
    group: 'hi', codec: 'LHDC', by: '사비텍 (대만)', year: '2019',
    spec: '24bit 96–192kHz · 최대 1,000 kbps',
    what: 'LHDC 는 대만 사비텍이 개발한 하이 레졸루션 코덱입니다.',
    need: '폰과 이어폰이 모두 LHDC 를 지원해야 합니다.',
    diff: 'LDAC 과 같은 자리를 노립니다. 낫싱과 오포 제품에 주로 들어갑니다.',
  },
  {
    group: 'hi', codec: 'L2HC', by: '화웨이', year: '2021',
    spec: '24bit 192kHz · 최대 2.3 Mbps (4.0 무손실)',
    what: 'L2HC 는 화웨이가 자사 기기 사이에 사용하는 코덱입니다.',
    need: '폰과 이어폰이 모두 화웨이 제품이어야 합니다.',
    diff: '4.0 버전부터 무손실 전송을 지원합니다.',
  },
]

// 사전에 실릴 만한 말만. 화면에 이미 문장으로 쓰여 있는 설명은 넣지 않습니다.
export const TERMS = [
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

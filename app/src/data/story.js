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
    body: '블루투스 음악 규격(A2DP)에 함께 들어간 기본 코덱. 규격상 모든 기기가 반드시 지원해야 해서, 다른 코덱이 하나도 안 맞을 때 여기로 떨어집니다.',
  },
  {
    group: 'base', codec: 'LC3', by: '블루투스 SIG', year: '2019',
    spec: '16–24bit 48kHz · 최대 345 kbps',
    body: '블루투스 새 규격(LE Audio)의 기본 코덱. SBC 를 대신하려고 만든 것이라 같은 전송률에서 더 잘 들리고 지연이 짧습니다. 오라캐스트 같은 새 기능도 여기 얹혀 있습니다.',
  },
  {
    group: 'lossy', codec: 'AAC', by: 'MPEG · 애플이 채택', year: '1997',
    spec: '16bit 44.1kHz · 약 250 kbps',
    body: '블루투스용으로 만든 게 아니라 원래 음악 파일 규격(ISO/IEC 표준)입니다. 애플이 아이튠즈와 아이폰에 쓰면서 자리를 잡았고, 지금도 아이폰이 이어폰과 붙을 때 쓰는 코덱입니다.',
  },
  {
    group: 'lossy', codec: 'aptX', by: '퀄컴 (전 CSR · APT)', year: '1988 · 2015 퀄컴',
    spec: '16bit 48kHz · 최대 352 kbps',
    body: '영국 퀸즈대 벨파스트 연구에서 출발해 방송 장비에 쓰이던 기술입니다. APT 라이선싱이 2010년 CSR 에, 2015년 퀄컴이 CSR 을 인수하면서 퀄컴 것이 됐습니다. 스냅드래곤 폰에 많은 이유입니다.',
  },
  {
    group: 'hi', codec: 'aptX HD · Adaptive · Lossless', by: '퀄컴', year: '2016 ~',
    spec: 'HD 24bit 48kHz · Adaptive 24bit 96kHz',
    body: 'HD 는 24bit 로 올렸고, Adaptive 는 전파 상태에 따라 전송률을 바꿉니다. Lossless 는 CD 음질을 깎지 않고 보냅니다. HD 는 오픈소스로 풀렸지만 Adaptive 와 Lossless 는 스냅드래곤 사운드 인증이 양쪽에 다 있어야 열립니다.',
  },
  {
    group: 'hi', codec: 'LDAC', by: '소니', year: '2015',
    spec: '24bit 96kHz · 330 / 660 / 990 kbps',
    body: '하이 레졸루션이라는 말을 만든 소니가 내놓은 코덱. 구글과 손잡아 안드로이드 8.0 부터 운영체제에 들어갔고, 그래서 소니 기기가 아니어도 씁니다. 세 단계 중 990kbps 는 ‘음질 우선’ 을 켜야 나옵니다.',
  },
  {
    group: 'hi', codec: 'SSC', by: '삼성', year: '2018',
    spec: 'Scalable 16bit 44.1kHz · Seamless 24bit 48kHz · UHQ 24bit 96kHz',
    body: '갤럭시 폰과 갤럭시 버즈 사이에만 쓰는 코덱(Samsung Seamless Codec). 남의 기기와는 협상되지 않아 다른 폰에 버즈를 붙이면 AAC 나 SBC 로 떨어집니다. 삼성은 2016년 하만을 인수해 AKG·JBL 기술을 갤럭시에 얹고 있습니다.',
  },
  {
    group: 'hi', codec: 'LHDC', by: '사비텍 (대만)', year: '2019',
    spec: '24bit 96–192kHz · 최대 1,000 kbps',
    body: 'LDAC 과 겨루는 자리에 있는 코덱. HWA 얼라이언스가 밀고 있고, 낫싱·오포 같은 곳의 이어폰에서 만납니다.',
  },
  {
    group: 'hi', codec: 'L2HC', by: '화웨이', year: '2021',
    spec: '24bit 192kHz · 최대 2.3 Mbps (4.0 무손실)',
    body: '화웨이가 자사 폰·태블릿과 프리버즈 사이에 쓰는 코덱. 4.0 은 무손실까지 갑니다. 역시 화웨이 기기끼리만 열립니다.',
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

import { phone, phoneGroup } from './devices.js'

// 출시연도 내림차순으로 정렬합니다. 같은 해 안에서는 브랜드별로 묶었습니다.
export const PHONES = [
  // 2026 — 같은 해 안에서는 출시가 빠른 쪽부터. 첫 화면 기본 조합이 갤럭시로 잡힙니다.
  ...phoneGroup(2026, '삼성', 'galaxy_le', [
    '갤럭시 S26', '갤럭시 S26+', '갤럭시 S26 울트라',
    '갤럭시 Z 폴드8', '갤럭시 Z 폴드8 울트라', '갤럭시 Z 플립8',
  ], { seamless: true }),
  // 같은 POCO 라도 M8 은 퀄컴(스냅드래곤 6 Gen 3)이라 aptX 가 살아 있습니다.
  // 대신 블루투스 5.1 이라 LE Audio 가 빠지고, aptX 도 클래식까지입니다.
  phone(2026, '샤오미', 'snapdragon_mid', 'POCO M8 5G'),
  // 샤오미는 16 을 건너뛰고 17 로 갔습니다. 아이폰과 번호를 맞추려는 것입니다.
  // 국내 정식 출시분만 올립니다 — 17 · 17 울트라는 3월 6일, 17T 는 5월 28일.
  ...phoneGroup(2026, '샤오미', 'snapdragon_flagship', ['샤오미 17', '샤오미 17 울트라'], {
    aptxLossless: true,
  }),
  // 아래 넷은 미디어텍 칩이라 같은 샤오미라도 aptX 계열이 통째로 빠집니다.
  // POCO X8 프로 맥스 공식 사양: SBC / AAC / LDAC / LHDC 5.0 / LC3
  phone(2026, '샤오미', 'mediatek_hires', '샤오미 17T'),
  ...phoneGroup(2026, '샤오미', 'mediatek_hires', ['POCO X8 프로 맥스', 'POCO X8 프로']),

  // 픽셀 11 은 8월 20일, 아이폰 18 프로는 9월이라 구글이 앞에 옵니다.
  // 텐서 G6 로 바뀌었지만 코덱은 앞 세대와 같습니다.
  ...phoneGroup(2026, '구글', 'pixel_le', [
    '픽셀 11', '픽셀 11 프로', '픽셀 11 프로 XL', '픽셀 11 프로 폴드', '픽셀 10a',
  ]),
  ...phoneGroup(2026, '애플', 'iphone', ['아이폰 18 프로', '아이폰 18 프로 맥스']),
  phone(2026, '애플', 'iphone', '아이폰 듀오', { note: '10월 16일 예약 · 10월 23일 국내 출시' }),
  // 파인드 N6 는 전작과 달리 aptX Adaptive 까지 지원합니다.
  phone(2026, '오포', 'snapdragon_flagship', '파인드 N6'),

  // 2025
  ...phoneGroup(2025, '애플', 'iphone', [
    '아이폰 16e', '아이폰 17', '아이폰 에어', '아이폰 17 프로', '아이폰 17 프로 맥스',
  ]),
  ...phoneGroup(2025, '삼성', 'galaxy_le', [
    '갤럭시 S25', '갤럭시 S25+', '갤럭시 S25 울트라', '갤럭시 S25 엣지', '갤럭시 Z 폴드7', '갤럭시 Z 플립7',
  ], { seamless: true }),
  // FE 는 같은 갤럭시라도 SSC-UHQ 가 빠집니다. seamless 를 켜지 않아 SSC 는 16bit 44.1kHz 까지입니다.
  phone(2025, '삼성', 'galaxy_le', '갤럭시 S25 FE'),
  // 메이트 X7 은 2025년 12월 중국 출시입니다. 기린 칩이라 aptX 계열이 없고 LDAC·L2HC 위주입니다.
  phone(2025, '화웨이', 'kirin_l2hc', '메이트 X7', { note: 'L2HC 는 화웨이 이어폰끼리만' }),
  phone(2025, '오포', 'snapdragon_lhdc', '파인드 N5'),
  ...phoneGroup(2025, '구글', 'pixel_le', [
    '픽셀 10', '픽셀 10 프로', '픽셀 10 프로 XL', '픽셀 10 프로 폴드', '픽셀 9a',
  ]),
  ...phoneGroup(2025, '샤오미', 'snapdragon_flagship', [
    '샤오미 15', '샤오미 15 프로', '샤오미 15 울트라',
  ], { aptxLossless: true }),
  // F 시리즈는 X·M 과 달리 스냅드래곤입니다 — F7 프로는 8 Gen 3.
  phone(2025, '샤오미', 'snapdragon_flagship', 'POCO F7 프로'),
  ...phoneGroup(2025, '소니', 'xperia_le', ['엑스페리아 1 VII'], { aptxLossless: true }),
  ...phoneGroup(2025, '낫싱', 'snapdragon_flagship', [
    '낫싱 폰 (3)', '낫싱 폰 (3a)', '낫싱 폰 (3a) 프로',
  ]),

  // 2024
  ...phoneGroup(2024, '애플', 'iphone', [
    '아이폰 16', '아이폰 16 플러스', '아이폰 16 프로', '아이폰 16 프로 맥스',
  ]),
  ...phoneGroup(2024, '삼성', 'galaxy_le', [
    '갤럭시 S24', '갤럭시 S24+', '갤럭시 S24 울트라', '갤럭시 Z 폴드6', '갤럭시 Z 플립6',
  ], { seamless: true }),
  ...phoneGroup(2024, '구글', 'pixel_le', [
    '픽셀 9', '픽셀 9 프로', '픽셀 9 프로 XL', '픽셀 9 프로 폴드', '픽셀 8a',
  ]),
  // 14 울트라만 aptX Lossless 연결이 실기로 확인됐습니다. 같은 시리즈여도 ROM 에 따라
  // 14 프로는 aptX Adaptive 까지만 잡히는 사례가 보고돼 플래그를 달지 않았습니다.
  ...phoneGroup(2024, '샤오미', 'snapdragon_flagship', ['샤오미 14', '샤오미 14 프로']),
  phone(2024, '샤오미', 'snapdragon_flagship', '샤오미 14 울트라', { aptxLossless: true }),
  phone(2024, '샤오미', 'snapdragon_flagship', 'MIX 폴드4', { note: '중국 내수 전용 모델' }),
  phone(2024, '샤오미', 'snapdragon_flagship', 'MIX 플립'),
  ...phoneGroup(2024, '소니', 'xperia_le', ['엑스페리아 1 VI', '엑스페리아 10 VI']),
  // 디멘시티 7200 Pro 탑재라 aptX 계열이 빠지고 LDAC·LHDC 위주입니다.
  ...phoneGroup(2024, '낫싱', 'mediatek_hires', ['낫싱 폰 (2a)', '낫싱 폰 (2a) 플러스']),

  // 2023
  ...phoneGroup(2023, '애플', 'iphone', [
    '아이폰 15', '아이폰 15 플러스', '아이폰 15 프로', '아이폰 15 프로 맥스',
  ]),
  ...phoneGroup(2023, '삼성', 'galaxy_le', [
    '갤럭시 S23', '갤럭시 S23+', '갤럭시 S23 울트라', '갤럭시 Z 폴드5', '갤럭시 Z 플립5',
  ], { seamless: true }),
  ...phoneGroup(2023, '구글', 'pixel_le', ['픽셀 8', '픽셀 8 프로']),
  ...phoneGroup(2023, '샤오미', 'snapdragon_flagship', [
    '샤오미 13', '샤오미 13 프로', '샤오미 13 울트라',
  ]),
  ...phoneGroup(2023, '소니', 'xperia_le', ['엑스페리아 1 V', '엑스페리아 5 V']),
  ...phoneGroup(2023, '낫싱', 'snapdragon_flagship', ['낫싱 폰 (2)']),

  // 2022
  ...phoneGroup(2022, '애플', 'iphone', [
    '아이폰 SE 3세대', '아이폰 14', '아이폰 14 플러스', '아이폰 14 프로', '아이폰 14 프로 맥스',
  ]),
  ...phoneGroup(2022, '삼성', 'galaxy_classic', [
    '갤럭시 S22', '갤럭시 S22+', '갤럭시 S22 울트라',
  ], { seamless: true }),
  ...phoneGroup(2022, '삼성', 'galaxy_le', ['갤럭시 Z 폴드4', '갤럭시 Z 플립4'], { seamless: true }),
  ...phoneGroup(2022, '구글', 'pixel_classic', ['픽셀 7', '픽셀 7 프로', '픽셀 6a']),
  ...phoneGroup(2022, '낫싱', 'snapdragon_hires', ['낫싱 폰 (1)']),

  // 2021
  ...phoneGroup(2021, '애플', 'iphone', [
    '아이폰 13 미니', '아이폰 13', '아이폰 13 프로', '아이폰 13 프로 맥스',
  ]),
  ...phoneGroup(2021, '삼성', 'galaxy_classic', [
    '갤럭시 S21', '갤럭시 S21+', '갤럭시 S21 울트라', '갤럭시 Z 폴드3', '갤럭시 Z 플립3',
  ]),
  ...phoneGroup(2021, '구글', 'pixel_classic', ['픽셀 6', '픽셀 6 프로']),

  // 2020
  ...phoneGroup(2020, '애플', 'iphone', [
    '아이폰 SE 2세대', '아이폰 12 미니', '아이폰 12', '아이폰 12 프로', '아이폰 12 프로 맥스',
  ]),
  ...phoneGroup(2020, '삼성', 'galaxy_classic', [
    '갤럭시 S20', '갤럭시 S20+', '갤럭시 S20 울트라', '갤럭시 Z 플립', '갤럭시 Z 플립 5G',
    '갤럭시 노트20', '갤럭시 노트20 울트라', '갤럭시 Z 폴드2',
  ]),
  ...phoneGroup(2020, 'LG', 'lg_legacy', ['LG V60 씽큐', 'LG 벨벳', 'LG 윙']),

  // 2019
  ...phoneGroup(2019, '애플', 'iphone', ['아이폰 11', '아이폰 11 프로', '아이폰 11 프로 맥스']),
  ...phoneGroup(2019, '삼성', 'galaxy_classic', [
    '갤럭시 S10e', '갤럭시 S10', '갤럭시 S10+', '갤럭시 S10 5G',
    '갤럭시 노트10', '갤럭시 노트10+', '갤럭시 폴드',
  ]),
  ...phoneGroup(2019, 'LG', 'lg_legacy', ['LG V50 씽큐', 'LG G8 씽큐']),

  // 2018 이전
  ...phoneGroup(2018, '애플', 'iphone', ['아이폰 XS', '아이폰 XS 맥스', '아이폰 XR']),
  phone(2018, 'LG', 'lg_legacy', 'LG V40 씽큐'),
  ...phoneGroup(2017, '애플', 'iphone', ['아이폰 8', '아이폰 8 플러스', '아이폰 X']),
]

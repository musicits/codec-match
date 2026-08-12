import { phone, phoneGroup } from './devices.js'

// 출시연도 내림차순으로 정렬합니다. 같은 해 안에서는 브랜드별로 묶었습니다.
export const PHONES = [
  // 2026
  ...phoneGroup(2026, '삼성', 'galaxy_le', [
    '갤럭시 S26', '갤럭시 S26+', '갤럭시 S26 울트라', '갤럭시 Z 폴드8', '갤럭시 Z 플립8',
  ], { seamless: true }),

  // 2025
  ...phoneGroup(2025, '애플', 'iphone', [
    '아이폰 16e', '아이폰 17', '아이폰 에어', '아이폰 17 프로', '아이폰 17 프로 맥스',
  ]),
  ...phoneGroup(2025, '삼성', 'galaxy_le', [
    '갤럭시 S25', '갤럭시 S25+', '갤럭시 S25 울트라', '갤럭시 S25 엣지', '갤럭시 Z 폴드7', '갤럭시 Z 플립7',
  ], { seamless: true }),
  ...phoneGroup(2025, '구글', 'pixel_le', [
    '픽셀 10', '픽셀 10 프로', '픽셀 10 프로 XL', '픽셀 10 프로 폴드', '픽셀 9a',
  ]),
  ...phoneGroup(2025, '샤오미', 'snapdragon_flagship', [
    '샤오미 15', '샤오미 15 프로', '샤오미 15 울트라',
  ], { aptxLossless: true }),
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

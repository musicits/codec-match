import { audio, audioGroup } from './devices.js'

// 출시연도 내림차순. sscMax 는 삼성 기기에만 지정합니다.
export const AUDIO_DEVICES = [
  // 2026
  ...audioGroup(2026, '삼성', 'ssc_le', ['갤럭시 버즈4', '갤럭시 버즈4 프로'], { sscMax: 'uhq' }),
  audio(2026, '소니', 'ldac_le', 'WF-1000XM6'),
  audio(2026, '낫싱', 'ldac', 'Ear (3a)'),

  // 2025
  audio(2025, '애플', 'aac', '에어팟 프로 3'),
  audio(2025, '애플', 'aac', '파워비츠 프로 2'),
  audio(2025, '삼성', 'ssc', '갤럭시 버즈 코어', { sscMax: 'scalable', leAudioNote: true }),
  audio(2025, '소니', 'ldac_le', 'WH-1000XM6'),
  audio(2025, '보스', 'aptx_adaptive', 'QC 울트라 이어버드 2세대'),
  audio(2025, '낫싱', 'ldac', '헤드폰 (1)'),
  audio(2025, '낫싱', 'ldac', 'Ear (3)'),
  audio(2025, '테크닉스', 'ldac_le', 'EAH-AZ100'),
  audio(2025, '뱅앤올룹슨', 'aptx_adaptive', 'Beoplay Eleven'),
  audio(2025, '파이널', 'ldac', 'ZE3000 SV'),

  // 2024
  ...audioGroup(2024, '애플', 'aac', ['에어팟 4세대', '에어팟 4세대 ANC', '에어팟 맥스 USB-C']),
  audio(2024, '삼성', 'ssc', '갤럭시 버즈3 FE', { sscMax: 'hifi' }),
  ...audioGroup(2024, '삼성', 'ssc_le', ['갤럭시 버즈3', '갤럭시 버즈3 프로'], { sscMax: 'uhq' }),
  audio(2024, '보스', 'aac', 'QC 헤드폰'),
  audio(2024, '젠하이저', 'aptx_adaptive_le', '모멘텀 트루 와이어리스 4'),
  audio(2024, 'JBL', 'ldac_le', '투어 프로 3'),
  audio(2024, 'JBL', 'ldac', '라이브 빔 3'),
  // Ear (2024) 는 LDAC 과 LHDC 5.0 을 모두 지원합니다.
  audio(2024, '낫싱', 'ldac_lhdc', 'Ear'),
  ...audioGroup(2024, '낫싱', 'ldac', ['Ear (a)', 'Ear (open)']),
  ...audioGroup(2024, '앤커', 'ldac', ['사운드코어 리버티 4 프로', '사운드코어 스페이스 원 프로']),
  audio(2024, 'LG', 'aptx_adaptive', '톤프리 T80S'),
  ...audioGroup(2024, '자브라', 'aac', ['엘리트 10 Gen 2', '엘리트 8 액티브 Gen 2'], {
    note: 'LC3 는 케이스→이어버드 구간 전용 · 폰 연결은 SBC/AAC',
  }),
  audio(2024, '마샬', 'aac_le', '메이저 V'),
  audio(2024, '마샬', 'aac', '모니터 III A.N.C.'),
  // H100 은 B&O 최초로 퀄컴이 아닌 에어로하 칩을 써서 aptX 계열이 빠졌습니다.
  audio(2024, '뱅앤올룹슨', 'aac', 'Beoplay H100'),
  audio(2024, 'AKG', 'ldac', 'N5 Hybrid'),
  audio(2024, '파이널', 'aptx_adaptive', 'ZE8000 MK2'),
  audio(2024, 'QCY', 'ldac', '멜로버즈 프로'),
  audio(2024, '이어펀', 'aptx_adaptive_ldac_le', 'Air Pro 4'),

  // 2023
  audio(2023, '삼성', 'ssc', '갤럭시 버즈 FE', { sscMax: 'scalable' }),
  audio(2023, '소니', 'ldac', 'WF-1000XM5'),
  ...audioGroup(2023, '보스', 'aptx_adaptive', ['QC 울트라 이어버드', 'QC 울트라 헤드폰']),
  audio(2023, '애플', 'aac', '비츠 스튜디오 프로'),
  ...audioGroup(2023, 'JBL', 'ldac', ['투어 프로 2', '투어 원 M2']),
  // Ear (2) 는 LDAC 이 아니라 LHDC 5.0 입니다.
  audio(2023, '낫싱', 'lhdc', 'Ear (2)'),
  audio(2023, '앤커', 'ldac', '사운드코어 리버티 4 NC'),
  audio(2023, '테크닉스', 'ldac', 'EAH-AZ80'),
  audio(2023, 'LG', 'aptx_adaptive', '톤프리 T90S'),
  ...audioGroup(2023, '자브라', 'aac', ['엘리트 10', '엘리트 8 액티브']),
  audio(2023, '마샬', 'aac_le', '모티프 II A.N.C.'),
  audio(2023, '슈어', 'aptx_full', 'AONIC 50 Gen 2'),
  audio(2023, '데논', 'aptx_adaptive', 'PerL Pro'),

  // 2022
  audio(2022, '애플', 'aac', '에어팟 프로 2세대'),
  audio(2022, '삼성', 'ssc_le', '갤럭시 버즈2 프로', { sscMax: 'hifi' }),
  audio(2022, '소니', 'ldac', 'WH-1000XM5'),
  audio(2022, '보스', 'aac', 'QC 이어버드 II'),
  ...audioGroup(2022, '젠하이저', 'aptx_adaptive', [
    '모멘텀 트루 와이어리스 3', '모멘텀 4 와이어리스',
  ]),
  audio(2022, 'LG', 'aptx_adaptive', '톤프리 T90'),
  audio(2022, '뱅앤올룹슨', 'aptx_adaptive', 'Beoplay EX'),
  audio(2022, '파이널', 'aptx_adaptive', 'ZE8000'),

  // 2021
  audio(2021, '애플', 'aac', '에어팟 3세대'),
  audio(2021, '애플', 'aac', '비츠 핏 프로'),
  ...audioGroup(2021, '삼성', 'ssc', ['갤럭시 버즈 프로', '갤럭시 버즈2'], { sscMax: 'scalable' }),
  audio(2021, '소니', 'ldac', 'WF-1000XM4'),
  audio(2021, '보스', 'aac', 'QC45'),
  audio(2021, 'LG', 'aac', '톤프리 FP9'),
  ...audioGroup(2021, '뱅앤올룹슨', 'aptx_adaptive', ['Beoplay HX', 'Beoplay EQ']),

  // 2020 이전
  audio(2020, '애플', 'aac', '에어팟 맥스'),
  ...audioGroup(2020, '삼성', 'ssc', ['갤럭시 버즈+', '갤럭시 버즈 라이브'], { sscMax: 'scalable' }),
  audio(2020, '소니', 'ldac', 'WH-1000XM4'),
  audio(2020, '자브라', 'aac', '엘리트 85t'),
  audio(2020, '마샬', 'sbc_only', '모니터 II A.N.C.', { note: '고음질 코덱 미지원 · SBC 전용' }),
  audio(2020, '슈어', 'aptx_full', 'AONIC 50'),
  ...audioGroup(2019, '애플', 'aac', ['에어팟 2세대', '에어팟 프로']),
  audio(2019, '삼성', 'ssc', '갤럭시 버즈', { sscMax: 'scalable' }),
  audio(2016, '애플', 'aac', '에어팟 1세대'),
]

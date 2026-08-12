import { audio, audioGroup } from './devices.js'

// 출시연도 내림차순. sscMax 는 삼성 기기에만 지정합니다.
export const AUDIO_DEVICES = [
  // 2026
  ...audioGroup(2026, '삼성', 'ssc_le', ['갤럭시 버즈4', '갤럭시 버즈4 프로'], { sscMax: 'uhq' }),
  audio(2026, '소니', 'ldac_le', 'WF-1000XM6'),

  // 2025
  audio(2025, '애플', 'aac', '에어팟 프로 3'),
  audio(2025, '애플', 'aac', '파워비츠 프로 2'),
  audio(2025, '삼성', 'ssc', '갤럭시 버즈 코어', { sscMax: 'scalable', leAudioNote: true }),
  audio(2025, '소니', 'ldac_le', 'WH-1000XM6'),
  audio(2025, '보스', 'aptx_adaptive', 'QC 울트라 이어버드 2세대'),
  audio(2025, 'Nothing', 'ldac', 'Nothing 헤드폰 (1)'),
  audio(2025, '테크닉스', 'ldac_le', 'EAH-AZ100'),

  // 2024
  ...audioGroup(2024, '애플', 'aac', ['에어팟 4세대', '에어팟 4세대 ANC', '에어팟 맥스 USB-C']),
  audio(2024, '삼성', 'ssc', '갤럭시 버즈3 FE', { sscMax: 'hifi' }),
  ...audioGroup(2024, '삼성', 'ssc_le', ['갤럭시 버즈3', '갤럭시 버즈3 프로'], { sscMax: 'uhq' }),
  audio(2024, '보스', 'aac', 'QC 헤드폰'),
  audio(2024, '젠하이저', 'aptx_adaptive_le', '모멘텀 트루 와이어리스 4'),
  ...audioGroup(2024, 'JBL', 'ldac_le', ['투어 프로 3']),
  audio(2024, 'JBL', 'ldac', '라이브 빔 3'),
  ...audioGroup(2024, 'Nothing', 'ldac', ['Nothing Ear', 'Nothing Ear (a)', 'Nothing Ear (open)']),
  audio(2024, '앤커', 'ldac', '사운드코어 리버티 4 프로'),
  audio(2024, '앤커', 'ldac', '사운드코어 스페이스 원 프로'),

  // 2023
  audio(2023, '삼성', 'ssc', '갤럭시 버즈 FE', { sscMax: 'scalable' }),
  audio(2023, '소니', 'ldac', 'WF-1000XM5'),
  ...audioGroup(2023, '보스', 'aptx_adaptive', ['QC 울트라 이어버드', 'QC 울트라 헤드폰']),
  audio(2023, '애플', 'aac', '비츠 스튜디오 프로'),
  ...audioGroup(2023, 'JBL', 'ldac', ['투어 프로 2', '투어 원 M2']),
  audio(2023, 'Nothing', 'ldac', 'Nothing Ear (2)'),
  audio(2023, '앤커', 'ldac', '사운드코어 리버티 4 NC'),
  audio(2023, '테크닉스', 'ldac', 'EAH-AZ80'),

  // 2022
  audio(2022, '애플', 'aac', '에어팟 프로 2세대'),
  audio(2022, '삼성', 'ssc_le', '갤럭시 버즈2 프로', { sscMax: 'hifi' }),
  audio(2022, '소니', 'ldac', 'WH-1000XM5'),
  audio(2022, '보스', 'aac', 'QC 이어버드 II'),
  ...audioGroup(2022, '젠하이저', 'aptx_adaptive', [
    '모멘텀 트루 와이어리스 3', '모멘텀 4 와이어리스',
  ]),

  // 2021
  audio(2021, '애플', 'aac', '에어팟 3세대'),
  audio(2021, '애플', 'aac', '비츠 핏 프로'),
  ...audioGroup(2021, '삼성', 'ssc', ['갤럭시 버즈 프로', '갤럭시 버즈2'], { sscMax: 'scalable' }),
  audio(2021, '소니', 'ldac', 'WF-1000XM4'),
  audio(2021, '보스', 'aac', 'QC45'),

  // 2020 이전
  audio(2020, '애플', 'aac', '에어팟 맥스'),
  ...audioGroup(2020, '삼성', 'ssc', ['갤럭시 버즈+', '갤럭시 버즈 라이브'], { sscMax: 'scalable' }),
  audio(2020, '소니', 'ldac', 'WH-1000XM4'),
  ...audioGroup(2019, '애플', 'aac', ['에어팟 2세대', '에어팟 프로']),
  audio(2019, '삼성', 'ssc', '갤럭시 버즈', { sscMax: 'scalable' }),
  audio(2016, '애플', 'aac', '에어팟 1세대'),
]

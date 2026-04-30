# NEON HUNTER SPIN — 사운드 디자인 개선 프롬프트
## "자극적이되 듣기 싫지 않은" 사운드로 재설계

> 이 문서는 현재 Web Audio 합성 기반 사운드 시스템을
> "흥분도는 유지·강화하면서 청각 피로(ear fatigue)를 제거"하는 방향으로
> 재설계하기 위한 위임용 프롬프트입니다.
>
> **반드시 Phase 0(현황 진단) → 1(마스터 버스) → 2(프리미티브) → 3(이벤트) → 4(검증)
> 순서로 분할 위임**할 것. 한꺼번에 시키면 음량/주파수 균형이 무너집니다.

---

## 0. 공통 헤더 (모든 Phase 앞에 항상 붙이기)

```
당신은 시니어 게임 사운드 디자이너 + Web Audio 엔지니어입니다.
대상 프로젝트는 클라이언트 전용 PWA 슬롯머신 데모 "NEON HUNTER SPIN"입니다.

[프로젝트 구조]
- index.html         : 마크업
- script.js          : 게임 로직 + 사운드 엔진 (모든 사운드는 이 파일 내 합성)
- styles.css         : 스타일
- service-worker.js  : PWA 캐시
- simulate_rtp.js    : RTP 시뮬레이터 (사운드 무관)

[현재 사운드 엔진 — 변경 대상]
script.js 의 다음 함수군:
- 프리미티브: playTone(freq, duration, type, delay, volume)
              playNoiseBurst(duration, delay, volume, filterFreq, filterType)
- 한국 전통악기 합성:
    playBukHit (북, 92Hz/138Hz + lowpass noise)
    playJangguHit (장구, 128/210Hz + bandpass noise)
    playJangguRoll (장구 roll)
    playJing (징, 146/219/292/438Hz + 980Hz bandpass noise)
    playKwaenggwari (꽹과리, 880~2110Hz square + 1700Hz highpass noise)  ← 자극원 1
    playGayageumPluck (가야금, fundamental + 2nd harmonic)
    playDaegeumRise (대금, 392~659Hz 상승)
    playBellCluster (벨, 988~2349Hz)                                     ← 자극원 2
- 게임 이벤트:
    playSpinSound, playReelSpinTick, playReelStopSound,
    playScatterSound, playAnticipationSound, playCloseCallSound,
    playWinSound, playBonusStartSound, playBonusEndSound,
    playDropSound, playCashOutSound, playCreditStackSound,
    playScratchPickSound, playSoundToggleSound

[현재 식별된 청각 피로 유발 요인]
1. 마스터 버스(compressor/limiter)가 없어 동시 발화 시 0dBFS 초과 가능 →
   특히 win + bell cluster + scatter 가 겹치면 디지털 클리핑 위험.
2. 1~3 kHz 대역(인간 청감 최고 민감 영역)에 다음이 집중:
   - kwaenggwari 880~2110 Hz square (square파 → 강한 홀수 하모닉이 10kHz까지)
   - bellCluster 988~2349 Hz triangle
   - creditStack 988~1300 Hz
   - scratchPick 1320 Hz+
   → 반복 노출 시 ear fatigue + "ice-pick" 인상.
3. 모든 사운드가 dry(반사음 없음). 깊이감 없이 바로 귀에 박힘.
4. 엔벨로프가 사실상 attack=instant, release=linearRamp 만 사용 →
   타악기 트랜션트가 너무 sharp.
5. 동시 발화 사운드 간 ducking 없음 → 정보가 마스킹됨.
6. 무음 환경/모바일 스피커 EQ 미고려(저역 손실 / 고역 강조 디바이스에서 더 자극적).
7. 사운드 토글이 즉시 0/1 끊김 → 갑작스런 무음/유음 전환이 거슬림.
8. 사용자별 볼륨 조절 옵션 없음(현재 sound on/off 토글만).

[절대 깨면 안 되는 제약]
1. 외부 오디오 파일 추가 금지(여전히 100% Web Audio 합성 유지).
2. 외부 라이브러리/CDN 추가 금지.
3. 한국 전통악기 음색의 "정체성"은 유지(북·장구·징·꽹과리·가야금·대금).
   순한 합성으로 바뀌더라도 어떤 악기를 모사한 것인지 인지 가능해야 함.
4. iOS Safari 의 audio unlock 흐름(unlockAudio / unlockAudioForUserGesture) 호환 유지.
5. 모든 사운드 함수 시그니처는 호환 유지(호출처 4000+줄을 변경하지 않도록).
6. service-worker.js CACHE_NAME 버전 bump 필수.
7. prefers-reduced-motion / 사운드 OFF 토글 / 볼륨 슬라이더 모두 존중.

[설계 철학 — 모든 단계의 기준점]
A. "Stimulating but not piercing" — 흥분은 어택의 폭이 아니라 envelope 곡선과 공간감으로.
B. 1~3 kHz 대역은 정보 전달용으로만 짧게(<150ms), 음량은 절대 -12dBFS 이상 금지.
C. 모든 동시 사운드는 마스터 버스의 compressor/limiter 를 거친다.
D. 큰 사운드(win/bonus)는 작은 사운드(reel tick)를 ducking 한다.
E. 벨 cluster 는 단독 발화 금지 — 항상 reverb tail 과 함께.
F. 스퀘어파(square) 는 사용 금지 또는 lowpass(2.5kHz cutoff) 통과 후에만 사용.
G. 첫 1.5초 라운드(스핀 시작~릴 정지) 의 평균 LUFS 가
   리트리거/잭팟 사운드의 그것보다 6dB 이상 낮아야 한다(다이내믹 레인지 확보).

[작업 후 항상 출력]
1) 변경한 파일과 라인 범위 (diff 형식 권장)
2) 새/변경된 사운드 함수의 envelope 사양표 (attack/decay/sustain/release ms)
3) 마스터 버스 체인 다이어그램 (텍스트로)
4) 청각 검증 체크리스트 결과 (Phase 4)
5) 회귀 위험 영역 1줄 코멘트
```

---

## Phase 0 — 현황 진단 (코드 변경 없음)

```
[목표]
현재 사운드 엔진의 주파수 분포·다이내믹·정보 충돌 지점을 분석해
개선 우선순위를 정한다.

[과제]
1) 위 "현재 사운드 엔진" 목록의 14개 이벤트 함수에 대해 각각:
   - 주파수 범위 (Hz, low~high)
   - 총 지속시간 (ms)
   - 동시 발화 oscillator 개수
   - 추정 peak loudness (dBFS, 이론값)
   - 1~3kHz 비중(%)
   를 표로 정리.

2) 동시 발화 가능 조합 식별:
   - reel stop × 5 + scatter sound (스캐터 5개 동시 정지)
   - win + bell cluster + bonus start (3중 트리거)
   - anticipation + reel tick + daegeum rise (스캐터 임박)
   각 조합의 추정 peak loudness 와 마스킹 위험도 기술.

3) 청각 피로 위험도 Top 5 함수 선정 + 근거 1줄씩.

4) 우선순위 기반 개선 로드맵 1~2 페이지 분량.

[수용 기준 — Phase 0]
□ 14개 함수 분석표 완성
□ 동시 발화 위험 조합 최소 3개 식별
□ Top 5 위험 함수 명시 + 각 함수별 1줄 진단
□ 코드 수정은 절대 하지 말 것
```

---

## Phase 1 — 마스터 버스 (가장 ROI 큼, 1일)

```
[목표]
모든 사운드가 거치는 단일 master chain 을 도입해
클리핑 방지 / 깊이감 / 일관된 음색 균형을 확보.

[변경 1] 마스터 버스 체인 추가
script.js 의 getAudioContext() 근처에 신규 모듈:

  function getMasterBus() {
    const ctx = getAudioContext();
    if (!ctx) return null;
    if (ctx._masterBus) return ctx._masterBus;

    // 1) Pre-gain (모든 신호 입력)
    const preGain = ctx.createGain();
    preGain.gain.value = 0.9;

    // 2) Soft-knee compressor (트랜션트 컨트롤)
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -18;
    compressor.knee.value = 12;
    compressor.ratio.value = 3;
    compressor.attack.value = 0.005;
    compressor.release.value = 0.180;

    // 3) High-shelf 살짝 컷 (피로한 1.5~4kHz 완화)
    const tameShelf = ctx.createBiquadFilter();
    tameShelf.type = "highshelf";
    tameShelf.frequency.value = 2400;
    tameShelf.gain.value = -2.5;

    // 4) Lowpass safety (10kHz 이상 컷, 디지털 ringing 제거)
    const safetyLP = ctx.createBiquadFilter();
    safetyLP.type = "lowpass";
    safetyLP.frequency.value = 11000;
    safetyLP.Q.value = 0.7;

    // 5) Convolver reverb (synthetic IR로 깊이감)
    const convolver = ctx.createConvolver();
    convolver.buffer = createSyntheticIR(ctx, 1.2, 0.35); // 1.2s, 35% damping
    const reverbSend = ctx.createGain();
    reverbSend.gain.value = 0.18;     // 기본 send -15dB 정도
    const reverbReturn = ctx.createGain();
    reverbReturn.gain.value = 0.5;

    // 6) Master limiter (브릭월 -1dBFS)
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -1;
    limiter.knee.value = 0;
    limiter.ratio.value = 20;
    limiter.attack.value = 0.001;
    limiter.release.value = 0.050;

    // 7) Master gain (사용자 볼륨)
    const masterGain = ctx.createGain();
    masterGain.gain.value = 1.0;

    // 라우팅
    preGain.connect(compressor);
    compressor.connect(tameShelf);
    tameShelf.connect(safetyLP);
    safetyLP.connect(limiter);
    limiter.connect(masterGain);
    masterGain.connect(ctx.destination);

    // 리버브 send/return (compressor 직후 분기)
    compressor.connect(reverbSend);
    reverbSend.connect(convolver);
    convolver.connect(reverbReturn);
    reverbReturn.connect(masterGain);

    ctx._masterBus = { preGain, masterGain, reverbSend, compressor };
    return ctx._masterBus;
  }

[변경 2] createSyntheticIR 신규 함수
- noise impulse response 를 합성으로 만들어 convolver buffer 에 사용.
- Web Audio 만으로 구현(Math.random 기반 noise + exponential decay).
- 길이 1.2s, sampleRate × 1.2 만큼 채널 데이터 채움.

[변경 3] 모든 oscillator/source 의 destination 변경
- playTone, playNoiseBurst 내부에서:
    gain.connect(context.destination)
  →
    const bus = getMasterBus();
    gain.connect(bus ? bus.preGain : context.destination);

[변경 4] 사용자 볼륨 슬라이더 (UI)
- index.html 의 sound 토글 버튼 옆에 0~100 슬라이더 추가
  (default 80, localStorage 저장).
- script.js 에서 slider input → masterBus.masterGain.gain 연결
  (linearRampToValueAtTime 으로 60ms smooth, 끊김 방지).
- 슬라이더 인접에 -∞..0dB 표시(선택, mobile 좁으면 생략 가능).

[변경 5] 사운드 토글 fade
- 현재 즉시 ON/OFF.
- 변경: 250ms linear fade-in/out (masterGain 으로).

[수용 기준 — Phase 1]
□ getMasterBus() 가 컨텍스트당 1회만 생성
□ 모든 14개 이벤트 함수가 마스터 버스를 거침 (수동 grep 으로 확인)
□ playWinSound + playBellCluster + playBonusStartSound 동시 발화 시 클리핑 없음
  (oscilloscope 로 -1dBFS 이내 확인 — 콘솔 로그 분석 가능)
□ 사용자 볼륨 슬라이더가 새로고침 후에도 유지 (localStorage)
□ iOS Safari 에서 audio unlock 흐름 깨지지 않음
□ prefers-reduced-motion 환경에서도 사운드 동일 동작 (분리)
```

---

## Phase 2 — 프리미티브 재설계 (envelope/harmonics)

```
[목표]
playTone / playNoiseBurst 를 envelope-aware 하게 확장해
"sharp 트랜션트"를 "musical 트랜션트"로 바꾼다.

[변경 1] playTone 시그니처 확장
현재:
  function playTone(frequency, duration, type = "sine", delay = 0, volume = 0.12)

변경(하위 호환):
  function playTone(frequency, duration, type = "sine", delay = 0, volume = 0.12, options = {})
    options = {
      attack: 0.008,    // 8ms 기본 attack
      decay: 0.040,
      sustainLevel: 0.6,
      release: 0.120,
      detune: 0,        // cents
      harmonics: null,  // [{ratio, gain}] 배열 — 하모닉 추가
      lowpass: null,    // {freq, Q} — 개별 sound 의 톤 컨트롤
      pan: 0,           // -1..1
    }

  ADSR 곡선:
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(volume, start + attack);
    gain.gain.linearRampToValueAtTime(volume * sustainLevel, start + attack + decay);
    gain.gain.setValueAtTime(volume * sustainLevel, start + duration - release);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  하모닉 옵션 사용 시 oscillator 추가 생성 후 같은 envelope 공유.
  pan 사용 시 StereoPannerNode 통과.
  lowpass 사용 시 BiquadFilter 통과.

[변경 2] square 파 사용 금지 / 자동 변환
- type === "square" 호출은 자동으로 "triangle" + lowpass 2500Hz 로 변환.
- 콘솔에 deprecation 경고(개발 모드만).
- playKwaenggwari 의 square 호출 자리에서 명시적으로 triangle + lowpass 사용.

[변경 3] playNoiseBurst 개선
- 현재 attack=instant. 변경:
    fade-in 6ms, body, fade-out=duration*0.5 의 exponential.
- 옵션 추가: { lowpassMaster: 8000 } 로 안전 컷.
- bandpass Q 값을 4.5 → 1.8 로 낮춤(휘파람 artifact 제거).

[변경 4] 신규 헬퍼: playSubBoom
- 저역 보강용 (40~80Hz sine, 200ms exp decay).
- 잭팟/EPIC 윈에서 "체감 충격"을 고역 대신 저역으로 전달.
- 모바일 스피커는 80Hz 이하 못 내지만, 진동/햅틱과 결합되면 체감 강함.

[변경 5] 신규 헬퍼: playWhoosh
- 고역 화이트 노이즈 + downward sweep filter (4000Hz → 800Hz, 350ms).
- 보너스 진입 / 컷씬 트랜지션에 사용.
- 기존 bell cluster 대체 후보(belt cluster 단독 사용은 줄임).

[수용 기준 — Phase 2]
□ 모든 기존 호출이 새 시그니처로도 동작(하위 호환)
□ square 호출 사례 0건(자동 변환 + 원본 코드 정리)
□ playSubBoom / playWhoosh 가 호출 가능하고 마스터 버스 통과
□ 청취 테스트: 5분간 50회 spin → "쨍하다" 인상 0건 (Phase 4 에서 검증)
```

---

## Phase 3 — 이벤트별 사운드 재설계

```
[목표]
14개 이벤트 함수를 위 설계 철학(A~G)에 맞춰 다듬는다.
악기 정체성은 유지, 음량/주파수/엔벨로프만 조정.

[원칙: Loudness Tier]
사운드는 다음 6단계 중 하나로 분류, 각 tier 의 peak volume 상한을 지킨다.

  TIER_AMBIENT (-32dBFS): playReelSpinTick, playSoundToggleSound
  TIER_UI      (-24dBFS): playReelStopSound, playScratchPickSound, playCreditStackSound
  TIER_FEEDBACK(-18dBFS): playSpinSound, playDropSound, playCashOutSound, playWinSound (small)
  TIER_EVENT   (-14dBFS): playScatterSound, playAnticipationSound, playCloseCallSound,
                          playWinSound (medium)
  TIER_BIG     (-10dBFS): playBonusStartSound, playBonusEndSound, playWinSound (big tier)
  TIER_EPIC    (-6dBFS):  jackpot / EPIC win 신규 사운드

  ※ peak volume = oscillator volume × 동시 발화 개수 의 이론적 합.
  ※ playWinSound 는 win amount tier 에 따라 분기(앞 UX 프롬프트의 winTier 와 연동).

[원칙: 주파수 budget]
한 사운드 안에서 1~3kHz 영역 발화 총 시간 ≤ 250ms.
2~4kHz 영역 단일 oscillator volume ≤ 0.05.

[원칙: Ducking]
playSpinSound / 릴 진행 중에는 BGM(미래 추가 예정) 또는 reel tick 을 -3dB ducking.
playWinSound (BIG 이상) 은 reelStop / reelTick 을 -6dB ducking 200ms.
이미 발화 중인 사운드 위에 또 큰 sound 가 쌓이면 자동 ducking 처리.

[변경 사항 함수별 가이드]

A. playReelStopSound
   - 현재: buk + 620+i*42Hz triangle (브라이트 톡)
   - 변경: buk(저역) + 380+i*22Hz triangle + 6ms attack + 80ms exponential release.
   - 1~3kHz 진입 금지. 1번 릴은 더 dark, 5번 릴은 살짝 더 bright (정보 전달).

B. playKwaenggwari
   - 현재: 880~2110Hz square(자극원).
   - 변경: 800~1600Hz triangle + lowpass 2200Hz, Q 0.8.
       메탈릭 인상은 inharmonic ratio (1, 1.41, 1.93, 2.31) 로 유지.
       하이패스 노이즈 1700Hz → 1100Hz 로 이동, volume 절반.
   - "꽹과리"의 metallic 인상은 남기되 "icepick" 제거.

C. playBellCluster
   - 현재: 988~2349Hz, 단독 사용.
   - 변경: 마스터 reverb send 를 0.18 → 0.45 로 일시 boost (이 함수 호출 시).
       톤 범위 988~1760Hz 로 축소 (cap).
       attack 12ms, release 350ms 의 exponential.
       단독 호출 차단(반드시 다른 사운드와 ≥ 60ms 간격으로만).

D. playBonusStartSound
   - 현재: jing + daegeum + bellCluster (3겹).
   - 변경: 시간축 분리.
       0ms: playWhoosh
       80ms: playSubBoom
       180ms: jing(volume 0.075)
       420ms: daegeum rise
       780ms: bellCluster (reverb tail로 페이드아웃)
   - 총 길이 1.4s 에 다이내믹 곡선이 명확히 상승하도록.

E. playWinSound (가장 자주 들림 — 가장 신중)
   - tier 분기:
       SMALL (5x 미만):  gayageumPluck 1개 + 짧은 belChip(짧은 bell, 1톤만)
       MEDIUM(5~15x):    gayageum 3-note arpeggio + 짧은 reverb tail
       BIG  (15~50x):    기존 5-note arpeggio (단, 음량 -3dB) + subBoom
       MEGA (50~200x):   BIG + 추가 옥타브 위 4번째 note + ducking 적용
       EPIC (200x+):     BIG + jing + dokkaebi growl 합성(신규 함수, 80~140Hz growl)

F. playAnticipationSound
   - 현재: jangguRoll + daegeumRise.
   - 변경: heartbeat 추가. 60bpm 으로 60Hz sine pulse 8회 (1초 길이).
       기존 jangguRoll 은 그대로 두되 volume -2dB.
       daegeumRise 는 finalNote pitch +200cent (긴장 강조).

G. playCloseCallSound (near-miss)
   - 현재: buk + 하강 톤.
   - 변경: lowpass-filtered 짧은 whoosh + 저음 thump + "긴 release" tail.
       정보가 명확히 "아쉬운" 하강 인상이어야 함.

H. playScratchPickSound
   - 현재: gayageumPluck + 1320Hz triangle (반복 시 매우 자극적).
   - 변경: 같은 음색이되 1320 → 880Hz로 낮추고 reveal index 별 +30Hz씩만 상승.
       하이톤은 6~7번째 reveal 에서만 잠깐 사용(보상 스케줄).

I. playSoundToggleSound
   - 현재: bellCluster.
   - 변경: 짧은 single bell + 60ms reverb tail. 매번 같은 톤.

[수용 기준 — Phase 3]
□ 14개 이벤트 모두 tier 라벨이 코드 주석에 명시
□ 1~3kHz 발화 총 시간 / sound 가 모두 250ms 이내
□ playWinSound 5개 tier 가 수동 트리거 가능 (debug 훅)
□ 동일 사운드 5초 내 10회 반복 시 fatigue 인상 없음(Phase 4 검증)
□ 마스터 버스 없이 직접 destination 으로 가는 호출 0건
```

---

## Phase 4 — 청각 검증 (실제 듣기 테스트)

```
[목표]
주관 평가가 필수. 대신 객관 메트릭과 절차를 명확히 한다.

[테스트 환경]
- 모바일 스피커(아이폰 + 갤럭시 1대씩)
- 유선 이어폰 (저가 모델 1, 중가 1)
- 외부 스피커 (작은 책상 스피커 1)
- BGM 없음 / 무음 환경.

[테스트 시나리오]
S1. 5분간 자유 플레이 (50+ 스핀, 보너스 1회 포함)
S2. 연속 자동스핀 100회 (사운드 ON 고정)
S3. EPIC 수동 트리거 → 즉시 다음 스핀
S4. 사운드 토글 빠르게 5회 ON/OFF
S5. 마스터 볼륨 0 → 100 슬라이드
S6. 시끄러운 카페 환경 모사(배경 노이즈)에서 5분 플레이

[메트릭]
M1. 클리핑 발생: 0회 (오실로스코프/Web Audio AnalyserNode 로그)
M2. 고역 피크(2~4kHz) 평균: -16dBFS 이하
M3. 1초 내 동시 발화 oscillator 개수 최대값: ≤ 12
M4. 자동스핀 100회 후 사용자 자기보고:
     "이 사운드를 다시 듣고 싶다" 5점 척도 ≥ 3.5
     "귀가 피곤하다" 5점 척도 ≤ 2.0
M5. 사운드 토글 5회 빠른 ON/OFF 시 클릭/팝 노이즈 0건

[수용 기준 — Phase 4]
□ S1~S6 모든 시나리오에서 M1~M5 충족
□ 청각 피로 자기보고 ≤ 2.0 (5점 척도)
□ 한국 전통악기 정체성 인지 ≥ 4.0 (5점 척도)
□ "흥분된다" 자기보고 ≥ 3.8 (5점 척도)
□ 회귀: 기존 호출처 4000+줄에 사운드 함수명 변경 발생 0건
```

---

## 사용 예시

```
[공통 헤더 전체 붙여넣기]

작업: Phase 0 (현황 진단) 만 수행해 주세요.
14개 이벤트 함수 분석표와 동시 발화 위험 조합을 출력하고,
코드는 절대 수정하지 마세요.
```

```
[공통 헤더 전체 붙여넣기]

작업: Phase 1 (마스터 버스) 만 수행해 주세요.
script.js 에 getMasterBus(), createSyntheticIR() 추가하고
모든 oscillator/source 의 destination 을 마스터 버스로 라우팅해 주세요.
사용자 볼륨 슬라이더는 index.html / styles.css 도 함께 수정.
Phase 1 acceptance criteria self-check 결과 보고.
```

```
[공통 헤더 전체 붙여넣기]

작업: Phase 3 의 (E) playWinSound tier 분기만 구현해 주세요.
SMALL/MEDIUM/BIG/MEGA/EPIC 5단계 + debug 훅 추가.
기존 호출처는 그대로 두되, win amount 와 currentBet 로 자동 분기.
```

이 순서로 잘게 시키면 사운드 균형이 깨지지 않으면서
"한국 전통악기 + 도깨비 판타지" 정체성이 유지된 채 청각 피로만 사라집니다.

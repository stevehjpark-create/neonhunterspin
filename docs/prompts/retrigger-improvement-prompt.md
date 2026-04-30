# NEON HUNTER SPIN — 프리게임 리트리거 개선 프롬프트
## "DOKKAEBI ASCENSION" — 누적형 리트리거 시스템

> 이 문서는 현재 단순 가산형 리트리거(`state.bonusSpins += 5`)를
> **프리게임 안에서 점점 강해지는 "Ascension" 시스템**으로 개편하는
> 작업을 다른 AI/엔지니어에게 위임할 때 그대로 사용할 프롬프트입니다.
>
> **반드시 Phase 0(설계 합의) → Phase 1 → 2 → 3 순서로 분할 위임**할 것.
> 한꺼번에 시키면 RTP가 깨질 위험이 큽니다.

---

## 0. 공통 헤더 (모든 Phase 앞에 항상 붙이기)

```
당신은 시니어 게임 수학자 + 프론트엔드 엔지니어입니다.
대상 프로젝트는 클라이언트 전용 PWA 슬롯머신 데모 "NEON HUNTER SPIN"입니다.

[프로젝트 구조]
- index.html         : 마크업
- script.js          : 게임 로직 + 렌더 (~4300줄, 단일 파일)
- styles.css         : 스타일
- service-worker.js  : PWA 캐시
- simulate_rtp.js    : RTP 시뮬레이터 (Node, 단독 실행 가능)

[현재 리트리거 동작 — 변경 대상]
script.js 내부:
- state.bonusSpins, state.expandedBonusSpins (정수 카운터)
- 최초 부여:
    체스트 0(프리게임)  → state.bonusSpins += 10  (chestFreeSpinAward)
    체스트 2(Expand)    → state.expandedBonusSpins += 5
- 프리게임 중 리트리거(line 3780-3782):
    if (bonusTriggered && isFreeSpin) {
      state.bonusSpins += bonusSpinAward;  // +5
    }
- RTP 처리(line 2541-2544):
    targetRtp = isFreeSpin ? bonusFreeSpinTargetRtp : baseGameTargetRtp()
    bonusFreeSpinTargetRtp = 0.32  (리트리거 여부와 무관, 균일 적용)
- 종료 판정: bonusSpins == 0 && expandedBonusSpins == 0 일 때 정산
- freeSpinWinTotal: 프리게임 동안 win 누적, 종료 시 일괄 반영

simulate_rtp.js 내부:
- expectedBonusFreeSpins = bonusSpinAward / (1 - targetBonusTriggerRate * bonusSpinAward)
  = 5 / 0.95 ≈ 5.263 (등비급수 모델)
- 이 값이 RTP 예산(bonusRtpContribution)에 미리 반영됨

[절대 깨면 안 되는 제약]
1. 전체 게임 RTP 분포(베팅 레벨/덴덤별 sim_rtp 결과)가 작업 전 대비 ±0.3pp 이내일 것.
2. "Demo Only / Virtual test points / No real-money" disclaimer 약화 금지.
3. 외부 라이브러리/CDN 추가 금지.
4. 빌드 도구 미사용. Vanilla JS + 기존 코드 스타일 유지(2-space).
5. service-worker.js CACHE_NAME 버전 bump 필수.
6. prefers-reduced-motion 환경에서 신규 애니메이션 비활성화.
7. aria-live 영역 과다 발화 금지(스핀 1회당 최대 1회 권장).
8. innerHTML 신규 도입 시 보간 변수 escape 처리.

[작업 후 항상 출력]
1) 변경 파일과 라인 범위 (diff 형식 권장)
2) RTP 시뮬레이터 실행 결과 (작업 전 / 후 비교 표)
3) 신규 함수/상수 시그니처 목록
4) 회귀 위험 영역 1줄 코멘트
5) Phase별 acceptance criteria self-check 결과
```

---

## Phase 0 — 설계 합의 (코드 변경 없음, 1회만 실행)

```
[목표]
구현 전 수학 모델을 검증하고 사용자(=게임 디자이너) 승인을 받기 위한 단계.

[과제]
1) 아래 "Ascension 시스템 사양"을 읽고 simulate_rtp.js 의 수식 변경안을 글로 제시.
2) 변경 후 예상되는 expectedBonusFreeSpins 값과
   bonusRtpContribution 값을 손계산으로 도출.
3) 만약 RTP가 ±0.3pp 를 초과해 흔들릴 위험이 있다면,
   bonusFreeSpinTargetRtp 또는 multiplier 상한을 어떻게 보정할지 2~3안 제안.

[Ascension 시스템 사양]
A. 멀티플라이어 누적 (핵심)
   - state.freeSpinMultiplier 신규 추가, 초기값 1.
   - 프리게임 진입 시 1로 초기화.
   - 프리게임 도중 리트리거 발생 시:
        리트리거 1회차: multiplier = 2
        리트리거 2회차: multiplier = 3
        리트리거 3회차 이후: multiplier += 1
        상한: 10 (cap)
   - 리트리거된 시점부터의 모든 free spin win 에 multiplier 적용.
   - 즉 freeSpinWinTotal += win * state.freeSpinMultiplier.

B. 추가 프리스핀 부여량 (선택, 기본 OFF)
   - 기본은 매 리트리거 +5 그대로.
   - 옵션: 리트리거 N회차 → +(5 + min(N-1, 3)) 부여 (즉 5/6/7/8 누적).
   - 이 옵션은 Phase 0 합의 시 채택 여부 결정.

C. Ascension 단계별 시각/청각 escalation
   - level 1 (멀티 1): 기존 그대로
   - level 2 (멀티 2): reel-window 가장자리에 옅은 보라 글로우, BGM +1 octave
   - level 3 (멀티 3): 강한 글로우 + 화면 가장자리 vignette, BGM 교체
   - level 4+      : 도깨비 캐릭터 컷씬(0.8s) + 카메라 셰이크 + EPIC 사운드

D. Mega Mode 전환 (선택)
   - 멀티플라이어가 5에 도달하면 남은 모든 free spin이 Expanded 모드로 전환
     (state.expandedBonusSpins += state.bonusSpins; state.bonusSpins = 0).
   - 이 옵션은 Phase 0 합의 시 채택 여부 결정.

E. 종료 정산 보너스
   - 프리게임 종료 시점에 retriggerCount >= 3 이면 freeSpinWinTotal × 1.1 (10% 보너스).
   - 이 보너스는 bonusFreeSpinTargetRtp 산정 시 미리 반영해야 함.

[수용 기준 — Phase 0]
- Ascension 채택안(A 필수, B/D 옵션, E 옵션) 결정안 1줄 정리.
- 변경 후 expectedBonusFreeSpins, bonusRtpContribution, 그리고
  bonusFreeSpinTargetRtp 보정값을 표로 제시.
- 의도한 "리트리거당 평균 윈 배수 증가량" 시뮬레이션 1만 회 견적치(loose).
- 코드 변경은 절대 시작하지 말 것.
```

---

## Phase 1 — 코어 로직 구현 (script.js)

```
[전제]
Phase 0 에서 다음 옵션이 채택되었다고 가정:
- A: 멀티플라이어 누적 (1 → 2 → 3 → +1, cap 10)  [필수]
- B: 추가 프리스핀 가산 변동                        [본 Phase에서는 OFF, +5 고정 유지]
- D: Mega Mode 전환                                  [본 Phase에서는 OFF]
- E: 종료 정산 보너스                                [본 Phase에서는 OFF]

(B/D/E 는 Phase 3 에서 별도 토글로 추가 가능)

[변경 1] 신규 상태 필드
  state.freeSpinMultiplier = 1
  state.retriggerCount = 0
  initial / reset 위치 모두에 추가:
    - createInitialState() 또는 동등 위치
    - cashOut/clear, startDemoCredits, dropCredits, debug awardCash 등에서 0/1로 리셋
    - 이미 state.bonusSpins = 0 으로 초기화하는 모든 자리(현재 6곳 이상)에 동시 추가

[변경 2] 프리게임 진입 시 초기화
  handleChestBonus(state, index) 의 index === 0 분기 (체스트 0):
    state.freeSpinMultiplier = 1
    state.retriggerCount = 0

  Expanded(체스트 2) 진입 시에도 동일하게 1/0 으로 리셋.

[변경 3] 리트리거 시 누적 (script.js:3780-3782 근처)
  현재:
    if (bonusTriggered && isFreeSpin) {
      state.bonusSpins += bonusSpinAward;
    }
  변경:
    if (bonusTriggered && isFreeSpin) {
      state.bonusSpins += bonusSpinAward;
      state.retriggerCount += 1;
      state.freeSpinMultiplier = computeAscensionMultiplier(state.retriggerCount);
    }

  신규 함수:
    function computeAscensionMultiplier(retriggerCount) {
      if (retriggerCount <= 0) return 1;
      if (retriggerCount === 1) return 2;
      if (retriggerCount === 2) return 3;
      return Math.min(10, 3 + (retriggerCount - 2));
    }

[변경 4] 윈 누적에 멀티플라이어 적용 (line 3773-3779 근처)
  현재:
    if (isFreeSpin) {
      state.freeSpinWinTotal += win;
      state.lastWin = state.freeSpinWinTotal;
    } else {
      ...
    }
  변경:
    if (isFreeSpin) {
      const multipliedWin = win * state.freeSpinMultiplier;
      state.freeSpinWinTotal += multipliedWin;
      state.lastWin = state.freeSpinWinTotal;
      // 주의: rtpAdjustedWin() 결과는 그대로 두고, 표시·집계 단계에서만 곱한다.
      //       단, 시뮬레이터(Phase 2)도 같은 위치에서 동일하게 곱해야 정확.
    } else {
      ...
    }

  중요: rtpAdjustedWin 내부의 RTP 보정 수식을 변경하지 말 것.
  멀티플라이어는 "이미 RTP 보정된 win"의 외부에서 곱하는 단순 후처리.

[변경 5] UI 표시
  - els.bonusSpins.textContent 옆 또는 아래에 멀티플라이어 뱃지 표시.
    예: "FREE GAMES: 7  ×3"
  - 멀티플라이어가 1이면 뱃지 숨김.
  - 리트리거가 발생한 직후 0.6초 동안 뱃지가 펄스(.multiplier-pulse 클래스).

[변경 6] 메시지 수정
  현재:
    setMessage(`Retrigger! +${bonusSpinAward} Free Games and ${formatDisplayAmount(win)} added to bonus bank!`, true);
  변경:
    setMessage(
      `ASCENSION LEVEL ${state.freeSpinMultiplier}! +${bonusSpinAward} Free Games. Multiplier ×${state.freeSpinMultiplier} active.`,
      true,
    );
  showReelAmountOverlay 호출의 caption 도 동일 톤으로 변경.

[수용 기준 — Phase 1]
□ 일반 게임에서 보너스 트리거 → 첫 프리스핀에서 멀티 1 (×1, 즉 변화 없음).
□ 프리스핀 중 리트리거 1회 → 다음 스핀부터 멀티 2 적용.
□ 리트리거 2/3/4/5회 → 3/4/5/6 단계 정확.
□ 리트리거 9회 이상 → 10에서 cap.
□ 프리게임 종료 후 일반 스핀에서는 멀티 영향 없음(state 리셋 확인).
□ Expanded 보너스 진입/종료 시에도 멀티/카운터 정상 리셋.
□ debug 훅 awardCash/triggerVaultBonus 호출 후에도 멀티 관련 leak 없음.
□ aria-live: ASCENSION 메시지가 1회만 발화.
```

---

## Phase 2 — RTP 시뮬레이터 보정 (simulate_rtp.js)

```
[목표]
Phase 1 변경에 따른 실제 RTP 변화를 정확히 측정하고,
bonusFreeSpinTargetRtp 를 보정해 전체 베팅 레벨/덴덤별 RTP 가
작업 전 대비 ±0.3pp 이내로 수렴하게 만든다.

[작업 1] 시뮬레이터에 멀티플라이어 적용
- simulate_rtp.js 의 spinOnce(state, ...) 안에서 win 계산 후:
    if (isFreeSpin) {
      const multipliedWin = win * state.freeSpinMultiplier;
      state.returned += multipliedWin;
    } else {
      state.returned += win;
    }
- state 객체에 freeSpinMultiplier, retriggerCount 추가 (runDenom 내부 초기화).
- handleChestBonus(state, index, stats) 의 index === 0 분기에서 1/0 리셋.
- 리트리거 분기에서:
    if (bonusTriggered && isFreeSpin) {
      state.bonusSpins += bonusSpinAward;
      state.retriggerCount += 1;
      state.freeSpinMultiplier = Math.min(10,
        state.retriggerCount === 1 ? 2 :
        state.retriggerCount === 2 ? 3 :
        3 + (state.retriggerCount - 2));
    }

[작업 2] 이론값 산출 (closed-form 추정)
- retriggerProb = targetBonusTriggerRate = 0.01 (per spin in free game)
- E[multiplier per spin] 계산:
    프리스핀 평균 길이 N ≈ 5 / (1 - 0.01*5) = 5.263
    리트리거 발생 분포(기하분포 근사) 기반으로 E[mult] 산출.
    근사식 또는 시뮬레이션으로 도출.
- 새 expectedBonusReturn = E[multiplier] * bonusFreeSpinTargetRtp_old
- 과보정량 = 새 expectedBonusReturn - 기존 expectedBonusReturn

[작업 3] bonusFreeSpinTargetRtp 보정
- 새로운 상수 ascensionAdjustedFreeRtp 도입:
    ascensionAdjustedFreeRtp = bonusFreeSpinTargetRtp / E[multiplier]
- expectedBonusFreeSpins / bonusRtpContribution 계산식에서
  bonusFreeSpinTargetRtp 대신 ascensionAdjustedFreeRtp 사용.
- 이렇게 하면 평균적으로 기존과 같은 RTP 기여를 유지한 채,
  분산(volatility)만 증가시키는 효과 = 사용자 체감 흥분도 ↑.

[작업 4] 검증 시뮬레이션
- paid_spins = 1,000,000 (기존 PAID_SPINS 환경변수 유지)
- 모든 베팅 레벨 × 모든 덴덤 조합에서:
    sim_rtp_변경전 vs sim_rtp_변경후 비교 표 출력
    diff_pp 가 모두 |0.3| 이내인지 self-check
- 추가 통계 출력 (CSV 컬럼 확장):
    avg_retrigger_count
    avg_max_multiplier
    p99_freegame_total_win

[수용 기준 — Phase 2]
□ 모든 (bet × denom) 조합에서 RTP 변화 ±0.3pp 이내.
□ avg_retrigger_count 가 작업 전후 동일(±0.05 이내) — 멀티만 변경했지 트리거율은 안 바꿨음을 검증.
□ p99_freegame_total_win 이 작업 전 대비 +30% 이상 증가 — 분산 증가 확인.
□ script.js 의 bonusFreeSpinTargetRtp 또는 신규 ascensionAdjustedFreeRtp 가
  simulate_rtp.js 와 동일한 값으로 동기화.
□ CSV 출력 형식이 기존과 호환(추가 컬럼은 끝에 append).
```

---

## Phase 3 — 시각/청각 Escalation (선택, 흥분도 ↑)

```
[목표]
Ascension level 별로 화면 분위기와 사운드를 점진 escalation.

[Level 정의]
- Level 1 (mult 1): 변화 없음.
- Level 2 (mult 2): reel-window 가장자리 옅은 보라 글로우(@keyframes ascensionGlowL2).
- Level 3 (mult 3): 강한 글로우 + 화면 가장자리 vignette + BGM filter cutoff +200Hz.
- Level 4 (mult 4~5): vignette 색조가 보라→마젠타로 shift, BGM 교체(고에너지 루프).
- Level 5+ (mult 6+): 도깨비 캐릭터 컷씬 0.8s + 카메라 셰이크 200ms + EPIC 사운드.

[구현 사양]
1) script.js 신규 함수:
     applyAscensionVisual(level)
       — reelWindow 에 .ascension-l2 / .ascension-l3 / .ascension-l4 / .ascension-l5 클래스 토글.
     playAscensionSound(level)
       — 기존 playBonusStartSound() 분기 안에서 level 별 oscillator 합성 다르게.

2) styles.css 추가:
     .reel-window.ascension-l2 { ... }
     .reel-window.ascension-l3 { ... }
     .reel-window.ascension-l4 { ... }
     .reel-window.ascension-l5 { ... }
     @keyframes ascensionGlow { ... }
     .machine.ascension-shake { animation: cameraShake 200ms; }

3) 리트리거 분기에서 호출:
     applyAscensionVisual(state.freeSpinMultiplier);
     playAscensionSound(state.freeSpinMultiplier);
     if (state.freeSpinMultiplier >= 6) showDokkaebiAscensionCutscene();

4) 프리게임 종료 시 모든 ascension 클래스 제거.

[수용 기준 — Phase 3]
□ 5개 level 모두 수동 트리거 가능(debug 훅으로 setMultiplier(N)).
□ prefers-reduced-motion 환경에서 카메라 셰이크 / 컷씬 비활성화, 글로우만 유지.
□ 컷씬은 사용자 탭 시 즉시 스킵.
□ 세션 첫 컷씬 후 두 번째부터는 0.4s 짧은 컷으로 단축(state.dokkaebiCutsceneShown).
□ 일반 스핀으로 돌아왔을 때 모든 시각 효과가 깨끗이 제거됨(class leak 없음).
```

---

## Phase 4 — 옵션 토글 (Phase 0 에서 채택된 것만 활성화)

```
[옵션 B] 리트리거당 추가 프리스핀 가변
- bonusSpinAward 를 함수로:
    function bonusSpinAwardForRetrigger(retriggerCount) {
      return 5 + Math.min(3, Math.max(0, retriggerCount - 1));
    }
- 시뮬레이터도 동일하게 갱신.
- 이 경우 expectedBonusFreeSpins 계산이 등비급수가 아니라 가중 합으로 바뀌므로
  Phase 2 의 ascensionAdjustedFreeRtp 재산출 필요.

[옵션 D] Mega Mode 전환
- state.freeSpinMultiplier === 5 도달 즉시:
    state.expandedBonusSpins += state.bonusSpins;
    state.bonusSpins = 0;
    setMessage("MEGA MODE: Reels Expanded!", true);
- Expanded 모드의 RTP/룰은 기존과 동일(이미 expandedBonusAward 경로 존재).
- 시뮬레이터 보정: Mega 도달 확률 × Expanded RTP 차이만큼 ascensionAdjustedFreeRtp 재산출.

[옵션 E] 종료 정산 보너스
- 프리게임 종료(freeGameEnded) 시점:
    if (state.retriggerCount >= 3) {
      const tail = Math.floor(state.freeSpinWinTotal * 0.1);
      addCredits(tail, true);
      setMessage(`ASCENSION COMPLETE! Bonus tail +${formatDisplayAmount(tail)}`, true);
    }
- 시뮬레이터에서 retriggerCount >= 3 비율 기반으로 RTP 가산분 차감 보정.

[수용 기준 — Phase 4]
□ 채택된 옵션만 켜져 있고, 나머지는 코드에 존재하더라도 비활성(상수 false 가드).
□ 시뮬레이션 결과 RTP ±0.3pp 유지.
□ 옵션 토글은 코드 상단의 const FEATURE_FLAGS 객체로 일괄 관리.
```

---

## 최종 검증 체크리스트 (모든 Phase 완료 후)

```
[수학]
□ simulate_rtp.js 실행 → 모든 (bet × denom) 조합 RTP 변화 ±0.3pp 이내
□ avg_retrigger_count 작업 전후 동일(±0.05)
□ p99_freegame_total_win 작업 전 대비 +20% 이상 증가
□ ascensionAdjustedFreeRtp 가 script.js / simulate_rtp.js 동일 값

[기능]
□ 첫 프리스핀: 멀티 ×1, UI에 뱃지 미표시
□ 리트리거 1·2·3·9회: 멀티 2·3·4·10 (cap)
□ Expanded 모드 진입/종료 시 멀티/카운터 리셋
□ 프리게임 종료 후 일반 스핀에 멀티 영향 없음
□ debug 훅 / cashOut / startDemoCredits 후 state 리셋

[UX]
□ ASCENSION LEVEL N 메시지 1회만 발화
□ 멀티플라이어 뱃지 펄스 0.6s 후 자연 정지
□ Level 5+ 컷씬 스킵 가능
□ prefers-reduced-motion 환경에서 셰이크/컷씬 비활성

[보안 / 위생]
□ 새로 추가한 innerHTML 호출 escape 적용
□ FEATURE_FLAGS 의 옵션 B/D/E 가 simulate_rtp.js 와 동기화
□ service-worker.js CACHE_NAME 버전 bump
□ "Demo Only / Virtual test points" disclaimer 변경 없음
```

---

## 사용 예시

```
[공통 헤더 전체 붙여넣기]

작업: Phase 0 (설계 합의) 만 수행해 주세요.
Ascension 옵션 A는 필수 채택, B/D/E는 의견을 주세요.
RTP 보정 수식과 예상값을 표로 제시하고,
코드는 절대 수정하지 마세요.
```

```
[공통 헤더 전체 붙여넣기]

(Phase 0 합의 결과: A 채택, B/D 미채택, E 채택)

작업: Phase 1 (코어 로직 구현) 만 수행해 주세요.
script.js 외 다른 파일은 건드리지 말고,
Phase 1 acceptance criteria self-check 결과를 보고해 주세요.
```

```
[공통 헤더 전체 붙여넣기]

작업: Phase 2 (RTP 시뮬레이터 보정) 만 수행해 주세요.
simulate_rtp.js 만 수정하고,
변경 전/후 RTP 표를 모든 (bet × denom) 조합에 대해 출력해 주세요.
±0.3pp 초과 시 즉시 멈추고 보정안을 제시해 주세요.
```

이렇게 분리해 시키면 각 단계에서 회귀를 잡을 수 있고,
RTP 무결성 검증이 누락되는 일이 없습니다.

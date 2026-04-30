# NEON HUNTER SPIN — UX 개선 구현 프롬프트

> 이 문서는 슬롯 게임의 "흥분감(excitement)"을 끌어올리는 UX 개선 작업을
> 다른 AI/엔지니어에게 위임할 때 그대로 사용할 수 있는 프롬프트입니다.
> 한 번에 다 시키지 말고 **Phase 1 → 2 → 3 순서로 분할**해 주세요.

---

## 0. 공통 헤더 (모든 Phase 앞에 항상 붙이기)

```
당신은 시니어 프론트엔드 + 게임 UX 엔지니어입니다.
대상 프로젝트는 클라이언트 전용 PWA 슬롯머신 데모 "NEON HUNTER SPIN"입니다.

[프로젝트 구조]
- index.html         : 마크업 (메인 UI, 오버레이, 모달)
- script.js          : 게임 로직 + 렌더 (단일 파일, ~4300줄)
- styles.css         : 스타일
- service-worker.js  : PWA 캐시
- simulate_rtp.js    : RTP 시뮬레이터 (Node)

[기술 스택 / 제약]
- 빌드 도구 없음. Vanilla JS + CSS, ES modules 미사용.
- 외부 라이브러리 추가 금지. CDN 호출 금지.
- 모든 자산은 service-worker.js 의 CORE_ASSETS 에 포함되어야 함.
- 게임은 "데모 전용 / 가상 테스트 포인트"이며 실제 결제·환금이 없어야 함.
  관련 disclaimer 문구를 절대 약화시키지 말 것.
- RTP 수식(rtpAdjustedWin, expectedRawRtp, baseGameTargetRtp)은 변경 금지.
  연출만 추가하고, 실제 당첨 금액 분포는 그대로 유지해야 함.
- 모든 오버레이는 prefers-reduced-motion 미디어쿼리를 존중할 것.
- 접근성: aria-live, aria-hidden 전이를 깨뜨리지 말 것.

[코딩 규칙]
- 들여쓰기는 기존 파일과 동일하게 (script.js 는 2-space).
- 새 함수는 가능하면 기존 인접 함수 바로 아래에 배치.
- innerHTML 새로 도입 시, 보간되는 모든 변수는 escapeHtml() 로 감쌀 것.
- 새 사운드는 Web Audio API 합성으로 생성(파일 추가 금지).
- 새 햅틱 패턴은 navigator.vibrate 배열로 정의.

[작업 후 출력]
1) 변경한 파일과 라인 범위 요약 (diff 형식 권장)
2) 신규 함수 시그니처 목록
3) 검증 체크리스트 결과 (Phase 별 acceptance criteria)
4) 회귀 위험 영역 1줄 코멘트
```

---

## Phase 1 — 즉시 체감 향상 (5개 작업, 합산 2~3일)

> 작업 전 반드시 위 "공통 헤더"를 먼저 읽고 시작하세요.

### Task 1.1 — Tier 별 Big Win 카운트업 애니메이션

```
[목표]
당첨 금액 표시를 "즉시 표시"에서 "0 → 최종액으로 가속 카운트업"으로 변경.

[배경]
현재 script.js 의 showReelAmountOverlay() / freeWinOverlay 갱신은 formatDisplayAmount(value)
로 즉시 최종 금액을 텍스트로 박아넣는다. 이를 보간 애니메이션으로 교체한다.

[구현 사양]
- script.js 에 신규 함수 animateCountUp(element, fromValue, toValue, durationMs, formatter)
  추가. requestAnimationFrame 기반, easeOutExpo 곡선 사용.
- duration 은 win tier 에 따라 가변:
    1~5x  : 0ms (즉시)
    5~15x : 600ms
    15~50x: 900ms
    50~200x: 1400ms
    200x+ : 2200ms (단, 1.5초 시점에 한 번 자릿수 점프 ‘드럼롤’ 효과)
- 카운트업 진행 동안 사운드 피치를 +50cent 씩 상승 (oscillator.frequency.setTargetAtTime).
- 사용자가 카운트업 중 SPIN 또는 화면 탭 시 즉시 최종값으로 스킵.
- prefers-reduced-motion: reduce 일 때는 카운트업 비활성화 (즉시 표시).

[수용 기준]
- 1 BET 당첨에는 변화 없음.
- 100 BET 당첨이 시각적으로 차오르는지 수동 확인.
- 카운트업 중 다른 스핀이 시작되어도 메모리/UI leak 없음(이전 RAF 취소).
- aria-live 가 한 번만 발화되도록 보장 (카운트업 매 프레임 발화 금지).
```

### Task 1.2 — Win Tier 별 차별화된 셀러브레이션 분기

```
[목표]
당첨 배수에 따라 5단계의 시각·청각·햅틱 연출을 분기.

[Tier 정의]
배수 = win / currentBet()
- TIER_QUIET   (1~5x)   : 코인 사운드만, 햅틱 없음
- TIER_NICE    (5~15x)  : 작은 파티클 + 짧은 햅틱 [20,30,20]
- TIER_BIG     (15~50x) : 풀스크린 freeWinOverlay + BGM ducking + 햅틱 [40,30,40,30,120]
- TIER_MEGA    (50~200x): 카메라 줌 인/아웃 (CSS transform), 화면 셰이크
- TIER_EPIC    (200x+)  : 도깨비 캐릭터 애니메이션 컷, BGM 교체, 스킵 가능

[구현 사양]
- script.js 신규 함수 winTier(amount, bet) → "QUIET"|"NICE"|"BIG"|"MEGA"|"EPIC".
- 신규 함수 celebrateWin(amount, bet) 가 tier 에 따라 분기 처리.
  (기존 showReelAmountOverlay 의 win 케이스에서 호출)
- styles.css 에 .tier-mega .tier-epic 클래스 추가, transform/animation 정의.
- 카메라 셰이크는 .machine 에 일시적으로 클래스 부여 (300~600ms).

[수용 기준]
- 모든 tier 가 수동 디버그 훅(window.slotDebug.testTier("EPIC")) 으로 강제 트리거 가능.
  (운영 빌드에서는 setupDebugHooks() 가드 안에 위치)
- 빈 잔액 / 보너스 진입 / 일반 스핀 흐름 모두에서 회귀 없는지 확인.
```

### Task 1.3 — 마지막 릴 슬로우 정지 + 근접 실패(Near-miss) 연출

```
[목표]
릴 1·2 에 스캐터가 떨어졌을 때 마지막 릴(3·4·5)을 천천히 멈춰 기대감을 만든다.

[현재 상태]
- script.js 의 teaseOverlay / recordFeatureTease("scatter") 가 이미 존재.
- 그러나 단순 텍스트 표시 수준. 릴 정지 타이밍은 균일.

[구현 사양]
1) 릴 정지 스케줄러:
   - 신규 함수 computeReelStopDelays(grid, activeReelCount) 가 릴별 정지 지연(ms) 배열을 반환.
   - 기본 지연: [200, 350, 500, 650, 800]
   - 릴 1·2 모두 scatter 포함 & 릴 3·4·5 중 미정지: 릴 3·4·5 지연을 ×1.6 + jitter
   - 릴 1·2 모두 scatter 포함 & 릴 3 까지 scatter: 릴 4·5 지연을 ×2.0 (보너스 임박)
2) 사운드:
   - 평소 릴 정지: 오름 스케일(C-D-E-F-G).
   - Near-miss 모드 진입 시 BGM 볼륨 -6dB ducking, 60bpm 베이스 펄스 추가.
3) 햅틱:
   - 릴 정지마다 [15], 단 마지막 릴(near-miss 모드)은 [60,40,90].
4) 결과 처리:
   - 보너스 미트리거 시: 0.6초 뒤 "SO CLOSE" 마이크로 토스트(이미 teaseOverlay 활용 가능).
   - 보너스 트리거 시: 즉시 vaultBonusIntro 흐름.

[수용 기준]
- 일반 스핀 평균 시간이 1초 이상 늘지 않을 것 (Turbo 모드 제외).
- 자동 스핀 중에도 동일 로직 적용되되, 사용자가 stopAutoSpin 시 즉시 중단 가능.
- 정지 사운드와 시각 정지가 ±50ms 이내로 동기화.
```

### Task 1.4 — 체스트 95%+ 임박 연출

```
[목표]
chestProgress 가 임계값에 가까울수록 사용자가 "곧 터진다"는 것을 느끼게 한다.

[구현 사양]
- styles.css:
    .chest-card.chest-warming  (progress 0.80~0.94): 미세 흔들림(@keyframes shake) + 글로우.
    .chest-card.chest-hot      (progress 0.95+):     강한 펄스 + 가장자리 색 그라디언트.
- script.js updateChestUi(index) 에서 위 클래스 토글 (기존 체스트 상태 머신 재사용).
- 95% 이상에서 매 1.5초마다 저음 "쿵" 사운드(이미 playNoiseBurst 활용 가능).
- 보너스 트리거 순간 화면 흔들림 + 50ms 화이트 플래시 오버레이.

[수용 기준]
- 80% 미만에서는 시각 변화 없음.
- 동시에 여러 체스트가 hot 상태여도 사운드 중첩으로 깨지지 않음(throttle).
```

### Task 1.5 — 잭팟 미터 라이브 틱업

```
[목표]
매 스핀마다 잭팟 금액이 살짝 증가하는 모습을 시각화.

[구현 사양]
- script.js accrueProgressiveJackpots() 호출 직후 updateJackpotUi() 를 호출하되,
  각 잭팟 텍스트를 0.3초 카운트업으로 보간 (Task 1.1 의 animateCountUp 재사용).
- 잭팟 카드에 0.3초 옅은 골드 펄스(.jackpot-tick CSS 애니메이션).
- 베팅 레벨이 클수록 펄스가 더 강하게 보이도록 클래스 분기(low/mid/high).

[수용 기준]
- 카운트업 중 새 스핀이 시작되어도 RAF leak 없음.
- 화면이 비활성 탭일 때는 펄스 스킵(visibilitychange 가드).
```

---

## Phase 2 — 깊이 있는 게임 필 (3개 작업)

### Task 2.1 — 햅틱 패턴 라이브러리화

```
script.js 상단에 HAPTICS 상수 추가:
  const HAPTICS = {
    reelStop: [15],
    smallWin: [20,30,20],
    nearMiss: [60,40,90],
    bigWin:   [40,30,40,30,120],
    jackpot:  [80,50,80,50,80,50,200],
    chestHot: [25,40,25],
  };
모든 navigator.vibrate(...) 호출을 HAPTICS 키 참조로 통일.
사용자 무음 모드여도 햅틱은 동작하도록 분리(state.sound 와 state.haptic 분리).
```

### Task 2.2 — 첫 스핀 후킹 모먼트

```
state.testStats.totalSpins === 0 인 첫 스핀에서:
- 80% 확률로 보장 small win (배수 3~6x)
- 20% 확률로 강제 near-miss (스캐터 1·2 + 마지막 릴 1칸 차이)
- 둘 다 RTP 수식을 깨지 않도록, 첫 스핀에 한해 reelWeights 의 결과를 후처리만 수행
  (당첨 금액은 정상 paytable 로 산출, 분포만 강제)
주의: 이 보장 모먼트는 demo 기간 첫 1회 한정. localStorage("welcomeMomentSeen") 로 lock.
사용자가 두 번째 세션 이후에는 절대 발동되지 않을 것.
```

### Task 2.3 — Auto-Spin 정지 조건 옵션

```
els.autoSpin 메뉴 확장:
- "Stop on any win"
- "Stop on win > $X"  (인풋 필드)
- "Stop on bonus"
- "Stop on balance < $X"
state.autoSpinRules 객체로 관리. canAutoSpin() 안에서 룰 검사.
UI: autoPlay 버튼 길게 누르면 룰 패널 표시(짧게 누르면 시작/중지).
```

---

## Phase 3 — 리텐션 / 내러티브 (선택)

### Task 3.1 — 일일 스트릭 카운터

```
dailyDemoButton 옆에 "🔥 N일 연속" 라벨 추가.
- 자정(local) 기준으로 streak 갱신.
- 1일 누락 시 streak 초기화 + "Streak reset" 토스트.
- 7/14/30일 마일스톤에서 보너스 가상 크레딧 + 도깨비 컷씬.
```

### Task 3.2 — 도깨비 캐릭터 컷씬

```
첫 보너스 진입 시 1.2초 도깨비 등장 컷:
- 반투명 풀스크린 오버레이 + SVG 또는 CSS 만으로 그린 도깨비 일러스트(파일 미사용).
- 스킵 가능(탭 시 즉시 종료).
- 이후 세션에서는 0.4초 짧은 컷으로 자동 단축.
```

### Task 3.3 — 손실 회복(Comeback) 카피

```
state.credits 가 currentBet() 의 3배 미만으로 떨어지면:
- "도깨비가 부활시켜줍니다 🎁" 형태의 zero-credit-cta 메시지 미리 노출.
- 단, 가상 크레딧이라는 점을 동일 카드 안에 작은 글씨로 명시.
```

---

## 검증 체크리스트 (모든 Phase 완료 후 실행)

```
[기능]
□ 일반 스핀 → 카운트업 → 잔액 갱신 흐름 정상
□ 5개 win tier 모두 수동 트리거로 시각/청각/햅틱 확인
□ 마지막 릴 슬로우 정지가 보너스 트리거/미트리거 모두에서 자연스러움
□ 체스트 0/50/85/95/100% 진행 단계 시각 점진 변화
□ 잭팟 미터 매 스핀 미세 카운트업
□ 자동 스핀 정지 룰 4종 모두 동작
□ 첫 스핀 후킹 모먼트는 1회 한정 동작 (localStorage 확인)

[비기능]
□ Lighthouse Performance 점수가 작업 전 대비 -5점 이내
□ prefers-reduced-motion: reduce 환경에서 애니메이션 비활성화
□ aria-live 영역이 1초에 2회 이상 발화되지 않음 (스크린리더 친화)
□ 메모리 leak 없음 (Chrome DevTools Performance 60초 녹화 확인)
□ service-worker.js CACHE_NAME 버전 bump
□ "Demo Only / Virtual test points" disclaimer 문구 변경 없음
□ RTP 시뮬레이터 결과(simulate_rtp.js) 작업 전후 동일

[보안]
□ 새로 추가한 innerHTML 호출에 escapeHtml 적용
□ debug 훅(testTier 등) 은 setupDebugHooks() 가드 안에만 존재
```

---

## 사용 예시 — 한 번에 한 Task 만 시키는 권장 패턴

```
[공통 헤더 전체 붙여넣기]

작업: Phase 1 - Task 1.1 (Tier 별 Big Win 카운트업 애니메이션) 만 구현해 주세요.
완료 후 위 "검증 체크리스트" 의 해당 항목을 self-check 하고 결과를 보고해 주세요.
```

이렇게 잘게 쪼개서 시키면 회귀 위험과 컨텍스트 손실이 최소화됩니다.

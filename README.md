# AutoInspect 데모

AI 1차 판정과 작업자 최종 검토를 연결하는 자동차 부품 품질검사 플랫폼의 **클릭 가능한 데모**입니다.

> 이 프로젝트는 캡스톤디자인 팀 회의용 시연 프로토타입입니다. 실제 AI 모델, 로그인 서버, 데이터베이스, 산업용 카메라 연동은 포함되어 있지 않으며, 모든 데이터는 `src/data/mockData.ts`의 목업 값입니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 터미널에 출력되는 주소(기본값 `http://localhost:5173`)로 접속하면 대시보드 화면이 표시됩니다.

프로덕션 빌드가 필요한 경우:

```bash
npm run build
npm run preview
```

## 사용해 볼 수 있는 흐름

1. **대시보드**에서 오늘의 검사 현황과 최근 7일 불량률 추이를 확인합니다.
2. **새 검사 시작** 버튼을 눌러 새 검사 등록 화면으로 이동합니다.
3. 부품 종류·배치 번호·검사자 이름을 확인하고, `데모 이미지 사용` 버튼으로 이미지를 등록합니다.
4. `AI 분석 시작`을 누르면 약 1.5초의 로딩 후 AI 검사 결과 화면으로 전환됩니다.
5. `정상 확정` / `불량 확정` / `재검 요청` 중 하나를 선택하면 결과 카드 문구와 예상 손실 금액이 즉시 바뀝니다.
6. `판정 저장`을 누르면 저장 완료 토스트가 표시되고, 검사 이력 화면 최상단에 새 결과가 추가됩니다.
7. **검사 이력**에서 검색/필터를 사용해 보고, 행을 클릭하면 상세 정보 모달이 열립니다.
8. **통계 분석**에서 기간(최근 7일 / 최근 30일)을 전환하며 부품별 불량률과 추이, 반복 불량 주의 카드를 확인합니다.

## 기술 스택

- React + Vite + TypeScript
- Tailwind CSS
- recharts (막대/선 그래프)
- 별도 라우팅 라이브러리 없이 최상위 컴포넌트의 state로 화면을 전환합니다.
- 모든 상태는 프론트엔드 메모리(React state)로만 관리되며, 새로고침 시 초기 목업 데이터로 리셋됩니다.

## 폴더 구조

```text
autoinspect-demo/
├── README.md
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── data/mockData.ts
│   ├── types/inspection.ts
│   ├── components/
│   │   ├── layout/ (Sidebar, Header)
│   │   ├── common/ (StatusBadge, Toast, PartImagePlaceholder)
│   │   └── charts/ (DefectTrendChart, PartDefectBarChart)
│   └── screens/ (Dashboard, NewInspection, InspectionResult, InspectionHistory, Statistics)
```

## 범위 밖 항목

실제 Swin Transformer 모델, AI Hub 데이터셋, 사용자 인증, 파일 저장 서버, 제조 설비/카메라 연동, 실제 기업 비용 데이터는 이번 데모에 포함되지 않습니다. 화면에 표시되는 AI 결과와 비용은 모두 데모용 목업 데이터입니다.

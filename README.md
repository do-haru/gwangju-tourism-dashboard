# 광주 관광 데이터 시각화 서비스

## 프로젝트 소개

본 프로젝트는 공공데이터 API를 활용하여 광주 지역 관광 데이터를 수집하고 이를 시각화하여 관광 현황을 직관적으로 확인할 수 있도록 만든 웹 서비스입니다.

관광명소 유형, 방문자 수 상위 지역, 지역별 방문자 변화 등을 차트 형태로 제공하여 관광 데이터 분석과 활용이 가능하도록 구현하였습니다.

---

## 주요 기능

### 관광명소 유형 분석

- 관광명소 유형별 비율 시각화
- 카테고리 선택 시 세부 카테고리 분석
- 관광지 목록 확인 가능

### 방문자 수 상위 관광지

- 자치구 및 연도 선택 기능
- 방문자 수 기준 TOP5 관광지 확인

### 지역별 방문자 변화

- 자치구 및 관광지 선택 기능
- 연도별 방문자 수 변화 확인

---

## 기술 스택

### Frontend

- React
- HTML
- JavaScript
- CSS

### Data Visualization

- Recharts

### Data Source

- 공공데이터포털 Open API

---

## 프로젝트 실행 방법

### 1. 저장소 클론

```bash
git clone https://github.com/do-haru/gwangju-tourism-dashboard.git
```

### 2. 프로젝트 디렉토리 이동

```bash
cd gwangju-tourism-dashboard
```

### 3. 패키지 설치

```bash
npm install
```

### 4. 개발 서버 실행

```bash
npm run dev
```

### 5. 웹 브라우저 접속

```
http://localhost:5173
```

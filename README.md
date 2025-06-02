
# 트매
![Image](https://github.com/user-attachments/assets/333474a6-8ff3-4d36-897b-a46d5484a25a)
2024.10 ~ 2024.11 (2주)

## 개요

AI LLM을 활용한 음성 대화 트립 매니징 서비스

## 팀 규모

2명

## 기여도

50%

## 역할

팀장 / 프로젝트 기획 및 총괄  / UI 디자인 및 개발 / 네이버 로그인 및 회원가입 DB 구축 /  STT 및 음성 대화 시스템 개발 / 음성 대화 WebSocket 연동 개발 / TMap 연동 및 내비게이션 기능 개발 

## 기술 스택

![Image](https://github.com/user-attachments/assets/4283fc8e-5318-465b-a9df-dda4713c3548)
Vue3, JavaScript, HTML, CSS
Spring Data JPA, MyBatis, redis, Docker
Spring Boot, JPA, MySQL
Spring AI, Open AI, Google Cloud
Vuetify, Pinia
TMap / 네이버 아이디로 로그인

## 협업 툴

GitHub, Mattermost, Notion

## 결과/성과

- 자연스러운 AI와의 음성 대화 구현
- 소리 크기 인식, 멈춤 기능, 무음 인식, 발음 교정 인식 구현
- 실제 실시간 지도 정보를 통한 최적 루트 안내
- Vue3를 이용한 웹앱의 UI / UX 디자인 및 구현

## 트러블 슈팅

### **🔹** STT 기능을 AI를 사용하고 RestAPI를 사용할 경우 딜레이 과다 발생

- STT를 브라우저 내장 기능으로 사용하되, 무음 인식 교정 컴포넌트 추가 구현
- RestAPI 대신 WebSocket을 이용해 속도 최적화

### **🔹** WebSocket으로 소리와 JSON을 동시에 보낼 경우 Spring 핸들러 미인식 오류

- STT : FE단에서 처리하고 TextMessage만 BE로 전송
- TTS :  BianaryMessage를 AudioBlob 형식으로 전송함과 동시에 해당 Json을 TextMessage로 전송한 뒤 싱크 맞추기 작업 추가

### **🔹** 프롬프트가 길 경우 Open AI 타임 아웃 이슈 발생

- 프롬프트 엔지니어링을 이용한 토큰 최적화
- 실제로 다루는 메시지의 가공을 통한 토큰 수 최적화

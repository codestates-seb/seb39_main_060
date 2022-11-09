# MOCCO

<p align="center">
  <br>
  <img src="https://user-images.githubusercontent.com/44027393/194739038-64222bf0-0709-4d0b-b624-7ad43f8a90b1.png">
  <br>
</p>

<br>

## 프로젝트 개요

<br>

### 프로젝트 진행 기간

- 2022년 9월 7일 ~ 10월 12일

<br>

### 프로젝트 소개

<p>
&nbsp;저희는 '모두 모여서 코딩'과 모임의 순 우리말인 모꼬지를 합쳐 서비스의 이름을 모꼬로 정했습니다. 모꼬는 온라인 상에서 같은 코딩 주제를 공부하는 스터디원과 스터디를 진행하고, 서로의 결과물을 확인할 수 있는 서비스입니다.
</p>
<p>
&nbsp;주제를 선택한 이유는 평소 코딩스터디를 진행하며 동기부여를 돕는 서비스가 필요했지만, 기존 스터디 플랫폼들은 대부분 스터디원을 모집하는 기능이 전부여서 아쉬웠습니다.
저희는 스터디원을 모집한다는 플랫폼의 성격에, 스터디에 몰입할 수 있는 기능들을 보완하여 새로운 스터디 서비스를 기획하였고, 누구나 즐겁게 공부 할 수 있고 유저 경험을 향상 시킬 수 있는 캐릭터를 사용한 서비스를 개발하게 되었습니다.
</p>

<p align="center">
</p>

<br>

### 팀원 소개

|                                                                    허세라                                                                     | 이원준 | 박서희 | 이승미 | 이충안 | 김도연 |
|:------------------------------------------------------------------------------------------------------------------------------------------:| :----: | :----: | :----: | :----: | :----: |
| <img src="https://user-images.githubusercontent.com/44027393/194739169-2bc2a6e6-53c4-4607-bce3-c8c4f719ae00.png" width="100" height="100"> |  <img src="https://user-images.githubusercontent.com/44027393/194739205-81e78f73-7d69-49b2-b82d-25c1ad4f3a7d.png" width="100" height="100">  |  <img src="https://user-images.githubusercontent.com/44027393/194739269-9afb4376-8283-4681-a8a9-5f82800a87cc.png" width="100" height="100">  |  <img src="https://user-images.githubusercontent.com/44027393/194739310-57f93866-b630-40ae-91a5-a1932783739c.png" width="100" height="100">  |  <img src="https://user-images.githubusercontent.com/44027393/194793823-07c9eca2-5285-4bcc-bb45-f86a2ba2e8ac.png" width="100" height="100">  |  <img src="https://user-images.githubusercontent.com/44027393/194794032-255da6c2-b180-45cb-b1fb-7322f653efae.png" width="100" height="100">  |
|                                                                     FE                                                                     |   FE   |   FE   |   FE   |   BE   |   BE   |


<br>

## 📚 기술 스택
<p align="center">
<img src="https://user-images.githubusercontent.com/44027393/194488550-2fe01f27-2303-4ca8-b8a6-457665025c36.png" width="855" height="600">
<p/>

<br>

## 📚 프로젝트 관리 툴

<div>
  <img src="https://user-images.githubusercontent.com/44027393/195010811-433477e9-d993-4985-9240-6cac8c8a4fa2.png" width="75" height="75">
  <img src="https://user-images.githubusercontent.com/44027393/195010895-7b88e404-77c2-4725-8d98-f55d63805a1e.png" width="75" height="75">
  <img src="https://user-images.githubusercontent.com/44027393/195010722-3e443a6b-a4de-48ac-bbbd-a3683a9aa9d7.png" width="75" height="75">
</div>


<br>

## 구현 기능
<p align="center">
<img src="https://user-images.githubusercontent.com/44027393/194496679-a8e29933-18d4-4465-8a05-d56febe12378.gif" width="700" height="236"/>
</p>

<br>

<details>
<summary>회원가입</summary>
<div markdown="1">
<ul>
<li>닉네임 중복여부, 이메일 중복여부, 입력한 비밀번호가 같은지 확인 할 수 있다</li>
<li>회원가입 시 로그인 페이지로 이동한다.</li>
<p align="center">
<img src="https://user-images.githubusercontent.com/44027393/194739839-7aff7bea-7f8c-4a43-be9e-e2e5f40311c2.gif" width="600" height="600"/>
</p>
</ul>
</div>
</details>

<details>
<summary>로그인</summary>
<div markdown="1">
<ul>
<li>ID, PW가 일치하면 JWT 토큰 발행한다.</li>
<li>로그인 시 마이페이지로 이동한다.</li>
<li>github 소셜 로그인 기능.</li>
<li>비밀번호를 잃어버렸을시 비밀번호를 찾을 수 있다.</li>
<p align="center">
<img src="https://user-images.githubusercontent.com/44027393/194740031-df1e5a29-008d-452e-8658-a16867014fe5.gif" width="600" height="600"/>
</p>
</ul>
</div>
</details>

<details>
<summary>마이페이지 / Github 연동</summary>
<div markdown="1">
<ul>
<li>회원정보수정 페이지에서 수정된 유저정보, 현재 진행중인 스터디, 완료된 스터디를 슬라이드로 볼 수 있다.</li>
<li>Github 소셜로그인하지 않은 유저도 마이페이지에서 Github 연동을 하여 해당 유저의 repository(개인저장소), contributions(잔디)를 가져와 표기할 수 있다.</li>
<p align="center">
<img src="https://user-images.githubusercontent.com/44027393/194740102-250c3638-9f27-42b9-ad83-7661f8e8e9e1.gif" width="600" height="600"/>
</p>
</ul>
</div>
</details>

<details>
<summary>스터디 모집 리스트 조회</summary>
<div markdown="1">
<ul>
<li>현재 모집중인 스터디를 카드 형식으로 볼 수 있다.</li>
<li>스크롤이 일정 부분 아래로 도달할 경우 다음 데이터를 볼 수 있다.</li>
<p align="center">
<img src="https://user-images.githubusercontent.com/44027393/194740194-d7f5f28a-56a6-44f9-a3dc-ef204cfa70c0.gif" width="600" height="600"/>
</p>
</ul>
</div>
</details>

<details>
<summary>스터디 상세 페이지</summary>
<div markdown="1">
<ul>
<li>스터디 관련 정보를 볼 수 있고, 댓글 및 대댓글 작성과 스터디 신청이 가능하다.</li>
<p align="center">
<img src="https://user-images.githubusercontent.com/44027393/194740272-82eb1243-ea9f-4e59-af9b-4a167a50c36a.gif" width="600" height="600"/>
</p>
</ul>
</div>
</details>

<details>
<summary>스터디 진행 메인 페이지</summary>
<div markdown="1">
<ul>
<li>애니메이션을 통해 스터디원이 날짜에 맞춰 정해진 목표를 수행 했는지 알 수 있다.</li>
<li>다른 팀원의 진도율과 수행 기한 대비 나의 달성률을 시각적으로 알 수 있다.</li>
<p align="center">
<img src="https://user-images.githubusercontent.com/44027393/194740365-c4625a23-ec8b-462d-948a-ae5f3a5f993c.gif" width="600" height="600"/>
</p>
</ul>
</div>
</details>

<details>
<summary>스터디 인증 기능</summary>
<div markdown="1">
<ul>
<li>해당 스터디에서 작업해야 하는 일들을 인증할 수 있다.</li>
<li>인증 후에 스터디 진행 페이지로 돌아오면서 애니메이션이 일어난다.</li>
<p align="center">
<img src="https://user-images.githubusercontent.com/44027393/194740381-52d40d7c-9638-4dbd-b986-b06be8ab01d1.gif" width="600" height="600"/>
</p>
</ul>
</div>
</details>

<details>
<summary>스터디 평가 기능</summary>
<div markdown="1">
<ul>
<li>스터디가 종료된 후에 같은 스터디원들을 평가할 수 있다.</li>
<li>각 평가 수치는 멤버 별로 평점에 반영되어 마이페이지에 노출된다.</li>
<p align="center">
<img src="https://user-images.githubusercontent.com/44027393/194740390-41457be9-eac6-426d-8acb-f98ba84cc8ab.gif" width="600" height="600"/>
</p>
</ul>
</div>
</details>

<details>
<summary>알람 기능</summary>
<div markdown="1">
<ul>
<li>스터디 신청 승인, 스터디 오픈 등 특정 이벤트마다 알람이 전송된다.</li>
<li>따로 새로고침하지 않고도 알림을 볼 수 있다.</li>
<p align="center">
<img src="https://user-images.githubusercontent.com/44027393/194740395-07936b02-59a6-46a7-9d5b-1bece3ae34f7.gif" width="600" height="367"/>
</p>
</ul>
</div>
</details>

<br>

## [접속 링크](https://mocco.kr)

- 22.10.12 ~ 23.04.12 동안 배포 유지 예정
  - 스터디 확인용 계정
    - ID : MoccoWorld@gmail.com
    - PW : mocco1234!
    - 테스트용 계정으므로 임의로 데이터 변경이 불가합니다. 눈으로만 봐주세요~
  - [Slido](https://app.sli.do/event/cA9fTYyYmArdXv6xhyYEfH/live/questions)
    - Mocco 서비스를 사용하신 후 Slido에 피드백을 남겨주세요.
    - 피드백을 남겨주시면 저희 서비스 개선에 큰 도움이 됩니다.
    - 피드백 기간 10/11 ~ 18
    
<br>

## 👀 [WIKI 보러가기](https://github.com/codestates-seb/seb39_main_060/wiki)

<br>

## 추후 계획

### FE
  - 코드 리팩토링
  - UI / UX 개선

### BE 
  - 테스트 코드 작성
  - 코드 리팩토링
  - github Actions를 이용한 자동 배포 구현 (완료)
  - 서버 접속 로그 기록 (완료)

<br>

## 라이센스

- MIT &copy;

https://github.com/YeonHongLee/PetinPocket

# Pet in Pocket

유기동물 입양 및 나눔 커뮤니티 웹사이트입니다.

## 페이지 구성
- **메인페이지**: 전체 흐름과 기능을 한눈에 볼 수 있으며, 추천 콘텐츠와 카테고리별 바로가기 제공
- **정보제공**: 카드뉴스 형식으로 초보자를 위한 양육 정보 제공
- **입양 페이지**: 지역, 품종 필터링 및 신청 기능
- **커뮤니티**: 강아지, 고양이, 꿀팁, 자유게시판으로 구성. 사진 첨부, 좋아요, 댓글 기능
- **나눔 페이지**: 사료, 장난감, 하우스, 위생용품 등 비판매 자원 나눔 기능

## 주요 기술
- HTML, CSS, JavaScript
- 반응형 웹 (미디어 쿼리)
- 카드형 UI, 필터링, 좋아요/찜/팝업 기능 포함

## 파일 설명

### 입양 관련
- `adopt.html`: 유기견/묘 목록 및 필터링 UI
- `adopt_detail.html`: 개별 동물 상세 정보 페이지
- `adopt.js`: 입양 페이지 기능 처리 (필터, 신청 등)
- `adopt.css`: 입양 페이지 스타일

### 커뮤니티 관련
- `community_category.html`: 커뮤니티 카테고리 선택 페이지
- `community_dog.html`: 강아지 게시판 페이지
- `community_cat.html`: 고양이 게시판 페이지
- `community_tip.html`: 꿀팁 게시판 페이지
- `community_free.html`: 자유 게시판 페이지
- `community.js`: 게시글 작성, 좋아요, 댓글 처리
- `community.css`: 커뮤니티 스타일

### 회원 인증 및 마이페이지
- `login.html`: 로그인 화면 페이지
- `signup.html`: 회원가입 화면 페이지
- `findpw.html`: 비밀번호 찾기 페이지
- `auth.js`: 로그인/회원가입 기능 처리
- `auth.css`: 회원 인증 관련 스타일
- `mypage.html`: 마이페이지 (내 정보/내 게시물 등)
- `mypage.js`: 마이페이지 기능 처리

### 정보제공
- `info.html`: 반려동물 기초 정보 제공 페이지
- `info.js`: 탭 전환, 토글 기능
- `info.css`: 정보 페이지 스타일

### 나눔 기능
- `share.html`: 사료·용품 나눔 게시판 페이지
- `share.js`: 나눔 글 작성 및 필터 기능
- `share.css`: 나눔 페이지 스타일

### 공통 파일
- `index.html`: 메인 페이지
- `style.css`: 전체 공통 스타일
- `script.js`: 공통 기능 처리 (헤더 등)

// 한 번에 보이는 개수
const itemsPerPage = 6;
const loadedCount = {};

// 전체 카테고리 데이터
const categoryData = {
 food: [
    { title: "DAEJEO 강아지사료! 나눔합니다", img: "./images/pip_share/snack1.jpg", type: "dog" },
    { title: "스마일 독 사료 소분 나눔해요~", img: "./images/pip_share/snack2.jpg", type: "dog" },
    { title: "로얄 캐닌 소형견용 사료나눔", img: "./images/pip_share/snack3.jpg", type: "dog" },
    { title: "생협함께 반려견사료 나눔합니다", img: "./images/pip_share/snack4.jpg", type: "dog" },
    { title: "리얼 사료 나눔", img: "./images/pip_share/snack5.jpg", type: "dog" },
    { title: "벨릭서 고양이 사료 나눔해요", img: "./images/pip_share/snack6.jpg", type: "cat" },
    { title: "9나인케어 2박스 있습니다", img: "./images/pip_share/snack7.jpg", type: "cat" },
    { title: "2세이상 강아지사료", img: "./images/pip_share/snack8.jpg", type: "dog" },
    { title: "유기농사료 5개 나눔", img: "./images/pip_share/snack9.jpg", type: "dog" },
    { title: "연어사료4개 나눔해요", img: "./images/pip_share/snack10.jpg", type: "cat" },
    { title: "bonacibo 나눔", img: "./images/pip_share/snack11.jpg", type: "dog" },
    { title: "프로틴사료 2kg 3개 있습니", img: "./images/pip_share/snack12.jpg", type: "cat" },
    { title: "매일맘마 화식 나눔해요", img: "./images/pip_share/snack13.jpg", type: "cat" },
    { title: "velixer 소분 나눔", img: "./images/pip_share/snack14.jpg", type: "cat" },
    { title: "true origin  2버전 나눔합니당", img: "./images/pip_share/snack15.jpg", type: "dog" }
  ],
  toy: [
    { title: "노즈워크볼 나눔해요!!", img: "./images/pip_toy/toy1.jpeg", type: "dog" },
    { title: "움직이는 인형", img: "./images/pip_toy/toy2.jpeg", type: "dog" },
    { title: "강아지용 장난감 나눔합니다", img: "./images/pip_toy/toy3.jpeg", type: "dog" },
    { title: "주물럭 장난감입니당", img: "./images/pip_toy/toy4.jpeg", type: "dog" },
    { title: "노즈워크 강아지 간식장난감", img: "./images/pip_toy/toy5.jpeg", type: "dog" },
    { title: "고양이장난감 나눔해요", img: "./images/pip_toy/toy6.jpeg", type: "cat" },
    { title: "고양이 장난감 나눔합니다", img: "./images/pip_toy/toy7.jpeg", type: "cat" },
    { title: "귀여운 인형 새제품 나눔 ", img: "./images/pip_toy/toy000.jpg", type: "dog" },
    { title: "창의력발달용 장난감", img: "./images/pip_toy/toy9.jpeg", type: "cat" },
    { title: "소리나는 장난감 나눔해요", img: "./images/pip_toy/toy10.jpeg", type: "dog" },
    { title: "강아지 노즈워크 플레이보드", img: "./images/pip_toy/toy11.jpeg", type: "dog" },
    { title: "강아지 인형 나눔합니다", img: "./images/pip_toy/toy12.jpeg", type: "dog" },
    { title: "곰돌이 장난감 새제품나눔", img: "./images/pip_toy/toy13.jpeg", type: "cat" },
    { title: "원반 장난감 나눔해용", img: "./images/pip_toy/toy14.jpeg", type: "dog" },
    { title: "소리나는 자동 전자장난감", img: "./images/pip_toy/toy15.jpeg", type: "dog" },    
  ],
  house: [
    { title: "고양이 병아리집 나눔합니당", img: "./images/pip_house/house1.jpeg", type: "cat" },
    { title: "원목 강아지집 나눔", img: "./images/pip_house/house2.jpeg", type: "dog" },
    { title: "폭신 폭신 분홍집", img: "./images/pip_house/house3.jpeg", type: "dog" },
    { title: "네모 쿠션강아지집 새제품", img: "./images/pip_house/house4.jpeg", type: "dog" },
    { title: "라운드쿠션 강아지집나눔해요", img: "./images/pip_house/house5.jpeg", type: "dog" },
    { title: "소형묘견 전용 집 나눔", img: "./images/pip_house/house6.jpeg", type: "cat" },
    { title: "고양이 병아리집", img: "./images/pip_house/house7.jpeg", type: "cat" },
    { title: "라운드쿠션 강아지집나눔!!", img: "./images/pip_house/house8.jpeg", type: "dog" },
    { title: "원목 강아지집 나눔해용", img: "./images/pip_house/house9.jpeg", type: "dog" },
    { title: "핑크 강아지 집 나눔합니다", img: "./images/pip_house/house10.jpeg", type: "dog" },
    { title: "네모 쿠션강아지집 나눔", img: "./images/pip_house/house11.jpeg", type: "dog" },
    { title: "소형묘견 전용 집 나눔", img: "./images/pip_house/house12.jpeg", type: "cat" },
    { title: "고양이 병아리집 나눔해요!!", img: "./images/pip_house/house13.jpeg", type: "cat" },
    { title: "원목 강아지집 나눔", img: "./images/pip_house/house14.jpeg", type: "dog" },
    { title: "강아지 집 나눔!", img: "./images/pip_house/house15.jpeg", type: "dog" },
  ],
  hygiene: [
    { title: "강아지 새칫솔 나눔해요", img: "./images/pip_hy/hy1.jpeg", type: "dog" },
    { title: "강아지용 물티슈 3박스 나눔", img: "./images/pip_hy/hy2.jpeg", type: "dog" },
    { title: "고양이 놀이 패드 ", img: "./images/pip_hy/hy3.jpeg", type: "cat" },
    { title: "강아지 치석제거용 치약 나눔합니다", img: "./images/pip_hy/hy4.jpeg", type: "dog" },
    { title: "강아지 탈취제 무료나눔", img: "./images/pip_hy/hy5.jpeg", type: "dog" },
    { title: "고양이 모래 새제품나눔해용", img: "./images/pip_hy/hy6.jpeg", type: "cat" },
    { title: "강아지 새칫솔 나눔해요", img: "./images/pip_hy/hy7.jpeg", type: "dog" },
    { title: "강아지용 물티슈나눔!", img: "./images/pip_hy/hy8.jpeg", type: "dog" },
    { title: "고양이 놀이 패드 나눔해용", img: "./images/pip_hy/hy9.jpeg", type: "cat" },
    { title: "강아지 치석제거용 치약", img: "./images/pip_hy/hy10.jpeg", type: "dog" },
    { title: "강아지 탈취제 나눔", img: "./images/pip_hy/hy11.jpeg", type: "dog" },
    { title: "고양이 모래 새제품나눔해용", img: "./images/pip_hy/hy12.jpeg", type: "cat" },
    { title: "강아지 새칫솔 나눔해요!", img: "./images/pip_hy/hy13.jpeg", type: "dog" },
    { title: "고양이 놀이 패드 ", img: "./images/pip_hy/hy14.jpeg", type: "cat" },
    { title: "고양이 모래 새제품 나눔!", img: "./images/pip_hy/hy15.jpeg", type: "cat" },
  ],
  etc: [
    { title: "사료보관통 나눔합니다", img: "./images/pip_etc/etc1.jpg", type: "dog" },
    { title: "강아지 식기 나눔", img: "./images/pip_etc/etc2.jpg", type: "dog" },
    { title: "고양이 옷걸이 행거 나눔해요 ", img: "./images/pip_etc/etc3.jpg", type: "cat" },
    { title: "강아지 이동가방 나눔", img: "./images/pip_etc/etc4.jpg", type: "dog" },
    { title: "강아지 식기 색별로 있어요", img: "./images/pip_etc/etc5.jpg", type: "dog" },
    { title: "강아지 펫캠 나눔", img: "./images/pip_etc/etc6.jpg", type: "dog" },
    { title: "사료보관통 나눔합니다", img: "./images/pip_etc/etc7.jpg", type: "dog" },
    { title: "강아지 식기 나눔", img: "./images/pip_etc/etc8.jpg", type: "dog" },
    { title: "고양이 옷걸이 행거 나눔", img: "./images/pip_etc/etc9.jpg", type: "cat" },
    { title: "강아지 이동가방 나눔", img: "./images/pip_etc/etc10.jpg", type: "dog" },
    { title: "강아지 펫캠 나눔", img: "./images/pip_etc/etc11.jpg", type: "dog" },
    { title: "사료보관통 나눔합니다", img: "./images/pip_etc/etc12.jpg", type: "cat" },
    { title: "강아지 식기 나눔", img: "./images/pip_etc/etc13.jpg", type: "dog" },
    { title: "고양이 옷걸이 행거 나눔해요", img: "./images/pip_etc/etc14.jpg", type: "cat" },
    { title: "강아지 식기 색별로 있어요", img: "./images/pip_etc/etc15.jpg", type: "dog" },
  ]
};

// 카드 생성 함수
function renderItems(category, count = itemsPerPage) {
  const grid = document.querySelector(`.item-grid[data-category="${category}"]`);
  if (!grid) return;

  const items = categoryData[category];
  const start = loadedCount[category] || 0;
  const end = start + count;
  const slice = items.slice(start, end);

  slice.forEach(item => {
    const card = document.createElement("div");
    card.className = "item-card";

    const type = item.type || "dog";
    const emoji = type === "dog" ? "🐶" : "🐱";
    const commentCount = Math.floor(Math.random() * 10) + 1;
    const likeCount = Math.floor(Math.random() * 30) + 1;

    card.setAttribute("data-type", type);
    card.setAttribute("data-extra", start >= itemsPerPage ? "true" : "false");

    card.innerHTML = `
      <div class="item-label" style="font-size: 24px;">${emoji}</div>
      <img src="${item.img}" alt="${item.title}">
      <h3>${item.title}</h3>
      <div class="item-meta">
        <span class="comment">🗨️ ${commentCount}</span>
        <span class="like">💖 <span class="like-count">${likeCount}</span></span>
        <span class="claim" style="cursor: pointer;">📦</span>
      </div>
    `;

    // 찜 수 증가
    card.querySelector(".like").addEventListener("click", () => {
      const countSpan = card.querySelector(".like-count");
      countSpan.textContent = parseInt(countSpan.textContent) + 1;
    });

    // 나눔담기 팝업
    card.querySelector(".claim").addEventListener("click", () => {
      const popup = document.createElement("div");
      popup.className = "popup-message";
      popup.textContent = "나눔 담기에 추가되었습니다!";
      document.body.appendChild(popup);
      setTimeout(() => popup.remove(), 2000);
    });

    grid.appendChild(card);
  });

  loadedCount[category] = end;

  const btn = document.querySelector(`.more-btn[data-category="${category}"]`);
  if (end >= items.length) {
    btn.textContent = "축소하기";
    btn.setAttribute("data-action", "collapse");
  } else {
    btn.textContent = "더보기";
    btn.setAttribute("data-action", "expand");
  }

  if (items.length <= itemsPerPage) {
    btn.style.display = "none";
  }

  applyFilter();
}

// 축소 기능
function collapseItems(category) {
  const grid = document.querySelector(`.item-grid[data-category="${category}"]`);
  const extraCards = grid.querySelectorAll('.item-card[data-extra="true"]');
  extraCards.forEach(card => card.remove());
  loadedCount[category] = itemsPerPage;

  const btn = document.querySelector(`.more-btn[data-category="${category}"]`);
  btn.textContent = "더보기";
  btn.setAttribute("data-action", "expand");

  applyFilter();
}

// 더보기 버튼 이벤트 연결
function setupMoreButtons() {
  const buttons = document.querySelectorAll(".more-btn");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const cat = button.dataset.category;
      const action = button.getAttribute("data-action");
      if (action === "collapse") {
        collapseItems(cat);
      } else {
        renderItems(cat);
      }
    });
  });
}

// 필터링 적용
function applyFilter() {
  const filter = document.getElementById("pet-filter");
  const selected = filter?.value || "all";

  const allCards = document.querySelectorAll(".item-card");
  allCards.forEach(card => {
    const type = card.getAttribute("data-type");
    card.style.display = (selected === "all" || selected === type) ? "block" : "none";
  });
}

// 초기 실행
window.addEventListener("DOMContentLoaded", () => {
  Object.keys(categoryData).forEach(cat => renderItems(cat));
  setupMoreButtons();

  const petFilter = document.getElementById("pet-filter");
  if (petFilter) {
    petFilter.addEventListener("change", applyFilter);
  }

  // Top 버튼
  const topBtn = document.createElement("button");
  topBtn.id = "top-btn";
  topBtn.innerHTML = "▲";
  document.body.appendChild(topBtn);

  window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 600 ? "block" : "none";
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 팝업 스타일
  const style = document.createElement("style");
  style.textContent = `
    .popup-message {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #333;
      color: white;
      padding: 10px 20px;
      border-radius: 6px;
      z-index: 2000;
      font-size: 14px;
      animation: fadeOut 2s ease forwards;
    }

    @keyframes fadeOut {
      0% { opacity: 1; }
      80% { opacity: 1; }
      100% { opacity: 0; top: 0px; }
    }
  `;
  document.head.appendChild(style);
});


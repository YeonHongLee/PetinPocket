// 더미 아이템 생성
const dummyItems = (category, count = 30) => {
  const items = [];
  for (let i = 1; i <= count; i++) {
    items.push({
      title: `${category} 물품 ${i}`,
      img: "https://via.placeholder.com/150"
    });
  }
  return items;
};

// 카테고리별 더미 데이터
const categoryData = {
  food: dummyItems("사료"),
  toy: dummyItems("장난감"),
  house: dummyItems("하우스"),
  hygiene: dummyItems("위생용품"),
  etc: dummyItems("기타")
};

const itemsPerPage = 9;
const loadedCount = {};

// 🐾 강아지/고양이 중 랜덤 하나 선택
function getRandomEmoji() {
  return Math.random() < 0.5 ? '🐶' : '🐱';
}

// 카드 렌더링
function renderItems(category) {
  const grid = document.querySelector(`.item-grid[data-category="${category}"]`);
  if (!grid) return;

  const items = categoryData[category];
  const start = loadedCount[category] || 0;
  const end = start + itemsPerPage;
  const slice = items.slice(start, end);

  slice.forEach(item => {
    const card = document.createElement("div");
    card.className = "item-card";

    // 랜덤 이모지 및 타입 지정
    const emoji = getRandomEmoji();
    const type = emoji === '🐶' ? 'dog' : 'cat';
    card.setAttribute("data-type", type);

    card.innerHTML = `
      <div class="item-label">${emoji}</div>
      <img src="${item.img}" alt="${item.title}">
      <h3>${item.title}</h3>
    `;

    grid.appendChild(card);
  });

  loadedCount[category] = end;

  // 더 이상 항목 없으면 버튼 숨기기
  if (end >= items.length) {
    const btn = document.querySelector(`.more-btn[data-category="${category}"]`);
    if (btn) btn.style.display = "none";
  }
}

// 더보기 버튼 설정
function setupMoreButtons() {
  const moreButtons = document.querySelectorAll(".more-btn");
  moreButtons.forEach(button => {
    button.addEventListener("click", () => {
      const cat = button.dataset.category;
      renderItems(cat);
      applyFilter(); // 새로 추가된 카드에도 필터 적용
    });
  });
}

// 필터 적용 함수
function applyFilter() {
  const petFilter = document.getElementById("pet-filter");
  if (!petFilter) return;

  const selected = petFilter.value;
  const allCards = document.querySelectorAll(".item-card");

  allCards.forEach(card => {
    const type = card.getAttribute("data-type");
    if (selected === "all" || type === selected) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// 초기 실행
window.addEventListener("DOMContentLoaded", () => {
  Object.keys(categoryData).forEach(cat => renderItems(cat));
  setupMoreButtons();

  // 네비 이동 처리
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (href && href !== "#") {
        window.location.href = href;
      }
    });
  });

  // 필터 변경 시 적용
  const petFilter = document.getElementById("pet-filter");
  if (petFilter) {
    petFilter.addEventListener("change", applyFilter);
  }

  applyFilter(); // 초기 필터 적용
});

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



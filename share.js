// 더미 아이템 생성 (title + image)
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

// 카테고리 데이터
const categoryData = {
  food: dummyItems("사료"),
  toy: dummyItems("장난감"),
  house: dummyItems("하우스"),
  hygiene: dummyItems("위생용품"),
  etc: dummyItems("기타")
};

const itemsPerPage = 9;
const loadedCount = {};

// ✅ 이모지 하나만 랜덤 선택
function getRandomEmoji() {
  return Math.random() < 0.5 ? '🐶' : '🐱';
}

// 렌더링 함수
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
    const emoji = getRandomEmoji();

    card.innerHTML = `
      <div class="item-label">${emoji}</div>
      <img src="${item.img}" alt="${item.title}">
      <h3>${item.title}</h3>
    `;
    grid.appendChild(card);
  });

  loadedCount[category] = end;
  if (end >= items.length) {
    const btn = document.querySelector(`.more-btn[data-category="${category}"]`);
    if (btn) btn.style.display = "none";
  }
}

// 더보기 버튼 이벤트
function setupMoreButtons() {
  const moreButtons = document.querySelectorAll(".more-btn");
  moreButtons.forEach(button => {
    button.addEventListener("click", () => {
      const cat = button.dataset.category;
      renderItems(cat);
    });
  });
}

// 초기 렌더링
window.addEventListener("DOMContentLoaded", () => {
  Object.keys(categoryData).forEach(cat => renderItems(cat));
  setupMoreButtons();

  // 네비 이동
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (href && href !== "#") {
        window.location.href = href;
      }
    });
  });
});

// Top 버튼 생성
const topBtn = document.createElement("button");
topBtn.id = "top-btn";
topBtn.innerHTML = "▲";
document.body.appendChild(topBtn);

// Top 버튼 표시 조건
window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 600 ? "block" : "none";
});

// 클릭 시 맨 위로
topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


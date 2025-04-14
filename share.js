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

const categoryData = {
  food: dummyItems("사료"),
  toy: dummyItems("장난감"),
  house: dummyItems("하우스"),
  hygiene: dummyItems("위생용품"),
  etc: dummyItems("기타")
};

const itemsPerPage = 6;
const loadedCount = {};

// 🐾 랜덤 이모지 (강아지 or 고양이)
function getRandomEmoji() {
  return Math.random() < 0.5 ? '🐶' : '🐱';
}

// 카드 생성
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

    const emoji = getRandomEmoji();
    const type = emoji === '🐶' ? 'dog' : 'cat';

    card.setAttribute("data-type", type);
    card.setAttribute("data-extra", start >= itemsPerPage ? "true" : "false");

    card.innerHTML = `
      <div class="item-label">${emoji}</div>
      <img src="${item.img}" alt="${item.title}">
      <h3>${item.title}</h3>
    `;
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

  applyFilter(); // 필터 재적용
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

// 더보기 버튼 연결
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

// 필터 적용
function applyFilter() {
  const filter = document.getElementById("pet-filter");
  const selected = filter?.value || "all";

  const allCards = document.querySelectorAll(".item-card");
  allCards.forEach(card => {
    const type = card.getAttribute("data-type");
    card.style.display = (selected === "all" || selected === type) ? "block" : "none";
  });
}

// 초기 로딩
window.addEventListener("DOMContentLoaded", () => {
  Object.keys(categoryData).forEach(cat => renderItems(cat));
  setupMoreButtons();

  const petFilter = document.getElementById("pet-filter");
  if (petFilter) {
    petFilter.addEventListener("change", applyFilter);
  }

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


  applyFilter();
});



// 총 카드 수를 15개로 고정
const dummyItems = (category, count = 15) => {
  const items = [];
  for (let i = 1; i <= count; i++) {
    items.push({
      title: `${category} 물품 ${i}`,
      img: `./images/pip_share/snack${i}.jpg` // snack1.jpg ~ snack15.jpg
    });
  }
  return items;
};


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
  toy: [],
  house: [],
  hygiene: [],
  etc: []
};



// 한 번에 보이는 개수
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

    const type = item.type || "dog"; // 기본값 dog
const emoji = type === 'dog' ? '🐶' : '🐱';


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

  // 카드 수가 itemsPerPage 이하라면 버튼 숨김
  if (items.length <= itemsPerPage) {
    btn.style.display = "none";
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
});


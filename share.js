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

const itemsPerPage = 15;
const loadedCount = {};

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
    card.innerHTML = `
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

// 초기 렌더링
window.addEventListener("DOMContentLoaded", () => {
  Object.keys(categoryData).forEach(cat => renderItems(cat));
});

// 더보기 버튼 이벤트
const moreButtons = document.querySelectorAll(".more-btn");
moreButtons.forEach(button => {
  button.addEventListener("click", () => {
    const cat = button.dataset.category;
    renderItems(cat);
  });
});

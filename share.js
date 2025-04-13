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
    card.setAttribute("data-extra", start >= itemsPerPage ? "true" : "false"); // 추가된 카드 표시

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
    if (btn) btn.textContent = "축소하기";
    btn.setAttribute("data-action", "collapse");
  } else {
    if (btn) btn.textContent = "더보기";
    btn.setAttribute("data-action", "expand");
  }

  applyFilter(); // 필터 재적용
}

function collapseItems(category) {
  const grid = document.querySelector(`.item-grid[data-category="${category}"]`);
  const extraCards = grid.querySelectorAll('.item-card[data-extra="true"]');
  extraCards.forEach(card => card.remove());
  loadedCount[category] = itemsPerPage;

  const btn = document.querySelector(`.more-btn[data-category="${category}"]`);
  if (btn) {
    btn.textContent = "더보기";
    btn.setAttribute("data-action", "expand");
  }

  applyFilter(); // 필터 재적용
}

function setupMoreButtons() {
  const moreButtons = document.querySelectorAll(".more-btn");
  moreButtons.forEach(button => {
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



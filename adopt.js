// jQuery로 DOM 준비
$(function () {
  const added = JSON.parse(localStorage.getItem("addedAnimals") || "[]");

  const animals = [...added, ...additionalPets];

  const $list = $("#card-list");
  const $count = $("#count");
  const $breedFilter = $("#breed-filter");
  const $regionFilter = $("#region-filter");
  const $searchInput = $("#search-input");

  // jQuery 플러그인 구조화
  $.fn.updateFilterOptions = function (type) {
    const filtered = animals.filter(a => a.type === type);
    const breeds = [...new Set(filtered.map(a => a.breed))];
    const regions = [...new Set(filtered.map(a => a.region))];

    $breedFilter.html('<option value="">품종</option>' + breeds.map(b => `<option value="${b}">${b}</option>`).join(''));
    $regionFilter.html('<option value="">지역</option>' + regions.map(r => `<option value="${r}">${r}</option>`).join(''));
  };

  $.fn.renderAnimalCards = function (type) {
    const breed = $breedFilter.val();
    const region = $regionFilter.val();
    const keyword = $searchInput.val().trim().toLowerCase();

    const filtered = animals.filter(animal =>
      animal.type === type &&
      (!breed || animal.breed === breed) &&
      (!region || animal.region === region) &&
      (animal.name.toLowerCase().includes(keyword) || animal.region.toLowerCase().includes(keyword))
    );

    $list.html(filtered.map(animal => `
      <div class="animal-card" onclick="location.href='adopt_detail.html?id=${animal.id}'">
        <img src="${animal.img}" alt="${animal.name}" />
        <div class="info">
          <span class="badge">보호중</span>
          <p>[${animal.type === "dog" ? "강아지" : "고양이"}] ${animal.name} | ${animal.age}<br>
          🐾 ${animal.gender} · ${animal.neutered}<br>
          지역 : ${animal.region}</p>
        </div>
      </div>
    `).join(""));

    $count.text(filtered.length);
  };

  // 필터 버튼 클릭 이벤트
  $(".filter-btn").on("click", function () {
    $(".filter-btn").removeClass("active");
    $(this).addClass("active");

    const type = $(this).data("type");
    $().updateFilterOptions(type);
    $().renderAnimalCards(type);
  });

  // 필터 셀렉트/검색 이벤트
  $breedFilter.on("change", triggerRender);
  $regionFilter.on("change", triggerRender);
  $searchInput.on("input", triggerRender);

  function triggerRender() {
    const type = $(".filter-btn.active").data("type");
    $().renderAnimalCards(type);
  }

  // 초기 로딩 시 강아지 필터 적용
  $(".filter-btn[data-type='dog']").addClass("active");
  $().updateFilterOptions("dog");
  $().renderAnimalCards("dog");
});

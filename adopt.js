const added = JSON.parse(localStorage.getItem("addedAnimals") || "[]");

const additionalPets = [
  {
    id: "dog11",
    type: "dog",
    name: "보리",
    age: "2살",
    gender: "여아",
    breed: "푸들",
    region: "부산",
    neutered: "O",
    description: "사람을 잘 따르는 활발한 푸들이에요!",
    img: "https://images.unsplash.com/photo-1605244863941-3a3ed921c60d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "dog12",
    type: "dog",
    name: "행운이",
    age: "1살",
    gender: "남아",
    breed: "믹스견",
    region: "대전",
    neutered: "예정",
    description: "조금 낯가리지만 금방 친해져요!",
    img: "https://images.unsplash.com/photo-1528919632209-de1db1493d97?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "dog13",
    type: "dog",
    name: "초코",
    age: "4살",
    gender: "남아",
    breed: "비숑 프리제",
    region: "인천",
    neutered: "O",
    description: "복슬복슬하고 안기길 좋아하는 아이예요.",
    img: "https://images.unsplash.com/photo-1587539975099-5aecb74902d4?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  },
  {
    id: "dog14",
    type: "dog",
    name: "사랑이",
    age: "3살",
    gender: "여아",
    breed: "시츄",
    region: "서울",
    neutered: "O",
    description: "사람을 잘 따르고 애교 많은 시츄입니다.",
    img: "https://images.unsplash.com/photo-1534628526458-a8de087b1123?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  },
  {
    id: "dog15",
    type: "dog",
    name: "감자",
    age: "1살",
    gender: "남아",
    breed: "말티즈",
    region: "경기",
    neutered: "예정",
    description: "작고 활발한 말티즈! 산책을 좋아해요.",
    img: "https://images.unsplash.com/photo-1634680687995-159e560f1de2?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  },
  {
    id: "dog16",
    type: "dog",
    name: "두부",
    age: "5살",
    gender: "남아",
    breed: "골든리트리버",
    region: "부산",
    neutered: "O",
    description: "조용하고 순한 대형견, 아이들과도 잘 어울려요.",
    img: "https://plus.unsplash.com/premium_photo-1661951641996-3685492b78ed?q=80&w=3126&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  },

  // 고양이 6마리
  {
    id: "cat11",
    type: "cat",
    name: "나비",
    age: "3살",
    gender: "여아",
    breed: "코리안 숏헤어",
    region: "서울",
    neutered: "O",
    description: "햇볕 아래 낮잠 자는 걸 좋아해요.",
    img: "https://images.unsplash.com/photo-1535094962277-273a7abe6628?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fCVFQyVCRCU5NCVFQiVBNiVBQyVFQyU5NSU4OCUyMCVFQyU4OCU4RiVFRCU5NyVBNCVFQyU5NiVCNCUyMCVFRCU5NSU5QyVFQSVCNSVBRCVFQSVCMyVBMCVFQyU5NiU5MSVFQyU5RCVCNHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: "cat12",
    type: "cat",
    name: "망고",
    age: "6개월",
    gender: "남아",
    breed: "스코티시 폴드",
    region: "경기",
    neutered: "X",
    description: "호기심 많고 장난꾸러기!",
    img: "https://images.unsplash.com/photo-1612174340967-c5186e69344f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8JUVDJThBJUE0JUVDJUJEJTk0JUVEJThCJUIwJUVDJThCJTlDJTIwJUVEJThGJUI0JUVCJTkzJTlDfGVufDB8fDB8fHww"
  },
  {
    id: "cat13",
    type: "cat",
    name: "루비",
    age: "2살",
    gender: "여아",
    breed: "러시안 블루",
    region: "광주",
    neutered: "O",
    description: "얌전하고 우아한 고양이에요.",
    img: "https://images.unsplash.com/photo-1479134262046-a470bfaf7a66?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8JUVCJTlGJUFDJUVDJThCJTlDJUVDJTk1JTg4JUVCJUI4JTk0JUVCJUEzJUE4fGVufDB8fDB8fHww"
  },
  {
    id: "cat14",
    type: "cat",
    name: "미미",
    age: "2살",
    gender: "여아",
    breed: "샴",
    region: "서울",
    neutered: "O",
    description: "호기심 많고 소리에 민감한 고양이에요.",
    img: "https://images.unsplash.com/photo-1568152950566-c1bf43f4ab28?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8JUVDJTgzJUI0fGVufDB8fDB8fHww"
  },
  {
    id: "cat15",
    type: "cat",
    name: "밤비",
    age: "1살",
    gender: "남아",
    breed: "아메리칸 숏헤어",
    region: "대전",
    neutered: "X",
    description: "활발하고 장난꾸러기지만 순해요.",
    img: "https://images.unsplash.com/photo-1602634353750-d58ec14064c6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8JUVDJTk1JTg0JUVCJUE5JTk0JUVCJUE2JUFDJUVDJUI5JUI4JUVDJTg4JThGJUVEJTk3JUE0JUVDJTk2JUI0fGVufDB8fDB8fHww"
  },
  {
    id: "cat16",
    type: "cat",
    name: "쿠키",
    age: "4살",
    gender: "여아",
    breed: "페르시안",
    region: "부산",
    neutered: "O",
    description: "고급스러운 외모와 온순한 성격의 페르시안이에요.",
    img: "https://images.unsplash.com/photo-1598017720921-946225de6f04?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fCVFRCU4RSU5OCVFQiVBNSVCNCVFQyU4QiU5QyVFQyU5NSU4OHxlbnwwfHwwfHx8MA%3D%3D"
  }
];

const animals = [...added, ...additionalPets];

$(function () {
  const $list = $("#card-list");
  const $count = $("#count");
  const $breedFilter = $("#breed-filter");
  const $regionFilter = $("#region-filter");
  const $searchInput = $("#search-input");

  function renderOptions(type) {
    const filtered = animals.filter(a => a.type === type);
    const breeds = [...new Set(filtered.map(a => a.breed))];
    const regions = [...new Set(filtered.map(a => a.region))];

    $breedFilter.html('<option value="">품종</option>' + breeds.map(b => `<option value="${b}">${b}</option>`).join(''));
    $regionFilter.html('<option value="">지역</option>' + regions.map(r => `<option value="${r}">${r}</option>`).join(''));
  }

  function renderCards(type = "dog") {
    const breed = $breedFilter.val();
    const region = $regionFilter.val();
    const keyword = $searchInput.val().trim().toLowerCase();

    const filtered = animals.filter(animal =>
      animal.type === type &&
      (breed === "" || animal.breed === breed) &&
      (region === "" || animal.region === region) &&
      (animal.name.toLowerCase().includes(keyword) || animal.region.toLowerCase().includes(keyword))
    );

    const html = filtered.map(animal => `
      <div class="animal-card" onclick="location.href='adopt_detail.html?id=${animal.id}'">
        <img src="${animal.img}" alt="${animal.name}" />
        <div class="info">
          <span class="badge">보호중</span>
          <p>[${animal.type === "dog" ? "강아지" : "고양이"}] ${animal.name} | ${animal.age}<br>
          🐾 ${animal.gender} · ${animal.neutered}<br>
          지역 : ${animal.region}</p>
        </div>
      </div>
    `).join("");

    $list.html(html);
    $count.text(filtered.length);
  }

  $(".filter-btn").on("click", function () {
    $(".filter-btn").removeClass("active");
    $(this).addClass("active");

    const type = $(this).data("type");
    renderOptions(type);
    renderCards(type);
  });

  $breedFilter.on("change", () => {
    const type = $(".filter-btn.active").data("type");
    renderCards(type);
  });

  $regionFilter.on("change", () => {
    const type = $(".filter-btn.active").data("type");
    renderCards(type);
  });

  $searchInput.on("input", () => {
    const type = $(".filter-btn.active").data("type");
    renderCards(type);
  });

  $(".filter-btn[data-type='dog']").addClass("active");
  renderOptions("dog");
  renderCards("dog");
});

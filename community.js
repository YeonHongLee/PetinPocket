let posts = JSON.parse(localStorage.getItem("communityPosts")) || [];

function savePosts() {
  localStorage.setItem("communityPosts", JSON.stringify(posts));
}

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loginUser"));
  const nameInput = document.getElementById("user-name");
  const profile = document.querySelector(".user-profile img") || document.getElementById("profile-preview");
  const submitBtn = document.getElementById("submit-post");

  // 🔥 인기글 이동 기능
  const targetId = localStorage.getItem("targetPostId");
  if (targetId) {
    setTimeout(() => {
      const target = document.getElementById(`post-${targetId}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        target.style.border = "2px solid #ffaf53";
      }
      localStorage.removeItem("targetPostId");
    }, 300);
  }

  if (user) {
    if (nameInput) {
      nameInput.value = user.nickname;
      nameInput.readOnly = true;
    }
    if (profile && user.profileImage) {
      profile.src = user.profileImage;
      profile.style.display = "block";
    }
  } else {
    if (submitBtn) {
      submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        alert("로그인이 필요합니다. 로그인 후 이용해주세요.");
        window.location.href = "login.html";
      });
    }
    return;
  }

  if (submitBtn) submitBtn.addEventListener("click", handlePostSubmit);

  if (document.getElementById("popular-posts-list")) {
    renderPopularPosts();
    const moreBtn = document.getElementById("load-more-btn");
    if (moreBtn) moreBtn.addEventListener("click", () => renderPopularPosts(true));
  }

  renderPosts();
});

function handlePostSubmit() {
  const content = document.getElementById("post-content").value.trim();
  const fileInput = document.getElementById("post-media");
  const categorySelect = document.getElementById("post-category");
  const file = fileInput?.files[0];
  const user = JSON.parse(localStorage.getItem("loginUser"));

  if (!content && !file) {
    alert("내용 또는 파일을 입력해주세요.");
    return;
  }

  const category = categorySelect?.value || document.title.trim();

  const newPost = {
    id: Date.now(),
    name: user.nickname,
    profileImage: user.profileImage,
    content,
    media: file ? URL.createObjectURL(file) : null,
    mediaType: file ? file.type : null,
    likes: 0,
    comments: [],
    category
  };

  posts.unshift(newPost);
  savePosts();
  document.getElementById("post-content").value = "";
  if (fileInput) fileInput.value = "";
  renderPosts();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderPosts() {
  const list = document.getElementById("post-list");
  if (!list) return;
  const currentCategory = document.getElementById("post-category")?.value || document.title.trim();
  list.innerHTML = "";

  posts.filter(post => post.category === currentCategory).forEach((post, index) => {
    const div = document.createElement("div");
    div.className = "post";
    div.id = `post-${post.id}`;

    let mediaHTML = "";
    if (post.mediaType?.startsWith("image")) {
      mediaHTML = `<img src="${post.media}" class="post-media">`;
    } else if (post.mediaType?.startsWith("video")) {
      mediaHTML = `<video src="${post.media}" class="post-media" controls></video>`;
    }

    const commentsHTML = post.comments.map(c => `<p style="margin: 5px 0;">💬 ${c}</p>`).join("");

    div.innerHTML = `
      <div class="post-header" style="display: flex; align-items: center; gap: 10px; justify-content: flex-start;">
        <img src="${post.profileImage}" class="profile-icon" style="width:40px; height:40px; border-radius:50%">
        <strong>${post.name}</strong>
        <span class="post-menu" onclick="togglePostMenu(${index})">⋮</span>
        <div class="post-menu-box" id="menu-${index}" style="display:none; position:absolute; background:#fff3e0; border:1px solid #ccc; padding:5px;">
          <button onclick="editPost(${index})">✏️ 수정</button>
          <button onclick="deletePost(${index})">🗑 삭제</button>
        </div>
      </div>
      <div class="post-content" id="content-${index}">${post.content}</div>
      ${mediaHTML}
      <div class="post-actions">
        <button onclick="likePost(${index})">❤️ ${post.likes}</button>
        <button onclick="toggleCommentBox(${index})">💬 댓글 (${post.comments.length})</button>
      </div>
      <div class="comment-section" id="comment-box-${index}" style="display: none;">
        <input type="text" placeholder="댓글 입력" id="comment-input-${index}">
        <button onclick="submitComment(${index})">등록</button>
        ${commentsHTML}
      </div>
    `;

    list.appendChild(div);
  });
}

function togglePostMenu(index) {
  const menu = document.getElementById(`menu-${index}`);
  if (menu) menu.style.display = menu.style.display === "none" ? "block" : "none";
}

function editPost(index) {
  const newContent = prompt("수정할 내용을 입력하세요.", posts[index].content);
  if (newContent !== null) {
    posts[index].content = newContent;
    savePosts();
    renderPosts();
  }
}

function deletePost(index) {
  if (confirm("정말 삭제하시겠습니까?")) {
    posts.splice(index, 1);
    savePosts();
    renderPosts();
  }
}

function likePost(index) {
  posts[index].likes++;
  savePosts();
  renderPosts();
}

function toggleCommentBox(index) {
  const box = document.getElementById(`comment-box-${index}`);
  if (box) box.style.display = box.style.display === "none" ? "block" : "none";
}

function submitComment(index) {
  const input = document.getElementById(`comment-input-${index}`);
  if (input.value.trim()) {
    posts[index].comments.push(input.value.trim());
    savePosts();
    input.value = "";
    renderPosts();
    document.getElementById(`comment-box-${index}`).scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function renderPopularPosts(showAll = false) {
  const list = document.getElementById("popular-posts-list");
  if (!list) return;

  list.innerHTML = "";
  const sorted = [...posts].sort((a, b) => b.likes - a.likes);
  const top = showAll ? sorted : sorted.slice(0, 3);

  top.forEach(post => {
    const div = document.createElement("div");
    div.className = "popular-post";
    div.style.cursor = "pointer";
    div.innerHTML = `
      <strong>${post.name}</strong> (❤️ ${post.likes})<br>
      <div style="margin-top: 8px;">${post.content}</div>
    `;
    div.addEventListener("click", () => {
      localStorage.setItem("targetCategory", post.category);
      localStorage.setItem("targetPostId", post.id);
      const map = {
        '강아지 커뮤니티': 'community_dog.html',
        '고양이 커뮤니티': 'community_cat.html',
        '꿀팁 공유방': 'community_tip.html',
        '자유게시판': 'community_free.html',
        'dog': 'community_dog.html',
        'cat': 'community_cat.html',
        'tip': 'community_tip.html',
        'free': 'community_free.html'
      };
      window.location.href = map[post.category] || "community_category.html";
    });
    list.appendChild(div);
  });

  const moreBtn = document.getElementById("load-more-btn");
  if (moreBtn) moreBtn.style.display = (posts.length > 3 && !showAll) ? "inline-block" : "none";
}

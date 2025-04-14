const posts = [];

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submit-post");
  if (submitBtn) submitBtn.addEventListener("click", handlePostSubmit);

  const searchBtn = document.getElementById("search-btn");
  if (searchBtn) searchBtn.addEventListener("click", handleSearch);
});

function handlePostSubmit() {
  const name = document.getElementById("user-name")?.value.trim() || "익명";
  const content = document.getElementById("post-content").value.trim();
  const category = document.getElementById("post-category").value;
  const fileInput = document.getElementById("post-media");
  const file = fileInput.files[0];

  if (!content && !file) {
    alert("내용 또는 파일을 입력해주세요.");
    return;
  }

  const post = {
    name,
    content,
    category,
    media: file ? URL.createObjectURL(file) : null,
    mediaType: file ? file.type : null,
    likes: 0,
    comments: []
  };

  posts.unshift(post);
  document.getElementById("post-content").value = "";
  fileInput.value = "";
  if (document.getElementById("user-name")) {
    document.getElementById("user-name").value = "";
  }

  renderPosts();

  // 자동 스크롤 맨 위
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderPosts(filtered = posts) {
  const list = document.getElementById("post-list");
  if (!list) return;

  list.innerHTML = "";
  filtered.forEach((post, index) => {
    const div = document.createElement("div");
    div.className = "post";

    let mediaHTML = "";
    if (post.mediaType?.startsWith("image")) {
      mediaHTML = `<img src="${post.media}" class="post-media">`;
    } else if (post.mediaType?.startsWith("video")) {
      mediaHTML = `<video src="${post.media}" class="post-media" controls></video>`;
    }

    const commentsHTML = post.comments
      .map(comment => `<p style="margin: 5px 0;">💬 ${comment}</p>`)
      .join("");

    div.innerHTML = `
      <div class="post-header">
        <img src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg" class="profile-icon" alt="icon">
        <strong>${post.name}</strong>
      </div>
      <div class="post-content">${post.content}</div>
      ${mediaHTML}
      <div class="post-actions">
        <button onclick="likePost(${index})">❤️ ${post.likes}</button>
        <button onclick="toggleCommentBox(${index})">💬 댓글</button>
        <button onclick="alert('공유 기능은 준비 중입니다.')">🔗 공유</button>
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

function likePost(index) {
  posts[index].likes++;
  renderPosts();
}

function toggleCommentBox(index) {
  const box = document.getElementById(`comment-box-${index}`);
  if (box) {
    box.style.display = box.style.display === "none" ? "block" : "none";
  }
}

function submitComment(index) {
  const input = document.getElementById(`comment-input-${index}`);
  if (input.value.trim()) {
    posts[index].comments.push(input.value.trim());
    input.value = "";
    renderPosts();

    const box = document.getElementById(`comment-box-${index}`);
    if (box) {
      box.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

function handleSearch() {
  const keyword = document.getElementById("search-input").value.trim();
  const result = posts.filter(p =>
    p.name.includes(keyword) ||
    p.content.includes(keyword) ||
    p.comments.some(c => c.includes(keyword))
  );
  renderPosts(result);
}

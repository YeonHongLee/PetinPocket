const USER_DB_KEY = "userDB";
const LOGIN_USER_KEY = "loginUser";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const findpwForm = document.getElementById("findpw-form");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("login-username").value.trim();
      const password = document.getElementById("login-password").value.trim();
      login(username, password);
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("signup-username").value.trim();
      const password = document.getElementById("signup-password").value.trim();
      const nickname = document.getElementById("signup-nickname").value.trim();
      const profile = document.getElementById("signup-profile").value.trim();
      const email = document.getElementById("signup-email").value.trim();
      signup(username, password, nickname, profile, email);
    });
  }

  if (findpwForm) {
    findpwForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("find-username").value.trim();
      const email = document.getElementById("find-email").value.trim();
      findPassword(username, email);
    });
  }

  updateAuthUI();
});

function login(username, password) {
  const users = JSON.parse(localStorage.getItem(USER_DB_KEY)) || [];
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    alert("❌ 아이디 또는 비밀번호가 올바르지 않습니다.");
    return;
  }

  localStorage.setItem(LOGIN_USER_KEY, JSON.stringify(user));
  alert(`✅ 로그인 성공! ${user.nickname}님 환영합니다.`);
  window.location.href = "index.html";
}

function signup(username, password, nickname, profileImage, email) {
  const users = JSON.parse(localStorage.getItem(USER_DB_KEY)) || [];

  if (users.find(u => u.username === username)) {
    alert("❌ 이미 존재하는 아이디입니다.");
    return;
  }

  users.push({
    username,
    password,
    nickname,
    profileImage,
    email,
    followers: [],
    following: []
  });

  localStorage.setItem(USER_DB_KEY, JSON.stringify(users));
  alert("✅ 회원가입이 완료되었습니다. 로그인해주세요.");
  window.location.href = "login.html";
}

function findPassword(username, email) {
  const users = JSON.parse(localStorage.getItem(USER_DB_KEY)) || [];
  const user = users.find(u => u.username === username && u.email === email);

  if (!user) {
    alert("❌ 일치하는 회원정보가 없습니다.");
    return;
  }

  alert(`🔑 찾은 비밀번호: ${user.password}`);
}

function logout() {
  localStorage.removeItem(LOGIN_USER_KEY);
  window.location.href = "index.html";
}

function updateAuthUI() {
  const authBox = document.getElementById("auth-buttons");
  if (!authBox) return;

  const user = JSON.parse(localStorage.getItem(LOGIN_USER_KEY));
  if (user) {
    authBox.innerHTML = `<span onclick="location.href='mypage.html'">${user.nickname}님 ▼</span>`;
  } else {
    authBox.innerHTML = `
      <a href="login.html">로그인</a>
      <a href="signup.html">회원가입</a>
    `;
  }
}

function deleteAccount() {
    if (!confirm("정말 회원탈퇴 하시겠습니까?")) return;
  
    const user = JSON.parse(localStorage.getItem("loginUser"));
    if (!user) {
      alert("로그인 정보가 없습니다.");
      return;
    }
  
    let users = JSON.parse(localStorage.getItem("userDB")) || [];
    users = users.filter(u => u.username !== user.username);
  
    localStorage.setItem("userDB", JSON.stringify(users));
    localStorage.removeItem("loginUser");
  
    alert("✅ 회원탈퇴가 완료되었습니다.");
    window.location.href = "index.html";
  }
  

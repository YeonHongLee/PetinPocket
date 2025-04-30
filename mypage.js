document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("loginUser"));
    const form = document.getElementById("update-form");
    const infoBox = document.getElementById("user-info");
    const nicknameInput = document.getElementById("nickname");
    const emailInput = document.getElementById("email");
  
    if (!user) {
      infoBox.innerHTML = "<p>로그인이 필요합니다.</p>";
      return;
    }
  
    infoBox.innerHTML = `<p><strong>아이디:</strong> ${user.username}</p>`;
  
    // 안전 체크: input이 존재할 때만 값 설정
    if (nicknameInput && emailInput) {
      nicknameInput.value = user.nickname;
      emailInput.value = user.email;
    }
  
    // 정보 수정 처리
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nickname = nicknameInput.value.trim();
      const email = emailInput.value.trim();
  
      let users = JSON.parse(localStorage.getItem("userDB")) || [];
      const index = users.findIndex(u => u.username === user.username);
      if (index !== -1) {
        users[index].nickname = nickname;
        users[index].email = email;
        localStorage.setItem("userDB", JSON.stringify(users));
        localStorage.setItem("loginUser", JSON.stringify(users[index]));
        alert("✅ 정보가 수정되었습니다.");
        location.reload();
      }
    });
  });
  

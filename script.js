// 슬라이드 효과 (섹션이 존재할 때만 실행)
window.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".text-overlay-section");
    if (section) {
      section.classList.add("active");
    }
  });
  
  // 타이핑 효과 (대상 요소가 존재할 때만 실행)
  document.addEventListener("DOMContentLoaded", () => {
    const text = `모두가 함께하는 작은 공간\nPet in Pocket`;
    const target = document.getElementById("typing-text");
    let index = 0;
  
    if (target) {
      function type() {
        if (index < text.length) {
          target.textContent += text[index];
          index++;
          setTimeout(type, 130); // 타이핑 속도 조절 가능
        }
      }
  
      type();
    }
  });
  
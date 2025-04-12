// 슬라이드 효과 (섹션이 존재할 때만 실행)
function activateSection() {
  const section = document.querySelector(".text-overlay-section");
  if (!section) return;

  const img = section.querySelector("img");

  if (img && !img.complete) {
    img.addEventListener("load", () => {
      section.classList.remove("active");
      void section.offsetWidth;
      section.classList.add("active");
    });
  } else {
    section.classList.remove("active");
    void section.offsetWidth;
    section.classList.add("active");
  }
}

window.addEventListener("DOMContentLoaded", activateSection);
window.addEventListener("pageshow", activateSection);


  
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
  

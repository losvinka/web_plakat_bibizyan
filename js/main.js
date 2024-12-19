"use strict";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".bn-number").forEach((element) => {
    element.addEventListener("click", () => {
      const value = element.querySelector(".bn-value").textContent;
      navigator.clipboard
        .writeText(value)
        .then(() => {
          console.log("copied");

          const tooltip = document.querySelector(".tooltip");
          if (tooltip) {
            tooltip.classList.add("active");
            setTimeout(() => {
              tooltip.classList.remove("active");
            }, 2000);
          }
        })
        .catch((err) => {
          console.error("Copy error: ", err);
        });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const marqueeBoxes = document.querySelectorAll(".marquee-box");

  marqueeBoxes.forEach((marqueeBox) => {
    const marqueeContents = marqueeBox.querySelectorAll(".marquee-content");

    // Клонируем содержимое для бесконечной анимации
    marqueeContents.forEach((content) => {
      marqueeBox.appendChild(content.cloneNode(true));
    });

    let offset = 0;
    let speed = window.innerWidth < 600 ? 0.5 : 1; // Скорость зависит от ширины экрана
    const isReverse = marqueeBox.classList.contains("marquee-reverse");

    // Функция обновления скорости при изменении размера окна
    function updateSpeed() {
      speed = window.innerWidth < 600 ? 0.5 : 1; // Скорость для экрана < 500px
    }

    // Слушаем изменения размера окна
    window.addEventListener("resize", updateSpeed);

    function moveMarquee() {
      offset += isReverse ? speed : -speed; // Двигаем в зависимости от направления
      const firstContentWidth = marqueeContents[0].offsetWidth;

      if (Math.abs(offset) >= firstContentWidth) {
        offset = 0; // Сбрасываем смещение
      }

      marqueeBox.style.transform = `translateX(${offset}px)`;
      requestAnimationFrame(moveMarquee);
    }

    moveMarquee();
  });
});

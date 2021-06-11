"use strict";

export function appendScrollBar(elm) {
  const container = document.createElement("div");
  container.classList.add("scroll_container");

  const bar = document.createElement("div");
  bar.classList.add("bar");

  container.appendChild(bar);

  elm.appendChild(container);

  if (elm === document.querySelector("body")) {
    window.addEventListener("scroll", calcBarLengthBody);
    window.addEventListener("resize", calcBarLengthBody);
  } else {
    elm.addEventListener("scroll", () => calcBarLength(elm));
    window.addEventListener("resize", () => calcBarLength(elm));
  }
}

export function calcBarLength(elm) {
  if (elm === document.querySelector("body")) {
    calcBarLengthBody();
  } else {
    const container = elm.querySelector(".scroll_container");
    const bar = container.querySelector(".bar");

    const overflowHeight = elm.scrollHeight - elm.offsetHeight;
    const barHeight = (elm.scrollTop / overflowHeight) * 100;

    container.style.setProperty("--top-scrolled", elm.scrollTop + "px");
    bar.style.setProperty("--scroll-height", barHeight + "%");

    if (overflowHeight === 0) {
      container.classList.add("hide");
    } else {
      container.classList.remove("hide");
    }
  }
}

function calcBarLengthBody() {
  const container = document.querySelector("body > .scroll_container");
  const bar = container.querySelector(".bar");

  const overflowHeight = document.querySelector("body").scrollHeight - window.innerHeight;
  const barHeight = (window.pageYOffset / overflowHeight) * 100;

  bar.style.setProperty("--scroll-height", `${barHeight}%`);

  if (overflowHeight === 0) {
    container.classList.add("hide");
  } else {
    container.classList.remove("hide");
  }
}

import { tabsContents } from "./view.js";

export const tabs = (event) => {
  let tabsBtnActive = document.querySelector(".tabs__btn--active");

  tabsBtnActive.classList.remove("tabs__btn--active");
  event.target.classList.add("tabs__btn--active");

  tabsContents.forEach((content) => {
    const isTabName = content.classList.contains(event.target.dataset.tabName);

    if (isTabName) {
      let contentActive = document.querySelector(".tabs-content__item--active");
      contentActive.classList.remove("tabs-content__item--active");
      content.classList.add("tabs-content__item--active");
    }
  });
};

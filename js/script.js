'use strict';
//--------------------------------
// mobile navigation
const nav = document.querySelector('.primary-navigation');
const btnNavToggle = document.querySelector('.mobile-nav-toggle');

const mobileNavToggle = () => {
  const visibility = nav.dataset.visible;
  if (visibility === 'false') {
    nav.dataset.visible = 'true';
    btnNavToggle.setAttribute('aria-expanded', true);
  } else {
    nav.dataset.visible = 'false';
    btnNavToggle.setAttribute('aria-expanded', false);
  }
};

btnNavToggle.addEventListener('click', mobileNavToggle);

//----------------------------------
////// tabs
// crew and technology
const tabList = document.querySelector('[role="tablist"]');
const tabs = document.querySelectorAll('[role="tab"]');
const articles = document.querySelectorAll('article');
const pictures = document.querySelectorAll('.picture');

const changeAttribute = function (elements, attr, value) {
  elements.forEach(el => el.setAttribute(attr, value));
};

let tabFocus = 0;
// change focus function
const changeFocus = function (e) {
  const keyLeft = 37;
  const keyRight = 39;

  // change the tabindex of the current to negative
  {
    if (e.keyCode === keyLeft || e.keyCode === keyRight) {
      tabs[tabFocus].setAttribute('tabindex', -1);
      changeAttribute(tabs, 'aria-selected', false);
    }
    // go right
    if (e.keyCode === keyRight) {
      tabFocus++;
      if (tabFocus >= tabs.length) {
        tabFocus = 0;
      }
    }
    // go left
    if (e.keyCode === keyLeft) {
      tabFocus--;
      if (tabFocus < 0) {
        tabFocus = tabs.length - 1;
      }
    }

    tabs[tabFocus].setAttribute('tabindex', 0);
    tabs[tabFocus].setAttribute('aria-selected', true);
    tabs[tabFocus].focus();
  }
};

tabList.addEventListener('keydown', changeFocus);

const changeTab = function (e) {
  changeAttribute(tabs, 'aria-selected', false);

  const targetTab = e.target;

  targetTab.setAttribute('aria-selected', true);
  const id = targetTab.getAttribute('aria-controls');
  const data = targetTab.dataset.image;
  const targetContent = document.querySelector(`#${id}`);
  const mainContainer = targetContent.parentNode;

  articles.forEach(article => article.classList.add('hidden'));
  targetContent.classList.remove('hidden');
  targetContent.classList.add('fadeIn');

  pictures.forEach(img => {
    img.classList.add('hidden');
  });

  const img = mainContainer.querySelector(`#${data}`);
  img.classList.remove('hidden');
  img.classList.add('fadeIn');
};

tabs.forEach(tab => {
  tab.addEventListener('click', changeTab);
});

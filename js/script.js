import { panelData, tabsData, cardsData, faqData } from "../data/data.js";

const tabsContainer = document.getElementById("tabsContainer");
const panelsContainer = document.getElementById("panels");
const downloadCardContainer = document.getElementById("downloadCardContainer");
const faqTabsContainer = document.getElementById("faqTabsContainer");
const btn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
const logo = document.getElementById("logo");
const menuLinks = menu.querySelectorAll("a");

btn.addEventListener("click", navToggle);

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("flex");
    menu.classList.add("hidden");
    btn.classList.remove("open");
    logo.setAttribute("src", "./images/logo-bookmark.svg");
    document.body.classList.remove("overflow-hidden");
  });
});

function renderTabs(activeTab = "panel-1") {
  tabsContainer.innerHTML = Object.entries(tabsData)
    .map(([key, label]) => {
      const isActive = key === activeTab;
      return `
        <div
          class="flex justify-center text-center cursor-pointer text-gray-600 border-b md:border-b-0 hover:text-softRed md:w-1/3 tab"
          data-target="${key}"
        >
          <div class="py-5 ${
            isActive ? "border-b-4 border-softRed" : ""
          }" data-target="${key}">
            ${label}
          </div>
        </div>
      `;
    })
    .join("");
}

function renderPanel(panelKey) {
  const { img, title, text } = panelData[panelKey];

  panelsContainer.innerHTML = `
    <div class="flex flex-col py-5 md:flex-row md:space-x-7 panel ${panelKey}">
      <div class="flex justify-center md:w-1/2">
        <img
          src="${img}"
          alt="panel"
          class="relative z-10"
        />
      </div>
      <div class="flex flex-col space-y-8 md:w-1/2">
        <h3 class="mt-14 text-3xl font-semibold text-center md:mt-0 md:text-left">
          ${title}
        </h3>
        <p class="max-w-md text-center text-grayishBlue md:text-left">
          ${text}
        </p>
        <div class="mx-auto md:mx-0">
          <a
            href="#"
            class="px-6 py-3 mt-4 font-semibold text-white border-2 border-white rounded-lg md:inline-flex bg-softBlue hover:bg-white hover:text-softBlue hover:border-softBlue hover:border-2"
          >
            More Info
          </a>
        </div>
      </div>
    </div>
  `;
}

function renderDownloadCards() {
  downloadCardContainer.innerHTML = cardsData
    .map(({ img, title, version, class: extraClass }) => {
      return `
    <div class="w-full md:w-1/3">
      <div
        class="flex flex-col w-full py-6 space-y-4 text-center rounded-lg shadow-lg ${extraClass}"
      >
        <div class="flex justify-center">
          <img src="${img}" />
        </div>
        <h5 class="pt-6 text-xl font-bold">${title}</h5>
        <p class="text-gray-400">Minimum Version ${version}</p>
        <div class="bg-dots bg-repeat-x px-6 pt-6 capitalize">
          <a
            href="#"
            class="block w-full py-3 text-white duration-200 border-2 rounded-lg bg-softBlue hover:text-softBlue hover:bg-white border-softBlue"
            >Add &amp; Install Extension</a
          >
        </div>
      </div>
    </div>
  `;
    })
    .join("");
}

function renderFAQ() {
  faqTabsContainer.innerHTML = faqData
    .map(({ id, question, answer }) => {
      return `
        <div class="py-1 border-b outline-none group" tabindex="${id}">
          <div
            class="flex items-center justify-between py-3 text-gray-500 transition duration-500 cursor-pointer group ease"
          >
            <div class="transition duration-500 ease group-hover:text-red-500">
              ${question}
            </div>
            <div
              class="transition duration-500 ease group-focus:-rotate-180 group-focus:text-red-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12">
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  d="M1 1l8 8 8-8"
                ></path>
              </svg>
            </div>
          </div>
          <div
            class="overflow-hidden transition duration-500 group-focus:max-h-screen max-h-0 ease"
          >
            <p class="py-2 text-justify text-gray-400">
              ${answer}
            </p>
          </div>
        </div>
      `;
    })
    .join("");
}

function setupTabs() {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) =>
    tab.addEventListener("click", (e) => {
      const target = e.target.closest(".tab");
      const panelKey = target.getAttribute("data-target");

      // Перерендерюємо вкладки з активною
      renderTabs(panelKey);

      tabs.forEach((t) =>
        t.children[0].classList.remove("border-softRed", "border-b-4")
      );

      // Додаємо активний стан обраному табу
      target.children[0].classList.add("border-softRed", "border-b-4");

      renderPanel(panelKey);

      //  прив’язуємо слухачі після ререндера
      setupTabs();
    })
  );
}

function navToggle() {
  btn.classList.toggle("open");
  menu.classList.toggle("flex");
  menu.classList.toggle("hidden");

  if (menu.classList.contains("flex")) {
    logo.setAttribute("src", "./images/logo-bookmark-footer.svg");
    document.body.classList.add("overflow-hidden");
  } else {
    logo.setAttribute("src", "./images/logo-bookmark.svg");
    document.body.classList.remove("overflow-hidden");
  }
}

renderTabs("panel-1");
renderPanel("panel-1");
setupTabs();
renderDownloadCards();
renderFAQ();

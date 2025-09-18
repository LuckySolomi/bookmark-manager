import { panelData, cardsData, faqData } from "../data/data.js";

const tabs = document.querySelectorAll(".tab");
const panel = document.querySelectorAll(".panel");
const panelsContainer = document.getElementById("panels");
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

renderPanel("panel-1");

tabs.forEach((tab) =>
  tab.addEventListener("click", (e) => {
    const target = e.target.closest(".tab"); // щоб ловити клік навіть на внутрішньому елементі
    const panelKey = target.getAttribute("data-target");

    // Прибираємо активний стан у всіх табів
    tabs.forEach((t) =>
      t.children[0].classList.remove("border-softRed", "border-b-4")
    );

    // Додаємо активний стан обраному табу
    target.children[0].classList.add("border-softRed", "border-b-4");

    // Рендеримо потрібну панель
    renderPanel(panelKey);
  })
);

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

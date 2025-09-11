const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");
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

tabs.forEach((tab) => tab.addEventListener("click", onTabClick));

function onTabClick(e) {
  tabs.forEach((tab) => {
    tab.children[0].classList.remove(
      "border-softRed",
      "border-b-4",
      "md:border-b-0"
    );

    panels.forEach((panel) => panel.classList.add("hidden"));

    e.target.classList.add("border-softRed", "border-b-4");

    const classString = e.target.getAttribute("data-target");
    document
      .getElementById("panels")
      .getElementsByClassName(classString)[0]
      .classList.remove("hidden");
  });
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

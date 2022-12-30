const btn = document.querySelector(".btn-menu");
const nav = document.querySelector("nav");
const textNav = document.querySelectorAll("nav div ul li a span:last-child");
const tooltip = document.querySelectorAll(".tooltip");
const cortina = document.querySelector(".cortina");
const main = document.querySelector("main");

const efectosNav = () => {
    btn.classList.toggle("active");
    main.classList.toggle("active");
    nav.classList.toggle("w-48");
    nav.classList.toggle("-translate-x-16");

    textNav.forEach( e => {
        e.classList.toggle("opacity-0");
    })
    
    tooltip.forEach( e => {
        e.classList.toggle("hidden")
    })

    cortina.classList.toggle("hidden");


    if ( btn.classList.contains("active") ) btn.innerHTML = `<svg class="icon fill-black lg:fill-white hover:fill-slate-400" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style="fill: rgba(250, 250, 250);transform: ;msFilter:;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>`;
    else btn.innerHTML = '<svg class="icon transition duration-300 ease-out fill-black lg:fill-white" xmlns="http://www.w3.org/2000/svg" width="30 " height="30 " viewBox="0 0 24 24"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>';
  }

  btn.addEventListener("click", () => {
    efectosNav();
  })

  cortina.addEventListener("click", () => {
    efectosNav();
  })

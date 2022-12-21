const btn = document.querySelector(".btn-menu");
const silderbar = document.querySelector(".silderbar");
const main = document.querySelector("main");

btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    silderbar.classList.toggle("active");
    main.classList.toggle("active");

    if ( btn.classList.contains("active") ) btn.innerHTML = `<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style="fill: rgba(250, 250, 250);transform: ;msFilter:;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>`;
    else btn.innerHTML = '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="30 " height="30 " viewBox="0 0 24 24"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>';
});



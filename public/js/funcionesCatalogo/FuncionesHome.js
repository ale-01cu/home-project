export class Home {
    constructor() {
        //TODO: Header
            //MMovil
        this.btnSacarBuscador = document.querySelector("main #header #sacar-search");
        this.divBuscador = document.getElementById("search");
        this.quitarBuscador = document.querySelector("#search span");
        this.btnAnular = document.querySelector("#search #anular");
        this.buscador = document.querySelector("#search input");
    
            //Pantallas grandes
        this.buscadorMd = document.querySelector("#search-md input");
        this.btnBuscadorAnular = document.querySelector("#search-md #anular");

        // TODO: Carrucel
        this.over = document.getElementById("overflow");
        this.btnCarrucel = document.querySelectorAll("#carrusel-generos button");
        this.containerCarrucel = document.getElementById("carrusel-generos")
    }

    headerFuncionesMovil() {
        this.btnSacarBuscador.addEventListener("click", () => this.divBuscador.classList.toggle("translate-x-full"))

        this.quitarBuscador.addEventListener("click", () => {
            this.divBuscador.classList.toggle("translate-x-full");
            this.buscador.value = "";
            this.btnAnular.classList.add("hidden");
        })

        this.buscador.addEventListener("input", () => {
            this.btnAnular.classList.remove("hidden");
            if ( this.buscador.value === "" ) this.btnAnular.classList.add("hidden");
        })

        this.btnAnular.addEventListener("click", () => {
            this.buscador.value = "";
            this.btnAnular.classList.add("hidden");
        })
    }

    headerFuncionesPantallasGrandes() {
        this.buscadorMd.addEventListener("input", () => {
            this.btnBuscadorAnular.classList.remove("hidden");
            if ( this.buscadorMd.value === "" ) this.btnBuscadorAnular.classList.add("hidden");
        })

        this.btnBuscadorAnular.addEventListener("click", () => {
            this.buscadorMd.value = "";
            this.btnBuscadorAnular.classList.add("hidden");
        })
    }

    funcionesCarrucel() {
        if ( this.over.scrollWidth > this.containerCarrucel.clientWidth ) {
            this.btnCarrucel.forEach( e => e.classList.remove("hidden"))

            this.containerCarrucel.classList.remove("justify-center");
            this.containerCarrucel.classList.add("justify-between");
        }

        this.over.addEventListener("wheel", e => this.over.scrollLeft += e.deltaY)
        this.over.addEventListener('mouseover', () => DomUtils.disableScroll())
        this.over.addEventListener('mouseleave', () => DomUtils.enableScroll())


        this.btnCarrucel[0].addEventListener("click", () => this.over.scrollLeft -= 100)
        this.btnCarrucel[1].addEventListener("click", () => this.over.scrollLeft += 100)
    }

}

//TODO: Clase para detener el scroll.
class DomUtils {
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    static keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

    static preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault) e.preventDefault();
        e.returnValue = false;
    }

    static preventDefaultForScrollKeys(e) {
        if (DomUtils.keys[e.keyCode]) {
        DomUtils.preventDefault(e);
        return false;
        }
    }

    static disableScroll() {
        document.addEventListener('wheel', DomUtils.preventDefault, {
        passive: false,
        }); // Disable scrolling in Chrome
        document.addEventListener('keydown', DomUtils.preventDefaultForScrollKeys, {
        passive: false,
        });
    }

    static enableScroll() {
        document.removeEventListener('wheel', DomUtils.preventDefault, {
        passive: false,
        }); // Enable scrolling in Chrome
        document.removeEventListener(
        'keydown',
        DomUtils.preventDefaultForScrollKeys,
        {
            passive: false,
        }
        ); // Enable scrolling in Chrome
    }
}
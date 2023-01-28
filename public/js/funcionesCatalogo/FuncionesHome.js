
export class Home {
    constructor() {
        //TODO: Header
        this.header = document.getElementById("header");
            //MMovil
        this.btnSacarBuscador = document.querySelector("main #header #sacar-search");
        this.divBuscador = document.getElementById("search");
        this.quitarBuscador = document.querySelector("#search span");
        this.btnAnular = document.querySelector("#search #anular");
        this.buscador = document.querySelector("#search input");
        this.buscadorDespues = document.getElementById("search-after")
        this.resultadosBusqueda = document.getElementById("resultado-busqueda-list");
        this.btnBuscar = document.getElementById("btn-buscar");

            //Pantallas grandes
        this.buscadorMd = document.querySelector("#search-md input");
        this.btnBuscadorAnular = document.querySelector("#search-md #anular");
        this.resultadosBusquedasPantallasGrandes = document.getElementById("res-search-list");
        this.btnBuscarMd = document.getElementById("btn-buscar-md");

        // TODO: Carrucel
        this.over = document.getElementById("overflow");
        this.containerCarrucel = document.getElementById("carrusel-generos")

        // Pantallas Tactiles

        this.fragment = document.createDocumentFragment();
    }

    headerFuncionesMovil() {
        this.btnSacarBuscador.addEventListener("click", () => {
            this.divBuscador.classList.toggle("translate-x-full")
            this.buscador.value = "";
            this.buscador.focus();
            DomUtils.disableScroll();
        })

        this.quitarBuscador.addEventListener("click", () => {
            this.divBuscador.classList.toggle("translate-x-full");
            this.btnAnular.classList.add("hidden");
            DomUtils.enableScroll();
        })

        this.buscador.addEventListener("input", () => {
            this.btnAnular.classList.remove("hidden");
            if ( this.buscador.value === "" ) this.btnAnular.classList.add("hidden");
        })

        this.btnAnular.addEventListener("click", () => {
            this.buscador.value = "";
            this.resultadosBusqueda.innerHTML = "";
            this.btnAnular.classList.add("hidden");
            this.buscador.focus();
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
            this.resultadosBusquedasPantallasGrandes.innerHTML = "";
        })
    }

    funcionesCarrucel() {


        if ( this.over.scrollWidth > this.containerCarrucel.clientWidth ) {
            this.containerCarrucel.classList.remove("justify-center");
            this.containerCarrucel.classList.add("justify-between");
        }

        this.over.addEventListener("wheel", e => this.over.scrollLeft += e.deltaY )

        this.over.addEventListener('mouseover', () => DomUtils.disableScroll())
        this.over.addEventListener('mouseleave', () => DomUtils.enableScroll())
        this.over.addEventListener("scroll", e => e.preventDefault())
        // Eventos para Dispositivos Tactiles

        this.over.addEventListener("touchstart", e => {
            console.log(e);
        })

        let ultimoTouch = 0;
        this.over.addEventListener("touchmove", e => {
            e.preventDefault()
            const desplazamientoEnX = e.touches[0].clientX;
            let desplazamiento = 0;

            // Se desplaza hacia la izquierda
            
            if ( ultimoTouch < desplazamientoEnX) desplazamiento = -200;
            else desplazamiento = 200;       //Se desplaza hacia la derecha
        
            this.over.scrollLeft += desplazamiento;
            console.log(e);
            ultimoTouch = e.touches[0].clientX;
        })

    }

    async usarFetch( url, metodo, body ) {
        const data = await fetch( url, {
            method: metodo,
            body
        })
        const res = await data.json();
        console.log(res);
        return res;
    }

    //autocompletado buscador
    autocompletado ( input, lista ) {
        const url = "autocompletado";

        lista.innerHTML = "";  
        

        this.usarFetch( url, 'post', input )
            .then( res => {
                res.resultados.forEach( e => {
                    const li = document.createElement("li");
                    li.classList.add("transition-all", "duration-500")

                    li.innerHTML = `
                        <a href="busqueda?busqueda=${e}" class="hover:bg-gray-300 p-2 w-full flex items-center justify-start transition-all duration-200 rounded-xl">
                            <span class="mr-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path></svg></span>
                            ${e}
                         </a>`
                    this.fragment.appendChild(li);
            })
            lista.appendChild(this.fragment);
        })
    }

    //Busquedas
    busquedas ( input ) {
        const url = `busqueda?busqueda=${input.value}`;
        window.location.href = url;

    }

    comprobarSiElBuscadorEsValidoParaLaBusqueda ( input ) {
        for ( let i of input.value ) {
            if ( i !== " " && input.value.length > 0) return true;
        }  
        return false;
    }

    funcionesBuscadores () {

        this.btnBuscar.addEventListener("click", e => {
            if ( this.buscador.value.length > 0 ) {
                this.busquedas( this.buscador );
            }
        })

        this.buscador.addEventListener('input', e => {
            if ( this.comprobarSiElBuscadorEsValidoParaLaBusqueda( this.buscador ) ) this.autocompletado( this.buscador.value, this.resultadosBusqueda );
        })

        this.buscador.addEventListener('keydown', async e => {
            
            if ( e.key.toLowerCase() === 'enter' && this.buscador.value.length > 0 ) {
                if ( this.comprobarSiElBuscadorEsValidoParaLaBusqueda( this.buscador ) ) this.busquedas( this.buscador );
            }
        })
        
        if ( this.buscadorDespues ) {
            this.buscadorDespues.addEventListener("click", async e => {
                this.divBuscador.classList.toggle("translate-x-full")
            })
        }

        this.btnBuscarMd.addEventListener("click", e => {
            if ( this.buscadorMd.value.length > 0 ) {
                this.busquedas( this.buscadorMd );
            }
        })

        this.buscadorMd.addEventListener("input", e => {
            if ( this.comprobarSiElBuscadorEsValidoParaLaBusqueda( this.buscadorMd ) ) this.autocompletado( this.buscadorMd.value, this.resultadosBusquedasPantallasGrandes );
        })

        this.buscadorMd.addEventListener("keydown", e => {
            if ( e.key.toLowerCase() === 'enter' && this.buscadorMd.value.length > 0 ) {
                if ( this.comprobarSiElBuscadorEsValidoParaLaBusqueda( this.buscadorMd ) ) this.busquedas( this.buscadorMd );
            }
        })

    }

    esconderHeader () {
        let ubicacionPrincipal = window.scrollY;
        window.onscroll = function(e) {
            const desplazamientoActual = window.scrollY;
           
            if ( ubicacionPrincipal <= desplazamientoActual ) this.header.classList.add("-translate-y-full");
            else this.header.classList.remove("-translate-y-full");

            ubicacionPrincipal = desplazamientoActual;
        }
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
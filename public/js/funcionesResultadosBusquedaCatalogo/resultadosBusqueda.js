
export class Catalogo {
    constructor() {
        this.paginaActual = 0;
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
        this.containerCards = document.getElementById("cards");

            //Pantallas grandes
        this.buscadorMd = document.querySelector("#search-md input");
        this.btnBuscadorAnular = document.querySelector("#search-md #anular");
        this.resultadosBusquedasPantallasGrandes = document.getElementById("res-search-list");
        this.btnBuscarMd = document.getElementById("btn-buscar-md");

        // Pantallas Tactiles

        this.fragment = document.createDocumentFragment();
    }

    headerFuncionesMovil() {
        this.btnSacarBuscador.addEventListener("click", () => {
            this.divBuscador.classList.toggle("translate-x-full")
            this.buscador.value = "";
            this.buscador.focus();
        })

        this.quitarBuscador.addEventListener("click", () => {
            this.divBuscador.classList.toggle("translate-x-full");
            this.btnAnular.classList.add("hidden");
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

    async usarFetch( url, metodo, body ) {
        const data = await fetch( url, {
            method: metodo,
            body
        })
        const res = await data.json();
        return res;
    }

    //autocompletado buscador
    async autocompletado ( input, lista ) {
        const categoria = location.pathname.split("/")[2];
        const url =  `autocompletado`; 
    
        const res = await this.usarFetch( url, 'POST', input )
        lista.innerHTML = ""; 
        console.log(res);
        res.resultados.forEach( e => {
            const textoParaBuscar = input.toLowerCase();
            const textoDondeBuscar = e.toLowerCase();
            const inicioEtiqueta =  textoDondeBuscar.indexOf( textoParaBuscar );
            const finEtiqueta = inicioEtiqueta + textoParaBuscar.length;
            const part1 = textoDondeBuscar.substring( 0, inicioEtiqueta);
            const part2 = textoDondeBuscar.substring( inicioEtiqueta, finEtiqueta );
            const part3 = textoDondeBuscar.substring( finEtiqueta, textoDondeBuscar.length );
            const output = part1 + "<b>" + part2 + "</b>" + part3 ;

            const li = document.createElement("li");
            li.classList.add("transition-all", "duration-500")

            li.innerHTML = `
                <a href="resultadoBusqueda?busqueda=${textoDondeBuscar}" id="btnAutocompletado" class="hover:bg-gray-300 p-2 w-full flex items-center justify-start transition-all duration-200 rounded-xl text-start">
                    <span class="mr-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path></svg></span>
                    <p>${output}</p>
                </a>
                `
            this.fragment.appendChild(li);
        })
        lista.appendChild(this.fragment);
    }

    //Busquedas
    busquedas ( input ) {
        const categoria = location.pathname.split("/").pop();
        const url = `resultadoBusqueda?busqueda=${input.value}`;
        window.location.href = url;

    }

    comprobarSiElBuscadorEsValidoParaLaBusqueda ( input, campoResultadosBusqueda ) {
        if ( input.value.length > 0 ) {
            for ( let i of input.value ) {
                if ( i !== " " && input.value.length > 0) return true;
            }  
            return false;
        }else {
            campoResultadosBusqueda.innerHTML = "";
            return false;
        }

    }

    funcionesBuscadores () {

        this.btnBuscar.addEventListener("click", e => {
            if ( this.buscador.value.length > 0 ) {
                this.busquedas( this.buscador );
            }
        })

        this.buscador.addEventListener('input', e => {
            if ( this.comprobarSiElBuscadorEsValidoParaLaBusqueda( this.buscador, this.resultadosBusqueda ) ) this.autocompletado( this.buscador.value, this.resultadosBusqueda );
        })

        this.buscador.addEventListener('keydown', async e => {
            
            if ( e.key.toLowerCase() === 'enter' && this.buscador.value.length > 0 ) {
                if ( this.comprobarSiElBuscadorEsValidoParaLaBusqueda( this.buscador, this.resultadosBusqueda ) ) this.busquedas( this.buscador );
            }
        })

        this.buscador.addEventListener("click", e => {
            if ( this.buscadorMd.value.length > 0 ) this.autocompletado( this.buscadorMd.value, this.resultadosBusquedasPantallasGrandes );
        })
        
        if ( this.buscadorDespues ) {
            this.buscadorDespues.addEventListener("click", async e => {
                this.divBuscador.classList.toggle("translate-x-full")
                this.buscador.value = "";
                this.buscador.focus();
            })
        }

        this.btnBuscarMd.addEventListener("click", e => {
            if ( this.buscadorMd.value.length > 0 ) {
                this.busquedas( this.buscadorMd );
            }
        })

        this.buscadorMd.addEventListener("input", e => {
            if ( this.comprobarSiElBuscadorEsValidoParaLaBusqueda( this.buscadorMd, this.resultadosBusquedasPantallasGrandes ) ) this.autocompletado( this.buscadorMd.value, this.resultadosBusquedasPantallasGrandes );
        })

        this.buscadorMd.addEventListener("keydown", e => {
            if ( e.key.toLowerCase() === 'enter' && this.buscadorMd.value.length > 0 ) {
                if ( this.comprobarSiElBuscadorEsValidoParaLaBusqueda( this.buscadorMd, this.resultadosBusquedasPantallasGrandes ) ) this.busquedas( this.buscadorMd );
            }
        })

        this.buscadorMd.addEventListener("click", e => {
            if ( this.buscadorMd.value.length > 0 ) this.autocompletado( this.buscadorMd.value, this.resultadosBusquedasPantallasGrandes );
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

    esElFinal() {
        let lleguueAlFinal = false;
        const categoria = location.pathname.split("/").pop();
        let scrollAnterior = 0;


        addEventListener('scroll', (e) => {
            const scrollActual = scrollY;
            const diferencia = scrollActual - scrollAnterior;
            scrollAnterior = scrollActual

            const body = document.body;
            const html = document.documentElement;
            let height = Math.max(body.scrollHeight, body.offsetHeight,
                html.clientHeight, html.scrollHeight, html.offsetHeight);
        
            if (  height == (scrollY + innerHeight ) ) {
                this.paginaActual += 20;
                const url = categoria + `/page/${this.paginaActual}?busqueda=${this.buscador.value}`

                this.usarFetch(url, "GET").then(res => {
                    this.cargarCards(res)
                    
                })

                
            }
        });
    
    }

    cargarCards ( documentos ) {
        documentos.forEach( e => {
            // Sacando los generos de la targeta
            let generos = '';
            e.generos.forEach( g => generos = generos.concat(`<span class='bg-red-600 rounded-lg align-middle text-sm font-medium px-2 py-1 mr-1 mb-1' id='generos-cards'>${g}</span>\n`));

            //Creando la targeta
            const a = document.createElement("a");
            a.id = "card";
            a.classList.add("relative", "w-full", "h-max", "font-sans", "transition-transform", "duration-500", "shadow-lg", "shadow-slate-600");
            a.href = `info/${e.id}`;

            a.innerHTML = 
            `
            <div id="poster" class="overflow-hidden h-96 relative">${e.imagen}</div>
            <div id="details" class="h-full p-2 space-y-1 w-full absolute bottom-0 flex flex-col flex-wrap justify-end">
                <div class="flex justify-between">
                    <h3 id="añoEstreno" class="text-white flex items-center rounded-lg font-normal text-md">${e.fechaDeEstreno[2]}</h3>
                    <h3 id="precio" class="text-green-300 self-end font-normal text-md ">$${e.precio}</h3>
                </div>

                <h2 id="nombre" class=" text-white  rounded-lg font-medium w-full break-words">${e.nombre} </h3>
                <div id="generos" class="text-white rounded-lg flex flex-wrap">
                    ${generos}
                </div>
            </div>
            `
            this.fragment.appendChild(a);
        })
        this.containerCards.appendChild(this.fragment);
    }


}
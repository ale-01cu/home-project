import { DomUtils } from './DomUtils.js';

export class Catalogo {
    constructor( docs = [] ) {
        this.docs = docs;
        this.docsSeparados = this.getDocumentosSeparados( this.docs );
        
        // this.blobs = [];
        // const reader = new FileReader();
        // // Prueba 
        // this.docs.forEach( async e => {
        //     const res = await fetch(e.imagen);
        //     const resDec = await res.blob();
            
        //     reader.readAsDataURL( resDec );

        //     reader.addEventListener("loadend", event => {
        //         console.log("Se cargo la imagen");
        //     })
        // })
        

        this.resolucionesDePantalla = {
            "movil": 320,
            "tablet": 480,
            "sm": 640,
            "md": 768,
            "lg": 1024,
            "xl": 1280,
            "2xl": 1536,
            "fullHD": 1920
        }


        //TODO: componentes de la UI
            //Header    
            this.header = document.getElementById("header");
                //MMovil
            this.btnSacarBuscador = document.querySelector("main #header #sacar-search");
            this.divBuscador = document.getElementById("search");
            this.quitarBuscador = document.querySelector("#search span");
            this.btnAnular = document.querySelector("#search #anular");
            this.buscador = document.querySelector("#search input");
            this.buscadorDespues = document.getElementById("search-after")
            this.inputDespues = document.getElementById("input-after");
            this.btnAnularEnBuscadorDespues = document.querySelector("#search-after #anular");
            this.inputDespues = document.getElementById("input-after");
            this.resultadosBusqueda = document.getElementById("resultado-busqueda-list");
            this.btnBuscar = document.getElementById("btn-buscar");

            //Pantallas grandes
            this.buscadorMd = document.querySelector("#search-md input");
            this.btnBuscadorAnular = document.querySelector("#search-md #anular");
            this.resultadosBusquedasPantallasGrandes = document.getElementById("res-search-list");
            this.btnBuscarMd = document.getElementById("btn-buscar-md");

            //Carrucel
            this.over = document.getElementById("overflow");
            this.containerCarrucel = document.getElementById("overflow");
    
            // Cards
            this.containerCards = document.getElementById("cards");

            //Swiper
            this.containerPaginacion = document.getElementById("containerPaginacion");

            this.fragment = document.createDocumentFragment();

            //Construccion de la UI
            this.cargarCards( 0, this.docsSeparados);
            this.carrucel( this.docs );
    
    }


    //TODO: Construyendo la UI
    carrucel () {
        // set para que no se repitan los generos
        let generos = new Set();
        this.docs.map( e => e.generos.forEach( j => generos.add(j) ));

        generos.forEach( e => {
            const li = document.createElement("LI");
            li.classList.add("transition-all", "duration-100", "select-none");

            li.innerHTML = 
            `
            <button class="
                        rounded-xl
                        border
                        border-gray-500
                        border-solid
                        px-2
                        py-1
                        lg:hover:bg-gray-300
                        flex
                        text-center
                        whitespace-nowrap
                        text-sm
                        transition-all
                        duration-100
                        select-none"
                        id="genero"
            >${e}</button>
            `;
            this.fragment .appendChild(li);
        })
        this.containerCarrucel.appendChild(this.fragment)
    }


    getDocumentosSeparados ( documentos ) {
        const CantidadDeTargetasPorPagina = 20;
        const docsSeparedos = [];
        let docsAux = [];
        
        for ( let i in documentos ) {
            docsAux.push(documentos[i])

            if ( (parseInt(i)+1) % CantidadDeTargetasPorPagina == 0 ) {
                docsSeparedos.push(docsAux);
                docsAux = [];
            }
        }
        if ( docsAux.length > 0 ) docsSeparedos.push(docsAux); 
        return docsSeparedos;
    }


    cargarCards ( pos = 0, documentos ) {
        this.containerCards.innerHTML = "";
        documentos[ pos ].forEach( e => {
            // Sacando los generos de la targeta
            let generos = '';
            e.generos.forEach( g => generos = generos.concat(`<span class='bg-red-600 rounded-lg align-middle text-sm font-medium px-2 py-1 mr-1 mb-1' id='generos-cards'>${g}</span>\n`));

            //Creando la targeta
            const a = document.createElement("a");
            a.id = "card";
            a.classList.add("relative", "w-full", "h-max", "font-sans", "transition-transform", "duration-500", "shadow-lg", "shadow-slate-600");
            a.href = "#";

            a.innerHTML = 
            `
            <div id="poster" class="overflow-hidden h-96 relative"><img class=" h-full w-full transition-transform duration-500" src="${e.imagen}" alt=""></div>
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
        this.construirPaginacion( documentos );
        this.paginacion( documentos );
    }

    construirPaginacion( documentos ) {
        this.containerPaginacion.innerHTML = "";


        const containerSlides = document.createElement("div");
        containerSlides.classList.add("swiper-wrapper");
        
        // Construir Swiper
        for ( let i in documentos ) {
            const div = document.createElement("div");
            div.classList.add("swiper-slide", "w-max");

            div.innerHTML = 
            `
                <button class=" m-auto h-max py-1 px-2 text-slate-600 hover:bg-slate-300 transition duration-200" id="indice" >${Number(i)+1}</button>
            `
            this.fragment.appendChild(div);
        }
        containerSlides.appendChild(this.fragment);
        this.containerPaginacion.appendChild( containerSlides );
        this.containerPaginacion.innerHTML += 
        `
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        `;
        this.configSwiper();
    }



    configSwiper ( documentos ) {

        const swiper = new Swiper('.swiper', {
            // Optional parameters
            direction: 'horizontal',
            loop: false,
            initialSlide: 1,
            slidesPerView: 3,
            centerInsufficientSlides: true,
            centeredSlides: true,
            slidesPerGroup: 1,
            spaceBetween: -34,
            // If we need pagination
            // pagination: {
            //     el: '.swiper-pagination',
            // },

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            mousewheel: {
                invert: false,
              },

            // And if we need scrollbar
            // scrollbar: {
            //     el: '.swiper-scrollbar',
            // },
        });

    }


    subirAlTope () {
        scrollTo(0, 0);
    }


    efectoSeleccionarPagina( paginas, seleccionado ) {
        paginas.forEach( e =>  {
            e.classList.remove( "active" );
        })
        seleccionado.classList.add( "active" );
    }


    paginacion ( documentos  ) {
        const paginas = document.querySelectorAll("#indice");

        paginas.forEach( e => {
            e.addEventListener("click", event => {
                this.cargarCards( Number(event.target.textContent) - 1, documentos );
                this.subirAlTope();
            })
        })
    }


    buscarPorGenero ( genero ) {
        const resultadoBusqueda = [];

        this.docs.forEach( e => {
            e.generos.forEach( elemnt => {
                if ( elemnt.toLowerCase().indexOf(genero.toLowerCase()) != -1 ) {
                    resultadoBusqueda.push( e );
                    return 0;
                }
            })
        })
        return resultadoBusqueda;
    }


    efectoSeleccionarGenero ( generos, generoSelected ) {
        generos.forEach( e =>  {
            e.classList.remove("bg-gray-300");
        })
        generoSelected.classList.add( "bg-gray-300" );
    }


    filtrarPorGeneros () {
        const generos = document.querySelectorAll("#genero");

        generos.forEach( e => {
            e.addEventListener("click", event => {
                this.limpiarBuscadores();
                const resultadoBusqueda = this.buscarPorGenero( event.target.textContent )
                const resultadoSeparado = this.getDocumentosSeparados( resultadoBusqueda )
                this.cargarCards( 0, resultadoSeparado );
                this.efectoSeleccionarGenero( generos, event.target );
                this.subirAlTope();
            })
        })
    }

    limpiarGeneros = () => {
        document.querySelectorAll("#genero").forEach( e =>  e.classList.remove( "bg-gray-300" ) )
    }

    limpiarBuscadores = () => {
        this.btnBuscadorAnular.classList.add("hidden");
        this.buscador.value = "";
        this.buscadorMd.value = "";
    }

    
    headerFuncionesMovil() {
        this.btnSacarBuscador.addEventListener("click", () => {
            this.divBuscador.classList.toggle("translate-x-full")
            if ( this.buscadorDespues.classList.contains("hidden") ) {
                this.buscador.value = "";
                this.resultadosBusqueda.innerHTML = "";
                this.btnAnular.classList.add("hidden");
                this.buscador.focus();
                DomUtils.disableScroll();
            }
            
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

        this.btnAnularEnBuscadorDespues.addEventListener("click", e => {
            e.stopPropagation();
            this.buscadorDespues.classList.add("hidden");
            this.cargarCards(0, this.docsSeparados);
        })

        // Verifica si esta el buscador de despues de realizar una busqueda para sacar el otro en el movil
        if ( this.buscadorDespues ) {
            this.buscadorDespues.addEventListener("click", e => {
                this.divBuscador.classList.toggle("translate-x-full")
                this.buscador.focus();
            })
        }
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
            this.cargarCards( 0, this.docsSeparados )
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
            ultimoTouch = e.touches[0].clientX;
        })

    }


    async usarFetch( url, metodo, body ) {
        try {
            const data = await fetch( url, {
                method: metodo,
                body: body
            })
            const res = await data.json();
            return res;
        } catch (error) {
            console.log("Error: ---> \n" + error);
        }

    }


    //autocompletado buscador
    async autocompletado ( input, lista ) {
        const url = `autocompletado/` + location.pathname.split("/").pop();
        lista.innerHTML = "";  
    
        const res = await this.usarFetch( url, 'POST', input )
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
                <button id="btnAutocompletado" class="hover:bg-gray-300 p-2 w-full flex items-center justify-start transition-all duration-200 rounded-xl text-start">
                    <span class="mr-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path></svg></span>
                    <p>${output}</p>
                </button>
                `
            this.fragment.appendChild(li);
        })
        lista.appendChild(this.fragment);
        this.buscarPorBotonesAutocompletado();
    }


    buscarPorBotonesAutocompletado () {
        const btnsAutocompletado = document.querySelectorAll("#btnAutocompletado");

        btnsAutocompletado.forEach( e => {
            e.addEventListener("click", event => {
                const texto = e.children[1].textContent;
                this.busquedas( texto );

            })
        })
    }


    //Busquedas
    busquedas ( input ) {
        this.limpiarGeneros();
        const busqueda = input.toLowerCase().split(" ");
        this.buscadorMd.value = input;
        this.resultadosBusquedasPantallasGrandes.innerHTML = "";
        this.divBuscador.classList.toggle("translate-x-full");
        let resultados = [];
        let max = 0;
        this.docs.find( e => {
            let conincidencias = 0;

            const { 
                nombre, 
                ubicacion, 
                formato, 
                size, 
                generos, 
                actores, 
                fechaDeEstreno, 
                audio, 
                descripcion, 
                plataforma, 
                precio,
                pais, 
                imagen 
            } = e;
            const todo = `${nombre} ${ubicacion} ${formato} ${size} ${generos} ${actores} ${fechaDeEstreno} ${audio} ${descripcion} ${plataforma} ${pais} ${imagen}`;

            busqueda.forEach(i => {if ( todo.toLowerCase().indexOf(i) !== -1 ) conincidencias++;});
            if ( max < conincidencias ) max = conincidencias; 
            if ( conincidencias > 0 ) { resultados.push({precio, nombre, fechaDeEstreno, generos, imagen, conincidencias}) }
    
        })
        let aux = []
        resultados.forEach( e => {
            const {precio, nombre, fechaDeEstreno, generos, imagen, conincidencias } = e;
            if ( e.conincidencias === max ) aux.push({precio, nombre, fechaDeEstreno, generos, imagen, conincidencias})
        })

        const docs = this.getDocumentosSeparados( aux );
        this.cargarCards(0, docs);
        this.sacarBuscadorAfter( input );
    
    }


    sacarBuscadorAfter( input ) {
        const { lg } = this.resolucionesDePantalla;
        this.buscadorDespues.classList.remove( "hidden" );
        this.inputDespues.value = input;
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

        // Autocompletado Movil...
        this.buscador.addEventListener('input', e => {
            if ( this.comprobarSiElBuscadorEsValidoParaLaBusqueda( this.buscador, this.resultadosBusqueda ) ) this.autocompletado( this.buscador.value, this.resultadosBusqueda );
        })

        // Buscar por teclado Movil...
        this.buscador.addEventListener('keydown', async e => {
            
            if ( e.key.toLowerCase() === 'enter' && this.buscador.value.length > 0 ) {
                if ( this.comprobarSiElBuscadorEsValidoParaLaBusqueda( this.buscador, this.resultadosBusqueda ) ) this.busquedas( this.buscador.value );
            }
        })

        // Buscar por boron movil...
        this.btnBuscar.addEventListener("click", e => {
            if ( this.buscador.value.length > 0 ) {
                this.busquedas( this.buscador.value );
            }
        })

        // Autocompletado...
        this.buscadorMd.addEventListener("input", e => {
            if ( this.comprobarSiElBuscadorEsValidoParaLaBusqueda( this.buscadorMd, this.resultadosBusquedasPantallasGrandes ) ) this.autocompletado( this.buscadorMd.value, this.resultadosBusquedasPantallasGrandes );
        })

        // Buscar por teclado...
        this.buscadorMd.addEventListener("keydown", e => {
            if ( e.key.toLowerCase() === 'enter' && this.buscadorMd.value.length > 0 ) {
                if ( this.comprobarSiElBuscadorEsValidoParaLaBusqueda( this.buscadorMd, this.resultadosBusquedasPantallasGrandes ) ) this.busquedas( this.buscadorMd.value );
            }
        })

        // Buscar por Boton...
        this.btnBuscarMd.addEventListener("click", e => {
            if ( this.buscadorMd.value.length > 0 ) {
                this.busquedas( this.buscadorMd.value );
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

export class Pelicula {

    constructor() {
        this.formulario = document.getElementById("form");
        this.inputs = document.querySelectorAll(".formulario .grid-item .card-input input, textarea");
        this.textArea = document.querySelector("textarea");
        this.divImagen = document.querySelector(".formulario .grid-item .imagen")
        this.inputName = document.getElementById("nombre");
        this.inputPath = document.getElementById("path");
        this.inputFormato = document.getElementById("formato");
        this.inputTamaño = document.getElementById("tamaño");
        this.inputImg = document.getElementById("img");
        this.inputFile = document.getElementById("file");
        this.inputDate = document.getElementById("date")
        this.reset = document.querySelector("[type=reset]");
        this.estados = document.querySelectorAll(".formulario .grid-item card-input .estado");
        this.nav = document.querySelectorAll(".formulario .grid-item ul li a");
        this.submit = document.getElementById("Guardar");
        this.inputPrecio = document.getElementById("precio");
        this.fragment = document.createDocumentFragment();
        

    }

    // Efecto de Seleccionado y deseleccionada de cada widget
    /*efectosDeLaInterfaz() {
        this.inputs.forEach( ( e ) =>  {
            if ( e.previousElementSibling && e.previousElementSibling.tagName === "SPAN" ) {
                e.onfocus = () => {
                    e.previousElementSibling.classList.add("top");
                    if ( e.id !== "caps" ) e.parentElement.classList.add("focus");
                }
                e.onblur = () => {
                    if(!e.value != ""){
                        e.previousElementSibling.classList.remove("top");
                        e.parentElement.classList.remove("focus");
                    }
                }
            }
        })        
    }*/

    // El mismo efecto pero de un widget especifico
    efectoAlInsertar( elemento ) {
        elemento.previousElementSibling.classList.add("top");
        elemento.previousElementSibling.classList.add("focus");
        elemento.parentElement.classList.add("focus");
        elemento.parentElement.previousElementSibling.classList.add("active");
    }

    // Efecto de Deseleccion en todos los widgets
    resetear() {
        /*this.inputs.forEach( ( elemnts ) =>  {
            if (  elemnts.previousElementSibling && elemnts.previousElementSibling.tagName === "SPAN" ) {
                elemnts.previousElementSibling.classList.remove("top");
                elemnts.previousElementSibling.classList.remove("focus");
                elemnts.parentElement.classList.remove("focus");
            }
        })*/
        this.reset.click();
        this.divImagen.innerHTML = "";
        
    }

    btnReset () {
        this.reset.addEventListener("click", (e) => {
            this.resetear();
        })  
    }

    // Borra el input
    vaciarCampos() {
        this.inputs.forEach( ( e ) => {
            e.value = "";
        })
    }

    // Devuelve el tamaño del archivo 
    calcularTamaño( bytes ) {
        if      (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
        else if (bytes >= 1048576)    { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
        else if (bytes >= 1024)       { bytes = (bytes / 1024).toFixed(2) + " KB"; }
        else if (bytes > 1)           { bytes = bytes + " bytes"; }
        else if (bytes == 1)          { bytes = bytes + " byte"; }
        else                          { bytes = "0 bytes"; }

        return bytes;
    }

    // Ventana Modal
    modal ( res ) {
        const modal = document.getElementById("modal");
        const modalInfo = document.querySelector("#modal .modal-info");
        const ModalIcon = document.querySelector("#modal .icon");

        modalInfo.lastElementChild.innerHTML = "";
        modal.classList.remove("translate-x-full", "opacity-0");
        modalInfo.lastElementChild.innerHTML = "";

        for ( let i in res ) {
            if ( i === "errors" ) {
                modal.classList.remove("bg-emerald-300");
                modal.classList.add("bg-red-400");
                modalInfo.firstElementChild.innerHTML = "Error";

                res[i].forEach( e => {
                    const li = document.createElement("LI");
                    const p = document.createElement("p");
                    p.textContent = e.msg;
                    li.classList.add("text-lg", "break-words");
                    li.appendChild(p);
                    this.fragment.appendChild(li);
                })
                modalInfo.lastElementChild.appendChild(this.fragment);   
            }else if (i === "status") {
                if ( modal.classList.contains("error") ) modal.classList.remove("bg-red-400");
                modal.classList.add("bg-emerald-300");
                modalInfo.firstElementChild.innerHTML = "Guardado";
                this.resetear();

                setTimeout( () => {
                    modal.classList.add("translate-x-full", "opacity-0");
                }, 3000)
            }
        }

        ModalIcon.addEventListener("click", () => {
            modal.classList.add( "translate-x-full", "opacity-0" );
        })

    }

    // Enviar formulario al servidor
    async fetchPost( url ) {
        const formData = new FormData( this.formulario );

        try {
            const respuestaCoduficada = await fetch( url , {
                method: "post",
                body: formData
            });
            const respuesta = await respuestaCoduficada.json();
            return respuesta;

        } catch (error) {
            throw new Error(error)
        }
        
    }

    enviarDatos( url ) {
        this.formulario.addEventListener("submit", ( e ) => {
            e.preventDefault()
            
            if ( !this.divImagen.firstChild ) {
                window.scrollTo(0, 0);
                this.inputImg.nextElementSibling.classList.remove("hidden");
                
            }else {
                this.fetchPost( url )
                .then( res => this.modal( res ))
                .catch(err => {
                    console.log(err);
                    location.reload();
                })
            }

        })
    }

    // Extraer detos de un archivo seleccionado y agregarlo a su campo correspondiente
    obtenerDatos() {
        this.inputImg.addEventListener("change", () => {
            const img = this.inputImg.files[0];

            if ( img ) {
                this.inputImg.nextElementSibling.classList.add("hidden");
                const urlImg = URL.createObjectURL(img);
                this.divImagen.innerHTML = `<img src="${urlImg}" alt="foto" class="mostrarImg">`;
            }
        })

        this.inputFile.addEventListener("change", ( data ) => {
            this.inputs.values = "";
            const file = this.inputFile.files[0];

            // video
            if ( file && file.type.split("/")[0] === "video") {
                const arrayName = file.name.split(".");

                this.inputName.value = arrayName[0];
                this.efectoAlInsertar(this.inputName);
        
                this.inputFormato.value = arrayName[arrayName.length - 1];
                this.efectoAlInsertar(this.inputFormato)
        
                this.inputTamaño.value =  this.calcularTamaño(file.size);
                this.efectoAlInsertar(this.inputTamaño);
            }
        })
    }

    configInputDate () {

        const selectorsDates = document.querySelectorAll(".formulario .grid-item .card-input.date select");
        
        // Selector de dias
        const dias = selectorsDates.item(0);
        dias.addEventListener( "click", () => {
            if ( dias.children.length == 1 ) {
                for ( let i = 1; i <= 31; i++ ) {
                    const optionElement = document.createElement("option");
                    optionElement.innerText = i;
                    optionElement.value = i;
                    this.fragment.appendChild(optionElement);
                }
                dias.appendChild(this.fragment);
            }
        })

        // Selector de Meses
        const meses = selectorsDates.item(1);
        meses.addEventListener("click", () => {
            if ( meses.children.length == 1 ) {
                for ( let i = 1; i <= 12; i++ ) {
                    const optionElement = document.createElement("option");
                    optionElement.innerText = i;
                    optionElement.value = i;
                    this.fragment.appendChild(optionElement);
                }
                meses.appendChild(this.fragment);
            }
        })


        // Selector de años
        const años = selectorsDates.item(2);
        años.addEventListener("click", () => {
            if (  años.children.length == 1 ) {
                for ( let i = new Date().getFullYear(); i >= 1900; i-- ) {
                    const optionElement = document.createElement("option");
                    optionElement.innerText = `${i}`;
                    optionElement.value = i;
                    this.fragment.appendChild(optionElement);
                }
                años.appendChild(this.fragment);
            }
        })

    }

    configEstado() {
        this.inputs.forEach( ( e ) => {
            e.addEventListener("input", () => {
                if(e.value.length >= 3) {
                    e.parentElement.previousElementSibling.classList.add("active");
                }else{
                    e.parentElement.previousElementSibling.classList.remove("active");
                }
            })
        })

        this.textArea.addEventListener("input", () => {
            if(this.textArea.value.length >= 5) {
                this.textArea.parentElement.previousElementSibling.classList.add("active");
            }else{
                this.textArea.parentElement.previousElementSibling.classList.remove("active");
            }
        })
    }

    copiarTexto( texto ) {
        const type = 'text/plain';
        const blob = new Blob([text], {type});
        let data = [new ClipboardItem({[type]: blob})];
    
        navigator.clipboard.write(data).then(function() {
            console.log('Copiado!')
        }, function() {
            console.log('Ups! No se copio');
        });
    }

    btnMostrarCategorias () {
        const container = document.getElementById("container");
        const botton = document.querySelector(".grid-item.nav span");
        const svg = document.querySelector(".grid-item.nav span svg");
        const containerCategorias = document.querySelector(".grid-item.nav #container-categorias");
        
        botton.addEventListener("click", e => {
            svg.classList.toggle("-rotate-90")
            containerCategorias.classList.toggle("hidden")
        })
    }
    
    btnSubir () {
        const btn = document.getElementById("btn-subir");
        btn.addEventListener("click", e => {
            window.scrollTo(0, 0);
        }) 
    }

    precio () {
        this.inputPrecio.value = "2.50";
    }

}

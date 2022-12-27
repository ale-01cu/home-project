
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

    }

    // Efecto de Seleccionado y deseleccionada de cada widget
    efectosDeLaInterfaz() {
        this.inputDate.onfocus = () => {
            this.inputDate.classList.add("focus");
        }
        this.inputDate.onblur = () => {
            if(!this.inputDate.value != "") this.inputDate.classList.remove("focus");
        }

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
    }

    // El mismo efecto pero de un widget especifico
    efectoAlInsertar( elemento ) {
        elemento.previousElementSibling.classList.add("top");
        elemento.previousElementSibling.classList.add("focus");
        elemento.parentElement.classList.add("focus");
        elemento.parentElement.previousElementSibling.classList.add("active");
    }

    // Efecto de Deseleccion en todos los widgets
    resetear() {
        this.reset.addEventListener("click", () => {
            this.inputDate.classList.remove("focus");
            this.inputs.forEach( ( elemnts ) =>  {
                if (  elemnts.previousElementSibling && elemnts.previousElementSibling.tagName === "SPAN" ) {
                    elemnts.previousElementSibling.classList.remove("top");
                    elemnts.previousElementSibling.classList.remove("focus");
                    elemnts.parentElement.classList.remove("focus");
                }
            })
            this.divImagen.innerHTML = "";
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

    // Enviar formulario al servidor
    async fetchPost( url ) {
        const formData = new FormData( this.formulario );

        try {
            const respuestaCoduficada = await fetch( url , {
                method: "post",
                body: formData
            });
            const respuesta = await respuestaCoduficada.json();
            console.log(respuesta);
            return respuesta;

        } catch (error) {
            console.log(error);
        }

        
        
    }

    enviarDatos( url ) {
        this.formulario.addEventListener("submit", ( e ) => {
            e.preventDefault()
            this.fetchPost( url );
        })
    }

    // Extraer detos de un archivo seleccionado y agregarlo a su campo correspondiente
    obtenerDatos() {
        this.inputImg.addEventListener("change", () => {
            const img = this.inputImg.files[0];

            if ( img ) {
                const urlImg = URL.createObjectURL(img);
                this.divImagen.innerHTML = `<img src="${urlImg}" alt="foto" class="mostrarImg">`;
            }
        })

        this.inputFile.addEventListener("change", ( data ) => {
            this.inputs.values = "";
            const file = this.inputFile.files[0];

            // video
            if ( file && file.type.split("/")[0] === "video") {
                this.inputName.value = file.name.split(".")[0];
                this.efectoAlInsertar(this.inputName);
        
                this.inputFormato.value = file.type.split("/")[1];
                this.efectoAlInsertar(this.inputFormato)
        
                this.inputTamaño.value =  this.calcularTamaño(file.size);
                this.efectoAlInsertar(this.inputTamaño);
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

}

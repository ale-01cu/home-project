
export class Serie {

    constructor() {
        
        this.inputs = document.querySelectorAll(".formulario .grid-item .card-input input, textarea");
        this.textArea = document.querySelector("textarea");
        this.divImagen = document.querySelector(".formulario .grid-item .imagen")

        this.inputName = document.getElementById("nombre");
        this.inputPath = document.getElementById("path");
        this.inputFormato = document.getElementById("formato");
        this.inputTamaño = document.getElementById("tamaño");
        this.inputImg = document.getElementById("img");
        this.inputFile = document.getElementById("file");
        this.reset = document.querySelector("[type=reset]");
        this.estados = document.querySelectorAll(".formulario .grid-item card-input .estado");
        this.nav = document.querySelectorAll(".formulario .grid-item ul li a");



        this.containerFormTemp = document.querySelector(".formulario .grid-item .form-serie div.container-temp");
        this.containerFormTotalCaps = document.querySelector(".formulario .grid-item .form-serie .container-total-caps");
        this.inputCantDeTemp = document.getElementById("#temp");
    }

     // Efecto de Seleccionado y deseleccionada de cada widget
    efectosDeLaInterfaz() {
    
        this.inputs.forEach( ( e ) =>  {
            if ( e.type !== "month" && e.type !== "checkbox") {
                e.onfocus = () => {
                    e.previousElementSibling.classList.add("top");
                    e.previousElementSibling.classList.add("focus");
                    if ( e.tagName === "TEXTAREA" )  e.classList.add("focus");
                    else if ( e.id !== "caps" ) e.parentElement.classList.add("focus");
                }
                
                e.onblur = () => {
                    if(!e.value != ""){
                        e.previousElementSibling.classList.remove("top");
                        e.previousElementSibling.classList.remove("focus");
                        e.parentElement.classList.remove("focus");
                        if ( e.tagName === "TEXTAREA" ) e.classList.remove("focus");
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
            this.inputs.forEach( ( elemnts ) =>  {
                if ( elemnts.type !== "month" ) {
                    elemnts.previousElementSibling.classList.remove("top");
                    elemnts.previousElementSibling.classList.remove("focus");
                    elemnts.parentElement.classList.remove("focus");
                    elemnts.classList.remove("focus");
                }
            })
    
            this.containerFormTemp.innerHTML = "";
            this.containerFormTotalCaps.innerHTML = "";
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
    async fetchPost( url, data ) {
        const respuestaCoduficada = await fetch( url , {
            method: "post",
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify( data )
        });
        const respuesta = await respuestaCoduficada.json();

        return respuesta;
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
            const files = this.inputFile.files;
                
            // video
            let AuxSize = 0;

            if ( files[0] && files[0].type.split("/")[0] === "video") {
                for ( let i of files ) {
                    //Formato
                    if ( i.type.split("/")[0] === "video" ) {
                        this.inputFormato.value +=  this.inputFormato.value.includes( i.type.split("/")[1] ) 
                                                                                                            ? "" 
                                                                                                            :  i.type.split("/")[1] + " "
                        this.efectoAlInsertar(this.inputFormato)
                        AuxSize += i.size; 
                    }
                }
                // Tamaño
                this.inputTamaño.value = ( parseFloat(this.inputTamaño.value) )
                                                                                ? Math.round(( parseFloat(this.inputTamaño.value.split(" ")[0]) + parseFloat(this.calcularTamaño(AuxSize).split(" ")[0]) ) * 100) /100  + " " + this.calcularTamaño(AuxSize).split(" ")[1]
                                                                                : this.calcularTamaño(AuxSize)
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

    formularioCapXtemporadas = () => {
        let auxCantDeCap = 0;
        let cantDeCap = 0;
        let caps = [];

        this.inputCantDeTemp.addEventListener("input", (e) => {
            this.containerFormTemp.innerHTML = "";
            
            if ( this.inputCantDeTemp.value <= 20 ) {
                for ( let i=1; i <= this.inputCantDeTemp.value; i++ ) {
                    this.containerFormTemp.innerHTML += `
                    <div class="temporadas">
                        <label for="">
                            <h4>T${i}:</h4>
                            <span># caps</span>
                            <input type="number" name="" id="caps" min="0" max="50" required>
                        </label>
                    </div>
                    `;
                }
                this.inputs = document.querySelectorAll(".formulario .grid-item .card-input input, textarea");
                caps = Array.from(document.querySelectorAll(".formulario .grid-item .form-serie .container-temp input"));
                this.efectosDeLaInterfaz();
    
                caps.forEach( ( e ) => {
                    e.addEventListener("input", ()  => {
                        caps.forEach( (i) => {
                            if ( parseInt(i.value) ) auxCantDeCap += parseInt(i.value);
                        })
                        cantDeCap = auxCantDeCap;
                        auxCantDeCap = 0;
    
                        this.containerFormTotalCaps.innerHTML = `
                            <div class="total-caps">
                                <h3>Total de capitulos ${cantDeCap}</h3>
                            </div>
                        `;
                        
                    })
                })
            }else {
                this.containerFormTemp.innerHTML += `
                    <h3>Maximo de Temporadas: 20 </h3>
                    `;
            }


            this.containerFormTotalCaps.innerHTML = "";

        })
    }

}

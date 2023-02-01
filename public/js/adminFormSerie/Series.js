import { Pelicula } from "../adminFormPelicula/Pelicula.js";

export class Serie extends Pelicula{

    constructor() {
        super();
        this.inputCantDeTemp = document.getElementById("#temp");
        this.containerFormTemp = document.querySelector(".formulario .grid-item .form-serie div.container-temp");
        this.containerFormTotalCaps = document.querySelector(".formulario .grid-item .form-serie .container-total-caps");
        
    }

    resetSerie () {
        this.resetear();
        this.containerFormTemp.innerHTML = "";
        this.containerFormTotalCaps.innerHTML = "";
    }

    btnResetSerie () {
        this.reset.addEventListener("click", (e) => {
            this.resetSerie();
        })  
    }

    modal ( res ) {
        const modal = document.querySelector(".modal");
        const modalInfo = document.querySelector(".modal .modal-info");
        const ModalIcon = document.querySelector(".modal .icon");
        modal.classList.add("active");

        modalInfo.lastElementChild.innerHTML = "";
        for ( let i in res ) {
            if ( i === "errors" ) {
                modal.classList.add("error");
                modalInfo.firstElementChild.innerHTML = "Error";

                res[i].forEach( e => {
                    const li = document.createElement("LI");
                    li.innerHTML = e.msg;
                    this.fragment.appendChild(li);
                })
                modalInfo.lastElementChild.appendChild(this.fragment);   
            }else if (i === "status") {
                modal.classList.add("ok");
                modalInfo.firstElementChild.innerHTML = "Guardado";
                this.resetSerie();

                setTimeout( () => {
                    modal.classList.remove( "active", "ok" );
                }, 3000)
            }
        }

        ModalIcon.addEventListener("click", () => {
            modal.classList.remove( "active", "error", "ok" );
            modalInfo.lastElementChild.innerHTML = "";
        })

    }

    obtenerDatosSerie() {
        let tamañoAnterior = 0;

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
            let tamañoSeleccionado = 0;

            if ( files[0] && files[0].type.split("/")[0] === "video") {
                for ( let i of files ) {
                    //Formato
                    const arrayName = i.name.split(".");
                    if ( i.type.split("/")[0] === "video" ) {
                        this.inputFormato.value +=  this.inputFormato.value.includes( arrayName[arrayName.length-1] ) 
                                                                                                            ? "" 
                                                                                                            :  arrayName[arrayName.length-1] + " "
                        this.efectoAlInsertar(this.inputFormato)
                        tamañoSeleccionado += i.size; 
                    }
                }
                
                // Tamaño
                const resultado = tamañoAnterior + tamañoSeleccionado;
                this.inputTamaño.value = ( tamañoAnterior !== 0 )
                                                ? this.calcularTamaño(resultado)
                                                : this.calcularTamaño(tamañoSeleccionado)
                tamañoAnterior = resultado;
                //this.efectoAlInsertar(this.inputTamaño);
            }
        })
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
                    <div class="temporadas ">
                        <label for="" class="flex justify-end items-center space-x-2">
                            <h4 class="text-lg text-gray-600">T${i}:</h4>
                            <span class="text-gray-600"># caps</span>
                            <input type="number" name="capsPorTemporadas" id="caps" min="0" max="50" class="
                                                                                                        placeholder:text-sm
                                                                                                        placeholder:text-gray-300
                                                                                                        mt-1
                                                                                                        mb-2
                                                                                                        block
                                                                                                        
                                                                                                        rounded-md
                                                                                                        border-gray-300
                                                                                                        shadow-sm
                                                                                                        focus:border-indigo-300 
                                                                                                        focus:ring 
                                                                                                        focus:ring-indigo-200 
                                                                                                        focus:ring-opacity-50" required>
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
                                <label for="total-caps" class="flex justify-center items-center text-lg text-gray-600 space-x-2">
                                    Total de Capitulos:
                                    <input type="number" placeholder="Total de Capitulos..." name="totalDeCapitulos" id="total-caps" min="0" value="${cantDeCap}" class="
                                                                                                        placeholder:text-sm
                                                                                                        placeholder:text-gray-300
                                                                                                        mt-1
                                                                                                        mb-2
                                                                                                        border-b
                                                                                                        border-gray-300
                                                                                                        border-solid
                                                                                                        block
                                                                                                        w-16
                                                                                                        rounded-md
                                                                                                        focus:border-indigo-300 
                                                                                                        focus:ring 
                                                                                                        focus:ring-indigo-200 
                                                                                                        focus:ring-opacity-50
                                                                                                        ">
                                </label>
                            </div>
                        `;
                        
                    })
                })
            }else {
                this.containerFormTemp.innerHTML += `
                    <h3 class="text-red-300 text-center">Maximo de Temporadas: 20 </h3>
                    `;
            }


            this.containerFormTotalCaps.innerHTML = "";

        })
    }
    
    precio () {
        this.inputPrecio.value = "2";
    }
}
import { Pelicula } from "../adminFormPelicula/Pelicula.js";

export class Serie extends Pelicula{

    constructor() {
        super();
        this.inputCantDeTemp = document.getElementById("#temp");
        this.containerFormTemp = document.querySelector(".formulario .grid-item .form-serie div.container-temp");
        this.containerFormTotalCaps = document.querySelector(".formulario .grid-item .form-serie .container-total-caps");
        
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
                            <input type="number" name="capsPorTemporadas" id="caps" min="0" max="50" required>
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
                                <label for="total-caps">
                                    Total de Capitulos:
                                    <input type="number" name="totalDeCapitulos" id="total-caps" min="0" value="${cantDeCap}">
                                </label>
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

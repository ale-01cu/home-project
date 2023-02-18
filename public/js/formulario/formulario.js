
export class Folmulario {
  constructor () {
    this.formulario = document.getElementById('form')
    this.inputs = document.querySelectorAll('.formulario .grid-item .card-input input, textarea')
    this.textArea = document.querySelector('textarea')
    this.divImagen = document.querySelector('.formulario .grid-item .imagen')
    this.inputName = document.getElementById('nombre')
    this.inputPath = document.getElementById('path')
    this.inputFormato = document.getElementById('formato')
    this.inputTamaño = document.getElementById('tamaño')
    this.inputImg = document.getElementById('img')
    this.inputFile = document.getElementById('filePelicula')
    this.inputDate = document.getElementById('date')
    this.reset = document.querySelector('[type=reset]')
    this.estados = document.querySelectorAll('.formulario .grid-item card-input .estado')
    this.nav = document.querySelectorAll('.formulario .grid-item ul li a')
    this.submit = document.getElementById('Guardar')
    this.inputPrecio = document.getElementById('precio')
    this.containerInputFile = document.getElementById('content-file')
    this.urlGuardar = 'formularios/peliculas/guardar'

    // Series
    this.inputFileSerie = document.getElementById('fileSerie')
    this.inputCantDeTemp = document.getElementById('#temp')
    this.containerFormTemp = document.querySelector('.formulario .grid-item .form-serie div.container-temp')
    this.containerFormTotalCaps = document.querySelector('.formulario .grid-item .form-serie .container-total-caps')
    this.containerTemporadas = document.getElementById('temporadas')

    this.fragment = document.createDocumentFragment()

    this.marcarNav()
  }

  setUrlGuardar (url) {
    this.urlGuardar = url
  }

  construirFormPelicula () {
    if (!this.inputFileSerie.previousElementSibling.classList.contains('hidden')) this.inputFileSerie.previousElementSibling.classList.add('hidden')
    if (!this.containerTemporadas.classList.contains('hidden')) this.containerTemporadas.classList.add('hidden')

    this.inputFile.previousElementSibling.classList.remove('hidden')
    this.inputCantDeTemp.name = ''
    this.inputCantDeTemp.removeAttribute('required', 'true')
    this.precioPelicula()
  }

  construirFormSerie () {
    if (!this.inputFile.previousElementSibling.classList.contains('hidden')) this.inputFile.previousElementSibling.classList.add('hidden')

    this.inputFileSerie.previousElementSibling.classList.remove('hidden')
    this.containerTemporadas.classList.remove('hidden')
    this.inputCantDeTemp.name = 'temporadas'
    this.inputCantDeTemp.setAttribute('required', 'true')
    this.precioSerie()
  }

  marcarNav () {
    document.getElementById('formularios').classList.add('active', 'bg-white')
  }

  // El mismo efecto pero de un widget especifico
  efectoAlInsertar (elemento) {
    elemento.previousElementSibling.classList.add('top')
    elemento.previousElementSibling.classList.add('focus')
    elemento.parentElement.classList.add('focus')
    elemento.parentElement.previousElementSibling.classList.add('active')
  }

  // Efecto de Deseleccion en todos los widgets
  resetear () {
    this.reset.click()
    this.divImagen.innerHTML = ''
    this.containerFormTemp.innerHTML = ''
    this.containerFormTotalCaps.innerHTML = ''
  }

  btnReset () {
    this.reset.addEventListener('click', (e) => {
      this.resetear()
    })
  }

  // Borra el input
  vaciarCampos () {
    this.inputs.forEach((e) => {
      e.value = ''
    })
  }

  // Devuelve el tamaño del archivo
  calcularTamaño (bytes) {
    if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + ' GB' } else if (bytes >= 1048576) { bytes = (bytes / 1048576).toFixed(2) + ' MB' } else if (bytes >= 1024) { bytes = (bytes / 1024).toFixed(2) + ' KB' } else if (bytes > 1) { bytes = bytes + ' bytes' } else if (bytes === 1) { bytes = bytes + ' byte' } else { bytes = '0 bytes' }

    return bytes
  }

  // Ventana Modal
  modal (res) {
    console.log(res)
    const modal = document.getElementById('modal')
    const modalInfo = document.querySelector('#modal .modal-info')
    const ModalIcon = document.querySelector('#modal .icon')

    modalInfo.lastElementChild.innerHTML = ''
    modal.classList.remove('translate-x-full', 'opacity-0')
    modalInfo.lastElementChild.innerHTML = ''

    for (const i in res) {
      if (i === 'errors') {
        modal.classList.remove('bg-emerald-300')
        modal.classList.add('bg-red-400')
        modalInfo.firstElementChild.innerHTML = 'Error'

        res[i].forEach(e => {
          const li = document.createElement('LI')
          const p = document.createElement('p')
          p.textContent = e.msg
          li.classList.add('text-lg', 'break-words')
          li.appendChild(p)
          this.fragment.appendChild(li)
        })
        modalInfo.lastElementChild.appendChild(this.fragment)
      } else if (i === 'status') {
        if (modal.classList.contains('error')) modal.classList.remove('bg-red-400')
        modal.classList.add('bg-emerald-300')
        modalInfo.firstElementChild.innerHTML = 'Guardado'
        this.resetear()

        setTimeout(() => {
          modal.classList.add('translate-x-full', 'opacity-0')
        }, 3000)
      }
    }

    ModalIcon.addEventListener('click', () => {
      modal.classList.add('translate-x-full', 'opacity-0')
    })
  }

  // Enviar formulario al servidor
  async fetchPost (url) {
    const formData = new FormData(this.formulario)

    try {
      const respuestaCoduficada = await fetch(url, {
        method: 'post',
        body: formData

      })
      const respuesta = await respuestaCoduficada.json()
      return respuesta
    } catch (error) {
      throw new Error(error)
    }
  }

  enviarDatos () {
    this.formulario.addEventListener('submit', (e) => {
      e.preventDefault()

      if (!this.divImagen.firstChild) {
        window.scrollTo(0, 0)
        this.inputImg.nextElementSibling.classList.remove('hidden')
      } else {
        this.fetchPost(this.urlGuardar)
          .then(res => this.modal(res))
          .catch(err => {
            console.log(err)
          })
      }
    })
  }

  // Extraer detos de un archivo seleccionado y agregarlo a su campo correspondiente
  obtenerDatos () {
    this.inputImg.addEventListener('change', () => {
      const img = this.inputImg.files[0]
      const reader = new FileReader()

      if (img) {
        this.inputImg.nextElementSibling.classList.add('hidden')
        reader.readAsDataURL(img)

        reader.addEventListener('loadend', (e) => {
          this.divImagen.innerHTML = `<img src="${reader.result}" alt="foto" class="mostrarImg">`
        })
      }
    })

    this.inputFile.addEventListener('change', (data) => {
      this.inputs.values = ''
      const file = this.inputFile.files[0]

      // video
      if (file && file.type.split('/')[0] === 'video') {
        const arrayName = file.name.split('.')

        this.inputFormato.value = arrayName.pop()
        this.efectoAlInsertar(this.inputFormato)

        this.inputName.value = arrayName
        this.efectoAlInsertar(this.inputName)

        this.inputTamaño.value = this.calcularTamaño(file.size)
        this.efectoAlInsertar(this.inputTamaño)
      }
    })
  }

  obtenerDatosSerie () {
    let tamañoAnterior = 0

    this.inputFileSerie.addEventListener('change', () => {
      const img = this.inputImg.files[0]

      if (img) {
        const urlImg = URL.createObjectURL(img)
        this.divImagen.innerHTML = `<img src="${urlImg}" alt="foto" class="mostrarImg">`
      }
    })

    this.inputFileSerie.addEventListener('change', (data) => {
      this.inputs.values = ''
      const files = this.inputFileSerie.files

      // video
      let tamañoSeleccionado = 0

      if (files[0] && files[0].type.split('/')[0] === 'video') {
        for (const i of files) {
          // Formato
          const arrayName = i.name.split('.')
          if (i.type.split('/')[0] === 'video') {
            this.inputFormato.value += this.inputFormato.value.includes(arrayName[arrayName.length - 1])
              ? ''
              : arrayName[arrayName.length - 1] + ' '
            this.efectoAlInsertar(this.inputFormato)
            tamañoSeleccionado += i.size
          }
        }

        // Tamaño
        const resultado = tamañoAnterior + tamañoSeleccionado
        this.inputTamaño.value = (tamañoAnterior !== 0)
          ? this.calcularTamaño(resultado)
          : this.calcularTamaño(tamañoSeleccionado)
        tamañoAnterior = resultado
        // this.efectoAlInsertar(this.inputTamaño);
      }
    })
  }

  formularioCapXtemporadas = () => {
    let auxCantDeCap = 0
    let cantDeCap = 0
    let caps = []

    this.inputCantDeTemp.addEventListener('input', (e) => {
      this.containerFormTemp.innerHTML = ''

      if (this.inputCantDeTemp.value <= 20) {
        for (let i = 1; i <= this.inputCantDeTemp.value; i++) {
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
                    `
        }
        this.inputs = document.querySelectorAll('.formulario .grid-item .card-input input, textarea')
        caps = Array.from(document.querySelectorAll('.formulario .grid-item .form-serie .container-temp input'))

        caps.forEach((e) => {
          e.addEventListener('input', () => {
            caps.forEach((i) => {
              if (parseInt(i.value)) auxCantDeCap += parseInt(i.value)
            })
            cantDeCap = auxCantDeCap
            auxCantDeCap = 0

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
                        `
          })
        })
      } else {
        this.containerFormTemp.innerHTML += `
                    <h3 class="text-red-300 text-center">Maximo de Temporadas: 20 </h3>
                    `
      }

      this.containerFormTotalCaps.innerHTML = ''
    })
  }

  configInputDate () {
    const selectorsDates = document.querySelectorAll('.formulario .grid-item .card-input.date select')

    // Selector de dias
    const dias = selectorsDates.item(0)
    dias.addEventListener('click', () => {
      if (dias.children.length === 1) {
        for (let i = 1; i <= 31; i++) {
          const optionElement = document.createElement('option')
          optionElement.innerText = i
          optionElement.value = i
          this.fragment.appendChild(optionElement)
        }
        dias.appendChild(this.fragment)
      }
    })

    // Selector de Meses
    const meses = selectorsDates.item(1)
    meses.addEventListener('click', () => {
      if (meses.children.length === 1) {
        for (let i = 1; i <= 12; i++) {
          const optionElement = document.createElement('option')
          optionElement.innerText = i
          optionElement.value = i
          this.fragment.appendChild(optionElement)
        }
        meses.appendChild(this.fragment)
      }
    })

    // Selector de años
    const años = selectorsDates.item(2)
    años.addEventListener('click', () => {
      if (años.children.length === 1) {
        for (let i = new Date().getFullYear(); i >= 1900; i--) {
          const optionElement = document.createElement('option')
          optionElement.innerText = `${i}`
          optionElement.value = i
          this.fragment.appendChild(optionElement)
        }
        años.appendChild(this.fragment)
      }
    })
  }

  btnMostrarCategorias () {
    const botton = document.querySelector('.grid-item.nav span')
    const svg = document.querySelector('.grid-item.nav span svg')
    const containerCategorias = document.querySelector('.grid-item.nav #container-categorias')

    botton.addEventListener('click', e => {
      svg.classList.toggle('-rotate-90')
      containerCategorias.classList.toggle('hidden')
    })
  }

  btnSubir () {
    const btn = document.getElementById('btn-subir')
    btn.addEventListener('click', e => {
      window.scrollTo(0, 0)
    })

    window.addEventListener('scroll', e => {
      (window.scrollY === 0) ? btn.classList.add('hidden') : btn.classList.remove('hidden')
    })
  }

  precioPelicula () {
    this.inputPrecio.value = '2.50'
  }

  precioSerie () {
    this.inputPrecio.value = '2.00'
  }
}

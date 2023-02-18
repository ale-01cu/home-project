import { DomUtils } from './DomUtils.js'

export class Catalogo {
  constructor (categoria, urlAutocompletado, urlResultadosBusqueda, urlResultadosFiltradoGeneros, urlPaginacion) {
    this.page = 1
    this.categoria = categoria

    this.urlpaginacion = urlPaginacion
    this.urlAutocompletado = urlAutocompletado
    this.urlResultadosBusqueda = urlResultadosBusqueda
    this.urlResultadosFiltradoGeneros = urlResultadosFiltradoGeneros
    this.querys = '?'

    // TODO: Header
    this.header = document.getElementById('header')
    // MMovil
    this.btnSacarBuscador = document.querySelector('main #header #sacar-search')
    this.divBuscador = document.getElementById('search')
    this.quitarBuscador = document.querySelector('#search span')
    this.btnAnular = document.querySelector('#search #anular')
    this.buscador = document.querySelector('#search input')
    this.buscadorDespues = document.getElementById('search-after')
    this.resultadosBusqueda = document.getElementById('resultado-busqueda-list')
    this.btnBuscar = document.getElementById('btn-buscar')
    this.containerCards = document.getElementById('cards')

    // Pantallas grandes
    this.buscadorMd = document.querySelector('#search-md input')
    this.btnBuscadorAnular = document.querySelector('#search-md #anular')
    this.resultadosBusquedasPantallasGrandes = document.getElementById('res-search-list')
    this.btnBuscarMd = document.getElementById('btn-buscar-md')

    // Generos
    this.btnSacarGeneros = document.getElementById('btn-sacarGeneros')
    this.containerGeneros = document.getElementById('containerGeneros')
    this.btnQuitarGeneros = document.getElementById('quitarGeneros')
    this.btnSacarGenerosMD = document.getElementById('btn-sacarGenerosMd')
    this.cortina = document.getElementById('cortinaGeneros')
    this.formGeneros = document.getElementById('formGeneros')
    this.listaGeneros = document.getElementById('containerListaGeneros')
    this.btnFiltrar = document.getElementById('filtrarGeneros')
    this.checkBoxesGeneros = document.querySelectorAll('[type=checkbox]')

    this.btnVerMas = document.getElementById('verMas')
    this.fragment = document.createDocumentFragment()
  }

  headerFuncionesMovil () {
    this.btnSacarBuscador.addEventListener('click', () => {
      this.divBuscador.classList.toggle('translate-x-full')
      this.buscador.value = ''
      this.buscador.focus()
      DomUtils.disableScroll()
    })

    this.quitarBuscador.addEventListener('click', () => {
      this.divBuscador.classList.toggle('translate-x-full')
      this.btnAnular.classList.add('hidden')
      DomUtils.enableScroll()
    })

    this.buscador.addEventListener('input', () => {
      this.btnAnular.classList.remove('hidden')
      if (this.buscador.value === '') this.btnAnular.classList.add('hidden')
    })

    this.btnAnular.addEventListener('click', () => {
      this.buscador.value = ''
      this.resultadosBusqueda.innerHTML = ''
      this.btnAnular.classList.add('hidden')
      this.buscador.focus()
    })
  }

  headerFuncionesPantallasGrandes () {
    this.buscadorMd.addEventListener('input', () => {
      this.btnBuscadorAnular.classList.remove('hidden')
      if (this.buscadorMd.value === '') this.btnBuscadorAnular.classList.add('hidden')
    })

    this.btnBuscadorAnular.addEventListener('click', () => {
      this.buscadorMd.value = ''
      this.btnBuscadorAnular.classList.add('hidden')
      this.resultadosBusquedasPantallasGrandes.innerHTML = ''
    })
  }

  async usarFetch (url, metodo, body) {
    const data = await fetch(url, {
      method: metodo,
      body
    })
    const res = await data.json()
    return res
  }

  // autocompletado buscador
  async autocompletado (input, lista) {
    const res = await this.usarFetch(this.urlAutocompletado, 'POST', input)
    lista.innerHTML = ''
    console.log(res)
    res.forEach(e => {
      const textoParaBuscar = input.toLowerCase()
      const textoDondeBuscar = e.toLowerCase()
      const inicioEtiqueta = textoDondeBuscar.indexOf(textoParaBuscar)
      const finEtiqueta = inicioEtiqueta + textoParaBuscar.length
      const part1 = textoDondeBuscar.substring(0, inicioEtiqueta)
      const part2 = textoDondeBuscar.substring(inicioEtiqueta, finEtiqueta)
      const part3 = textoDondeBuscar.substring(finEtiqueta, textoDondeBuscar.length)
      const output = part1 + '<b>' + part2 + '</b>' + part3

      const li = document.createElement('li')
      li.classList.add('transition-all', 'duration-500')

      li.innerHTML = `
                <a href="${this.urlResultadosBusqueda + textoDondeBuscar}" id="btnAutocompletado" class="break-words hover:bg-gray-300 p-2 w-full flex items-center justify-start transition-all duration-200 rounded-xl text-start">
                    <span class="mr-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path></svg></span>
                    <p class="break-words overflow-hidden">${output}</p>
                </a>
                `
      this.fragment.appendChild(li)
    })
    lista.appendChild(this.fragment)
  }

  // Busquedas
  busquedas (input) {
    window.location.href = this.urlResultadosBusqueda + input.value
  }

  comprobarSiElBuscadorEsValidoParaLaBusqueda (input, campoResultadosBusqueda) {
    if (input.value.length > 0) {
      for (const i of input.value) {
        if (i !== ' ' && input.value.length > 0) return true
      }
      return false
    } else {
      campoResultadosBusqueda.innerHTML = ''
      return false
    }
  }

  funcionesBuscadores () {
    this.btnBuscar.addEventListener('click', e => {
      if (this.buscador.value.length > 0) {
        this.busquedas(this.buscador)
      }
    })

    this.buscador.addEventListener('input', e => {
      if (this.comprobarSiElBuscadorEsValidoParaLaBusqueda(this.buscador, this.resultadosBusqueda)) this.autocompletado(this.buscador.value, this.resultadosBusqueda)
    })

    this.buscador.addEventListener('keydown', async e => {
      if (e.key.toLowerCase() === 'enter' && this.buscador.value.length > 0) {
        if (this.comprobarSiElBuscadorEsValidoParaLaBusqueda(this.buscador, this.resultadosBusqueda)) this.busquedas(this.buscador)
      }
    })

    this.buscador.addEventListener('click', e => {
      if (this.buscadorMd.value.length > 0) this.autocompletado(this.buscadorMd.value, this.resultadosBusquedasPantallasGrandes)
    })

    if (this.buscadorDespues) {
      this.buscadorDespues.addEventListener('click', async e => {
        this.divBuscador.classList.toggle('translate-x-full')
        this.buscador.value = ''
        this.buscador.focus()
      })
    }

    this.btnBuscarMd.addEventListener('click', e => {
      if (this.buscadorMd.value.length > 0) {
        this.busquedas(this.buscadorMd)
      }
    })

    this.buscadorMd.addEventListener('input', e => {
      if (this.comprobarSiElBuscadorEsValidoParaLaBusqueda(this.buscadorMd, this.resultadosBusquedasPantallasGrandes)) this.autocompletado(this.buscadorMd.value, this.resultadosBusquedasPantallasGrandes)
    })

    this.buscadorMd.addEventListener('keydown', e => {
      if (e.key.toLowerCase() === 'enter' && this.buscadorMd.value.length > 0) {
        if (this.comprobarSiElBuscadorEsValidoParaLaBusqueda(this.buscadorMd, this.resultadosBusquedasPantallasGrandes)) this.busquedas(this.buscadorMd)
      }
    })

    this.buscadorMd.addEventListener('click', e => {
      if (this.buscadorMd.value.length > 0 && this.resultadosBusquedasPantallasGrandes.childElementCount === 0) this.autocompletado(this.buscadorMd.value, this.resultadosBusquedasPantallasGrandes)
    })
  }

  esElFinal (tipo, body = []) {
    const query = (tipo === 'busqueda')
      ? `?busqueda=${this.buscador.value}`
      : this.querys

    if (this.btnVerMas) {
      this.btnVerMas.addEventListener('click', (e) => {
        this.page++
        const url = this.urlpaginacion + this.page + query

        if (tipo === 'genero' && body) {
          fetch(url, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              genero: body
            })
          })
            .then(res => res.json())
            .then(res => {
              res.fin && this.btnVerMas.classList.add('hidden')
              this.cargarCards(res.docs)
            })
        } else if (tipo === 'busqueda') {
          this.usarFetch(url, 'POST').then(res => {
            res.fin && this.btnVerMas.classList.add('hidden')
            this.cargarCards(res.docs)
          })
        } else {
          this.usarFetch(url, 'GET').then(res => {
            res.fin && this.btnVerMas.classList.add('hidden')
            this.cargarCards(res.docs)
          })
        }
      })
    }
  }

  cargarCards (documentos) {
    documentos.forEach(e => {
      // Sacando los generos de la targeta
      let generos = ''
      e.generos.forEach(g => {
        generos = generos.concat(`<span class='rounded-lg align-middle text-sm font-medium px-5px py-3px bg-slate-300 mb-1' id='generos-cards'>${g}</span>\n`)
      })

      // Creando la targeta
      const a = document.createElement('a')
      a.id = 'card'
      a.classList.add('relative', 'w-full', 'h-max', 'font-sans', 'transition-transform', 'duration-500')
      a.href = `http://10.31.103.6:3000/catalogo/${this.categoria}/info/${e.id}`

      a.innerHTML =
            `
            <div id="poster" class="overflow-hidden h-120 mn:h-90 relative rounded-2xl">${e.imagen}</div>
            <div id="details" class="h-full p-2 space-y-1 w-full relative bottom-0 flex flex-col flex-wrap justify-end">
                <div class="flex justify-between">
                    <h3 id="añoEstreno" class="text-slate-800 flex items-center rounded-lg font-normal text-md">${e.fechaDeEstreno[2]}</h3>
                    <h3 id="precio" class="self-end font-normal text-md text-green-600">$${e.precio}</h3>
                </div>

                <h2 id="nombre" class=" text-slate-800 rounded-lg font-medium w-full whitespace-nowrap text-ellipsis overflow-hidden">${e.nombre} </h3>
                <div id="generos" class="text-slate-800 rounded-lg flex flex-wrap space-x-1">
                    ${generos}
                </div>
            </div>
            `
      this.fragment.appendChild(a)
    })
    this.containerCards.appendChild(this.fragment)
  }

  funcionesGeneros (url) {
    if (url) this.formGeneros.action = url

    this.btnSacarGenerosMD.addEventListener('click', e => {
      this.containerGeneros.classList.toggle('-translate-x-full')
      this.cortina.classList.toggle('hidden')
    })

    this.btnQuitarGeneros.addEventListener('click', e => {
      this.containerGeneros.classList.add('-translate-x-full')
      this.cortina.classList.toggle('hidden')
    })

    this.cortina.addEventListener('click', e => {
      this.containerGeneros.classList.add('-translate-x-full')
      this.cortina.classList.toggle('hidden')
    })

    this.btnSacarGeneros.addEventListener('click', e => {
      this.containerGeneros.classList.toggle('-translate-x-full')
      this.cortina.classList.toggle('hidden')
    })
  }
}

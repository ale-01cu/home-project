import { Folmulario } from './formulario.js'
const categorias = document.querySelectorAll('#container-categorias a')

const seleccionarCategoria = (lista, seleccionada) => {
  lista.forEach(e => e.classList.remove('border-solid', 'border-sky-400'))
  seleccionada.classList.add('border-solid', 'border-sky-400')
}

const form = () => {
  const form = new Folmulario()
  form.configInputDate()
  // formPelicula.efectosDeLaInterfaz();
  form.obtenerDatos()
  form.obtenerDatosSerie()
  form.btnReset()
  form.enviarDatos()
  form.btnMostrarCategorias()
  form.btnSubir()
  form.precioPelicula()
  form.formularioCapXtemporadas()

  categorias.forEach(e => {
    e.addEventListener('click', event => {
      (e.id === 'peliculas') ? form.construirFormPelicula() : form.construirFormSerie()
      seleccionarCategoria(categorias, e)
      form.setUrlGuardar(`formularios/${e.id}/guardar`)
    })
  })
}

form()

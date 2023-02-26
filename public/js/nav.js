const btn = document.querySelector('.btn-menu')
const nav = document.querySelector('nav')
const textNav = document.querySelectorAll('nav div a span:last-child')
const tooltip = document.querySelectorAll('.tooltip')
const cortina = document.querySelector('.cortina')
const main = document.querySelector('main')
const btnNavMovil = document.querySelector('#nav button')

const efectosNav = () => {
  btn.classList.toggle('active')
  nav.classList.toggle('w-48')
  nav.classList.toggle('w-16')
  nav.classList.toggle('-translate-x-16')
  main.classList.toggle('active')

  textNav.forEach(e => e.classList.toggle('opacity-0'))
  tooltip.forEach(e => e.classList.toggle('hidden'))

  cortina.classList.toggle('hidden')

  btn.innerHTML = (btn.classList.contains('active'))
    ? '<span><svg class="icon fill-white transition-all duration-300 ease-out" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M256 863.652 192.348 800l224-224-224-224L256 288.348l224 224 224-224L767.652 352l-224 224 224 224L704 863.652l-224-224-224 224Z"/></svg></span>'
    : '<span><svg class="icon fill-white transition-all duration-300 ease-out" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M106.999 837.479V731.478h746.002v106.001H106.999Zm0-208.478V522.999h746.002v106.002H106.999Zm0-208.479V314.521h746.002v106.001H106.999Z"/></svg></span>'
}

btn.addEventListener('click', () => efectosNav())
cortina.addEventListener('click', () => efectosNav())
btnNavMovil.addEventListener('click', () => efectosNav())

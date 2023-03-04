// Login
const btnIniciarSesion = document.getElementById('sesion')
const btnRegistro = document.getElementById('registro')
const formLogin = document.getElementById('formLogin')
const loginNav = document.getElementById('loginNav')
const urlLogin = 'http://10.31.103.6:3000/api/login'
const urlRegistro = 'http://10.31.103.6:3000/api/user/registrar'
const btnVisibility = document.getElementById('visibility')
const inputsPass = document.querySelectorAll('#formLogin .pass')
const containerConfPass = document.getElementById('confPass')
const todosLosInputs = document.querySelectorAll('#formLogin input')

const formLoginFunciones = () => {
  loginNav.classList.add('active', 'bg-white')

  btnIniciarSesion.addEventListener('click', e => {
    btnRegistro.classList.replace('before:w-full', 'before:w-0')
    btnIniciarSesion.classList.replace('before:w-0', 'before:w-full')
    formLogin.action = urlLogin
    containerConfPass.classList.add('hidden')
    todosLosInputs.forEach(e => { e.value = '' })
  })

  btnRegistro.addEventListener('click', e => {
    btnIniciarSesion.classList.replace('before:w-full', 'before:w-0')
    btnRegistro.classList.replace('before:w-0', 'before:w-full')
    formLogin.action = urlRegistro
    containerConfPass.classList.remove('hidden')
    todosLosInputs.forEach(e => { e.value = '' })
  })
}

const toggleVisibility = () => {
  const [pass, confPass] = inputsPass

  const on = () => {
    btnVisibility.classList.replace('off', 'on')

    pass.type = 'text'
    confPass.type = 'text'

    return '<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M480.091 727.076q62.985 0 106.985-44.09 44-44.091 44-107.077 0-62.985-44.09-106.985-44.091-44-107.077-44-62.985 0-106.985 44.09-44 44.091-44 107.077 0 62.985 44.09 106.985 44.091 44 107.077 44ZM480 672q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm.055 171.999q-134.573 0-245.236-73.115Q124.155 697.769 69.54 576q54.615-121.769 165.224-194.884 110.608-73.115 245.181-73.115t245.236 73.115Q835.845 454.231 890.46 576q-54.615 121.769-165.224 194.884-110.608 73.115-245.181 73.115Z"/></svg>'
  }

  const off = () => {
    btnVisibility.classList.replace('on', 'off')

    pass.type = 'password'
    confPass.type = 'password'

    return '<svg class="" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M766.461 936.767 642.616 812.152q-33.769 12.385-75.192 22.116Q526 843.999 480 843.999q-132.999 0-246.114-71.538Q120.771 700.922 69.54 576q18.154-52 61.231-101.885 43.077-49.884 89.231-85.576l-100.769-100 37.153-37.153 647.228 648.228-37.153 37.153ZM480 727.076q15.539 0 33.193-4.154 17.654-4.154 30.885-9.308L342.386 511.922q-4.154 14-8.808 31.462T328.924 576q0 63.076 44 107.076 44 44 107.076 44Zm276.153 22.308L624.691 617.922q2.693-8.769 4.539-19.884 1.846-11.115 1.846-22.038 0-63.076-44-107.076-44-44-107.076-44-10.923 0-21.153 1.539-10.231 1.538-20.384 4.615L337.386 330.386q34.923-13.077 70.961-17.731 36.038-4.654 71.653-4.654 132.615 0 246.114 71.538Q839.614 451.078 890.46 576q-21.231 51.615-55.423 94.076-34.192 42.461-78.884 79.308ZM575.385 569 487 480q18.461-2 34.461 3.923t30 19.538q12.385 11.616 18.962 29.308T575.385 569Z"/></svg>'
  }

  btnVisibility.addEventListener('click', event => {
    btnVisibility.innerHTML = btnVisibility.classList.contains('off') ? on() : off()
  })
}

formLoginFunciones()
toggleVisibility()

// Login
const btnIniciarSesion = document.getElementById('sesion')
const btnRegistro = document.getElementById('registro')
const formLogin = document.getElementById('formLogin')
const loginNav = document.getElementById('loginNav')
const urlLogin = 'http://10.31.103.6:3000/api/login'
const urlRegistro = 'http://10.31.103.6:3000/api/user/registrar'

const formIniciarSesion = () => {
  return `
    <div class="flex flex-col w-full">
          <h3 class="font-medium text-gray-500">Nombre</h3>
          <input type="text" name="name" id="name" class="
                                                    p-2
                                                    bg-slate-200 
                                                    rounded-lg
                                                    outline-2
    
                                                    ">
        </div>
    
        <div class="flex flex-col w-full">
          <h3 class="font-medium text-gray-500">Contraseña</h3>
          <input type="password" name="password" id="pass" class="
                                                          p-2
                                                        bg-slate-200 
                                                          rounded-lg
                                                          outline-2
    
                                                            ">
    </div>
  `
}

const formRegistrar = () => {
  return `
    <div class="flex flex-col w-full">
          <h3 class="font-medium text-gray-500">Confirmar Contraseña</h3>
          <input type="password" name="password" id="confPass" class="
                                                            p-2
                                                          bg-slate-200 
                                                          rounded-lg
                                                          outline-2
    
                                                            ">
    </div>
  `
}

const formLoginFunciones = () => {
  loginNav.classList.add('active', 'bg-white')

  btnIniciarSesion.addEventListener('click', e => {
    btnRegistro.classList.replace('before:w-full', 'before:w-0')
    btnIniciarSesion.classList.replace('before:w-0', 'before:w-full')
    formLogin.action = urlLogin
    formLogin.innerHTML = formIniciarSesion()
  })

  btnRegistro.addEventListener('click', e => {
    btnIniciarSesion.classList.replace('before:w-full', 'before:w-0')
    btnRegistro.classList.replace('before:w-0', 'before:w-full')
    formLogin.action = urlRegistro
    formLogin.innerHTML = formIniciarSesion() + formRegistrar()
  })
}

formLoginFunciones()

import { useState } from "react"
import { object, string } from 'yup';
// import LogoEye from '../assets/visibility_FILL0_wght400_GRAD0_opsz24.svg'
// import LogoEyeOff from '../assets/visibility_off_FILL0_wght400_GRAD0_opsz24.svg'
import {LOGINURL} from '../utils/urls'
import {addTokens} from '../redux/tokensSlice'
import {useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';


const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setisPasswordVisible] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()


  let registerSchema = object({
    username: string()
      .required('El nombre es obligatorio'),
    password: string()
      .required('La contraseña es obligatoria'),
  });

  const inputsValidate = (name, value) => {
    registerSchema.validateAt(name, { [name]: value })
      .then(() => {
        setValidationErrors(prevState => ({ ...prevState, [name]: null }));
      })
      .catch(error => {
        setValidationErrors(prevState => ({ ...prevState, [name]: error.message }));
      });

  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!validationErrors.username && !validationErrors.password) {
      const formData = {
        username,
        password
      };
  
      fetch(LOGINURL,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      .then(res => {
        const getData = async () => res.json()
  
        getData().then(data => {
  
          if (res.status === 200) {
            dispatch(addTokens(data))
            navigate('/')
  
          }else {
            const errors = {}
  
            for (let i = 0; i < Object.keys(data).length; i++) {
              const key = Object.keys(data)[i];
              let value = data[key];
  
              if (value === "No active account found with the given credentials")
                value = 'No hay ninguna cuenta activa con estas credenciales'
  
              else if (value === 'This field may not be blank.')
                value = 'Este campo no puede estar en blanco.'
        
              errors[key] = value;
            }
            setValidationErrors(errors);
          }
  
        })
      })
      .catch(e => {
        console.log({error: e})
      })
    }
  }

  const handleChangeUserName = e => {
    const { name, value } = e.target
    inputsValidate(name, value)
    setUsername(value)
  }

  const handleChangePassword = e => {
    const { name, value } = e.target
    inputsValidate(name, value)
    setPassword(value)
  }

  // const handlePasswordVisibility = () => setisPasswordVisible(!isPasswordVisible)

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="shadow-slate-600 p-5 w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Acceda a su cuenta
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                      <input 
                        type="username" 
                        name="username" 
                        id="username" 
                        className="
                          bg-gray-50 border 
                          border-gray-300 
                          text-gray-900 
                          sm:text-sm rounded-lg 
                          focus:ring-primary-600 
                          focus:border-primary-600 
                          block w-full p-2.5 
                          dark:bg-gray-700 
                          dark:border-gray-600 
                          dark:placeholder-gray-400 
                          dark:text-white 
                          dark:focus:ring-blue-500 
                          dark:focus:border-blue-500" 
                        placeholder="Escriba su Nombre..." 
                        required
                        onChange={handleChangeUserName}
                        value={username}
                      />
                      {validationErrors.username && username && <span className="text-red-500 w-fit">{validationErrors.username}</span>}
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                      <input 
                        type="password"
                          name="password" 
                          id="password" 
                          placeholder="••••••••" 
                          className="
                          bg-gray-50 border 
                          border-gray-300 
                          text-gray-900 
                          sm:text-sm 
                          rounded-lg 
                          focus:ring-primary-600 
                          focus:border-primary-600 
                          block w-full 
                          p-2.5 
                          dark:bg-gray-700 
                          dark:border-gray-600 
                          dark:placeholder-gray-400 
                          dark:text-white 
                          dark:focus:ring-blue-500 
                          dark:focus:border-blue-500" 
                          required
                          onChange={handleChangePassword}
                          value={password}
                        />
                        {validationErrors.password && password && <span className="text-red-500 w-fit">{validationErrors.password}</span>}
                        {validationErrors.detail && <span className="text-red-500 w-fit">{validationErrors.detail}</span>}
                  </div>
                  <div className="flex items-center justify-end">
                      {/* <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a> */}
                  </div>
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Entrar
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      No tienes una cuenta aún? 
                      <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Registrarme</Link>
                  </p>
              </form>
            </div>
          </div>
      </div>
    </section>
  )
}

export default Login
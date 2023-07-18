import { useState } from "react"
import { object, string } from 'yup';
import LogoEye from '../assets/visibility_FILL0_wght400_GRAD0_opsz24.svg'
import LogoEyeOff from '../assets/visibility_off_FILL0_wght400_GRAD0_opsz24.svg'
import {LOGINURL} from '../utils/urls'
import {addTokens} from '../redux/tokensSlice'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';


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

  const handlePasswordVisibility = () => setisPasswordVisible(!isPasswordVisible)

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} action="" className="p-10 flex flex-col items-center w-full">
        <div><h1 className="text-center text-4xl p-3">Login</h1></div>
        
        <div className="flex flex-col space-y-6 p-5 min-w-min w-1/2 max-w-md">
          <input 
            type="text" 
            name="username" 
            className="p-2 px-5 border border-solid border-slate-300 rounded-xl min-w-min" 
            placeholder="Escriba su Nombre"
            onChange={handleChangeUserName}
            value={username}
          />
          {validationErrors.username && username && <span className="text-red-500 w-fit">{validationErrors.username}</span>}

          <input 
            type={isPasswordVisible ? 'text' : 'password'} 
            name="password" 
            className="p-2 px-5 border border-solid border-slate-300 rounded-xl min-w-min" 
            placeholder="Contraseña"
            onChange={handleChangePassword}
            value={password}
          />
          {validationErrors.password && password && <span className="text-red-500 w-fit">{validationErrors.password}</span>}
          {validationErrors.detail && <span className="text-red-500 w-fit">{validationErrors.detail}</span>}

          <button type='button' className='self-end' onClick={handlePasswordVisibility}><img src={isPasswordVisible ? LogoEyeOff : LogoEye} alt="" /></button>
        </div>
        <div className="p-5">
          <button type="submit" className="rounded-lg border border-solid border-slate-400 p-1 px-10 hover:bg-slate-200 transition-all duration-200">
            Entrar
          </button>
        </div>
        
      </form>
    </div>
  )
}

export default Login
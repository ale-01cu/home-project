import LogoEye from '../assets/visibility_FILL0_wght400_GRAD0_opsz24.svg'
import LogoEyeOff from '../assets/visibility_off_FILL0_wght400_GRAD0_opsz24.svg'
import {REGISTERURL} from '../utils/urls'
import { object, string } from 'yup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'

const Register = () => {
  const [isPasswordVisible, setisPasswordVisible] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [re_password, setRePassword] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      setUsername('')
      setPassword('')
      setRePassword('')
    }
  }, [])

  let registerSchema = object({
    username: string()
      .min(2, 'El nombre debe tener al menos 2 caracteres')
      .max(255, 'El nombre no debe tener más de 255 caracteres')
      .required('El nombre es obligatorio'),
    password: string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .max(255, 'La contraseña no debe tener más de 255 caracteres')
      .required('La contraseña es obligatoria'),
    re_password: string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .max(255, 'La contraseña no debe tener más de 255 caracteres')
      .required('La contraseña es obligatoria')
      .test('passwords-match', 'Las contraseñas no coinciden', function(value) {
        return password === value;
      })
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
      password,
      re_password,
    };

    fetch(REGISTERURL,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(res => {
      const getData = async () => res.json()

      getData().then(data => {

        if (res.status === 201) {
          navigate('/login')

        }else {
          const errors = {}

          for (let i = 0; i < Object.keys(data).length; i++) {
            const key = Object.keys(data)[i];
            let value = data[key][0];

            if (value === 'The password is too similar to the Nombre de Usuario.')
              value = 'La contraseña es similar al nombre de usuario.'
            
            else if (value === 'This password is too common.')
              value = 'Esta contraseña es demasiado comun.'
            
            else if (value === 'Cuenta de Usuario with this Nombre de Usuario already exists.')
              value = 'Ya existe una cuenta con ese nombre.'

            else if (value === 'This field may not be blank.')
              value = 'Este campo no puede estar en blanco.'

            else if (value === "The two password fields didn't match.")
              value = 'Las contraseñas con diferentes.'

            else if (value === "Ensure this field has no more than 255 characters.")
              value = 'No estan permitidos mas de 255 caracteres.'

              errors[key] = value;
          }
          setValidationErrors(errors);
        }

      })
    })
    .catch(e => {
      console.log({error: e});
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

  const handleChangeRePassword = e => {
    const { name, value } = e.target
    inputsValidate(name, value)
    setRePassword(value)
  }

  const handlePasswordVisibility = () => setisPasswordVisible(!isPasswordVisible)
  
  return (
    <div className="min-h-screen flex justify-center items-center">
      <form action="" onSubmit={handleSubmit} className="p-10 flex flex-col items-center w-full">
        <div><h1 className="text-center text-4xl p-3">Registro</h1></div>
        
        <div className="flex flex-col space-y-6 p-5 min-w-min w-1/2 max-w-md">
          <input 
            type='text' 
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

          <input 
            type={isPasswordVisible ? 'text' : 'password'} 
            name="re_password" 
            className="p-2 px-5 border border-solid border-slate-300 rounded-xl min-w-min" 
            placeholder="Condirmar Contraseña"
            onChange={handleChangeRePassword}
            value={re_password}
          />
          {validationErrors.re_password && re_password && <span className="text-red-500 w-fit">{validationErrors.re_password}</span>}
          {validationErrors.non_field_errors && <span className="text-red-500 w-fit">{validationErrors.non_field_errors}</span>}

          <button type='button' className='self-end' onClick={handlePasswordVisibility}><img src={isPasswordVisible ? LogoEyeOff : LogoEye} alt="" /></button>
        </div>

        <div className="p-5">
          <button type="submit" className="rounded-lg border border-solid border-slate-400 p-1 px-3 hover:bg-slate-200 transition-all duration-200">
            Registrarme
          </button>
        </div>
          
      </form>
    </div>
  )
}

export default Register
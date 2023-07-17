import {Link} from 'react-router-dom'

const AcountOptionsPage = () => {
  const options = [
    {
      id: 1,
      nameOption: 'Registrarme',
      path: '/register',
      color: 'mb-15 mb-12 bg-slate-100'
    },
    {
      id: 2,
      nameOption: 'Loguearme',
      path: '/login',
      color: 'mb-20 bg-gray-100'
    }
  ]

  return (
    <ul className='min-h-screen grid grid-cols-1 sm:grid-cols-2 pt-5 sm:pt-10 sm:pb-10 sm:pr-10 sm:gap-2'>
      {
        options.map(option => (
          <li key={option.id} className='flex px-10 justify-center sm:p-0'>
            <Link to={option.path} className={'sm:m-0 w-full flex justify-center items-center rounded-2xl max-w-md sm:max-w-full hover:bg-white transition-all duration-200 text-3xl' + " " + option.color}>{option.nameOption}</Link>
          </li>
        ))
      }
    </ul>
  )
}

export default AcountOptionsPage

const Login = () => {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <form action="" className="p-10 flex flex-col items-center">
                <div><h1 className="text-center text-4xl p-3">Login</h1></div>
                
                <div className="flex flex-col space-y-2 p-5">
                    <input 
                        type="text" 
                        name="username" 
                        className="p-2 border border-solid border-slate-300 rounded-xl" 
                        placeholder="Escriba su Nombre"
                    />
                    <input 
                        type="text" 
                        name="password" 
                        className="p-2 border border-solid border-slate-300 rounded-xl" 
                        placeholder="Contraseña"
                    />
                </div>
                <div className="p-5"><button type="submit" className="rounded-lg border border-solid border-slate-800 p-1 px-3 hover:bg-slate-200 transition-all duration-200">Entrar</button></div>
                
            </form>
        </div>
    )
}

export default Login
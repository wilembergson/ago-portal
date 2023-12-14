import { useRouter } from "next/navigation"
import { useState } from "react"

type Login = {
    crm: string
    nome: string
}

export default function Login() {
    const router = useRouter()
    const [login, setLogin] = useState<Login>({
        crm: '',
        nome: ''
    })

    function handleChange({ target }: any) {
        setLogin({ ...login, [target.name]: target.value })
    }

    function logar() {
        localStorage.setItem('crm', login.crm)
        localStorage.setItem('nome', login.nome)
        setLogin({
            crm: '',
            nome: ''
        })
        router.push('/transmicao')
    }

    return (
        <div className='flex flex-col h-scheen p-4 w-full justify-center items-center'>
            <form className='flex flex-col p-6 bg-green-600 rounded-lg justify-center items-center'
                action={logar}>
                <h1 className="flex text-2xl mb-6">
                    Área do cooperado
                </h1>
                <input className='flex mb-4 text-gray-700 bg-gray-100 p-2 rounded-md'
                    placeholder='Digite seu crm'
                    name='crm'
                    onChange={(e: any) => handleChange(e)}
                    value={login.crm}
                    required
                />
                <input className='flex mb-4 text-gray-700 bg-gray-100 p-2 rounded-md'
                    type="text"
                    placeholder='Seu nome'
                    name='nome'
                    onChange={(e: any) => handleChange(e)}
                    value={login.nome}
                    required
                />
                <div className="mt-4">
                    <button className='bg-orange-500 p-2 rounded-md'>
                        Entrar
                    </button>
                </div>
            </form>
        </div>
    )
}
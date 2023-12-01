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

    function logar(){
        localStorage.setItem('crm', login.crm)
        localStorage.setItem('nome', login.nome)
        setLogin({
            crm:'',
            nome:''
        })
        router.push('/transmicao')
    }

    return (
        <div>
            <form className='flex flex-col p-4 bg-white'
                action={logar}>
                <input className='flex mb-4 bg-gray-100 p-2 rounded-md'
                    placeholder='Digite seu crm'
                    name='crm'
                    onChange={(e: any) => handleChange(e)}
                    value={login.crm}
                    required
                />
                <input className='flex mb-4 bg-gray-100 p-2 rounded-md'
                    type="text"
                    placeholder='Seu nome'
                    name='nome'
                    onChange={(e: any) => handleChange(e)}
                    value={login.nome}
                    required
                />
                <div>
                    <button className='bg-green-500'>
                        Criar
                    </button>
                </div>
            </form>
        </div>
    )
}
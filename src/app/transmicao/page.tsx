'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Player from "../components/palyer"
import Enquete from "../components/Enquete"


export default function Home() {
    const [visivel, setVisivel] = useState(false)
    const router = useRouter()
    const [crm, setCrm] = useState<string>()
    const [nome, setNome] = useState<string>()

    function logout() {
        localStorage.clear()
        router.push("/")
    }

    useEffect(() => {
        const localStorageCrm: any = localStorage.getItem('crm')
        const localStorageNome: any = localStorage.getItem('nome')
        setCrm(localStorageCrm)
        setNome(localStorageNome)
    }, [])

    return (
        <main className="flex min-h-screen flex-col items-center p-4">
            <header className="flex w-full justify-around items-center mb-10">
                <img className="hidden md:flex w-52 mr-10" src="/img/unimed-logo.svg" alt="" />
                <h1 className='flex font-black text-2xl md:text-5xl'>
                    AGO 2024
                </h1>
                <div className="flex">
                    <section className="hidden md:flex flex-col text-md  mr-2">
                        <h1 className="mr-2">{nome?.toString()}</h1>
                        <h1>CRM: {crm?.toString()}</h1>
                    </section>
                    <button className="flex font-black text-white items-center p-4 rounded-full
                bg-green-600 hover:bg-green-500 transition duration-300"
                        onClick={() => logout()}>
                        Logout
                    </button>
                </div>
            </header>
            <section className='flex flex-col md:flex-row mt-0 md:mt-10 justify-center'>
                <Player />
                <Enquete visivel={visivel} />
            </section>
        </main>
    )
}

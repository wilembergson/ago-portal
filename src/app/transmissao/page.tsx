'use client'
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Player from "../components/palyer"
import Enquete from "../components/Enquete"
import Resultado from "../components/Resultado"
import EnquetesEncerradas from "../components/EnquetesEncerradas"


export default function Transmissao() {
    const [visivel, setVisivel] = useState(false)
    const [crm, setCrm] = useState<string>()
    const [nome, setNome] = useState<string>()
    const searchParams = useSearchParams()

    function logout() {
        localStorage.clear()
    }

    useEffect(() => {
        const localStorageCrm = searchParams.get('crm')
        const localStorageNome = searchParams.get('nome')
        setCrm(localStorageCrm!)
        setNome(localStorageNome!)
    }, [])

    return (
        <main className="flex min-h-screen flex-col items-center w-full">
            {/*<header className="flex w-full justify-around items-center">
                <section className="hidden md:flex flex-col text-md  mr-2">
                    <h1 className="mr-2">{nome?.toString()}</h1>
                    <h1>CRM: {crm?.toString()}</h1>
                </section>
            </header>*/}
            <div className="flex flex-col w-full">
                <section className='flex flex-col md:flex-row justify-center w-full'>
                    <Player />
                    <Enquete visivel={visivel} />
                    <Resultado />
                </section>
                <EnquetesEncerradas />
            </div>
        </main>
    )
}

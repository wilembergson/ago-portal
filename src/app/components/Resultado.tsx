'use client'
import { api } from "@/api/api-conections"
import { useState, useEffect, useMemo } from "react"

type ResultadoEnquete = {
    pergunta: string,
    aprovar: number,
    reprovar: number,
    abster: number,
    total: number,
    resultado: string
}

export default function Resultado() {
    const [resultado, setResultado] = useState<any>()

    async function buscarResultado() {
        try {
            const res = await api.buscarResultado()
            if(!res.data){
                setResultado(null)
            } else{
                setResultado(res.data)
            }
            console.log('Atualizou Enquete:' + (new Date()).getSeconds())
            console.log(res.data)
        } catch (error: any) {
            console.log(error)
        }
    } 
    useEffect(() => {
        const intervalo = setInterval(async () => {
            await buscarResultado()
        }, 5000)

        return () => clearInterval(intervalo)
    }, [resultado])

    const estilo = `flex flex-col w-72 px-4 mt-10 md:mt-0`
    return (
        <>
            {resultado ?
                <div className={estilo}>
                    <h1>{resultado.pergunta}</h1>
                    <h1>{resultado.resultado}</h1>
                    <h1>APROVAR: {resultado.aprovar}</h1>
                    <h1>REPROVAR: {resultado.reprovar}</h1>
                    <h1>ABSTER: {resultado.abster}</h1>
                    <h1>TOTAL: {resultado.total}</h1>
                </div> : <></>
            }
        </>
    )
}
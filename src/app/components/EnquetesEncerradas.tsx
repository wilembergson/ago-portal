import { useState, useEffect } from 'react'
import { api } from "@/api/api-conections"
//import ItemPrincipal from './ItemPrincipal'
import ItemEnqueteEncerrada from './ItemEnqueteEncerrada'
//import { useGlobalContext } from '../context/ContextoEnqueteAtiva'

export default function EnquetesEncerradas() {
    const [enquetes, setEnquetes] = useState<Enquete[]>()
    //const { enqueteAtiva, setEnqueteAtiva } = useGlobalContext()

    async function listarEnquetes() {
        try {
            const lista = await api.buscarEnquetesEncerradas()
            setEnquetes(lista.data)
        } catch (error: any) {
            alert(error.response.data.mensagem)
            console.log(error)
        }
    }

    useEffect(() => {
        listarEnquetes()
    }, [])

    return (
        <div className='flex flex-col mt-10'>
            <h1 className='flex justify-center text-xl my-4'>
                Enquetes encerradas
            </h1>
            {(enquetes?.length !== 0) ? enquetes?.map(item =>
                <ItemEnqueteEncerrada
                    key={item.id}
                    id={item.id}
                    pergunta={item.pergunta}
                    exibirResultado={item.exibirResultado}
                    data_hora={item.data_hora}
                    atualizarLista={() => listarEnquetes()}
                />)
                : <h1 className='flex text-gray-400 text-2xl h-full justify-center items-center'>
                    Nenhuma enquete finalizada por enquanto.
                </h1>}
        </div>
    )
}

type Enquete = {
    id: number
    pergunta: string
    tempo: number
    ativo: number
    exibirResultado: number
    data_hora: number[]
}
'use client'
import { api } from "@/api/api-conections"
import { useState, useEffect, useMemo } from "react"
import Countdown, { zeroPad } from "react-countdown"

type Props = {
    visivel: boolean
}

type Resposta = {
    conteudo: string
    crm: string
    nome: string
    enquete_id: string
}
export default function Enquete({ visivel }: Props) {
    const [enquete, setEnquete] = useState<any>(undefined)
    const [voto, setVoto] = useState('')
    const crm: any = localStorage.getItem('crm')
    const nome: any = localStorage.getItem('nome')
    const [countdown, setCountdown] = useState(0)
    const [opcaoSelecionada, setOpcaoSelecionada] = useState('');


    const handleVotoChange = async (e: any) => {
        setVoto(e.target.value);
        setOpcaoSelecionada(e.target.value)
        await api.adicionarResposta({
            conteudo: e.target.value,
            crm,
            nome,
            enquete_id: enquete.id
        })
    };

    async function buscarEnquete() {
        try {
            const res = await api.buscarEnqueteAtiva()
            if (!res.data) {
                setVoto('')
                setOpcaoSelecionada('')
            }
            setEnquete(res.data)
            if (res.data) {
                setCountdown(res.data.tempo * 60000)
                localStorage.setItem('cronometro', (res.data.tempo * 60000).toString())
            }
            console.log('Atualizou:' + (new Date()).getSeconds())
        } catch (error: any) {
            console.log(error)
        }
    }

    const countdownComponent = useMemo(() => (
        <Countdown
            date={Date.now() + countdown}
            intervalDelay={0}
            precision={2}
            renderer={({ minutes, seconds }) => (
                <span className='flex font-black text-5xl text-[#FFA21C] mt-2'>
                    {zeroPad(minutes)}:{zeroPad(seconds)}
                </span>
            )}
        />
    ), [countdown])

    useEffect(() => {
        const intervalo = setInterval(async () => {
            await buscarEnquete()
        }, 5000)

        return () => clearInterval(intervalo)
    }, [])

    const estilo = `flex flex-col w-72 px-4 mt-10 md:mt-0`
    return (
        <>
            {enquete ?
                <div className={estilo}>
                    <h1 className="flex w-hull font-black text-start text-md mb-4">
                        {enquete.pergunta}
                    </h1>
                    <label className={`hover:cursor-pointer hover:text-[#FFA21C] items-center justify-center 
                    transition duration-300 ${opcaoSelecionada === 'APROVAR' ? 'font-bold text-lg text-[#FFA21C]' : ''}`}>
                        <input className="hover:cursor-pointer focus:ring-green-500 w-4 h-4 m-2"
                            type="radio"
                            value="APROVAR"
                            checked={voto === 'APROVAR'}
                            onChange={handleVotoChange}
                        />
                        APROVAR
                    </label>
                    <label className={`hover:cursor-pointer hover:text-[#FFA21C] items-center justify-center 
                     transition duration-300 ${opcaoSelecionada === 'REPROVAR' ? 'font-bold text-lg text-[#FFA21C]' : ''}`}>
                        <input className="hover:cursor-pointer focus:ring-green-500 w-4 h-4 m-2"
                            type="radio"
                            value="REPROVAR"
                            checked={voto === 'REPROVAR'}
                            onChange={handleVotoChange}
                        />
                        REPROVAR
                    </label>
                    <label className={`hover:cursor-pointer hover:text-[#FFA21C] items-center justify-center 
                    transition duration-300 ${opcaoSelecionada === 'ABSTER' ? 'font-bold text-lg text-[#FFA21C]' : ''}`}>
                        <input className="hover:cursor-pointer focus:ring-green-500 w-4 h-4 m-2"
                            type="radio"
                            value="ABSTER"
                            checked={voto === 'ABSTER'}
                            onChange={handleVotoChange}
                        />
                        ABSTER
                    </label>
                    <h1 className="flex mt-4 md:mt-8">
                        {countdownComponent}
                    </h1>
                </div> : <></>
            }
        </>
    )
}
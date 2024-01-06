'use client'
import { api } from "@/api/api-conections"
import { useSearchParams } from "next/navigation"
import { useState, useEffect, useMemo } from "react"
import Countdown, { zeroPad } from "react-countdown"

type Props = {
    visivel: boolean
}

type Resposta = {
    pergunta: string,
    aprovar: number,
    reprovar: number,
    abster: number,
    total: number,
    resultado: string
}

export default function Enquete({ visivel }: Props) {
    const [enquete, setEnquete] = useState<any>(undefined)
    const [voto, setVoto] = useState('')
    const [agora, setAgora] = useState(new Date())
    const [datacro, setDatacro] = useState(new Date())
    const [countdown, setCountdown] = useState<number|undefined>(undefined)
    const [opcaoSelecionada, setOpcaoSelecionada] = useState('');
    const [dataCronometro, setDataCronometro] = useState<Date>()

    const [crm, setCrm] = useState<any>()
    const [nome, setNome] = useState<any>()
    const searchParams = useSearchParams()

    const handleVotoChange = async (e: any) => {
        setVoto(e.target.value);
        setOpcaoSelecionada(e.target.value)
        await api.adicionarResposta({
            idResposta: parseInt(e.target.value),
            crm,
            nome
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
            /*if (res.data) {
                const d:number[] = res.data.data_cronometro
                const nd = new Date()
                nd.setHours(d[3], d[4], d[5])
                setDataCronometro(nd)
                const dtValendo = (nd.getTime() - agora.getTime())
                //setCountdown(res.data.tempo * 60000)
                if(countdown === undefined){
                    setCountdown(dtValendo)
                }
                localStorage.setItem('cronometro', (res.data.tempo * 60000).toString())
            }*/
            console.log('Atualizou:' + (new Date()).getSeconds())
        } catch (error: any) {
            console.log(error)
        }
    }

    async function buscarCountdown() {
        try {
            const res = await api.buscarEnqueteAtiva()
            if (!res.data) {
                setVoto('')
                setOpcaoSelecionada('')
            }
            if (res.data) {
                const d:number[] = res.data.data_cronometro
                const nd = new Date()
                nd.setHours(d[3], d[4], d[5], d[6])
                setDataCronometro(nd)
                const dtValendo = (nd.getTime() - agora.getTime())
                //setCountdown(res.data.tempo * 60000)
                if(countdown === undefined){
                    setCountdown(dtValendo)
                }
            }
            console.log('Atualizou:' + (new Date()).getSeconds())
        } catch (error: any) {
            console.log(error)
        }
    }

    const countdownComponent = useMemo(() => (
        <Countdown
            date={Date.now() + countdown!}
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
        const localStorageCrm = searchParams.get('crm')
        const localStorageNome = searchParams.get('nome')
        setCrm(localStorageCrm!)
        setNome(localStorageNome!)
        const intervalo = setInterval(async () => {
            await buscarEnquete()
        }, 5000)

        buscarCountdown()
        return () => clearInterval(intervalo)
    }, [])

    const estilo = `flex flex-col w-72 px-4 mt-10 md:mt-0`
    return (
        <>
            {enquete ?
                <div className={estilo}>
                    <h1>{dataCronometro?.toLocaleTimeString()}</h1>
                    <h1>{agora.toLocaleTimeString()}</h1>
                    <h1>{''}</h1>
                    {/*<h1>{agora.getHours()}:{agora.getMinutes()}:{agora.getSeconds()}</h1>*/}
                    <h1 className="flex w-hull font-black text-start text-md mb-4">
                        {enquete.pergunta}
                    </h1>
                    <label className={`hover:cursor-pointer hover:text-[#FFA21C] items-center justify-center 
                    transition duration-300 ${opcaoSelecionada === 'APROVAR' ? 'font-bold text-lg text-[#FFA21C]' : ''}`}>
                        <input className="hover:cursor-pointer focus:ring-green-500 w-4 h-4 m-2"
                            type="radio"
                            value='1'
                            checked={voto === '1'}
                            onChange={handleVotoChange}
                        />
                        APROVAR
                    </label>
                    <label className={`hover:cursor-pointer hover:text-[#FFA21C] items-center justify-center 
                     transition duration-300 ${opcaoSelecionada === 'REPROVAR' ? 'font-bold text-lg text-[#FFA21C]' : ''}`}>
                        <input className="hover:cursor-pointer focus:ring-green-500 w-4 h-4 m-2"
                            type="radio"
                            value='2'
                            checked={voto === '2'}
                            onChange={handleVotoChange}
                        />
                        REPROVAR
                    </label>
                    <label className={`hover:cursor-pointer hover:text-[#FFA21C] items-center justify-center 
                    transition duration-300 ${opcaoSelecionada === 'ABSTER' ? 'font-bold text-lg text-[#FFA21C]' : ''}`}>
                        <input className="hover:cursor-pointer focus:ring-green-500 w-4 h-4 m-2"
                            type="radio"
                            value='3'
                            checked={voto === '3'}
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
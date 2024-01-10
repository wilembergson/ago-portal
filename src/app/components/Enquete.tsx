'use client'
import { api } from "@/api/api-conections"
import { useSearchParams } from "next/navigation"
import { useState, useEffect, useMemo, useRef } from "react"
import Countdown, { zeroPad } from "react-countdown"
import { json } from "stream/consumers"
import { useGlobalContext } from "../context/ContextoDtCronometro"

type Props = {
    visivel: boolean
}

export default function Enquete({ visivel }: Props) {
    const [enquete, setEnquete] = useState<any>(undefined)
    const [voto, setVoto] = useState('')
    const [agora, setAgora] = useState(new Date())

    //const { dtCronometro, setDtCronometro } = useGlobalContext()
    const [dtState, setDtState] = useState()
    const dtCronometro = useRef()
    const [countdown, setCountdown] = useState<number | undefined>(undefined)
    const [opcaoSelecionada, setOpcaoSelecionada] = useState('');
    const [dataCronometro, setDataCronometro] = useState<Date>()
    const [key, setKey] = useState(0);

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
            buscarCountdown(res.data.data_cronometro)
            /*if (JSON.stringify(dtCronometro.current) !== JSON.stringify(res.data.data_cronometro)) {
                console.log(JSON.stringify(dtCronometro.current))
                console.log(JSON.stringify(res.data.data_cronometro))
                dtCronometro.current = res.data.data_cronometro
            }*/
        } catch (error: any) {
            console.log(error)
        }
    }

    function buscarCountdown(data_cronometro: number[]) {
        const nova_data = new Date()
        nova_data.setHours(data_cronometro[3], data_cronometro[4], data_cronometro[5])
        setDataCronometro(nova_data)
}

    const countdownComponent = useMemo(() => (
        <Countdown
            key={key}
            date={dataCronometro}
            intervalDelay={0}
            precision={2}
            renderer={({ minutes, seconds }) => (
                <span className='flex font-black text-5xl text-[#FFA21C] mt-2'>
                    {zeroPad(minutes)}:{zeroPad(seconds)}
                </span>
            )}
        />
    ), [dataCronometro])


    useEffect(() => {
        const localStorageCrm = searchParams.get('crm')
        const localStorageNome = searchParams.get('nome')
        setCrm(localStorageCrm!)
        setNome(localStorageNome!)
        const intervalo = setInterval(async () => {
            await buscarEnquete()
        }, 5000)
        return () => clearInterval(intervalo)
    }, [])

    useEffect(() => {
        // Incrementando a chave para forçar a recriação do Countdown
        setKey((prevKey) => prevKey + 1);
    }, [dataCronometro])

    return (
        <>
            {enquete ?
                <div className="flex flex-col w-72 px-4 mt-10 md:mt-0">
                    <h1>{dataCronometro!.toLocaleTimeString()}</h1>
                    <h1>{agora.toLocaleTimeString()}</h1>
                    <h1>{dtCronometro.current}</h1>
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
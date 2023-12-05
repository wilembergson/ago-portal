'use client'
import { api } from "@/api/api-conections"
import { useState } from "react"

type Props = {
    visivel: boolean
}

type Resposta = {
    conteudo: string
    crm:string
    nome:string
    enquete_id:string
}
export default function Enquete({ visivel }: Props) {
    const [enquete, setEnquete] = useState<any>(undefined)
    const [voto, setVoto] = useState('')
    const crm: any = localStorage.getItem('crm')
    const nome: any = localStorage.getItem('nome')

    const handleVotoChange = async (e: any) => {
        setVoto(e.target.value);
        await api.adicionarResposta({
            conteudo:e.target.value,
            crm,
            nome,
            enquete_id: enquete.id
        })
    };

    async function buscarEnquete() {
        try {
            const res = await api.buscarEnqueteAtiva()
            setEnquete(res.data)
            console.log('Atualizou:' + (new Date()).getSeconds())
        } catch (error: any) {
            console.log(error)
        }
    }
    setInterval(() => {
        buscarEnquete()
    }, 5000)

    const estilo = `flex flex-col w-72 px-4`
    return (
        <>
            {enquete ?
                <div className={estilo}>
                    <h1 className="flex w-hull font-black text-md mb-4">
                        {enquete.pergunta}
                    </h1>
                    <label className="hover:cursor-pointer">
                        <input className="hover:cursor-pointer"
                            type="radio"
                            value="APROVAR"
                            checked={voto === 'APROVAR'}
                            onChange={handleVotoChange}
                        />
                        APROVAR
                    </label>
                    <label className="hover:cursor-pointer">
                        <input className="hover:cursor-pointer"
                            type="radio"
                            value="REPROVAR"
                            checked={voto === 'REPROVAR'}
                            onChange={handleVotoChange}
                        />
                        REPROVAR
                    </label>
                    <label className="hover:cursor-pointer">
                        <input className="hover:cursor-pointer"
                            type="radio"
                            value="ABSTER"
                            checked={voto === 'ABSTER'}
                            onChange={handleVotoChange}
                        />
                        ABSTER
                    </label>
                </div> : <></>
            }
        </>
    )
}
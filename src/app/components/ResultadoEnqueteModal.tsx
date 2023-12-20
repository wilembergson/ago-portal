import { useEffect, useState } from "react";
import Modal from "./modal";
import { api } from "@/api/api-conections";

type Props = {
    isVisible: boolean
    setVisible?: any
    enquete: Enquete
    atualizarLista: () => any
}

type Enquete = {
    id: number
    pergunta: string
    exibirResultado: number
    data_e_hora: string
}

type ResultadoEnquete = {
    pergunta: string,
    aprovar: number,
    reprovar: number,
    abster: number,
    total: number,
    resultado: string
}

export default function ResultadoEnqueteModal({ isVisible, setVisible, enquete, }: Props) {
    const [resultado, setResultado] = useState<ResultadoEnquete>()

    async function obterResposta() {
        try {
            const response = await api.buscarResultadoPorId(enquete.id)
            console.log(response.data)
            setResultado(response.data)
        } catch (error: any) {
            alert(error)
        }
    }

    useEffect(() => {
        obterResposta()
    }, [])

    return (
        <Modal isVisible={isVisible}>
            <div className="flex relative flex-col bg-white text-gray-700 w-4/5 h-5/6 shadow-lg" data-aos="zoom-in">
                <h1 className="`flex font-black text-white text-lg p-2 bg-red-500">
                    Resultado da enquete
                </h1>
                <div className="flex">
                    {resultado ?
                        <section className="flex flex-col w-1/2 p-4">
                            I<h1>{resultado!.pergunta}</h1>
                            <h1>{resultado!.resultado}</h1>
                            <h1>APROVAR: {resultado!.aprovar}</h1>
                            <h1>REPROVAR: {resultado!.reprovar}</h1>
                            <h1>ABSTER: {resultado!.abster}</h1>
                            <h1>TOTAL: {resultado!.total}</h1>
                        </section>
                        : <></>
                    }
                    <div className="absolute bottom-4 w-full flex items-center justify-center">
                        <button className="flex bg-blue-400 p-2"
                            onClick={() => setVisible(false)}>
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
'use client'
import { api } from "@/api/api-conections"
import { useState } from "react"

export default function Enquete() {
    const [enquete, setEnquete] = useState<any>(undefined)

    async function buscarEnquete() {
        try {
            const res = await api.buscarEnqueteAtiva()
            setEnquete(res.data)
        } catch (error: any) {
            console.log(error)
        }
    }
    setInterval(() => {
      buscarEnquete()
    }, 5000)

    return (
        <>
            {enquete ?
                <div className="flex w-72 px-4">
                    <h1 className="flex w-hull font-black text-md">
                        {enquete.pergunta}
                    </h1>
                </div> : <></>
            }
        </>
    )
}
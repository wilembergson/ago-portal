'use client'

import { api } from "@/api/api-conections"
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"


interface ContextProps {
    dtCronometro: any
    setDtCronometro: Dispatch<SetStateAction<any>>
}

const GlobalContext = createContext<ContextProps>({
    dtCronometro: null,
    setDtCronometro: (): any => null
})

export const GlobalContextProvider = ({ children }: any) => {
    const [dtCronometro, setDtCronometro] = useState<any>()

    return (
        <GlobalContext.Provider value={{ dtCronometro, setDtCronometro }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)
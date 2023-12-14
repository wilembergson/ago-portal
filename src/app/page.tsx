'use client'
import { useEffect, useState } from "react"
import Player from "./components/palyer"
import Enquete from "./components/Enquete"
import Login from "./components/Login"
import { useRouter } from 'next/navigation';

export default function Home() {
  const [visivel, setVisivel] = useState(false)
  const [medico, setMedico] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const localStorageInfo = localStorage.getItem('login')
    console.log(localStorageInfo)
    setMedico(localStorageInfo)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <section className="flex w-full justify-start items-center mb-10 px-52">
        <img className="flex w-52 mr-20" src="/img/unimed-logo.svg" alt="" />
        <h1 className='flex font-black text-4xl'>
          AGO 2024
        </h1>
      </section>
      <Login />
    </main>
  )
}

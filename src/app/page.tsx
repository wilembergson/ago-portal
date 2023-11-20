'use client'
import { useState } from "react"
import Player from "./components/palyer"
import Enquete from "./components/Enquete"

export default function Home() {
  const [visivel, setVisivel] = useState(false)
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <section className="flex w-full justify-between mb-10 px-52">
        <h1 className='flex font-black text-4xl'>
          AGO 2024
        </h1>
        <button className="flex font-black text-white items-center p-4 rounded-full
                bg-green-600 hover:bg-green-500 transition duration-300"
                onClick={() => setVisivel(true)}>
          Ir para votação
        </button>
      </section>
      <section className='flex'>
        <Player />
        <Enquete visivel={visivel} />
      </section>
    </main>
  )
}

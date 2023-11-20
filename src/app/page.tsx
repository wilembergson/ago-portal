'use client'
import { useState } from 'react'
import Player from "./components/palyer"
import Enquete from './components/Enquete'

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <h1>AGO 2024 - ao vivo</h1>
      <section className='flex bg-lime-300'>
        <Player />
        <Enquete />
      </section>
    </main>
  )
}

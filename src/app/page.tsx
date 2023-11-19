'use client'

import Player from "./components/palyer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <h1>AGO 2024 - ao vivo</h1>  
      <Player/>
    </main>
  )
}

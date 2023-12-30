'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/router"



import Transmissao from "./transmissao/page"

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Transmissao/>
    </main>
  )
}

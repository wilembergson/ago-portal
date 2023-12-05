import axios from "axios"

const API_URL = 'http://localhost:8080'

type NovaEnquete = {
    pergunta: string
    tempo_segundos: string
}

type AdicionarResposta = {
    conteudo: string
    crm: string
    nome:string
    enquete_id:string
}

async function criarNovaEnquete(data: NovaEnquete) {
    const response = await axios.post(`${API_URL}/enquete`, data)
    return response
}

async function encerrarEnquete(id: string) {
    return await axios.put(`${API_URL}/enquete/${id}`)
}

async function buscarEnqueteAtiva() {
    return await axios.get(`${API_URL}/enquete/ativa`)
}

async function adicionarResposta(data: AdicionarResposta) {
    const response = await axios.post(`${API_URL}/voto`, data)
    return response
}

export const api = {
    criarNovaEnquete,
    encerrarEnquete,
    buscarEnqueteAtiva,
    adicionarResposta
}

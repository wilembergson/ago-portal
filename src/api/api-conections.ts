import axios from "axios"

const API_URL = 'http://localhost:8080'

type NovaEnquete = {
    pergunta: string
    tempo_segundos: string
}

type AdicionarResposta = {
    idResposta: number
    crm: string
    nome:string
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

async function buscarResultado() {
    return await axios.get(`${API_URL}/enquete/obter-resultado`)
}

async function buscarEnquetesEncerradas() {
    return await axios.get(`${API_URL}/enquete/encerradas`)
}

async function buscarResultadoPorId(id:number) {
    return await axios.get(`${API_URL}/enquete/obter-resultado/${id}`)
}

export const api = {
    criarNovaEnquete,
    encerrarEnquete,
    buscarEnqueteAtiva,
    adicionarResposta,
    buscarResultado,
    buscarEnquetesEncerradas,
    buscarResultadoPorId
}

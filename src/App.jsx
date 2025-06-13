import Busca from "./components/Busca"
import { useState } from 'react'
import { Card } from 'primereact/card';
import ListaPrevisao from "./components/ListaPrevisao"
import axios from 'axios'

const App = () => {
	const [resultados, setResultados] = useState(null)
	const [loading, setLoading] = useState(false)

  const onBuscaRealizada = async (termo) => {
    try {
      setLoading(true)
      const apiKey = import.meta.env.VITE_OPENWEATHER_KEY
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${termo}&appid=${apiKey}&units=metric&lang=pt_br`
      
      const resposta = await axios.get(url)
      setResultados(resposta.data)
      setLoading(false)
    } catch (erro) {
      console.error('Erro ao buscar previsões:', erro)
      setResultados({ erro: erro.response?.data?.message || 'Cidade não encontrada' })
      setLoading(false)
    }
  }

  const onLoading = (situacao) => {
    setLoading(situacao)
  }

  return (
    <div className="w-12 flex flex-column align-items-center px-4 lg:px-6">
      <h1 className="m-0 p-2">Previsão do tempo</h1>

      <p className="m-0 pb-3">
        Pesquise a cidade para obter uma previsão do tempo para os próximos 5 dias
      </p>

      <Busca onBuscaRealizada={onBuscaRealizada} onLoading={onLoading} resultados={resultados}/>
      <div className="h-3rem flex align-items-center justify-content-center">
        {loading && 
          <div className='fadein animation-duration-100 animation-iteration-1 flex align-items-center justify-content-center'>
            <p className="m-0 p-0">
              Buscando
            </p>
            <i className="pi pi-spin pi-spinner px-2" style={{ color: 'var(--primary-color)' }}></i>
          </div>
        }
      </div>

      <div className={`flex flex-column transition-all transition-duration-500 ${loading ? "opacity-20" : "opacity-100"}`}>
        {resultados && !resultados.erro ? 
        <ListaPrevisao previsoes={resultados}/>
        :
         ""}

        {resultados && resultados.erro ? 
          <Card className="flex flex-wrap align-items-center justify-content-center surface-300">
            <p className="m-0 flex align-items-center">
            <i className="pi pi-exclamation-circle px-2 " style={{ color: 'red', fontSize: '1.25rem' }}></i>
              Erro ao consultar cidade: {resultados.erro}
            </p>
          </Card>
        : ""}
      </div>

    </div>
  )
}

export default App

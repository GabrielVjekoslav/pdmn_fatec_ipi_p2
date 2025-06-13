import React from 'react'
import Busca from './Busca'
import striptags from 'striptags'

export default class ListaPrevisao extends React.Component {
  state = {
    previsoes: []
  }

  onBuscaRealizada = async (termo) => {
    const response = await fetch(`http://localhost:3000/search?query=${termo}`)

    if (!response.ok) {
      console.error('Erro ao obter a previsão')
      this.setState({ previsoes: [] })
      return
    }
    const data = await response.json()
    try {

      const previsoes = data.list.map(p => ({
        min: p.temp_min,
        max: p.temp_max,
        umidade: p.humidity,
        icone: p.icon,
        descricao: p.description,
        dataHora: new Date(p.dt * 1000)
      }))
      this.setState({ previsoes })
    } catch (erro) {
      console.error('Erro ao buscar previsões:', erro)
      this.setState({ previsoes: [] })
    }
  }

  render() {
    return (
      <div className="p-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Previsão do Tempo</h1>
        <div className="mb-6">
          <Busca onBuscaRealizada={this.onBuscaRealizada} />
        </div>

        <div className="grid">
          {this.state.previsoes.map((p, i) => (
            <div key={i} className="col-12 md:col-6 lg:col-4">
              <div className="surface-card shadow-2 border-round p-3 flex align-items-center gap-3">
                <img
                  src={`http://openweathermap.org/img/wn/${p.icone}@2x.png`}
                  alt="Ícone clima"
                  className="w-4rem h-4rem"
                />
                <div className="flex flex-column">
                  <span className="font-semibold text-lg">
                    {p.dataHora.toLocaleString('pt-BR', {
                      weekday: 'long',
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  <span className="capitalize text-sm text-gray-700 mb-1">{striptags(p.descricao)}</span>
                  <span className="text-sm text-gray-600">
                    <strong>Mín:</strong> {p.min.toFixed(1)}°C | <strong>Máx:</strong> {p.max.toFixed(1)}°C
                  </span>
                  <span className="text-sm text-gray-600">
                    <strong>Umidade:</strong> {p.umidade}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

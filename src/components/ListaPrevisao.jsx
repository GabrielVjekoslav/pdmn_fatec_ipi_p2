import React from 'react';
import Busca from './Busca';
import axios from 'axios';

export default class ListaPrevisao extends React.Component {
  state = {
    previsoes: []
  };

  onBuscaRealizada = async (termo) => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${termo}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
      const resposta = await axios.get(url);
      const previsoes = resposta.data.list.map(p => ({
        min: p.main.temp_min,
        max: p.main.temp_max,
        umidade: p.main.humidity,
        icone: p.weather[0].icon,
        descricao: p.weather[0].description,
        dataHora: new Date(p.dt_txt)
      }));
      this.setState({ previsoes });
    } catch (erro) {
      console.error('Erro ao buscar previsões:', erro);
      this.setState({ previsoes: [] });
    }
  };

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
                  <span className="capitalize text-sm text-gray-700 mb-1">{p.descricao}</span>
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
    );
  }
}

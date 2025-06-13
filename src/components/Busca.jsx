import React, { Component } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

export default class Busca extends Component {
    state = {
        termoDeBusca: 'São Paulo',
        erro: false
    }
    onTermoAlterado = (event) => {
        console.log(event.target.value)
        this.setState({
            termoDeBusca: event.target.value,
            erro: event.target.value.trim() === ''
        })
    }
    onFormSubmit = (event) => {
        event.preventDefault()
        if (this.state.termoDeBusca.trim() === '') {
            this.setState({ erro: true })
            return
        }
        this.props.onBuscaRealizada(this.state.termoDeBusca)
    }

    componentDidMount() {
        // Realizar busca inicial com São Paulo
        this.props.onBuscaRealizada(this.state.termoDeBusca)
    }

    render() {
    return (
        <form onSubmit={this.onFormSubmit}>
            <div className='flex flex-column'>
                <span className='p-input-icon-left w-full'>
                    <i className='pi pi-search' />
                    <InputText 
                        value={this.state.termoDeBusca} 
                        onChange={this.onTermoAlterado} 
                        placeholder={this.props.dica} 
                        className={`w-full ${this.state.erro ? 'p-invalid' : ''}`}
                    />
                </span>
                {this.state.erro && (
                    <small className="p-error">Por favor, digite uma cidade válida</small>
                )}
                <Button label='OK' className='p-button-outlined mt-2'/>
            </div>
        </form>
    )
    }
}

Busca.defaultProps ={ 
    dica: 'Digite algo...' 
}

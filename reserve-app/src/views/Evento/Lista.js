import React, { Component } from 'react'
import { Button, Card, Col } from 'reactstrap'

class EventoLista extends Component {
  constructor() {
    super()

    this.state = {
      "eventos": []
    }
  }

  componentDidMount() {
    this.obterEventos()
  }

  render() {
    return this.state.eventos.map(evento => {
      return (
        <Card key={evento.id}>
          <div className='row' style={{ 'fontFamily': 'cursive', 'textAlign': 'center' }}>
            <Col xl='5'>
              <img src={evento.imagem} width="100%" height="100%" alt={evento.nome}/>
            </Col>
            {this.renderDados(evento)}
          </div>
        </Card>
      )
    })
  }

  renderDados(evento) {
    return (
      <Col xl='7' style={{ 'paddingTop': '20px'}}>
        <div className='row' >
          <h2>{evento.nome}</h2>
        </div>
        <div className='row' >
          <h5>De: {evento.dataInicio} até {evento.dataFim}</h5>
        </div>
        <br />
        <div className='row' >
          <h5>Local: {evento.local}</h5>
        </div>
        <div className='row' style={{ "paddingLeft": "40%", "paddingTop": "50px" }}>
          <a href={`#/evento/${evento.id}`}><Button color="primary" size="lg">Detalhes</Button></a>
        </div>
      </Col>
    )
  }

  async obterEventos() {
    const eventos = await this.props.restClientManager.evento.listarEventos()

    if (!eventos)
      return;

    this.setState({
      "eventos": eventos.data
    })
  }
}

export default EventoLista
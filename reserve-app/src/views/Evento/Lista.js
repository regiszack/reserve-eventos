import React, { Component } from 'react'
import { Button, Card, Col, Row } from 'reactstrap'
import './lista.css'

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
        <Card key={evento.id} className='card-view-lista-evento'>
          <Row>
            <Col xl='5'>
              <img src={evento.imagem} width="100%" height="100%" alt={evento.nome}/>
            </Col>
            {this.renderDados(evento)}
          </Row>
        </Card>
      )
    })
  }

  renderDados(evento) {
    return (
      <Col xl='7' className='col-view-lista-evento'>
        <Row>
          <h2>{evento.nome}</h2>
        </Row>
        <Row>
          <h5>De: {evento.dataInicio} até {evento.dataFim}</h5>
        </Row>
        <br />
        <Row>
          <h5>Local: {evento.local}</h5>
        </Row>
        <Row  className='row-detalhe-view-lista-evento'>
          <a href={`#/evento/${evento.id}`}><Button color="primary" size="lg">Detalhes</Button></a>
        </Row>
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
import React, { Component } from 'react'
import { Button, Card, Col, Row } from 'reactstrap'
import { FontAwesome } from '../../components/FontAwesome'
import { toast } from 'react-toastify'

class EventoDetalhe extends Component {
  constructor() {
    super()

    this.state = {
      "evento": null
    }
  }

  componentDidMount() {
    this.obterEvento()
  }

  render() {
    const { evento } = this.state

    if (this.state.evento == null) {
      return <div />
    }

    return (
      <div className='detalhes-evento' style={{ 'fontFamily': 'cursive', 'textAlign': 'center' }}>
        <Card>
          <Col xs='12'>
            <img src={evento.imagem} width='100%' height='300px' alt={evento.nome} />
            <h1 style={{ "textAlign": "center", "color": "blue", "paddingBottom": '30px', "paddingTop": '30px' }}>{evento.nome}</h1>
          </Col>
          <Col xs='12'>
            <Row>
              <Col xs='6'>
                <h6><FontAwesome icon='map-marker' /><strong> Local do Evento </strong></h6>
                <p>{evento.local}</p>
                <br />
                <br />
                <h6><FontAwesome icon='hourglass-start' /><strong> Horário </strong></h6>
                <p>Evento começa às: {evento.horario}</p>
              </Col>
              <Col xs='6'>
                <h6><FontAwesome icon='user' /><strong> Faixa Etária </strong></h6>
                <p>{evento.faixaEtaria}</p>
                <br />
                <br />
                <h6><FontAwesome icon='building' /><strong> Produção/Realização </strong></h6>
                <p>{evento.producao}</p>
              </Col>
            </Row>
          </Col>
        </Card>
        <Card>
          <Row style={{ 'paddingTop': '20px' }} >
            <Col xs='8'>
              <h4>Descrição</h4>
              {evento.descricao}
            </Col>
            <Col xs='4'>
              <h4 >Valor Ingresso: R$ {evento.preco}</h4>
              <Row style={{ 'paddingLeft': '60px', 'paddingTop': '20px', 'marginBottom': '20px' }}>
                <input type="number" id="quant-ingresso" placeholder="Quantidade" min="1" onChange={e => this.obterQuantidade(e)} className="form-control" style={{ 'width': '200px' }} />
                <Button onClick={() => this.comprarIngresso(this.state.quantidade)} color="primary" size="md">Comprar</Button>
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
    )
  }

  obterQuantidade(e) {
    const quantidade = e.target.value;
    this.setState({
      quantidade
    })
  }

  comprarIngresso(quantidade) {
    if (!quantidade || quantidade <= 0)
      return toast.info('Compre ao menos um ingresso')

    this.props.history.push({
      'pathname': '/pedido', 
      'state': {
        'quantidade': quantidade,
        'evento': this.state.evento
        }
      })
  }

  async obterEvento() {
    const id = this.props.match.params.id
    const evento = await this.props.restClientManager.evento.obterEvento(id)

    if (!evento)
      return;

    this.setState({
      "evento": evento.data
    })
  }
}

export default EventoDetalhe
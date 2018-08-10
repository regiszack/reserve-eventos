import React, { Component } from 'react'
import { Button, Card, CardBody, CardTitle, Col, Row, Label, Input } from 'reactstrap'
import { toast } from 'react-toastify'
import './pedido.css'

class Pedido extends Component {
  constructor(props) {
    super(props)

    this.state = {
      "evento": this.obterDadosEvento() || null,
      "quantidade": this.obterQuantidade() || null,
    }

    this.adicionarCartao = this.adicionarCartao.bind(this)
  }

  componentDidMount() {
    this.obterCartoesUsuario()
  }

  obterDadosEvento() {
    if (this.props.location.state)
      return this.props.location.state.evento
  }

  obterQuantidade() {
    if (this.props.location.state)
      return this.props.location.state.quantidade
  }

  render() {
    if (this.state.evento == null || this.state.quantidade == null)
      return (
        <Row>
          <h5>Nenhum evento selecionado, favor voltar a pagina de eventos. clicando em <strong>Home</strong></h5>
        </Row>
      )

    const { quantidade, evento } = this.state
    return (
      <div className='div-view-pedido main-container'>
        <Row>
          <Col xs='6'>
            <Card>
              <CardBody className='cardbody-view-pedido'>
                <CardTitle className='cardtitle-view-pedido'> Cartões </CardTitle>
                <h6>Olá, Estes são os seus cartões ja cadastrados </h6>
                <Row className='row-view-pedido'>
                  <Label for="exampleSelect">Cartões Cadastrados</Label>
                  <Input type="select" name="select" className='input-view-pedido'>
                    {this.listarCartoes()}
                  </Input>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col xs='6'>
            <Card>
              <CardBody className='cardbody-view-pedido'>
                <CardTitle className='cardtitle-view-pedido'> Adicionar Cartão </CardTitle>
                <Row>
                  <Col xs='6'>
                    <Row className='row-adicionar-view-pedido'>
                      <Input type="number" name="numeroCartao" id="numeroCartao" onChange={(e) => this.obterDadosCartao(e)} placeholder="Numero do Cartão" value={this.state.numero} />
                    </Row>
                    <Row className='row-adicionar-view-pedido'>
                      <Input type="number" name="validade" id="validade" onChange={(e) => this.obterDadosCartao(e)} placeholder="Validade" value={this.state.validade} />
                    </Row>
                  </Col>
                  <Col xs='6'>
                    <Row className='row-adicionar-view-pedido'>
                      <Input type="text" name="nomeTitular" id="nomeTitular" onChange={(e) => this.obterDadosCartao(e)} placeholder="Nome Titular" value={this.state.titular} />
                    </Row>
                    <Row className='row-adicionar-view-pedido'>
                      <Input type="number" name="cvv" id="cvv" onChange={(e) => this.obterDadosCartao(e)} placeholder="CVV" value={this.state.cvv} />
                    </Row>
                  </Col>
                </Row>
                <Button onClick={this.adicionarCartao} color="primary" size="md">Adicionar</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs='6'>
            <Card>
              <CardBody className='cardbody-row2-view-pedido'>
                <h5>A Reserve Eventos é uma empresa de compra e venda de ingressos para enventos variados.
                  Não se responsabiliza por qualquer acontecimento no interior do evento.</h5>
                <img src='img/logo.png' alt='Reserve Eventos' />
              </CardBody>
            </Card>
          </Col>
          <Col xs='6'>
            <Card>
              <CardBody className='cardbody-row2-view-pedido'>
                <CardTitle className='cardtext-row2-view-pedido'> Resumo da Compra </CardTitle>
                <Row>
                  <Col xs='6'>
                    <h5>Quantidade e Evento</h5>
                    <p>{quantidade} x {evento.nome}</p>
                  </Col>
                  <Col xs='6'>
                    <h4>Total: R$ {this.obterValorTotal(quantidade, evento.preco)} </h4>
                  </Col>
                </Row>
                <Button onClick={() => this.finalizarCompra(quantidade, evento.nome)} color="primary" size="md">Finalizar Compra</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }

  obterDadosCartao(e) {
    switch (e.target.name) {
      case 'numeroCartao':
        this.setState({
          "numero": e.target.value
        })
        break
      case 'validade':
        this.setState({
          "validade": e.target.value
        })
        break
      case 'cvv':
        this.setState({
          "cvv": e.target.value
        })
        break
      case 'nomeTitular':
        this.setState({
          "titular": e.target.value
        })
        break
      default:
        return;
    }
  }

  listarCartoes() {
    if (!this.state.cartoes)
      return;
   
    return this.state.cartoes.map(numero => {
      return (       
        <option key={numero} value={numero}>{numero}</option>
      )
    })
  }

  obterValorTotal(quantidade, preco) {
    return (quantidade * preco).toFixed(2)
  }

  async adicionarCartao() {
    if (!this.state.numero || !this.state.validade || !this.state.cvv || !this.state.titular)
      return toast.error("Preencha todos os campos")

    const idUsuario = parseInt(localStorage.getItem('userId'), 10)
    const cartao = {
      "numero": (this.state.numero).toString(),
      "validade": this.state.validade,
      "cvv": (this.state.cvv).toString(),
      "titular": this.state.titular
    }

    const adicionarCartao = await this.props.restClientManager.cartao.salvarCartao(idUsuario, cartao)

    if (!adicionarCartao)
      return;

    toast.success("Cartao adicionado e já disponibilizado na lista")

    this.obterCartoesUsuario()
  }

  async finalizarCompra(quantidadeIngresso, nomeEvento) {
    if (!localStorage.getItem('token'))
      return toast.error("Favor, Logar antes de finalizar a compra")

    if (!this.state.cartoes)
      return toast.error("Sua conta não possui cartao cadastrado")

    const comando = {
      quantidadeIngresso,
      nomeEvento
    }

    const idUsuario = parseInt(localStorage.getItem('userId'), 10)

    const finalizarPedido = await this.props.restClientManager.pedido.efetuarPedido(comando, idUsuario)

    if (finalizarPedido >= 0)
      return;

    toast.success("Pedido Finalizado com sucesso, detalhe da compra enviado para o email cadastrado.")
  }

  async obterCartoesUsuario() {
    const idUsuario = parseInt(localStorage.getItem('userId'), 10)
    const cartoes = await this.props.restClientManager.usuario.listarCartao(idUsuario)

    if (!cartoes)
      return;

    this.setState({
      "cartoes": cartoes.data,
      "numero": '',
      "validade": '',
      "titular": '',
      "cvv": ''
    })
  }
}

export default Pedido

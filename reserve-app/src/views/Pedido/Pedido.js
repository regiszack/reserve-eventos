import React, { Component } from 'react'
import { Button, Card, CardBody, CardTitle, CardText, Col, Row, Label, Input, Form, FormGroup } from 'reactstrap'
import { toast } from 'react-toastify'

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
      <div className='main-container' style={{ 'fontFamily': 'cursive', 'textAlign': 'center' }}>
        <Row>
          <Col xs='6'>
            <Card>
              <CardBody style={{ 'height': '250px' }}>
                <CardTitle style={{ 'padding': '10px' }}> Cartões </CardTitle>
                <CardText>
                  <h6>Ola Regis! Estes são os seu cartões ja cadastrados </h6>
                  <Row style={{ 'paddingTop': '50px' }}>
                    <Label for="exampleSelect" style={{ 'paddingTop': '10px', 'paddingLeft': '50px', 'textAlign': 'left' }}>Cartões Cadastrados</Label>
                    <Input type="select" name="select" id="exampleSelect" style={{ 'marginLeft': '10px', 'width': '300px' }}>
                      {this.listarCartoes()}
                    </Input>
                  </Row>
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col xs='6'>
            <Card>
              <CardBody style={{ 'height': '250px' }}>
                <CardTitle style={{ 'padding': '10px' }}> Adicionar Cartão </CardTitle>
                <CardText>
                  <Form >
                    <Row>
                      <Col xs='6'>
                        <FormGroup style={{ 'padding': '10px' }}>
                          <Input type="number" name="numeroCartao" id="numeroCartao" onChange={(e) => this.obterDadosCartao(e)} placeholder="Numero do Cartão" />
                        </FormGroup>
                        <FormGroup style={{ 'padding': '10px' }}>
                          <Input type="number" name="validade" id="validade" onChange={(e) => this.obterDadosCartao(e)} placeholder="Validade" />
                        </FormGroup>
                      </Col>
                      <Col xs='6'>
                        <FormGroup style={{ 'padding': '10px' }}>
                          <Input type="text" name="nomeTitular" id="nomeTitular" onChange={(e) => this.obterDadosCartao(e)} placeholder="Nome Titular" />
                        </FormGroup>
                        <FormGroup style={{ 'padding': '10px' }}>
                          <Input type="number" name="cvv" id="cvv" onChange={(e) => this.obterDadosCartao(e)} placeholder="CVV" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button onClick={this.adicionarCartao} color="primary" size="md">Adicionar</Button>
                  </Form>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs='6'>
            <Card>
              <CardBody style={{ 'height': '200px' }}>
                <CardText style={{ 'padding': '30px' }}>
                  <h5>A Reserve Eventos é uma empresa de compra e venda de ingressos para enventos variados.
                  Não se responsabiliza por qualquer acontecimento no interior do evento.</h5>
                  <img src='img/logo.png' alt='Reserve Eventos' />
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col xs='6'>
            <Card>
              <CardBody style={{ 'height': '200px' }}>
                <CardTitle style={{ 'padding': '20px' }}> Resumo da Compra </CardTitle><CardText style={{ 'padding': '10px' }}>
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
                </CardText>
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
    if(!this.state.cartoes)
      return;

    return this.state.cartoes.map(cartao => {
      return (
        <option key={cartao.id} value={cartao.id}>{cartao.numero}</option>
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
      "numero": this.state.numero,
      "validade": this.state.validade,
      "cvv": this.state.cvv,
      "titular": this.state.titular
    }

    const adicionarCartao = await this.props.restClientManager.cartao.salvarCartao(idUsuario, cartao)

    if (!adicionarCartao)
      return;

    toast.success("Cartao adicionado")

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

    if (finalizarPedido !== 0)
      return;

    toast.success("Pedido Finalizado com sucesso, detalhe da compra enviado para o email cadastrado.")
  }

  async obterCartoesUsuario() {
    const idUsuario = parseInt(localStorage.getItem('userId'), 10)
    const cartoes = await this.props.restClientManager.usuario.listarCartao(idUsuario)

    if (!cartoes)
      return;

    this.setState({
      "cartoes": cartoes.data
    })
  }
}

export default Pedido
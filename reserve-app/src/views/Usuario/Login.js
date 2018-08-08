import React, { Component } from 'react'
import { Button, Card, CardText, Col, Row } from 'reactstrap'
import { toast } from 'react-toastify'

class UsuarioEntrar extends Component {
  render() {
    return (
      <Col xs='12'>
        <Row>
          <Col xs='4' />
          <Col xs='4'>
            <Card style={{ 'fontFamily': 'cursive', 'textAlign': 'center' }}>
              <CardText>
                <h5 style={{ 'padding': '10px' }}> Login </h5>
                <Row style={{ 'padding': '20px' }}>
                  <Col xs='12' style={{ 'paddingBottom': '10px' }}>
                    <input placeholder="Usuario" name='login' type='text' className='form-control' onChange={(e) => this.obterDadosUsuario(e)} required />
                  </Col>
                  <Col xs='12' style={{ 'paddingBottom': '10px' }}>
                    <Row style={{ 'padding': '20px' }}>
                      <input placeholder="Senha" name='senha' type='password' className='form-control' onChange={(e) => this.obterDadosUsuario(e)} required />
                    </Row>
                  </Col>
                </Row>
                <Row style={{ 'paddingBottom': '20px' }}>
                  <Button onClick={() => this.entrar()} color="primary" size="md" style={{ 'marginLeft': '40%' }}>Entrar</Button>
                </Row>
              </CardText>
            </Card>
          </Col>
        </Row>
      </Col>
    )
  }

  obterDadosUsuario(e) {
    switch (e.target.name) {
      case 'login':
        this.setState({
          "login": e.target.value
        })
        break
      case 'senha':
        this.setState({
          "senha": e.target.value
        })
        break
      default:
        return;
    }
  }

  async entrar(e) {
    if (!this.state.login || !this.state.senha)
      return toast.error('Usuario/Senha não informados')

    const usuario = {
      "login": this.state.login,
      "senha": this.state.senha
    }

    const resposta = await this.props.restClientManager.usuario.logarUsuario(usuario)

    if (!resposta)
      return toast.error('Usuario/Senha invalidos, digite novamente')


    toast.success('Seja bem vindo(a) ' + resposta.data.usuarioLogado.nome)
    
    window.localStorage.setItem('token', resposta.data.accessToken);
    window.localStorage.setItem('userId', resposta.data.usuarioLogado.id);
    
    this.props.history.push({
      "pathname": '/evento',
      "state": {
        "usuario": resposta.data.usuarioLogado,
      }
    })
  }
}

export default UsuarioEntrar
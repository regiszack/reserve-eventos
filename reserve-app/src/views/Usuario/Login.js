import React, { Component } from 'react'
import { Button, Card, Col, Row } from 'reactstrap'
import { toast } from 'react-toastify'
import './login.css'

class UsuarioEntrar extends Component {
  render() {
    return (
      <Col xs='12'>
        <Row>
          <Col xs='4' />
          <Col xs='4'>
            <Card className='card-view-login'>
              <h5 className='h5-view-login'> Login </h5>
              <Row className='row-view-login'>
                <Col xs='12' className='card-view-login'>
                  <input placeholder="Usuario" name='login' type='text' className='form-control' onChange={(e) => this.obterDadosUsuario(e)} required />
                </Col>
                <Col xs='12' className='card-view-login'>
                  <Row className='row-view-login'>
                    <input placeholder="Senha" name='senha' type='password' className='form-control' onChange={(e) => this.obterDadosUsuario(e)} required />
                  </Row>
                </Col>
              </Row>
              <Row className='row-view-botao'>
                <Button onClick={() => this.entrar()} color="primary" size="md" className='button-view-login'>Entrar</Button>
              </Row>
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
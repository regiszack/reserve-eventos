import React, { Component } from 'react'
import { Button, Card, Col, Row } from 'reactstrap'
import { toast } from 'react-toastify'
import './cadastro.css'

class UsuarioCadastro extends Component {
  constructor(){
    super()

    this.state = {
      "genero": '0'
    }
  }

  render() {
    return (
      <Card className='card-view-cadastro'>
          <Col xs='12'>
            <Row>
              <Col xs='6'>
                <h5 className='h5-view-cadastro'> Dados Cadastrais </h5>
                <Row>
                  <Col xs='8' className='col-view-cadastro'>
                    <input placeholder="Nome" name='nome' type='text' className='form-control' onChange={(e) => this.obterDadosUsuario(e)}/>
                  </Col>
                  <Col xs='4' className='col-view-cadastro'>
                    <Row >
                      <label>Sexo: </label>
                      <select autoComplete="off" name="genero" 
                        className='genero-select-view-cadastro form-control' 
                        onChange={(e) => this.obterDadosUsuario(e)} 
                        value={this.state.genero}
                      >
                        <option value="0">Masculino</option>
                        <option value="1">Feminino</option>
                        <option value="">-</option>
                      </select>
                    </Row>
                  </Col>
                </Row>
                <input placeholder="Email" name='email' type='email' className='form-control' onChange={(e) => this.obterDadosUsuario(e)}/>
                <Row className='row-view-cadastro'>
                  <Col xs='8'>
                    <input placeholder="CPF" name='cpf' type='number' className='form-control' onChange={(e) => this.obterDadosUsuario(e)}/>
                  </Col>
                  <Col xs='4'>
                    <input placeholder="Data Nascimento" name='dataNascimento' type='date' className='form-control' onChange={(e) => this.obterDadosUsuario(e)}/>
                  </Col>
                </Row>
                <Row className='row-view-cadastro'>
                  <Col xs='4'>
                    <input placeholder="Usuario" name='login' type='text' className='form-control' onChange={(e) => this.obterDadosUsuario(e)}/>
                  </Col>
                  <Col xs='4'>
                    <input placeholder="Senha" name='senha' type='password' className='form-control' onChange={(e) => this.obterDadosUsuario(e)}/>
                  </Col>
                  <Col xs='4'>
                    <input placeholder="Confirme a senha" type='password' className='form-control' />
                  </Col>
                </Row>
              </Col>
              <Col xs='6'>
                <h5 className='h5-view-cadastro'> Endereço </h5>
                <Row>
                  <Col xs='8' className='col-view-cadastro'>
                    <input placeholder="Logradouro" name='logradouro' type='text' className='form-control' onChange={(e) => this.obterDadosEndereco(e)}/>
                  </Col>
                  <Col xs='4' className='col-view-cadastro'>
                    <Row >
                      <input placeholder="Numero" name='numero' type='number' className='numero-input-view-cadastro form-control' onChange={(e) => this.obterDadosEndereco(e)}/>
                    </Row>
                  </Col>
                </Row >
                <input placeholder="Complemento" name='complemento' id='complemento' type='text' className='form-control' onChange={(e) => this.obterDadosEndereco(e)}/>
                <Row className='row-view-cadastro'>
                  <Col xs='4'>
                    <input placeholder="CEP" name='cep' type='number' className='form-control' onChange={(e) => this.obterDadosEndereco(e)}/>
                  </Col>
                  <Col xs='4'>
                    <input placeholder="Cidade" name='cidade' type='text' className='form-control' onChange={(e) => this.obterDadosEndereco(e)}/>
                  </Col>
                  <Col xs='4'>
                    <input placeholder="Estado" name='estado' type='text' className='form-control' onChange={(e) => this.obterDadosEndereco(e)}/>
                  </Col>
                </Row>
                <Row>
                <Button onClick={() => this.cadastrarUsuario()} color="primary" size="md" className='button-view-cadastro'>Cadastrar</Button>
                </Row>
              </Col>
            </Row>
          </Col>
      </Card>
    )
  }

  obterDadosUsuario(e) {   
    switch (e.target.name) {
      case 'nome':
        this.setState({
            "nome": e.target.value
        })
        break
      case 'login':
        this.setState({
            "login": e.target.value
        })
        break
      case 'genero':
        this.setState({
            "genero": e.target.value
        })
        break
      case 'email':
        this.setState({
            "email": e.target.value
        })
        break
      case 'cpf':
        this.setState({
            "cpf": e.target.value
        })
        break
        case 'dataNascimento':
        this.setState({
            "dataNascimento": e.target.value
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

  obterDadosEndereco(e) {
    switch (e.target.name) {
      case 'logradouro':
        this.setState({
            "logradouro": e.target.value
        })
        break
      case 'numero':
        this.setState({
            "numero": e.target.value
        })
        break
      case 'complemento':
        this.setState({
            "complemento": e.target.value
        })
        break
      case 'cep':
        this.setState({
            "cep": e.target.value
        })
        break
        case 'cidade':
        this.setState({
            "cidade": e.target.value
        })
        break
        case 'estado':
        this.setState({
            "estado": e.target.value
        })
        break
      default:
        return;
    }
  }

  async cadastrarUsuario() {
    if(!this.state.nome || !this.state.genero || !this.state.email || !this.state.cpf || !this.state.dataNascimento || !this.state.login || !this.state.senha)
      return toast.error("Dados do Usuario não preenchidos")

    if(!this.state.logradouro || !this.state.numero || !this.state.complemento || !this.state.cep || !this.state.cidade || !this.state.estado)
      return toast.error("Dados do Endereço não preenchidos")

    const comando = {
      "nome": this.state.nome,
      "genero": this.state.genero,
      "email": this.state.email,
      "cpf": this.state.cpf,
      "dataNascimento": this.state.dataNascimento,
      "login": this.state.login,
      "senha": this.state.senha,
      "logradouro": this.state.logradouro,
      "numero": this.state.numero,
      "complemento": this.state.complemento,
      "cep": this.state.cep,
      "cidade": this.state.cidade,
      "estado": this.state.estado
    }

    const cadastro = await this.props.restClientManager.usuario.registrarUsuario(comando)

    if(!cadastro)
      return;
    
    toast.success("Usuario cadastrado com sucesso")
  }
}

export default UsuarioCadastro
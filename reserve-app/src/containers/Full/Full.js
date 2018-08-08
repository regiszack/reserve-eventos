import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route, Switch } from 'react-router-dom'

import AppModal from '../AppModal'

import EventoListar from '../../views/Evento/Lista'
import EventoDetalhe from '../../views/Evento/Detalhe'

import Pedido from '../../views/Pedido/Pedido'

import UsuarioCadastro from '../../views/Usuario/Cadastro'
import UsuarioLogin from '../../views/Usuario/Login'

import Header from '../../components/Header/'
import Footer from '../../components/Footer/'
import Breadcrumbs from '../../components/Breadcrumbs'

import { toggleModal } from '../../actions'
import { ToastContainer, toast } from 'react-toastify'
import { ROTAS } from '../../rotas'

import RestClientManager from '../../services/reserve/RestClientsManager'
import './full.css'

export class Full extends Component {

  constructor(props) {
    super(props)

    this.toast = toast
    this.rotasOrdenadasDaMaisEspecificaParaMenos = ROTAS.reverse()

    this.views = {
      "EventoListar": EventoListar,
      "EventoDetalhe": EventoDetalhe,
      "Pedido": Pedido,
      "UsuarioCadastro": UsuarioCadastro,
      "UsuarioLogin": UsuarioLogin
    }

    this.restClientManager = new RestClientManager()
    this.toggleModal = this.toggleModal.bind(this)
  }

  render() {
    return (
      <div className="app">
        <Header />

        <div className="app-body">
          <main className="main">
            <Breadcrumbs />

            <div className="container-fluid">
              <Switch>
                {this.renderRotas()}
              </Switch>
            </div>
          </main>

        </div>
        <Footer />

        <AppModal />
        <ToastContainer />
      </div>
    )
  }

  renderRotas() {
    const helpers = {
      "restClientManager": this.restClientManager,
      "toogleModal": this.toggleModal
    }

    return this.rotasOrdenadasDaMaisEspecificaParaMenos
      .filter(rota => !!rota.componente)
      .map(rota => {
        const Componente = this.views[rota.componente]
        return (
          <Route
            key={rota.caminhoCompleto}
            path={rota.caminhoCompleto}
            name={rota.rotulo}
            component={
              (props) =>
                <Componente
                  {...helpers}
                  {...props}
                />
            }
          />
        )
      })
  }

  toggleModal(config) {
    this.props.toggleModal(config)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleModal: toggleModal
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(Full)
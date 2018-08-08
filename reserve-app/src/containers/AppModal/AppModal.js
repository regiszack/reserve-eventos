import React, { Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { toggleModal } from '../../actions'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import './app-modal.css'

const CANCELAR = 'CANCELAR'

// TODO: (ID) Pensando melhor, ao invés de receber um botão Cancelar customizado, poderia ser apenas o Label e Action. Avaliar.
export class AppModal extends Component {
  render() {
    const { modal } = this.props

    const type = modal.type ? 'modal-' + modal.type : null
    const size = modal.size ? 'modal-' + modal.size : null

    const className = `${type ? type : ''} ${size ? size : ''} `

    return (
      <Modal isOpen={modal.isOpen}
        className={className}
        autoFocus={false}>
        <ModalHeader toggle={this.toggle}>{modal.header}</ModalHeader>
        <ModalBody>{this.renderConteudo()}</ModalBody>
        <ModalFooter>
          {this.renderBotoes()}
          {this.renderBotaoCancelarPadraoSeNaoSobrescrito()}
        </ModalFooter>
      </Modal>
    )
  }

  renderBotoes() {
    return this.props.modal.buttons.map(button => {
      const action = button.type === CANCELAR ?
        () => this.cancelar(button.action) : button.action

      return <Button
        color={button.color}
        onClick={action}
        key={`appmodal.buttons.${button.label}`}
      >
        {button.label}
      </Button>
    })
  }

  renderBotaoCancelarPadraoSeNaoSobrescrito() {
    const { modal } = this.props
    const botaoCancelarPadrao = modal.buttons.filter(it => it.type === CANCELAR)

    if (botaoCancelarPadrao.length < 1)
      return (
        <Button className='default'
          onClick={() => { this.cancelar() }}
        >
          {'interface.comuns.botao.cancelar'}
        </Button>
      )
  }

  renderConteudo() {
    const { modal } = this.props
    if (modal.content)
      return modal.content()
  }

  cancelar(cancelarCustomizado) {
    const { modal } = this.props

    if (cancelarCustomizado)
      cancelarCustomizado()

    this.props.toggleModal(modal)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleModal: toggleModal
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    modal: state.modal
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppModal)
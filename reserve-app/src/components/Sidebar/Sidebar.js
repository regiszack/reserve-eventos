import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'reactstrap'
import { FontAwesome } from '../FontAwesome'
import './sidebar.css'

import { ARVORE_ROTAS } from '../../rotas'

class Sidebar extends Component {

  handleClick(e) {
    e.target.parentElement.classList.toggle('open')
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ?
      'nav-item nav-dropdown open' : 'nav-item nav-dropdown'
  }

  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav nav-second-level collapse in' : 'nav nav-second-level collapse'
  // }

  // <span className='badge badge-info'>NEW</span>

  // TODO: Usar os Wrappers do Bootstrap na Navbar
  render() {
    return (
      <div className='sidebar'>
        <nav className='sidebar-nav'>
          <ul className='nav'>
            <li className='nav-item'>
              <NavLink to='/' className='nav-link' activeClassName='active'>
                <FontAwesome icon='home' />Início
              </NavLink>
            </li>
            {this.renderSidebar()}
          </ul>
        </nav>
      </div>
    )
  }

  renderSidebar() {
    const segundoNivel = ARVORE_ROTAS[0].filhos[0]
    const terceiroNivel = segundoNivel.filhos

    return terceiroNivel.map(nivel => this.renderSegundoNivel(nivel))
  }

  renderSegundoNivel(nivel) {
    return (
      <li className={this.activeRoute(nivel.caminhoCompleto)} key={nivel.caminhoCompleto}>
        <Button
          className='btn-no-outline nav-link nav-dropdown-toggle'
          onClick={this.handleClick.bind(this)}
        >
          <FontAwesome icon={nivel.icone} />{nivel.rotulo}
        </Button>
        {this.renderTerceiroNivel(nivel)}
      </li>
    )
  }

  renderTerceiroNivel(terceiroNivel) {
    if (terceiroNivel.filhos) {
      return (
        <ul className='nav-dropdown-items'>
          {this.renderTerceiroNivelItem(terceiroNivel)}
        </ul>
      )
    }
  }

  renderTerceiroNivelItem(terceiroNivel) {
    return terceiroNivel.filhos.map(nivel => {
      return (
        <li className='nav-item' key={nivel.caminhoCompleto}>
          <NavLink
            to={nivel.caminhoCompleto}
            className='nav-link'
            activeClassName='active'>
            <FontAwesome icon={nivel.icone} />{nivel.rotulo}
          </NavLink>
        </li>
      )
    })
  }
}

export default Sidebar
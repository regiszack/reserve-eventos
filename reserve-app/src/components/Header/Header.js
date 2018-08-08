import React, { Component } from 'react'
import { Button, Col, Nav, NavItem, Row } from 'reactstrap'
import './header.css'

class Header extends Component {
  sidebarToggle(e) {
    document.body.classList.toggle('sidebar-hidden')
  }

  mobileSidebarToggle(e) {
    document.body.classList.toggle('sidebar-mobile-show')
  }

  render() {
    return (
      <header className='app-header navbar'>
        <Col xs='12'>
          <Row>
            <Button className='navbar-toggler mobile-sidebar-toggler hidden-lg-up' onClick={this.mobileSidebarToggle}>&#9776;</Button>
            <a className='navbar-brand' href='#/'>
              <span><img id='Reserve' src='img/logo.png' width='133' height='45' alt='Reserve Eventos' /></span>
            </a>
            <Nav className='nav navbar-nav hidden-md-down'>
              <NavItem className='nav-item' style={{'paddingLeft': '10px', 'paddingRight': '10px'}}>
                <a href='#/' style={{'color': 'black', 'fontSize': '18px'}} ><span>Home</span></a>
              </NavItem>
              <NavItem className='nav-item' style={{'paddingLeft': '10px', 'paddingRight': '10px'}}>
                <a href='#/usuario/cadastro' style={{'color': 'black', 'fontSize': '18px'}} ><span>Cadastro</span></a>
              </NavItem>
              <NavItem className='nav-item' style={{'paddingLeft': '10px', 'paddingRight': '10px'}}>
                <a href='#/usuario/login' style={{'color': 'black', 'fontSize': '18px'}} ><span>Login</span></a>
              </NavItem>
            </Nav>
          </Row>
          <Row className='barra-verde-row'></Row>
        </Col>
      </header>
    )
  }
}

export default Header
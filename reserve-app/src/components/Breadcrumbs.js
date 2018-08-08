import React from 'react'
import { NavLink } from 'react-router-dom'
import { withBreadcrumbs } from 'react-router-breadcrumbs-hoc'

import { ROTAS } from '../rotas'

const Breadcrumbs = ({ breadcrumbs }) => {
  return (
    <div className='breadcrumb'>
      {breadcrumbs.map(({ breadcrumb, path, match }) => (
        <span key={path} className='breadcrumb-item'>
          <NavLink to={match.url}>
            {breadcrumb}
          </NavLink>
        </span>
      ))}
    </div>
  )
}

const transformarRotasBreadcrumbs = () => {
  return ROTAS.map(rota => {
    return {
      "path": rota.caminhoCompleto,
      "breadcrumb": rota.rotulo
    }
  })
}

export default withBreadcrumbs(transformarRotasBreadcrumbs())(Breadcrumbs)
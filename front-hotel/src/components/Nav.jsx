import React from 'react'
import { NavLink } from 'react-router-dom'

function Nav() {

  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink to="/" className="nav__link">Accueil</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
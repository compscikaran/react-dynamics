import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <ul>
      <li>
        <Link to="/component1">location 1</Link>
      </li>
      <li>
        <Link to="/component2">location 2</Link>
      </li>
      <li>
        <Link to="/component3">location 3</Link>
      </li>
    </ul>
  )
}

export default Menu
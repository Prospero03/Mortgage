import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const links =[
      {
        name:"Главная",
        to:"/",
      },
      {
        name:"Все категории",
        to:"/all-calculators",
      },
      {
        name:"Профиль",
        to:"/profile",
      },
      {
        name:"Войти",
        to:"/login",
      },
    ]

  return (
    <div>

      <div className="Navigate">
        {links.map((items,i) =>(
          <Link key={i} to={items.to}>
          {items.name}
          </Link>
        ))}

        <Link to="signup">
          Регистрация
        </Link>
      </div>
      
    </div>
  )
}

export default Navbar
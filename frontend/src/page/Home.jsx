import React from 'react'
import { Link } from 'react-router-dom';
import "./Home.css"

const Home = () => {
  const links = [
    {
      name: "Войти как Администратор",
      to: "/admin-login",
  }
    
];
  
  return (
    <div className='Home'>
      <h1>Привет дорогой пользователь,<br></br> представляю Вам банковский ипотечный калькулятор  </h1>

      <h2>Зайти как Администратор</h2>
      <h3>Что бы авторизоваться как администратор , авторизуйтесь как пользователь,<br></br> затем измените role: "user" в базе MongoDB  на role: "admin"</h3>
      
        
      {links.map((items, i) => (
                    
                    <Link className= "nav-link-admin" key={i} to={items.to}>
                        {items.name}
                    </Link>
                    
                ))}
                
        
    </div>
  )
}

export default Home
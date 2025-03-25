import React from 'react'
import { Link} from 'react-router-dom';
import "./Sidebar.css"

const Sidebar = () => {

    const links =[
        {to: "/admin-dashboard", name: "Все калькуляторы" },
        {to: "/admin-dashboard/add-calculators", name: "Добавление" },
        {to: "/admin-dashboard/edit-calculators", name: "Редактирование" },
        {to: "/admin-dashboard/result-calculators", name: "Результаты " },
    ];

    /* hr */
    
  return (
    <div>
        
        <div className='NavigateAdmin'>
          <nav>
            {links.map((items,i)=> (
            <Link className="nav-link" to={items.to} key={i}>{items.name}</Link>
            )
            
        )}
          </nav>
        </div>
        
    </div>
  )
}

export default Sidebar
import React from 'react'
import MortgageCalculator from './MortgageCalculator'

const MortgageRecent = () => {
    const data =[
        {title: "Ипотека",
        number: 9.6,
        decription: "Ипотечный кредит со ставкой 9,6",
        },
        {title: "Автокредит",
        number: 3.5,
        },
        {title: "Потребительский Кредит",
        number: 14.5,
        },
        
    ]
  return (
    <div>
        <div className="MortgageRecent">
            
            {data.map((items,i) =>(
                <div key={i}>
                    <MortgageCalculator items={items} />                  
                </div>
            ))}
        </div>
    </div>
  )
}

export default MortgageRecent
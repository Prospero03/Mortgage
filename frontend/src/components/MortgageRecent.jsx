//Здесь у нас кол-во данных о Калькуляторах

import React from 'react';
import MortgageCalculator from './MortgageCalculator';
import "./MortgageRecent.css"

const MortgageRecent = ({ data }) => {
    // Статические данные
    const staticData = [
        { title: "Ипотека", number: 9.6, description: "Ипотечный кредит со ставкой 9,6" },
        { title: "Автокредит", number: 3.5, description: "Автокредит со ставкой 3,5" },
        { title: "Потребительский Кредит", number: 14.5, description: "Потребительский кредит со ставкой 14,5" },
    ];

    // Объединение статических данных и данных из базы данных
    const combinedData = [...staticData, ...data];

    return (
        <div>
            <div className="MortgageRecent">
                {combinedData.map((items, i) => (
                    <div key={i}>
                        <MortgageCalculator items={items} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MortgageRecent;
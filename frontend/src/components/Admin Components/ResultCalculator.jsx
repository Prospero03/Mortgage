import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';

const ResultCalculator = () => {
    const backendLink = useSelector((state) => state.prod.link);
    const [calculations, setCalculations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCalculations = async () => {
            try {
              const response = await axios.get(`${backendLink}/api/v1/mortgage-calculations`, {
                withCredentials: true
            });
                setCalculations(response.data.data);
                setLoading(false);
            } catch (error) {
                toast.error('Ошибка при загрузке данных');
                setLoading(false);
            }
        };
        fetchCalculations();
    }, [backendLink]);

    if (loading) return <div>Загрузка...</div>;

    const handleExport = async () => {
      try {
          const response = await axios.get(`${backendLink}/api/v1/mortgage-calculations/export`, {
              responseType: 'blob',
              withCredentials: true,
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
          });
          
          const blob = new Blob([response.data], { type: 'text/csv' });
          saveAs(blob, 'mortgage-calculations.csv');
          toast.success('Экспорт завершен успешно');
      } catch (error) {
          console.error("Export error:", {
              message: error.message,
              response: error.response?.data,
              config: error.config
          });
          toast.error(error.response?.data?.error || 'Ошибка при экспорте данных');
      }
  };

    return (
        <div className="admin-calculations">
            <h2>Результаты расчетов Mortgage</h2>
        
            <button 
                onClick={handleExport}
                className="export-btn"
                style={{
                    padding: '10px 15px',
                    background: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginBottom: '20px'
                }}
            >
                Экспорт в CSV
            </button>

            <div className="calculations-table">
                <table>
                    <thead>
                        <tr>
                            
                            <th>Сумма</th>
                            <th>Взнос</th>
                            <th>Ставка</th>
                            <th>Срок</th>
                            <th>Платеж</th>
                            <th>Всего</th>
                            <th>Проценты</th>
                            <th>Доход</th>
                            <th>Дата</th>
                        </tr>
                    </thead>
                    <tbody>
                        {calculations.map((calc, index) => (
                            <tr key={index}>
                                
                                <td>{calc.amount}</td>
                                <td>{calc.downPayment}</td>
                                <td>{calc.interestRate}%</td>
                                <td>{calc.loanTerm} лет</td>
                                <td>{calc.monthlyPayment}</td>
                                <td>{calc.totalPayable}</td>
                                <td>{calc.totalInterest}</td>
                                <td>{calc.requiredIncome}</td>
                                <td>{new Date(calc.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResultCalculator;
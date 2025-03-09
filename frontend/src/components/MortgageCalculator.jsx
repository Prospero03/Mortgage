import { useState } from 'react';
import './MortgageCalculator.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom"

function MortgageCalculator( {items}) {

  
  const [initialState, setInitialState] = useState (
    {
    amount: '', //Сумма
    downPayment: '', //Первоначальный взнос
    interestRate: '', //Процентная ставка
    loanTerm: '', //Срок кредита
    }
  );




  
  const [formData, setFormData] = useState(initialState);
  const [payment, setPayment] = useState(null);
  const [total, setTotal] = useState(null);
  const [interes, setInterest] = useState(null);
  const [required, setReqiired] = useState(null);


  
  

  const handleChange = (event) => {

    
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    calculateMonthlyPayment();
    SubmitHandler();
    
  };

  const calculateMonthlyPayment = () => {

    //Переносит initialState в FormData
    const { amount, downPayment, interestRate, loanTerm } = formData;

    //Остаток по кредиту = Сумма кредита - Первоначальный взнос
    const loanAmount =
      parseFloat(amount) - (downPayment ? parseFloat(downPayment) : 0);

    //Ежемесячная ставка = Процентная ставка / 100 / 12
    const r = (parseFloat(interestRate) / 100 / 12);

    //Срок кредита * 12 месяцев
    const n = parseFloat(loanTerm) * 12;


    //Ежемесячный платеж = Остаток по кредиту * Ежемесячная ставка * (Общая ставка = 1 + Ежемесячная ставка ^ Срок кредита * 12) 
    const numerator = loanAmount * r * Math.pow(1 + r, n);

    //Отрицательное (Общая ставка = 1 + Ежемесячная ставка ^ Срок кредита * 12) - 1;
    const denumerator = Math.pow(1 + r, n) - 1;


    //Ежемесячный платеж
    const monthlyPayment = (numerator / denumerator).toFixed(2);
    setPayment(monthlyPayment); 

    //Общая сумма платежа по кредиту:
    const totalPayable = (monthlyPayment * n).toFixed(2);
    setTotal(totalPayable);

    //Общая сумма выплат по процентам
    const totalInterest = (totalPayable - loanAmount).toFixed(2);
    setInterest(totalInterest);

    //Необходимый доход
    const requiredIncome = ((numerator / denumerator)*2.5).toFixed(2);
    setReqiired(requiredIncome);

    const finishData = {monthlyPayment, totalPayable, totalInterest, requiredIncome};
    console.log(finishData)
  };

  //axios
  const SubmitHandler =async()=>{
    //!!
    try {
      const res = await axios.post("http://localhost:1000/api/v1/mortgage", formData, {
        withCredentials: true,
      });
      console.log(res.data.message);
      
    } catch (error) {
      console.log(error.response.data.error)
    }finally{
      setInitialState(
        {
        amount: '', //Сумма
        downPayment: '', //Первоначальный взнос
        interestRate: '', //Процентная ставка
        loanTerm: '', //Срок кредита
        
        }
      )
      ;
      
      
      

    }
  }










  return (
    <div className='mortgage-container'>
      <h2>{items.title}</h2>

      <form  
      onSubmit={handleSubmit }>

        <div className='form-group'>
          <label>Стоимость Ипотеки (руб.):</label>
          <input
            type='number'
            name='amount'
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Первоначальный Взнос (руб.):</label>
          <input
            type='number'
            name='downPayment'
            value={formData.downPayment}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Процентная ставка (%):</label>
          <input
            type="number"
            name='interestRate'
            defaultValue={formData.interestRate=(items.number)}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Срок Кредита (годы):</label>
          <input
            type='number'
            name='loanTerm'
            value={formData.loanTerm}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit'>Считать</button>

        </form>
      

          <h3 >Ежемесячный платеж: 
            <label >{payment}</label> руб.</h3>

          <h3 >Общая сумма платежа по кредиту: 
            <label >{total}</label> руб.</h3>

          <h3>Общая сумма выплат по процентам: 
            <label >{interes}</label> руб.</h3>

          <h3>Необходимый доход: 
            <label >{required}</label> руб.</h3>

        
    </div>

  );
}

export default MortgageCalculator;
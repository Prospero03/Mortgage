import { useState } from 'react';
import './MortgageCalculator.css';
import { toast } from "react-toastify";
import axios from 'axios';
import { useSelector } from 'react-redux';

function MortgageCalculator({ items }) {
  const backendLink = useSelector((state) => state.prod.link);
  const [initialState] = useState({
    amount: '', // Сумма
    downPayment: '', // Первоначальный взнос
    interestRate: items.number || '', // Процентная ставка (инициализация значением из items.number)
    loanTerm: '', // Срок кредита
    email: '', // Добавлено поле для email
  });

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
    
    if (!formData.amount || !formData.interestRate || !formData.loanTerm) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }
  
    const { monthlyPayment, totalPayable, totalInterest, requiredIncome } = calculateMonthlyPayment();
    
    // Обновляем состояния для отображения
    setPayment(monthlyPayment);
    setTotal(totalPayable);
    setInterest(totalInterest);
    setReqiired(requiredIncome);
  
    const dataToSend = {
      ...formData,
      monthlyPayment,
      totalPayable,
      totalInterest,
      requiredIncome
    };
  
    SubmitHandler(dataToSend);
  };

  const SubmitHandler = async (dataToSend) => {
    try {
      const res = await axios.post(`${backendLink}/api/v1/mortgage`, dataToSend, {
        withCredentials: true,
      });
      console.log("Ответ сервера:", res.data); // Логирование ответа сервера
      toast.success('Данные успешно отправлены на сервер.');
    } catch (error) {
      console.error("Ошибка при отправке данных:", error.response.data); // Логирование ошибки
      toast.error('Произошла ошибка при отправке данных.');
    }
  };

  const calculateMonthlyPayment = () => {
    const { amount, downPayment, interestRate, loanTerm } = formData;

    // Преобразуем значения в числа
    const loanAmount = parseFloat(amount) - (downPayment ? parseFloat(downPayment) : 0);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(loanTerm) * 12;

    // Проверка на корректность чисел
    if (isNaN(loanAmount) || isNaN(r) || isNaN(n)) {
      alert("Пожалуйста, введите корректные числовые значения.");
      return { monthlyPayment: 0, totalPayable: 0, totalInterest: 0, requiredIncome: 0 };
    }

    // Ежемесячный платеж
    const numerator = loanAmount * r * Math.pow(1 + r, n);
    const denumerator = Math.pow(1 + r, n) - 1;
    const monthlyPayment = (numerator / denumerator).toFixed(2);

    // Общая сумма платежа по кредиту
    const totalPayable = (monthlyPayment * n).toFixed(2);

    // Общая сумма выплат по процентам
    const totalInterest = (totalPayable - loanAmount).toFixed(2);

    // Необходимый доход
    const requiredIncome = ((numerator / denumerator) * 2.5).toFixed(2);

    // Возвращаем данные для finishData
    return { monthlyPayment, totalPayable, totalInterest, requiredIncome };
  };

  const handleSendEmail = async () => {
    if (!formData.email) {
      toast.error('Пожалуйста, введите email.');
      return;
    }

    try {
      // Формируем текст письма с результатами расчетов
      const emailSubject = 'Результаты расчета ипотеки';
      const emailText = `
        Стоимость Ипотеки: ${formData.amount} руб.
        Первоначальный Взнос: ${formData.downPayment} руб.
        Процентная Ставка: ${formData.interestRate} %
        Срок Кредита: ${formData.loanTerm} лет
        Ежемесячный платеж: ${payment} руб.
        Общая сумма платежа по кредиту: ${total} руб.
        Общая сумма выплат по процентам: ${interes} руб.
        Необходимый доход: ${required} руб.
      `;

      // Отправляем email с результатами расчетов
      await axios.post(
        `${backendLink}/api/v1/sendEmail`,
        {
          to: formData.email, // Используем email из formData
          subject: emailSubject,
          text: emailText,
        },
        {
          withCredentials: true,
        }
      );

      // Уведомление об успешной отправке
      toast.success('Результаты расчетов отправлены на ваш email.');
    } catch (error) {
      console.log(error.response.data.error);
      toast.error('Произошла ошибка при отправке данных.');
    }
  };

  return (
    <div className='mortgage-container'>
      <h2>{items.title}</h2>
      <h3>{items.description}</h3>

      <form onSubmit={handleSubmit}>
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
            value={formData.interestRate}
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

        <div className='form-group'>
          <label>Email:</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <button type='submit'>Считать</button>
      </form>

      <h3>Ежемесячный платеж: <label>{payment}</label> руб.</h3>
      <h3>Общая сумма платежа по кредиту: <label>{total}</label> руб.</h3>
      <h3>Общая сумма выплат по процентам: <label>{interes}</label> руб.</h3>
      <h3>Необходимый доход: <label>{required}</label> руб.</h3>

      {/* Кнопка для отправки результатов на email */}
      <button onClick={handleSendEmail} style={{ marginTop: '20px' }}>
        Отправить результаты на email
      </button>
    </div>
  );
}

export default MortgageCalculator;
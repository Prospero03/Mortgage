import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import {toast} from 'react-toastify'
import "./UpdateBlog.css"

const UpdateBlog = () => {
  const [formData, setFormData] = useState({ title: "", description: "", number: "" });
  const { id } = useParams();
  const backendLink = useSelector((state) => state.prod.link);

  useEffect(() => {
    const fetchCalculator = async () => {
      try {
        const res = await axios.get(`${backendLink}/api/v1/fetchAllCalculator`);
        const calculator = res.data.calculators.find(c => c._id === id);
        if (calculator) {
          setFormData({
            title: calculator.title,
            description: calculator.description,
            number: calculator.number
          });
        }
      } catch (error) {
        toast.error("Ошибка при загрузке данных");
      }
    };
    fetchCalculator();
  }, [id, backendLink]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${backendLink}/api/v1/editCalculator/${id}`,
        formData,
        { withCredentials: true }
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.error || "Ошибка при обновлении");
    }
  };

  return (
    <div className='UpdateBlog'>
      <h2>Редактирование калькулятора</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-update'>
          <label >Название</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Название"
          />
        </div>

        <div className='form-update'>
        <label >Процентная ставка</label>
        <input
          type="number"
          name="number"
          value={formData.number}
          onChange={handleChange}
          placeholder="Числовое значение"
        />
        </div>

        <div className='form-update'>
        <label >Описание</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Описание"
        />
        </div>

        <button type="submit">Обновить</button>
      </form>
    </div>
  );
};

export default UpdateBlog;
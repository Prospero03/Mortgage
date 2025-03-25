import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify'
import "./EditCalculator.css"


const EditCalculator = () => {
  const backendLink = useSelector((state) => state.prod.link);
    const [data, setData] = useState([]); // Инициализация пустым массивом

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`${backendLink}/api/v1/fetchAllCalculator`, {
                    withCredentials: true,
                });
                setData(res.data.calculators);
            } catch (error) {
                console.log("Ошибка при загрузке данных:", error);
            }
        };
        fetch();
    }, [data]);

    const deleteCalculatorHandler = async (id) => {
      try {
        const res = await axios.delete(`${backendLink}/api/v1/deleteCalculator/${id}`, {
          withCredentials: true,
        });
        toast.success(res.data.message);
        setData(data.filter(item => item._id !== id));
      } catch (error) {
        toast.error(error.response?.data?.error || "Ошибка при удалении");
      }
    }

  return (
    <div>
      
      {data &&
        data.map((items,i)=>(
          <div  className='EditCard' key={i}>
            <h3>Название - {items.title}</h3>
            <p>Процентная ставка - {items.number} %</p>
            <p>Описание - {items.description}</p>

              <div className='EditButton'>
                <Link className="edit-link" to={`/admin-dashboard/update-blogs/${items._id}`}>Редактировать</Link>
                <Link className="edit-link" onClick= { () => deleteCalculatorHandler(items._id)}>Удалить</Link>
              </div>

          </div>
        ))}
        
    </div>
  )
}

export default EditCalculator
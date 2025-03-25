import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import "./AddCalculator.css";

const AddCalculator = () => {

  const [Title, setTitle] =useState("");
  const [Number,setNumber] = useState("");
  const [Description,setDescription] = useState("");

  const backendLink = useSelector((state)=> state.prod.link)
  const [Loading, setLoading] = useState("");
  

  const handleAddMortgage = async (e) =>{
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${backendLink}/api/v1/add-mortgage`, {
        title: Title,
        number: Number,
        description: Description,
        

      }, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      
    } catch (error) {
      toast.error(error.response.data.error);
    }finally{
      setTitle("");
      setNumber("");
      setDescription("");
      setLoading(false);
    }
  }

  return (
    <div className='AddCalculator'>
        <h1>Добавление Калькулятора</h1>

        <form onSubmit={handleAddMortgage}>
              <div className='form-add'>
                <label >Название Калькулятора :</label>
                <input  
                type ="text"
                placeholder='Название'
                value={Title}
                onChange={(e) => setTitle(e.target.value)}    
                />
              </div>
              
              <div className='form-add'>
                <label >Процентная ставка : </label>
                <input  
                type ="text"
                placeholder='Процентная ставка'
                value={Number}
                onChange={(e) => setNumber(e.target.value)}    
                />
              </div>

              <div className='form-add'>
                <label >Описание Калькулятора :</label>
                <input  
                type ="text"
                placeholder='Описание'
                value={Description}
                onChange={(e) => setDescription(e.target.value)}    
                />
              </div>

            

              <div>
              {Loading ? (
                <div>Ожидание</div>
                ):(
                <button>Добавить Калькулятор</button>
                )} 
              </div>
            
        </form>
        
        
    </div>
  )
}

export default AddCalculator;
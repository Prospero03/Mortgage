import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify"
import axios from "axios";
import {  useSelector } from 'react-redux';
import "./FormAuth.css"

const SignUp = () => {

  const history = useNavigate();
  const backendLink = useSelector((state)=> state.prod.link)
  const [Inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  });

  const change = (e) =>{
    const {name, value} = e.target;
    setInputs({ ...Inputs, [name]:value});
  };

  const SubmitHandler = async(e) =>{
    e.preventDefault();
    try {
      const res = await axios.post(`${backendLink}/api/v1/sign-up`, 
      Inputs,
      {
        withCredentials: true,
      }
      );
      toast.success(res.data.message);
      history("/login");
      //console.log(res);
    } catch (error) {
      toast.error(error.response.data.error);
      //console.log(error.response.data.error);
    }finally{
      setInputs({
        username: "",
        email: "",
        password: ""
      })
    }
  }

  return (
    <div className='FormContainer '>
    <span>Регистрация</span>

    <form 
          onSubmit={SubmitHandler}
          action="">

      <div className="forms">
        <label htmlFor="">Email</label>
        <input  type="email" 
                value={Inputs.email}
                name = "email"
                required
                onChange={change}/>
      </div>

      <div className="forms">
        <label htmlFor="">Имя пользователя</label>
        <input  type="text" 
                value={Inputs.username}
                name = "username"
                required
                onChange={change}/>
      </div>

      <div className="forms">
        <label htmlFor="">Пароль</label>
        <input  type="password" 
                value={Inputs.password}
                name = "password"
                required
                onChange={change}/>
      </div>

      <button>Зарегистрироваться</button>

    </form>

      <Link to="/login">Войти</Link>
    </div>
  )
}

export default SignUp;
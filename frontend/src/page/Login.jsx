import React, { useState } from 'react';
import {toast} from "react-toastify";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/authReducer';
import "./FormAuth.css"

const Login = () => {
  const history = useNavigate()
  const backendLink = useSelector((state) => state.prod.link);
  const dispatch = useDispatch();


  const [Inputs, setInputs] = useState({
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
      const res = await axios.post(`${backendLink}/api/v1/log-in`, 
      Inputs,
      {
        withCredentials: true,
      }
      );
      dispatch(authActions.login());
      toast.success(res.data.message);
      history("/profile");
      //console.log(res);
    } catch (error) {
      toast.error(error.response.data.error);
      //console.log(error.response.data.error);
    }finally{
      setInputs({
        email: "",
        password: ""
      })
    }
  }
  return (
    <div className='FormContainer '>
    <span>Авторизация</span>

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
        <label htmlFor="">Пароль</label>
        <input  type="password" 
                value={Inputs.password}
                name = "password"
                required
                onChange={change}/>
      </div>

      <button>Войти</button>

    </form>
    </div>
  )
}

export default Login
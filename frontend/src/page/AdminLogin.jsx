import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector} from "react-redux"
import {toast} from "react-toastify"
import axios from "axios";
import "./FormAuth.css"

const AdminLogin = () => {

    const backendLink = useSelector((state) => state.prod.link);
    const history = useNavigate();
    const [inputs, setInputs] = useState(
        { email: "",
          password: ""
         }
        );
    
        const change = (e) => {
          const {name, value} = e.target
          setInputs({ ...inputs, [name]: value})
        }

        const handleAdminLogin = async(e) =>{
          e.preventDefault();
          try {
            const res = await axios.post(`${backendLink}/api/v1/adminLogin`, inputs, {
              withCredentials:true,
            });
            
            toast.success(res.data.message);
            history("/admin-dashboard");
          } catch (error) {
            toast.error(error.response.data.error)
          }
        }
  return (
    <div className='FormContainer '>
    <h1>Admin Login</h1>

      <form onSubmit = {handleAdminLogin}>

        <div className='forms'>
          <label> Email</label>
          <input type="email"
                  value={inputs.email}
                  name="email" 
                  required
                  onChange={change}/>
        </div>

        <div className='forms'>
          <label  > Password </label>
          <input type="password"
                  value={inputs.password}
                  name="password" 
                  required
                  onChange={change}/>
        </div>

        <button>Login</button>
      </form>
      
      

      
    </div>
  )
}

export default AdminLogin
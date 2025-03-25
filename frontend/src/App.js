import './App.css';
import {BrowserRouter as Router,Route, Routes} from "react-router-dom"
import Home from './page/Home';
import AllCalculators from './page/AllCalculators';
import Login from './page/Login';
import SignUp from './page/SignUp';
import AdminDashboard from './page/AdminDashboard';
import MortgageCalculator from './components/MortgageCalculator';
import MainLayout from './layout/MainLayout';
import OtherLayout from './layout/OtherLayout';
import Profile from './page/Profile'

//Toast
import { ToastContainer } from 'react-toastify';

//Admin
import Adminlogin from './page/AdminLogin';
import Dashboard from './components/Admin Components/Dashboard';
import AddCalculator from './components/Admin Components/AddCalculator';


import UpdateBlogs from './components/Admin Components/Component/UpdateBlog'

//Авторизация Пользователя
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { authActions } from './store/authReducer';
import ResultCalculator from './components/Admin Components/ResultCalculator';
import EditCalculator from './components/Admin Components/EditCalculator';

function App() {
  //redux
  const backendLink = useSelector((state) => state.prod.link);
  const dispatch = useDispatch()
  useEffect(() => {
    const fetch = async () =>{
    const res = await axios.get(`${backendLink}/api/v1/check-cookie`,{
      withCredentials : true,
    });
    console.log(res.data.message);
    if(res.data.message === true){
      dispatch(authActions.login())
    }
  };
  fetch();
  
  }, []);
  
  
    return  <>
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<MainLayout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="/all-calculators" element={<AllCalculators/>}/>
                        <Route path="/mortgage" element={<MortgageCalculator/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                    </Route>

                    <Route element={<OtherLayout/>}>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<SignUp/>}/>

                        
                        <Route path="/admin-login" element={<Adminlogin/>}/>
                        <Route path="/admin-dashboard" element={<AdminDashboard/>}>
                            <Route index element= {<Dashboard/>} />
                            <Route path="/admin-dashboard/add-calculators" element= {<AddCalculator/>} />
                            <Route path="/admin-dashboard/edit-calculators" element= {<EditCalculator/>} />

                            <Route 
                                    path="/admin-dashboard/update-blogs/:id" 
                                    element= {<UpdateBlogs/>}/>

                            <Route path="/admin-dashboard/result-calculators" element= {<ResultCalculator/>} />

                        </Route>
                        
                    </Route>

                </Routes>
                
            </>
  
}

export default App;
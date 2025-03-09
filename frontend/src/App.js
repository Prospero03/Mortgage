import './App.css';
import {BrowserRouter as Router,Rutes,Route, Routes} from "react-router-dom"
import Home from './page/Home';
import AllCalculators from './page/AllCalculators';
import Login from './page/Login';
import SignUp from './page/SignUp';
import AdminDashboard from './page/AdminDashboard';
import MortgageCalculator from './components/MortgageCalculator';
import MainLayout from './layout/MainLayout';
import OtherLayout from './layout/OtherLayout';
import Profile from './page/Profile'
function App() {
  
    return  <Router>
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
                        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
                        
                    </Route>

                </Routes>
            </Router>
  
}

export default App;
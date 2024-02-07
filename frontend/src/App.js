import logo from './logo.svg';
import Login from './Component/Login';
import Dashboard from './Component/Dashboard';
import AdminDash from './Component/AdminDash';
import ForgotPassword from './Component/ForgotPassword';
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
//import './App.css';

function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/Dashboard' element={<Dashboard/>}/>
          <Route path='/AdminDash' element={<AdminDash/>}/>
          <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

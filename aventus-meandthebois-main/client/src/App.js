import './App.css';
import Login from './components/Login';
import Topbar from './components/Navbar';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import Dashboard from './components/Dashboard';
import Comment from './components/Comment';

const Wrapper = ({children}) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children
} 


function App() {
  return (
    <div className="App">
      <Router>
        <Wrapper>
        <Topbar/>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/*' element={<Dashboard/>}/>  
          <Route path='/comments/:bid/:Aanum' exact element={<Comment/>}/>
          
        </Routes>
        </Wrapper>
      </Router>

    </div>
  );
}

export default App;

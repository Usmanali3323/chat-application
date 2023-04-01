
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Weather from './components/weather';
import Header from './components/header';
import Footer from './components/footer';
import Signup from './components/signup';
import Login from './components/login';
import Developer from './components/Developer';
import './App.css';

function App() {


  return (
    <div className="App">
      <Router>
      <Header/>
        <Routes>
            <Route path={'/'} element={<Weather/>}/>
            <Route path={'/signup'} element={<Signup/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/developer'} element={<Developer/>} />
        </Routes>
       <Footer/>
      </Router>
    </div>
  )
}

export default App

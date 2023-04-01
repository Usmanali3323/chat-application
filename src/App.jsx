import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import Slidebar from './components/slidebar'
 import Chat from './components/chat';
 import './App.css'
import  Login  from './components/login';
import { useStateValue } from './components/stateProvider';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth} from './firebase/config'
import { display } from '@mui/system';
 
function App() {
 const  [{user},dispatch] = useStateValue();
 
 useEffect(()=>{
  onAuthStateChanged(auth, user=>{
    dispatch({
      type: 'SET_USER',
      user: user
    });
  })
 },[]);
  return (
    <>
    {user ? 
    <div className="App">
    <div className='App__body'>
    <BrowserRouter>  
    <Routes>
    {window.innerWidth > 800 ? <Route path='/' element={<><Slidebar/><Chat/></>} /> :  <Route path='/' element={<Slidebar/>} />}
    <Route path="/:roomId" element={window.innerWidth > 800 ? <><Slidebar/><Chat/></> : <Chat/>} />
    <Route path='#' element={<h1>Not Found</h1>} />
    </Routes>

    </BrowserRouter>
    </div>
    </div>
      :  <Login/> }
      </>
  )
}

export default App

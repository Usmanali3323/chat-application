import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {StateProvider} from './components/stateProvider' ;
import  {initialState}  from './components/Reducer';
import  reducer  from './components/Reducer';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <StateProvider reducer={reducer} initialState={initialState}  >
    <App />
  </StateProvider>
  </React.StrictMode>,
)

import React from 'react'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'


function App() {
  return (

    <BrowserRouter>
     
     <Routes>
      {/* <Route path='/' element={<Home/>}/> */}
      <Route path='/' element={<Signup/>}/>
      <Route path='/login' element={<Signin/>}/>
     </Routes>
    </BrowserRouter>

  )
}

export default App
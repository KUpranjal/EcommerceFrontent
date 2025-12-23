import React from 'react'
import SignUp from './Components/SignUp'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Toaster/>
      <Routes>
         <Route path='/signup' element={<SignUp/>} />
      </Routes>
    </div>
  )
}

export default App
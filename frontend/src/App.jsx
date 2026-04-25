import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {


  return (
    <BrowserRouter>
      <Routes>
         <Route path='/' element={<Home/>} />
         
         <Route path="/signup" element={<Signup />}/>
         <Route path='/login' element={<Login />}/>
         

         <Route path='/dashboard' element={
              <ProtectedRoute> 
                 <Dashboard />
              </ProtectedRoute>
            } 
          />
      </Routes>
    </BrowserRouter>
  )
}

export default App

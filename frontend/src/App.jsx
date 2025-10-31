import Login from './pages/Login.jsx'
import {Route, Routes } from 'react-router-dom'
import "./App.css"
import Admin from './pages/admin/Admin.jsx'
import Faculty from './pages/Faculty/Faculty.jsx'
import Student from './pages/student/Student.jsx'
import Main from './pages/Main.jsx'

const App = () => {
  return (
    <div>
      <Routes>
       <Route path='/admin' element={<Admin/>} />
       <Route path='/faculty' element={<Faculty/>} />
       <Route path='/student' element={<Student/>} />
       <Route path='/login' element={<Login/>} />
       <Route path='/' element={<Main/>}/>
      </Routes>
    </div>
  )
}

export default App
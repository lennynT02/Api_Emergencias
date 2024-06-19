import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Main } from './pages/MainPage/Main'
// import Login from './pages/LoginPage/Login'

function App () {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Main />} />
      </Routes>
    </Router>
  )
}

export default App

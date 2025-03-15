import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import PortectedRoutes from "./components/PortectedRoutes";


function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="/"
          element={
            <PortectedRoutes>
              <HomePage/>
            </PortectedRoutes>
          }
        />
      </Routes>
    </Router>
  )
}

export default App

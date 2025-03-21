import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import PortectedRoutes from "./components/PortectedRoutes";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./CartProvider";
import AIChef from "./pages/AIChef";


function App() {
  
  return (
    <CartProvider>
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
        <Route path="/cart"
          element={
            <PortectedRoutes>
              <CartPage/>
            </PortectedRoutes>
          }
        />

        <Route path="/ai-chef"
          element={
            <PortectedRoutes>
              <AIChef/>
            </PortectedRoutes>
          }
        />
       
      </Routes>
    </Router>
    </CartProvider>
  )
}

export default App

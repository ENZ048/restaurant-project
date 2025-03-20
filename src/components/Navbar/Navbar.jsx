import React from "react";
import Button from "@mui/material/Button";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import logo from "../../assets/logo.png";
import { TipsAndUpdates, Home, ShoppingCart } from "@mui/icons-material";
import "./Navbar.css";

import { Link } from "react-router-dom";
export default function Navbar() {
  const [user] = useAuthState(auth);

  return (
    <div className="nav-element max-h-40 text-white w-screen flex justify-between bg-[#f35637]  text-orange text-center md:px-20  gap-20 items-center">
      <img src={logo} alt="" className="h-40" />

      <div className="links">
        <ul className="nav-links flex list-none justify-between gap-4 w-80 text-2xl">
          <Link to="/" className="hover:text-yellow-500"><li>Home</li></Link>
          <Link to="/ai-chef" className="hover:text-yellow-500"><li>AI Chef</li></Link>
          <Link to="/cart" className="hover:text-yellow-500"><li>Cart</li></Link>
        </ul>

        <div className=" nav-icons flex justify-between w-40">
          <Home
            sx={{
              // fontSize: '1.5rem',
              color: '#FFD700',
              cursor: 'pointer',
              transition: 'all ease-in-out 0.2s',
              '&:hover': {
                transform: 'scale(1.3)',
              },
            }}
          />
        
          <TipsAndUpdates
            sx={{
              fontSize: '1.5rem',
              color: '#FFD700',
              cursor: 'pointer',
              transition: 'all ease-in-out 0.2s',
              '&:hover': {
                transform: 'scale(1.3)',
              },
            }}
          />
          

          <ShoppingCart
            sx={{
              fontSize: '1.5rem',
              color: '#FFD700',
              cursor: 'pointer',
              transition: 'all ease-in-out 0.2s',
              '&:hover': {
                transform: 'scale(1.3)',
              },
            }}
          />
        </div>
      </div>

      <div>
        <h1 className="welcome-msg">Welcome {user.displayName}!</h1>
      </div>

      <Button variant="contained" color="error" onClick={() => signOut(auth)}>
        LogOut
      </Button>
    </div>
  );
}

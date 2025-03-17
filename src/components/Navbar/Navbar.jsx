import React from "react";
import Button from "@mui/material/Button";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
// import logo from "../../assets/logo.png";
import { TipsAndUpdates, Home, ShoppingCart } from "@mui/icons-material";
import "./Navbar.css";

import { Link } from "react-router-dom";
export default function Navbar() {
  const [user] = useAuthState(auth);

  return (
    <div className="nav-element min-h-[5vh] pr-10 text-white flex  text-center justify-end gap-20 items-center px-5">
      {/* <img src={logo} alt="" className="h-40" /> */}

      <div>
        <ul className="nav-links flex list-none justify-between gap-4 w-80 text-2xl">
          <li>Home</li>
          <li>AI Chef</li>
          <Link to="/cart"><li>Cart</li></Link>
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

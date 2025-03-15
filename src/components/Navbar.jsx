import React from "react";
import Button from "@mui/material/Button";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";


export default function Navbar() {
  const [user] = useAuthState(auth);

  return (
    <div className="min-h-[10vh] bg-red-100 text-center flex justify-between p-6">
      <h1>This is Logo</h1>

      <div>
        <ul className="flex list-none justify-between w-50">
          <li>Home</li>
          <li>AI Chef</li>
          <li>Cart</li>
        </ul>
      </div>

      <div>
        <h1>Welcome {user.displayName}!</h1>
      </div>

      <Button variant="outlined" color="error" onClick={() => signOut(auth)}>
        LogOut
      </Button>
    </div>
  );
}

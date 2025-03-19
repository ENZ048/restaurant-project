import { useState } from "react";
import LoginForm from "../components/Auth/LoginForm";
import SignupForm from "../components/Auth/SignupForm";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Snackbar, Alert } from "@mui/material";
import './AuthPage.css'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSnackbar({ open: true, message: "Login Successful!", severity: "success" });
      setTimeout(() => navigate("/"), 2000); 
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  const handleSignup = async (userName, email, password) => {
    try {
      const userDetails = await createUserWithEmailAndPassword(auth, email, password);
      const user = userDetails.user;
      await updateProfile(user, { displayName: userName });
      setSnackbar({ open: true, message: "Account Created Successfully!", severity: "success" });
      setIsLogin(true);
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen auth-page">
      <div className="bg-white p-6 rounded-lg shadow-lg w-xl login-form">
        <DotLottieReact
          src="https://lottie.host/491b482d-e3bf-4b58-a245-e0c73ab64945/bHW10CRzyi.lottie"
          loop
          autoplay
        />
        <h2 className="text-2xl font-semibold text-center mb-4">
          {!isLogin ? "Create an Account" : "Login"}
        </h2>
        {!isLogin ? (
          <SignupForm onSwitch={() => setIsLogin(true)} onSignup={handleSignup} />
        ) : (
          <LoginForm onSwitch={() => setIsLogin(false)} onLogin={handleLogin} />
        )}
        <p className="mt-4 text-center text-sm">
          {!isLogin ? "Already have an account?" : "Don't have an account?"} {" "}
          <button
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {!isLogin ? "Login here" : "Create one"}
          </button>
        </p>
      </div>
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '400px' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AuthPage;

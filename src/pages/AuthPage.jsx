import { useState } from "react";
import LoginForm from "../components/Auth/LoginForm";
import SignupForm from "../components/Auth/SignupForm";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async(email, password) => {
      try{
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successfull");
        navigate("/");
        console.log(auth);
      }
      catch(err){
        alert(err.message);
      }
    }


    const handleSignup = async(userName, email, password) => {
        try{
          const userDetails = await createUserWithEmailAndPassword(auth, email, password);
          const user = userDetails.user;
    
          await updateProfile(user, { displayName: userName});
    
          alert("Account Created!");
          setIsLogin(true);
        }
        catch(err){
          alert(err);
        }
      };

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {!isLogin ? "Create an Account" : "Login"}
        </h2>

        {!isLogin ? <SignupForm onSwitch={() => setIsLogin(true)} onSignup={handleSignup}/> : <LoginForm onSwitch={() => setIsLogin(false)} onLogin={handleLogin}/>}

        <p className="mt-4 text-center text-sm">
          {!isLogin ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {!isLogin ? "Login here" : "Create one"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;

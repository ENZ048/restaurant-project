import { useState } from "react";

const LoginForm = ({onLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async(e) => {
    e.preventDefault();
    onLogin(email, password); 
  }


    return (
      <form className="flex flex-col" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="p-2 mb-2 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 mb-2 border rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-orange-500 cursor-pointer text-white py-2 rounded-md" type="submit">
          Login
        </button>
      </form>
    );
  };
  
  export default LoginForm;
  
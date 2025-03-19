import { useState } from "react";


const SignupForm = ({onSignup}) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSignup = async(e) => {
    e.preventDefault();
    onSignup(userName, email, password)

  };


  return (
    <form className="flex flex-col" onSubmit={handleSignup}>
      <input
        type="text"
        placeholder="Full Name"
        className="p-2 mb-2 border rounded-md"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
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
      <button type="submit" className="bg-green-500 cursor-pointer text-white py-2 rounded-md">
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;

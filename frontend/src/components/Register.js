import React, { useState } from "react";
import API from "../api";

function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await API.post("/auth/register", { email, password });
      alert("Registered Successfully");
    } catch {
      alert("Error");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />

      <input type="password" placeholder="Password"
        onChange={e => setPassword(e.target.value)} />

      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;
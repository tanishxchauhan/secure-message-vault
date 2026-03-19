import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {

  const token = localStorage.getItem("token");

  return (
    <div className="container">

      <h1>🔐 Secure Message Vault</h1>

      {!token ? (
        <>
          <Register />
          <Login />
        </>
      ) : (
        <Dashboard />
      )}

    </div>
  );
}

export default App;
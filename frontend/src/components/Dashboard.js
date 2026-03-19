import React, { useState, useEffect } from "react";
import API from "../api";

function Dashboard() {

  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const token = localStorage.getItem("token");

  const saveMessage = async () => {
    await API.post(
      "/messages",
      { text },
      { headers: { authorization: token } }
    );
    loadMessages();
  };

  const loadMessages = async () => {
    const res = await API.get(
      "/messages",
      { headers: { authorization: token } }
    );
    setMessages(res.data);
  };

  const decrypt = async (cipher) => {
    const res = await API.post(
      "/messages/decrypt",
      { cipher },
      { headers: { authorization: token } }
    );

    alert("Decrypted: " + res.data.decrypted);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <textarea
        placeholder="Enter secret message..."
        onChange={e => setText(e.target.value)}
      />

      <br />

      <button onClick={saveMessage}>Encrypt & Save</button>
      <button onClick={logout}>Logout</button>

      <h3>Your Encrypted Messages</h3>

      {messages.map(msg => (
        <div className="message-box" key={msg._id}>
          <p>{msg.encryptedText}</p>
          <button onClick={() => decrypt(msg.encryptedText)}>
            Decrypt
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
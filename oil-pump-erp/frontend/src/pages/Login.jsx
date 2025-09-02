import React, { useState } from "react";
import api from "../api/client";

export default function Login(){
  const [email, setEmail] = useState("admin@erp.local");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/";
    } catch (e) {
      setError(e?.response?.data?.message || "Login failed");
    }
  };
  return (
    <div style={{display:'grid', placeItems:'center', height:'100vh'}}>
      <form className="card" style={{minWidth:360}} onSubmit={onSubmit}>
        <h2>Login</h2>
        <div className="grid">
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          {error && <div className="badge" style={{background:'#3b1e2e', color:'#ffc0d0'}}>{error}</div>}
          <button className="button">Sign In</button>
        </div>
      </form>
    </div>
  );
}

import React from "react";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16}}>
      <div className="badge">Welcome, {user?.name || "User"}</div>
      <div className="badge">{new Date().toLocaleString()}</div>
    </div>
  );
}

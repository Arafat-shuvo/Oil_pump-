import React from "react";
export default function StatCard({ title, value, hint }){
  return (
    <div className="card stat">
      <div>
        <div style={{opacity:.7, fontSize:14}}>{title}</div>
        <div style={{fontSize:28, fontWeight:800}}>{value}</div>
      </div>
      <div className="badge">{hint}</div>
    </div>
  );
}

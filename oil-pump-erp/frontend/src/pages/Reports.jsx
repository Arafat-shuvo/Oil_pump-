import React, { useEffect, useState } from "react";
import api from "../api/client";
import DataTable from "../components/DataTable";

export default function Reports(){
  const [daily, setDaily] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [period, setPeriod] = useState([]);

  useEffect(()=>{
    const today = new Date().toISOString().slice(0,10);
    api.get(`/reports/daily-sales?date=${today}`).then(({data})=> setDaily(data.data));
  },[]);

  const runPeriod = async () => {
    const { data } = await api.get(`/reports/period-summary?from=${from}&to=${to}`);
    setPeriod(data.data);
  };

  return (
    <div className="grid" style={{gap:24}}>
      <div className="card">
        <h3>Daily Sales (by Product & Shift)</h3>
        <DataTable
          columns={[
            { header:"Product", accessorKey:"product" },
            { header:"Total Liters", accessorKey:"totalLiters" },
            { header:"Total Gross", accessorKey:"totalGross" },
            { header:"By Shift", cell:(r)=> r.byShift.map(s=> `${s.shift}: ${s.liters}L / ৳${s.gross.toFixed(2)}`).join(" | ") }
          ]}
          data={daily}
        />
      </div>

      <div className="card">
        <h3>Period Summary</h3>
        <div className="grid cols-3" style={{marginBottom:16}}>
          <input className="input" type="date" value={from} onChange={e=>setFrom(e.target.value)} />
          <input className="input" type="date" value={to} onChange={e=>setTo(e.target.value)} />
          <button className="button" onClick={runPeriod}>Run</button>
        </div>
        <DataTable
          columns={[
            { header:"Product", accessorKey:"product" },
            { header:"Liters", accessorKey:"liters" },
            { header:"Gross", accessorKey:"gross" },
            { header:"Avg PPL", accessorKey:"avgPPL" },
          ]}
          data={period}
        />
      </div>
    </div>
  );
}

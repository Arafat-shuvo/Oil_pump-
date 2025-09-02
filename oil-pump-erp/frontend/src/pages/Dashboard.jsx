import React, { useEffect, useState } from "react";
import api from "../api/client";
import StatCard from "../components/StatCard";

export default function Dashboard(){
  const [stats, setStats] = useState({ totalGross: 0, totalLiters: 0, txCount: 0 });
  useEffect(()=>{
    const today = new Date().toISOString().slice(0,10);
    api.get(`/reports/daily-sales?date=${today}`).then(({data})=>{
      const totalGross = data.data.reduce((s, x)=> s + x.totalGross, 0);
      const totalLiters = data.data.reduce((s, x)=> s + x.totalLiters, 0);
      setStats({ totalGross, totalLiters, txCount: data.data.length });
    }).catch(()=>{});
  },[]);
  return (
    <div className="grid cols-3">
      <StatCard title="Today's Gross" value={`৳ ${stats.totalGross.toFixed(2)}`} hint="All fuels" />
      <StatCard title="Liters Sold" value={stats.totalLiters.toFixed(2)} hint="All fuels" />
      <StatCard title="Product Groups" value={stats.txCount} hint="By fuel" />
    </div>
  );
}

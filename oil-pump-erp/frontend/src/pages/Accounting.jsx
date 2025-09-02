import React, { useEffect, useState } from "react";
import api from "../api/client";
import DataTable from "../components/DataTable";

export default function Accounting(){
  const [tx, setTx] = useState([]);
  const [trial, setTrial] = useState([]);
  const [form, setForm] = useState({ date: new Date().toISOString().slice(0,10), amount: 0, memo: "", method:"cash" });

  const load = () => {
    api.get("/accounting/transactions").then(({data})=> setTx(data));
    api.get("/accounting/trial-balance").then(({data})=> setTrial(data));
  };
  useEffect(()=>{ load(); },[]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/accounting/expense", form);
      setForm({ date: new Date().toISOString().slice(0,10), amount: 0, memo: "", method:"cash" });
      load();
    } catch (e) { alert(e?.response?.data?.message || "Failed"); }
  };

  return (
    <div className="grid" style={{gap:24}}>
      <form className="card grid cols-3" onSubmit={submit}>
        <input className="input" type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} />
        <input className="input" type="number" step="0.01" placeholder="Amount" value={form.amount} onChange={e=>setForm({...form, amount:Number(e.target.value)})} />
        <input className="input" placeholder="Memo" value={form.memo} onChange={e=>setForm({...form, memo:e.target.value})} />
        <select className="select" value={form.method} onChange={e=>setForm({...form, method:e.target.value})}>
          <option value="cash">Cash</option>
          <option value="bank">Bank</option>
        </select>
        <button className="button">Add Expense</button>
      </form>

      <h3>Transactions</h3>
      <DataTable
        columns={[
          { header:"Date", cell:(r)=> new Date(r.date).toLocaleDateString() },
          { header:"Account", accessorKey:"account" },
          { header:"Type", accessorKey:"type" },
          { header:"Amount", accessorKey:"amount" },
          { header:"Memo", accessorKey:"memo" },
        ]}
        data={tx}
      />

      <h3>Trial Balance</h3>
      <DataTable
        columns={[
          { header:"Account", accessorKey:"account" },
          { header:"Debit", accessorKey:"debit" },
          { header:"Credit", accessorKey:"credit" },
          { header:"Balance", accessorKey:"balance" },
        ]}
        data={trial}
      />
    </div>
  );
}

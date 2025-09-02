import React, { useEffect, useState } from "react";
import api from "../api/client";
import DataTable from "../components/DataTable";

export default function Employees(){
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name:"", phone:"", role:"attendant", salary:0, status:"active" });

  const load = () => api.get("/employees").then(({data})=> setItems(data));
  useEffect(()=>{ load(); },[]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/employees", form);
      setForm({ name:"", phone:"", role:"attendant", salary:0, status:"active" });
      load();
    } catch (e) {
      alert(e?.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="grid" style={{gap:24}}>
      <form className="card grid cols-3" onSubmit={submit}>
        <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <input className="input" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
        <input className="input" placeholder="Role" value={form.role} onChange={e=>setForm({...form, role:e.target.value})} />
        <input className="input" type="number" placeholder="Salary" value={form.salary} onChange={e=>setForm({...form, salary:Number(e.target.value)})} />
        <select className="select" value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
          <option>active</option><option>inactive</option>
        </select>
        <button className="button">Add Employee</button>
      </form>

      <DataTable
        columns={[
          { header:"Name", accessorKey:"name" },
          { header:"Phone", accessorKey:"phone" },
          { header:"Role", accessorKey:"role" },
          { header:"Salary", accessorKey:"salary" },
          { header:"Status", accessorKey:"status" },
        ]}
        data={items}
      />
    </div>
  );
}

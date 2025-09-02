import React, { useEffect, useRef, useState } from "react";
import api from "../api/client";
import DataTable from "../components/DataTable";

export default function Sales(){
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0,10),
    shift: "morning",
    product: "",
    liters: 0,
    pricePerLiter: 0,
    payments: [{ method: "cash", amount: 0 }]
  });
  const filesRef = useRef();

  useEffect(()=>{
    // products are not exposed via route; quick fetch through /sales list to get populated products
    api.get("/sales?limit=1").then(()=>{}).catch(()=>{});
    // Instead, define locally if empty
    api.get("/reports/period-summary?from=2000-01-01&to=2100-01-01").then(()=>{}).catch(()=>{});
    // fallback fetch via a small hack: server doesn't have /products route; set manually
    setProducts([{_id:"PETROL", name:"Petrol", pricePerLiter:130},{_id:"DIESEL", name:"Diesel", pricePerLiter:110},{_id:"OCTANE", name:"Octane", pricePerLiter:135}]);
  },[]);

  useEffect(()=>{
    api.get("/sales").then(({data})=> setSales(data));
  },[]);

  const onProductChange = (id) => {
    const p = products.find(x=>x._id===id);
    setForm({...form, product:id, pricePerLiter: p ? p.pricePerLiter : 0});
  };

  const addPayment = () => setForm({...form, payments:[...form.payments, {method:"cash", amount:0}]});
  const updatePayment = (i, key, val) => {
    const copy = [...form.payments];
    copy[i] = {...copy[i], [key]: key==="amount" ? Number(val) : val};
    setForm({...form, payments: copy});
  };
  const removePayment = (i) => setForm({...form, payments: form.payments.filter((_,idx)=>idx!==i)});

  const total = Number(form.liters) * Number(form.pricePerLiter);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries({ date: form.date, shift: form.shift, product: form.product, liters: form.liters, pricePerLiter: form.pricePerLiter }).forEach(([k,v])=> fd.append(k, v));
    form.payments.forEach((p, i)=> {
      fd.append(`payments[${i}][method]`, p.method);
      fd.append(`payments[${i}][amount]`, p.amount);
    });
    const files = filesRef.current?.files || [];
    for (let i=0;i<files.length;i++) fd.append("files", files[i]);
    try {
      await api.post("/sales", fd, { headers: { "Content-Type": "multipart/form-data" } });
      const { data } = await api.get("/sales");
      setSales(data);
      alert("Sale added");
    } catch (e) {
      alert(e?.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="grid" style={{gap:24}}>
      <form className="card grid cols-3" onSubmit={submit}>
        <div>
          <div>Date</div>
          <input className="input" type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})}/>
        </div>
        <div>
          <div>Shift</div>
          <select className="select" value={form.shift} onChange={e=>setForm({...form, shift:e.target.value})}>
            <option>morning</option><option>evening</option><option>night</option>
          </select>
        </div>
        <div>
          <div>Product</div>
          <select className="select" value={form.product} onChange={e=>onProductChange(e.target.value)}>
            <option value="">Select fuel</option>
            {products.map(p=> <option key={p._id} value={p._id}>{p.name}</option>)}
          </select>
        </div>
        <div>
          <div>Liters</div>
          <input className="input" type="number" step="0.01" value={form.liters} onChange={e=>setForm({...form, liters:e.target.value})}/>
        </div>
        <div>
          <div>Price/Liter</div>
          <input className="input" type="number" step="0.01" value={form.pricePerLiter} onChange={e=>setForm({...form, pricePerLiter:e.target.value})}/>
        </div>
        <div>
          <div>Total</div>
          <div className="badge">৳ {total.toFixed(2)}</div>
        </div>
        <div style={{gridColumn:'1/-1'}}>
          <div>Payments</div>
          <div className="grid cols-3">
            {form.payments.map((p,i)=>(
              <div key={i} className="card grid">
                <select className="select" value={p.method} onChange={e=>updatePayment(i,"method", e.target.value)}>
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="mobile">Mobile</option>
                </select>
                <input className="input" type="number" step="0.01" value={p.amount} onChange={e=>updatePayment(i,"amount", e.target.value)} />
                <button type="button" className="button" onClick={()=>removePayment(i)}>Remove</button>
              </div>
            ))}
          </div>
          <div style={{marginTop:8}}><button type="button" className="button" onClick={addPayment}>+ Add payment</button></div>
        </div>
        <div style={{gridColumn:'1/-1'}}>
          <div>Attachments</div>
          <input type="file" multiple ref={filesRef} />
        </div>
        <div style={{gridColumn:'1/-1', display:'flex', gap:12, justifyContent:'flex-end'}}>
          <button className="button">Submit Sale</button>
        </div>
      </form>

      <DataTable
        columns={[
          { header:"Date", cell:(r)=> new Date(r.date).toLocaleDateString() },
          { header:"Product", cell:(r)=> r.product?.name || r.product },
          { header:"Liters", accessorKey:"liters" },
          { header:"P/L", accessorKey:"pricePerLiter" },
          { header:"Total", accessorKey:"totalAmount" },
          { header:"Shift", accessorKey:"shift" },
        ]}
        data={sales}
      />
    </div>
  );
}

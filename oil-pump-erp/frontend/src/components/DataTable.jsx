import React from "react";
export default function DataTable({ columns = [], data = [] }){
  return (
    <div className="card">
      <table className="table">
        <thead>
          <tr>{columns.map((c,i)=><th key={i}>{c.header}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row, i)=> (
            <tr key={i}>
              {columns.map((c,j)=> <td key={j}>{c.cell ? c.cell(row) : row[c.accessorKey]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

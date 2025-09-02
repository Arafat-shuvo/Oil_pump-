# Oil Pump ERP (MERN)

A minimal but functional ERP scaffold for a fuel/oil pump business.

- **Backend:** Node.js, Express, MongoDB (Mongoose), Multer, JWT Auth
- **Frontend:** React (Vite), Axios, Tailwind-ready (optional)
- **Modules:** Auth, HRM (Employees), Daily Sales, Accounting (Expenses/Transactions), Reports
- **Uploads:** Disk storage via Multer

---

## Quick Start

### 1) Prereqs
- Node 18+ and npm
- MongoDB running locally or a connection string

### 2) Setup backend
```bash
cd backend
cp .env.example .env  # then edit values
npm install
npm run seed          # optional: seeds admin and products
npm run dev           # http://localhost:5000
```

### 3) Setup frontend
```bash
cd frontend
cp .env.example .env  # then edit VITE_API_URL
npm install
npm run dev           # http://localhost:5173
```

### 4) Default login (after seed)
- **email:** admin@erp.local
- **password:** admin123

---

## Folder Structure

```
oil-pump-erp/
  backend/
    .env.example
    package.json
    src/
      app.js
      server.js
      config/
        db.js
        env.js
      middleware/
        auth.js
        errorHandler.js
        upload.js
      models/
        User.js
        Employee.js
        Product.js
        SalesEntry.js
        LedgerEntry.js
      controllers/
        authController.js
        employeeController.js
        salesController.js
        accountingController.js
        reportController.js
        uploadController.js
      routes/
        index.js
        authRoutes.js
        employeeRoutes.js
        salesRoutes.js
        accountingRoutes.js
        reportRoutes.js
        uploadRoutes.js
      utils/
        asyncHandler.js
        ApiError.js
        ApiResponse.js
      seed/seed.js
      uploads/  (auto-created)
  frontend/
    .env.example
    package.json
    index.html
    vite.config.js
    src/
      main.jsx
      App.jsx
      api/client.js
      components/
        Navbar.jsx
        Sidebar.jsx
        StatCard.jsx
        DataTable.jsx
      pages/
        Login.jsx
        Dashboard.jsx
        Sales.jsx
        Employees.jsx
        Accounting.jsx
        Reports.jsx
      styles.css
```

---

## Notes

- This is a compact starter you can extend (inventory, tanks, nozzles, meter readings, payroll, VAT, etc.).
- Report endpoints aggregate daily/period sales and trial balance-like totals.
- All endpoints are **prefixed with `/api`**.
- Uploads are served from `/uploads/*` (disk). For production, consider S3 or Cloud Storage.
- Add HTTPS, rate limits, input validation (Joi/Zod) before production.

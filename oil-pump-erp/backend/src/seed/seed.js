import { connectDB } from "../config/db.js";
import { env } from "../config/env.js";
import { User } from "../models/User.js";
import { Product } from "../models/Product.js";

await connectDB();

const run = async () => {
  console.log("Seeding...");
  await User.deleteMany({});
  await Product.deleteMany({});

  await User.create({
    name: "Admin",
    email: "admin@erp.local",
    password: "admin123",
    role: "admin"
  });

  await Product.insertMany([
    { name: "Petrol", pricePerLiter: 130 },
    { name: "Diesel", pricePerLiter: 110 },
    { name: "Octane", pricePerLiter: 135 }
  ]);

  console.log("✅ Seeded. Default admin: admin@erp.local / admin123");
  process.exit(0);
};

run().catch((e) => { console.error(e); process.exit(1); });

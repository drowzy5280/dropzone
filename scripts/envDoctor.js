// scripts/envDoctor.js
const fs = require("fs");
if (!fs.existsSync(".env")) {
  console.error("❌ .env not found. Create it from the instructions.");
  process.exit(1);
}
const env = Object.fromEntries(
  fs.readFileSync(".env", "utf8")
    .split("\n")
    .filter(Boolean)
    .filter(l => !l.trim().startsWith("#"))
    .map(line => {
      const i = line.indexOf("=");
      if (i === -1) return [line.trim(), ""];
      return [line.slice(0, i).trim(), line.slice(i + 1).trim()];
    })
);
const required = [
  "NEXTAUTH_URL",
  "NEXT_PUBLIC_URL",
  "NEXTAUTH_SECRET",
  "DATABASE_PROVIDER",
  "DATABASE_URL",
  "FORTNITE_API_IO_KEY",
  "FORTNITE_API_COM_KEY",
  "STRIPE_SECRET_KEY",
  "STRIPE_PRICE_ID"
];

let ok = true;
for (const k of required) {
  if (!env[k] || env[k].includes("CHANGE_ME")) {
    console.log(`⚠️  Missing or placeholder: ${k}`);
    ok = false;
  }
}
if (ok) {
  console.log("✅ .env looks good for local dev.");
} else {
  console.log("ℹ️  Fill the missing values above and re-run: pnpm env:doctor");
}

// server.js
import express from "express";
import XLSX from "xlsx";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const fileName = "users.xlsx";

// REGISTER API
app.post("/register", (req, res) => {
  const newUser = req.body;
  let users = [];

  if (fs.existsSync(fileName)) {
    const workbook = XLSX.readFile(fileName);
    const sheet = workbook.Sheets["Sheet1"];
    users = XLSX.utils.sheet_to_json(sheet);
  }

  // prevent duplicate emails
  const exists = users.find(u => u.email === newUser.email);
  if (exists) {
    return res.send("Email already registered");
  }

  users.push(newUser);

  const newSheet = XLSX.utils.json_to_sheet(users);
  const newBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(newBook, newSheet, "Sheet1");

  XLSX.writeFile(newBook, fileName);

  res.send("User saved to Excel");
});

// LOGIN API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!fs.existsSync(fileName)) {
    return res.send("No users found. Please register first.");
  }

  const workbook = XLSX.readFile(fileName);
  const sheet = workbook.Sheets["Sheet1"];
  const users = XLSX.utils.sheet_to_json(sheet);

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.send("Login Successful");
  } else {
    res.send("Invalid Credentials");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
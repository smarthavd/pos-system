const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const db = new sqlite3.Database("database.db");

db.run(`
CREATE TABLE IF NOT EXISTS products(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT,
 price REAL,
 stock INTEGER
)
`);

app.post("/login",(req,res)=>{
 if(req.body.username==="admin" && req.body.password==="1234"){
   res.json({success:true});
 }else{
   res.json({success:false});
 }
});

app.post("/products",(req,res)=>{
 const {name,price,stock}=req.body;
 db.run("INSERT INTO products(name,price,stock) VALUES(?,?,?)",
 [name,price,stock]);
 res.json({msg:"Added"});
});

app.get("/products",(req,res)=>{
 db.all("SELECT * FROM products",(e,rows)=>{
  res.json(rows);
 });
});

app.put("/products/:id",(req,res)=>{
 const {name,price,stock}=req.body;
 db.run("UPDATE products SET name=?,price=?,stock=? WHERE id=?",
 [name,price,stock,req.params.id]);
 res.json({msg:"Updated"});
});

app.delete("/products/:id",(req,res)=>{
 db.run("DELETE FROM products WHERE id=?",[req.params.id]);
 res.json({msg:"Deleted"});
});

app.listen(3000,()=>console.log("Server running"));
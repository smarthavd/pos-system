const API="http://localhost:3000/products";

function load(){
fetch(API)
.then(r=>r.json())
.then(data=>{
const list=document.getElementById("list");
list.innerHTML="";
data.forEach(p=>{
list.innerHTML+=`
<li>
${p.name} ₱${p.price} (${p.stock})
<button onclick="del(${p.id})">Delete</button>
</li>`;
});
});
}

function add(){
fetch(API,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
name:name.value,
price:price.value,
stock:stock.value
})
}).then(load);
}

function del(id){
fetch(API+"/"+id,{method:"DELETE"})
.then(load);
}

load();
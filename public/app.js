const API="http://localhost:3000/products";
let cart=[];

function loadProducts(){
fetch(API)
.then(r=>r.json())
.then(data=>{
const div=document.getElementById("products");
div.innerHTML="";
data.forEach(p=>{
div.innerHTML+=`
<button onclick='addToCart(${JSON.stringify(p)})'>
${p.name}<br>₱${p.price}
</button>`;
});
});
}

function addToCart(product){
const found=cart.find(i=>i.id===product.id);
if(found){found.qty++;}
else{cart.push({...product,qty:1});}
renderCart();
}

function renderCart(){
const ul=document.getElementById("cart");
ul.innerHTML="";
let total=0;

cart.forEach(item=>{
total+=item.price*item.qty;
ul.innerHTML+=`
<li>${item.name} x${item.qty}
<button onclick="remove(${item.id})">❌</button>
</li>`;
});

document.getElementById("total").innerText=total;
}

function remove(id){
cart=cart.filter(i=>i.id!==id);
renderCart();
}

function checkout(){
alert("Sale saved ₱"+document.getElementById("total").innerText);
cart=[];
renderCart();
}

loadProducts();

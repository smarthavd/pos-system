// api/products.js
export default function handler(req, res) {
  // Example static data
  const products = [
    { id: 1, name: "Coke", price: 20, stock: 10 },
    { id: 2, name: "Bread", price: 15, stock: 5 }
  ];
  res.status(200).json(products);
}
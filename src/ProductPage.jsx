import { useState, useEffect } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import { useCart } from './CartStore';
import { useLocation } from 'wouter';
import { useFlashMessage } from './FlashMessageStore';



export default function ProductPage() {

  const [ products, setProducts ] = useState([]);
  const {addToCart} = useCart();
  const [_,setLocation] = useLocation();
  const { showFlashMessage} = useFlashMessage();
  

  const handleAddToCart = (product) => {
    addToCart(product);
    showFlashMessage("Product added to cart", "success");
    setLocation("/ShoppingCart");
}

  useEffect(() => {
      try {
        const fetchProducts = async () => {
        const response = await axios.get(import.meta.env.VITE_API_URL + "/api/products");
        setProducts(response.data);
        } 
        fetchProducts();
       } catch (e) {
      console.log("error",e);
      }
      },[]);

  return (
    <>
      <div className="container mt-5">
        <h1>Our Products</h1>
      </div>
      <div className="row">
      {
          products.map(p => (
            <div key={p.id} className="col-md-4 mb-4">
              <ProductCard
                image={p.image}
                name={p.name}
                price={p.price.toFixed(2)}
                onAddToCart={()=>{
                  handleAddToCart(p)
                }}
              />
            </div>
          )
          )
        }
      </div>
    </>
  )
}
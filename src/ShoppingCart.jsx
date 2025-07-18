import React, { useEffect } from 'react'
import { useCart } from './CartStore'
import { userEffect } from 'react'
import axios from 'axios'

const ShoppingCart = () => {

    const { cart, getCartTotal, modifyQuantity, removeCart, fetchRemoteCart } = useCart();

    useEffect(()=>{
        fetchRemoteCart();
    },[])

    return <div className="container mt-4" >
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
            <p> Your Cart Is Empty</p>
        ) : (
            <>
                <ul className="list-group">
                    {cart.map((item => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <img src={item.image_url} />
                                <h5>{item.product_name}</h5>

                                <div className="d-flex align-items-center">
                                    <button className="btn btn-sm btn-secondary me-2"
                                        onClick={() => {
                                            modifyQuantity(item.product_id, item.quantity - 1)
                                        }}>-</button>
                                    <p className="m-3">Quantity: {item.quantity}</p>
                                    <button className="btn btn-sm btn-secondary me-2"
                                        onClick={() => {
                                            modifyQuantity(item.product_id, item.quantity + 1)
                                        }}>+</button>
                                </div>
                                <div>
                                    <button className="btn btn-sm btn-danger m-2"
                                    onClick={() => { 
                                        removeCart(item.product_id)
                                    }}>
                                        Remove
                                    </button>

                                </div>


                            </div>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    )))}
                </ul>
                <div className="mt-3 mb-3 text-end">
                    <h4>Total: ${getCartTotal()}</h4>
                </div>
            </>
        )
        }
    </div>
}

export default ShoppingCart;

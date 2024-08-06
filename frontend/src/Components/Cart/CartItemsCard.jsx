import React, { useEffect } from 'react'
import "../../Styles/CartItemsCard.css"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {removeFromCart} from "../../actions/CartActions"

const CartItemsCard = ({item,setnoOfItems}) => {
  const dispacth = useDispatch();
  const Remove = (id)=>{
    dispacth(removeFromCart(id));
  }
  const {cartItems}= useSelector(state=>state.Cart);
  
  useEffect(() => {
    setnoOfItems(cartItems.length);

  }, [cartItems.length,cartItems])
  
  return (
    <div className="CartItemsCard">
      <img src={item.image} alt="lop" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>Price:₹{item.price}</span>
        <p onClick={()=>{Remove(item.product)}}>Remove</p>
      </div>
    </div>
  )
}

export default CartItemsCard

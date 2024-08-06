import React, { useEffect } from 'react'
import "../../Styles/Cart.css"
import CartItemsCard from './CartItemsCard'
import {useDispatch,useSelector} from "react-redux"; 
import { addItemsToCart } from '../../actions/CartActions';
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart"
import {Link,useNavigate} from "react-router-dom"
import { Typography } from '@material-ui/core';

const Cart = ({setnoOfItems}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {cartItems} = useSelector(state=>state.Cart);

  const incQuantity = (id,qunatity,stock)=>{
    if(stock<=qunatity){
      return ;
    }
    dispatch(addItemsToCart(id,qunatity+1));
  }

  const decQuantity = (id,qunatity,stock)=>{
    if(qunatity<=1){
      return ;
    }
    dispatch(addItemsToCart(id,qunatity-1));
  }

  useEffect(() => {
    setnoOfItems(cartItems.length);
  }, [cartItems.length]);
  
  const chcekOutHandler = ()=>{
    navigate("/login?redirect=/shipping")
  }
  return (
    <>{cartItems.length === 0?<div className="emptyCart">
      <RemoveShoppingCartIcon/>
      <Typography>No Product in your Cart</Typography>
      <Link to = "/">Go to Home</Link>
    </div>:<>
    <div className="cartPage">
        <div className="cartHeader">
            <p>Product</p>
            <p>Quantity</p>
            <p>subTotal</p>
        </div>
        {cartItems.map((item)=>{
          return <div className="cartContainer">
            <CartItemsCard setnoOfItems={setnoOfItems} item={item} key={item.product}/>
              <div className="cartInput">
                <button onClick={()=>{decQuantity(item.product,item.qunatity,item.stock)}}>-</button>
                <input type="number" value={item.qunatity} readOnly/>
                <button onClick={()=>{incQuantity(item.product,item.qunatity,item.stock)}}>+</button>
              </div>
              <p className="cartSubtotal">
              ₹{item.price*item.qunatity}
              </p>
            </div>
        })}
        <div className="cartGrossTotal">
          <div></div>
          <div className="cartGrossTotalBox">
            <p>Gross Total</p>
            <p>{`₹${cartItems.reduce((total,item)=>total+item.qunatity*item.price,0)}`}</p>
          </div>
          <div></div>
          <div className='checkOutBtn'>
            <button onClick={chcekOutHandler}>Check Out</button>
          </div>
        </div>
    </div>
    </>}
    </>
  )
}

export default Cart

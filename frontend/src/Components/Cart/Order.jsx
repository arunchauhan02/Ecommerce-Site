import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import Metadata from '../Layout/Metadata';
import CheckOutSteps from './CheckOutSteps';
import { Typography } from '@material-ui/core';
import { Link,useNavigate } from 'react-router-dom';
import "./Order.css"


const Order = () => {

    const {cartItems,shippingInfo} = useSelector(state=>state.Cart);
    const {user} = useSelector(state=>state.user);
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((acc,item)=>acc+item.qunatity*item.price,0);

    const shippingCharges = subtotal>1000?200:0;

    const tax = subtotal*0.18;

    const totalPrice = subtotal+tax+shippingCharges;

    const address = `${shippingInfo.address} , ${shippingInfo.city} , ${shippingInfo.state} , ${shippingInfo.pinCode} , ${shippingInfo.country}`

    const proceedToPayment = ()=>{
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice
        }

        sessionStorage.setItem("orderInfo",JSON.stringify(data));
        navigate("/process/payment")
    }
  return (
    <div className='OrderSection'>
      <Metadata title={"Confirm Order"}/>
      <CheckOutSteps activeSteps={1}/>
      <div className='confirmOrderPage'>
        <div>
            <div className="confirmShippingArea">
                <Typography>Shipping Info</Typography>
                <div className="confirmShippingAreaBox">
                    <div>
                        <p>Name:</p>
                        <span>{user.name}</span>
                    </div>
                    <div>
                        <p>Phone:</p>
                        <span>{shippingInfo.phoneNo}</span>
                    </div>
                    <div>
                        <p>Address:</p>
                        <span>{address}</span>
                    </div>
                </div>
            </div>
            <div className="confirmCartItems"> 
            <Typography>Your Cart Items</Typography>
                <div className='confirmCartItemsContainer'>
                    {cartItems && cartItems.map((item)=>{
                        return <div key={item.product} >
                            <img src={item.image} alt="#" />
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                            <span>
                                {item.qunatity} X {item.price} = <b>₹{item.qunatity*item.price}</b>
                            </span>
                        </div>
                    })}
                </div>
            </div>
        </div>
        <div>
            <div className="orderSummary">
                <Typography>Order Summary</Typography>
                <div>
                    <div>
                        <p>Subtotal</p>
                        <span>₹{subtotal}</span>
                    </div>
                    <div>
                        <p>Shipping Charges:</p>
                        <span>₹{shippingCharges}</span>
                    </div>
                    <div>
                        <p>GST :</p>
                        <span>₹{tax}</span>
                    </div>

                </div>
                <div className="orderSummaryTotal">
                    <p><b>Total</b></p>
                    <span>₹{totalPrice}</span>
                </div>

                <button onClick={proceedToPayment}>Proceed To Payment</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Order

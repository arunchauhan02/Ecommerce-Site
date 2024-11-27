import React,{useRef,useEffect,useState} from 'react'
import {CardNumberElement,CardCvcElement,CardExpiryElement,useStripe,Elements, useElements} from '@stripe/react-stripe-js'
import CreditCardIcon from "@material-ui/icons/CreditCard"
import EventIcon from "@material-ui/icons/Event"
import VpnKeyIcon from "@material-ui/icons/VpnKey"
import "../Cart/Payment.css"
import Metadata from "../Layout/Metadata"
import CheckOutSteps from "../Cart/CheckOutSteps"
import { Typography } from '@material-ui/core'
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios'
import { useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom";
import { createOrder } from '../../actions/OrderAction'
import {useDispatch} from "react-redux";

const BuySingleItemPayment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const payBtn = useRef();
  const stripe = useStripe();
  const element = useElements();

  const {user} = useSelector(state=>state.user);
  const {shippingInfo,productSell} = useSelector(state=>state.BuySingleItem);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const baseUrl = "https://lop-1.onrender.com";

  const PaymentData = {
    amount:Math.round(orderInfo.totalPrice*100)
  }
  PaymentData["token"] = localStorage.getItem("Token");

  const order = {
    shippingInfo,
    orderItems:[productSell],
    itemsPrice:orderInfo.subtotal,
    taxPrice:orderInfo.tax,
    shippingPrice:orderInfo.shippingCharges,
    totalPrice:orderInfo.totalPrice

  }

  const submitHandler = async(e)=>{
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const config = {
        headers:{
          "Content-Type":"application/json",
        }
      }
      const {data} = await axios.post(
        `${baseUrl}/api/v1/payment/process`,PaymentData,config
      );

      const clien_secret = data.client_secret;
      if(!stripe || !element){
        return ;
      }
      order["token"] = localStorage.getItem("Token");
      const result = await stripe.confirmCardPayment(clien_secret,{
        payment_method:{
          card:element.getElement(CardNumberElement),
          billing_details:{
            name:user.name,
            email:user.email,
            address:{
              line1:shippingInfo.address,
              city:shippingInfo.city,
              state:shippingInfo.state,
              country:shippingInfo.country,
              postal_code:shippingInfo.pinCode
            }
          }
        }
      });
      console.log(result);

      if(result.error){
        payBtn.current.disabled = false;

      }else{
        if(result.paymentIntent.status === "succeeded"){
          order.paymentInfo = {
            id:result.paymentIntent.id,
            status:result.paymentIntent.status
          }
          dispatch(createOrder(order))
          navigate("/success");
        }
        else{

        }
      }
      
    } catch (error) {
      payBtn.current.disabled = false;
    }
  }


  return (
    <div className='OrderSection'>
      <Metadata title={"Payment"} />
      <CheckOutSteps activeSteps={2}/>
      <div className="paymentContainer">
        <form action="" className="paymentForm" onSubmit={(e)=>{submitHandler(e)}}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon/>
              <CardNumberElement className='paymentInput'/>
          </div>

          <div>
            <EventIcon/>
              <CardExpiryElement className='paymentInput'/>
          </div>

          <div>
            <VpnKeyIcon/>
              <CardCvcElement className='paymentInput'/>
          </div>

          <input type="submit" value={`Pay - ${orderInfo && orderInfo.totalPrice}`} ref={payBtn} className='paymentInfoBtn'/>
        </form>
      </div>
    </div>
  )
}

export default BuySingleItemPayment

import React,{useState,useEffect} from 'react'
import { Elements } from '@stripe/react-stripe-js';
import BuySingleItemPayment from './BuySingleItemPayment';
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
const baseUrl = "https://lop-1.onrender.com";

const BuySingleItemPaymentWrap = () => {
    const [stripeApiKey, setstripeApiKey] = useState("");
    console.log(stripeApiKey);

  async function getStripeApiKey(){
   const {data} = await axios.post(`${baseUrl}/api/v1/stripeapikey`);
    setstripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    getStripeApiKey();
  }, [])

  return (
    <div>
        {stripeApiKey && <Elements stripe={loadStripe(stripeApiKey)}>
        <BuySingleItemPayment/>
      </Elements>}
    </div>
  )
}

export default BuySingleItemPaymentWrap



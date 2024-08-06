import React,{useState,useEffect} from 'react'
import { Elements } from '@stripe/react-stripe-js';
import BuySingleItemPayment from './BuySingleItemPayment';
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';

const BuySingleItemPaymentWrap = () => {
    const [stripeApiKey, setstripeApiKey] = useState("");

  async function getStripeApiKey(){
   const {data} = await axios.get("/api/v1/stripeapikey");
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



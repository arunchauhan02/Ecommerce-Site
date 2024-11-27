import React,{useState,useEffect} from 'react'
import { Elements } from '@stripe/react-stripe-js';
import Payment from './Payment';
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
const baseUrl = "https://lop-1.onrender.com";

const PaymentWrap = () => {
    const [stripeApiKey, setstripeApiKey] = useState("");

  async function getStripeApiKey(){
    const config = {
      headers:{"Content-Type":"appliaction/json"}
    }
    let token = localStorage.getItem("Token");
    console.log(token)
    const {data} = await axios.post(`${baseUrl}/api/v1/stripeapikey`,{token},config);
    setstripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    getStripeApiKey();
  }, [])

  return (
    <div>
      {stripeApiKey && <Elements stripe={loadStripe(stripeApiKey)}>
        <Payment/>
      </Elements>
      }
    </div>
  )
}

export default PaymentWrap

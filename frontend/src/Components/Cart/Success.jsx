import React from 'react'
import { MdVerified } from "react-icons/md";
import "./Success.css"


const Success = () => {
  return (
    <div className='success'>
        <div>
            <MdVerified/>
            <h2>
            Payment Successful
            </h2>
        </div>
      
    </div>
  )
}

export default Success

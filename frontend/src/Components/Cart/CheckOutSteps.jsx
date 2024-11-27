import { StepLabel, Stepper, Typography,Step } from '@material-ui/core';
import LocalShippingIcon from "@material-ui/icons/LocalShipping"
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck"
import AccountBalanceIcon from "@material-ui/icons/AccountBalance"
import React from 'react'

const CheckOutSteps = ({activeSteps}) => {
    const steps = [
        {
            label:<Typography>Shipping Details</Typography>,
            icon:<LocalShippingIcon/>
        },
        {
            label:<Typography>Confirm Order</Typography>,
            icon:<LibraryAddCheckIcon/>
        },
        {
            label:<Typography>Payment</Typography>,
            icon:<AccountBalanceIcon/>
        },  
    ];
    const stepstyle = {
        boxSizing:"border-box"
    }
  return (
    <div>
        {/* <AccountBalanceIcon/> */}
      <Stepper alternativeLabel activeStep={activeSteps} style={stepstyle}>
        {
            steps.map((item,index)=>{
                return <Step key={index} active={activeSteps === index?true:false} 
                completed={activeSteps>=index?true:false} >
                    <StepLabel style={{color:activeSteps>=index?"#c23dc2":"rgba(0,0,0,0.69)"}} icon={item.icon}>{item.label}</StepLabel>
                </Step>
            })
        }
      </Stepper>
    </div>
  )
}

export default CheckOutSteps

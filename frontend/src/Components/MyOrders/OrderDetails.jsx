import React, { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { OrderDetailsp } from '../../actions/OrderAction';
import {useParams} from "react-router-dom";
import Metadata from "../Layout/Metadata";
import Loader from "../Loader/Loader"
import { Typography } from '@material-ui/core';
import {Link} from 'react-router-dom';
import "./OrderDetails.css";

export const OrderDetails = () => {

  const dispatch = useDispatch();
  const params = useParams(); 
  
  useEffect(() => {
    dispatch(OrderDetailsp(params.id));
  }, [params.id])
  
  const {loading,order,error} = useSelector(state=>state.OrderDetails);
  
  return (
    <div>
      <Metadata title={"Order Details"}/>
      {
        loading != false?<Loader/>:<>
        <div className="orderDetailsPage">
          <div className="orderDetailsContainer">
          <Typography component={'h1'}>
            Order #{order && order._id}
          </Typography>
          <Typography>Shipping Info</Typography>
          <div className="orderDetailsContainerBox">
            <div>
              <p>Name :</p>
              <span>{order && order.user && order.user.name}</span>
            </div>
            <div>
              <p>Phone :</p>
              <span>{order && order.shippingInfo && order.shippingInfo.phoneNo}</span>
            </div>
            <div>
              <p>Address :</p>
              <span>{
                order && order.shippingInfo &&
                `${order.shippingInfo.address} , 
                ${order.shippingInfo.city} , 
                ${order.shippingInfo.state} , 
                ${order.shippingInfo.pinCode} , 
                ${order.shippingInfo.country}`
              }</span>
            </div>
          </div>
            <Typography>Payment</Typography>
            <div className="orderDetailsContainerBox">

              <div>
                <p className={order && order.paymentInfo && order.paymentInfo.status === "succeeded"?"greenColor":"redColor"}>
                  {order && order.paymentInfo && order.paymentInfo.status === "succeeded"?"PAID":"NOT PAID"}
                </p>
              </div>

              <div>
                <p>Amount:</p>
                <span>
                 ₹ {order && order.totalPrice}
                </span>
              </div>


            </div>
              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p className={order && order.orderStatus === "Delivered"? "greenColor":"redColor"}>
                    {order && order.orderStatus}
                  </p>
                </div>
              </div>
          </div>
          </div>
          <div className='orderItems'>

            <h1 className="orderedItemsHeading">Order Items</h1>
            <div className="orderDetailsCartItemsContainer">
              {
                order && order.orderItems && order.orderItems.map((item)=>{
                  return <div key={item.product} >
                            <img src={item.image} alt="#" />
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                            <span>
                                {item.qunatity} X {item.price} = <b>₹{item.qunatity*item.price}</b>
                            </span>
                        </div>
                })
              }
          </div>
        </div>
        </>
      }

    </div>
  )
}

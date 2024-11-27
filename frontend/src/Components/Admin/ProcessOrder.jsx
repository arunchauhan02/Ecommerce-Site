import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import Metadata from "../Layout/Metadata";
import Sidebar from "./Sidebar";
import Loader from "../Loader/Loader";
import {useParams} from 'react-router-dom';
import { OrderDetailsp,ClearErros, updateOrder} from "../../actions/OrderAction";
import { UPDATE_ORDER_RESET } from "../../constants/OrderConstants";
import './ProcessOrder.css'

const ProcessOrder = () => {

    const {order,error,loading} = useSelector(state=>state.OrderDetails);
    const {error:updateError,isUpdated} = useSelector(state=>state.order);
    const params = useParams();


    const [status, setStatus] = useState("");

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("status", status);
        myForm.set("token",localStorage.getItem("Token"));
    
        dispatch(updateOrder(params.id, myForm));
      };

    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
          dispatch(ClearErros());
        }
        if (updateError) {
          dispatch(ClearErros());
        }
        if (isUpdated) {
          dispatch({ type: UPDATE_ORDER_RESET });
        }
    
        dispatch(OrderDetailsp(params.id));
      }, [dispatch, error, params.id, isUpdated, updateError]);

    return (
        <Fragment>
          <Metadata title="Process Order" />
          <div className="dashboard">
            <Sidebar />
            <div className="newProductContainer">
              {loading ? (
                <Loader />
              ) : (
                <div
                  className="confirmOrderPage"
                  style={{
                    display: order &&  order.orderStatus === "Delivered" ? "block" : "grid",
                  }}
                >
                  <div>
                    <div className="confirmshippingArea">
                      <Typography>Shipping Info</Typography>
                      <div className="orderDetailsContainerBox">
                        <div>
                          <p>Name:</p>
                          <span>{order && order.user && order.user.name}</span>
                        </div>
                        <div>
                          <p>Phone:</p>
                          <span>
                            {order && order.shippingInfo && order.shippingInfo.phoneNo}
                          </span>
                        </div>
                        <div>
                          <p>Address:</p>
                          <span>
                            {order && order.shippingInfo &&
                              `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                          </span>
                        </div>
                      </div>
    
                      <Typography>Payment</Typography>
                      <div className="orderDetailsContainerBox">
                        <div>
                          <p
                            className={order && 
                              order.paymentInfo &&
                              order.paymentInfo.status === "succeeded"
                                ? "greenColor"
                                : "redColor"
                            }
                          >
                            {order && order.paymentInfo &&
                            order.paymentInfo.status === "succeeded"
                              ? "PAID"
                              : "NOT PAID"}
                          </p>
                        </div>
    
                        <div>
                          <p>Amount:</p>
                          <span>{order && order.totalPrice && order.totalPrice}</span>
                        </div>
                      </div>
    
                      <Typography>Order Status</Typography>
                      <div className="orderDetailsContainerBox">
                        <div>
                          <p
                            className={order && 
                              order.orderStatus && order.orderStatus === "Delivered"
                                ? "greenColor"
                                : "redColor"
                            }
                          >
                            {order && order.orderStatus && order.orderStatus}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="confirmCartItems">
                      <Typography>Your Cart Items:</Typography>
                      <div className="confirmCartItemsContainer">
                        {order && order.orderItems &&
                          order.orderItems.map((item) => (
                            <div key={item.product}>
                              <img src={item.image} alt="Product" />
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>{" "}
                              <span>
                                {item.qunatity} X ₹{item.price} ={" "}
                                <b>₹{item.price * item.qunatity}</b>
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div
                    style={{
                      display: order &&  order.orderStatus === "Delivered" ? "none" : "block",
                    }}
                  >
                    <form
                      className="updateOrderForm"
                      onSubmit={updateOrderSubmitHandler}
                    >
                      <h1>Process Order</h1>
    
                      <div>
                        <AccountTreeIcon />
                        <select onChange={(e) => setStatus(e.target.value)}>
                          <option value="">Choose Category</option>
                          {order && order.orderStatus === "Processing" && (
                            <option value="Shipped">Shipped</option>
                          )}
    
                          {order && order.orderStatus === "Shipped" && (
                            <option value="Delivered">Delivered</option>
                          )}
                        </select>
                      </div>
    
                      <Button
                        id="createProductBtn"
                        type="submit"
                        disabled={
                          loading ? true : false || status === "" ? true : false
                        }
                      >
                        Process
                      </Button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Fragment>
  )
}

export default ProcessOrder

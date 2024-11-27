import React,{useEffect} from 'react'
import Sidebar from './Sidebar'
import "./Dashboard.css"
import Metadata from '../Layout/Metadata';
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from 'react-router-dom';
import { getAdminProducts } from '../../actions/ProductAction';
import { getAllUsers } from '../../actions/UserAction';
import { getAllOrders } from '../../actions/OrderAction';

const Dashboard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);


  let outOfStock = 0;
  let noOfProducts = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
      noOfProducts += 1;
    });
  

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllUsers());
    dispatch(getAllOrders());
  }, [dispatch]);

  let totalAmount = 0;

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 4000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, noOfProducts - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <Metadata title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{noOfProducts}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard

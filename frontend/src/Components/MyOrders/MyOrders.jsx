import React from 'react'
import "./MyOrders.css";
import {useDispatch,useSelector} from 'react-redux';
import { useEffect,useState } from 'react';
import {ClearErros, MyOrdersp} from "../../actions/OrderAction";
import {DataGrid} from "@material-ui/data-grid"
import Metadata from '../Layout/Metadata';
import Loader from '../Loader/Loader';
import { TableSortLabel, Typography } from '@material-ui/core';
import {Link} from 'react-router-dom'
import LaunchIcon from '@mui/icons-material/Launch';

const MyOrders = () => {

  const dispatch = useDispatch();
  const [first, setfirst] = useState();

  const {loading,error,orders} = useSelector(state=>state.MyOrder);
  const {user} = useSelector(state=>state.user);

  const columns = [
    {field:'id',headerName:"Order ID",minwidth:300,flex:1},
    {
      field:'status',
      headerName:"status",
      minwidth:150,
      flex:0.5,
      cellClassName:(params)=>{
        return params.getValue(params.id,"status") === "Delivered"?
        "greenColor":"redColor"
      }
    },
    {
      field:"itemsQty",
      headerName:"item Qty",
      minwidth:150,
      flex:0.3,
    },
    {
      field:"amount",
      headerName:"Amount",
      type:"number",
      minwidth:270,
      flex:0.5
    },
    {
      field:"action",
      headerName:"Action",
      type:"number",
      minwidth:270,
      flex:0.5,
      sortable:false,
      renderCell:(params)=>{
        return(
          <Link to={`/order/${params.getValue(params.id,"id")}`}>
            <LaunchIcon/>
          </Link>
        )
      }
    }
  ];

  const rows = []

  orders && orders.forEach((item,index)=>{
    rows.push(
      {itemsQty:item.orderItems.length,
        id:item._id,
        status:item.orderStatus,
        amount:item.totalPrice,
      }
    )
  })
  useEffect(() => {
    if(error){
      dispatch(ClearErros());
    }

    dispatch(MyOrdersp());
  }, [dispatch])
  

  return (
    <div className='MyOrdersBox'>
      <h1>My Orders</h1>
      {
        loading?<Loader/>:<div>
          <DataGrid rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
          className='MyOrdersTable'/>
          <Typography></Typography>
        </div>
      }
    </div>
  )
}

export default MyOrders

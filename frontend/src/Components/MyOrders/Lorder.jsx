import React from 'react';
import { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import {ClearErros, MyOrdersp} from "../../actions/OrderAction";

import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import "./MyOrders.css";
import Loader from '../Loader/Loader';



function Lorder() {
    const {loading,error,orders} = useSelector(state=>state.MyOrder);
    const dispatch = useDispatch();

    console.log(window.screen.width)

    useEffect(() => {
      if(error){
        dispatch(ClearErros());
      }
  
      dispatch(MyOrdersp());
    }, [dispatch])

    const columns = [
      { 
        field: 'id', 
        headerName: 'Order ID', 
        width: window.screen.width<1500?200:280, 
        headerClassName: 'header-black'
      },
      { 
        field: 'amount', 
        headerName: 'Amount', 
        width: window.screen.width<1200?190:280, 
        headerClassName: 'header-black' 
      },
      { 
        field: 'status', 
        headerName: 'Status', 
        width: window.screen.width<1200?200:280, 
        headerClassName: 'header-black' ,
        cellClassName:(params)=>{
            return params.value === "Delivered"?
            "greenColor":"redColor"
          }
      },
      { 
        field: 'itemsQty', 
        headerName: 'ItemsQty', 
        width: window.screen.width<1200?100:180, 
        headerClassName: 'header-black' 
      },
      {
        field: 'action',
        headerName: 'Action',
        width: window.screen.width<1200?150:220,
        headerClassName: 'header-black',
        renderCell: (params) => (
            <Link to={`/order/${params.id}`}>
                <strong className='veiwOrderBtn'>
                    <Button
                        style={{marginLeft: 10}}
                    >
                    View
                    <LaunchIcon/>
                    </Button>
                </strong>
            </Link>
        ),
      },
    ];
    const rows = [
    ];
    orders && orders.forEach((item,index)=>{
        rows.push({
            id:item._id,
            amount:item.totalPrice,
            status:item.orderStatus,
            itemsQty:item.orderItems.length,
          })
      })
  return (
    <div className='MyOrdersBox' style={{ }}>
      <h1>My Orders</h1>
      {
        loading?<Loader/>:
      <DataGrid className='MyOrdersTable '
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        sx={{
          '& .header-black': {
            color: '#000000', // Black text color
            fontWeight: 'bold',
          },
        }}
      />
      }
    </div>
  );
}

export default Lorder;

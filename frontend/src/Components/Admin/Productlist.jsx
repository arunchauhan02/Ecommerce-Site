import React,{useEffect,Fragment} from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {getAdminProducts,ClearErros,deleteProduct
} from "../../actions/ProductAction";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import Metadata from '../Layout/Metadata';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import "./Productlist.css";
import { DELETE_PRODUCT_RESET } from '../../constants/ProductConstant1';
import { toast } from 'react-toastify';

const Productlist = () => {

    const dispatch = useDispatch();

    const {products,error} = useSelector(state=>state.products);

    const navigate = useNavigate();

    const { error: deleteError, isDeleted } = useSelector(
      (state) => state.Product
    );

    useEffect(() => {

        if(error){
            dispatch(ClearErros());
        }

        if(deleteError){
          dispatch(ClearErros());
        }

        if(isDeleted){
          //navigate("/admin/dashboard");
          toast.success('Product Delted Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          dispatch({type:DELETE_PRODUCT_RESET});
        }
        dispatch(getAdminProducts());
    }, [dispatch,error,deleteError,isDeleted]);

    const deleteProductHandler = (id) => {
      dispatch(deleteProduct(id));
    };
    


    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    
        {
          field: "name",
          headerName: "Name",
          minWidth: 320,
          flex: 0.6,
        },
        {
          field: "stock",
          headerName: "Stock",
          type: "number",
          minWidth: 150,
          flex: 0.3,
        },
    
        {
          field: "price",
          headerName: "Price",
          type: "number",
          minWidth: 270,
          flex: 0.5,
        },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Fragment>
                <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </Link>
    
                <Button
                  onClick={() =>
                    deleteProductHandler(params.getValue(params.id, "id"))
                  }
                >
                  <DeleteIcon />
                </Button>
              </Fragment>
            );
          },
        },
      ];

      const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });


  return (
    <Fragment>
      <Metadata title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  )
}

export default Productlist

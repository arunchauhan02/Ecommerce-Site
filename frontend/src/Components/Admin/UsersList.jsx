import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Metadata from "../Layout/Metadata";
import Sidebar from "./Sidebar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link,useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, deleteUser, getAllUsers } from "../../actions/UserAction";
import { DELETE_USER_RESET } from "../../constants/UserConstant";

const UsersList = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, users } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);


    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
      };

      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (deleteError) {
          dispatch(clearErrors());
        }
    
        if (isDeleted) {
          navigate("/admin/users");
          dispatch({ type: DELETE_USER_RESET });
        }
    
        dispatch(getAllUsers());
      }, [dispatch, alert, error, deleteError, isDeleted, message]);
    

    const columns = [
        { field: "id", headerName: "User ID", minWidth: 180, flex: 0.7 },
    
        {
          field: "email",
          headerName: "Email",
          minWidth: 200,
          flex: 0.8,
        },
        {
          field: "name",
          headerName: "Name",
          minWidth: 150,
          flex: 0.3,
        },
    
        {
          field: "role",
          headerName: "Role",
          type: "number",
          minWidth: 150,
          flex: 0.3,
          cellClassName: (params) => {
            return params.getValue(params.id, "role") === "admin"
              ? "greenColor"
              : "redColor";
          },
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
                <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </Link>
    
                <Button
                  onClick={() =>
                    deleteUserHandler(params.getValue(params.id, "id"))
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

      users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
        <Fragment>
          <Metadata title={`ALL USERS - Admin`} />
    
          <div className="dashboard">
            <Sidebar />
            <div className="productListContainer">
              <h1 id="productListHeading">ALL USERS</h1>
    
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

export default UsersList

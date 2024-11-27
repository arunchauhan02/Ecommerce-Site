import React from 'react'
import { Link } from 'react-router-dom';
import {TreeView,TreeItem} from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import PeopleIcon from "@material-ui/icons/People"
import ListAllIcon from "@material-ui/icons/ListAlt"
import PostAddIcon from "@material-ui/icons/PostAdd"
import RateReviewIcon from "@material-ui/icons/RateReview";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddIcon from "@material-ui/icons/Add";
import "./Slidebar.css"

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={"/"}>
            {/* <img src={logo} alt="" /> */}
        </Link>
        <Link to={"/admin/dashboard"}>
            <p>
                <DashboardIcon/> Dashboard
            </p>
        </Link>
        <Link>
        <TreeView
        defaultCollapseIcon = {<ExpandMoreIcon/>}
        defaultExpandIcon = {<ImportExportIcon/>}>

            <TreeItem nodeId='1' label= "Products">

                <Link to={"/admin/products"}>
                <TreeItem nodeId='2' label="All" icon={<PostAddIcon/>}/>
                </Link>

                <Link to={"/admin/product"}>
                    <TreeItem nodeId='3' label="Create" icon={<AddIcon/>}/>
                </Link>
            </TreeItem>

        </TreeView>
        </Link>
        <Link to={"/admin/orders"}>
        <p>
            <ListAllIcon/> Orders
        </p>
        </Link>
        <Link to={"/admin/users"}>
        <p>
            <PeopleIcon/> Users
        </p>
        </Link>

        <Link to={"/admin/reviews"}>
            <p>
                <RateReviewIcon/> Reviews
            </p>
        </Link>
      
    </div>
  )
}

export default Sidebar

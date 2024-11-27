import React from 'react';
import Dashboard from './Dashboard.jsx';
import Private from './Private.jsx';
import { useSelector,useDispatch } from 'react-redux';
import { Outlet,useNavigate,Navigate } from 'react-router-dom';
import Loader from '../Loader/Loader.jsx';

const Protectedroute = () => {
    const {user,isAuthenticated,loading} = useSelector(state=>state.user);
    const navigate = useNavigate();

  return (
    <div>
        {
            loading === undefined || loading === true?<Loader/>:isAuthenticated === false?<Navigate to={"/login"}/>:user.role === "admin"?<Outlet/>:<Private/>
        }
    </div>
  )
}

export default Protectedroute

import React, { Fragment } from 'react'
import {useSelector} from 'react-redux';
import {Route,Navigate,Routes} from "react-router-dom";

const ProtectedRoute = ({component:Component,...rest}) => {
  const {loading,isAuthenticated,user} = useSelector(state=>state.user);
  return (
    <Fragment>
      {
        !loading && <Route {...rest} render={()=>{
          if(!isAuthenticated){
            return <Navigate to="/login"/>
          }
          return <Component {...rest} />
        }}/>
      }
    </Fragment>
  )
}

export default ProtectedRoute

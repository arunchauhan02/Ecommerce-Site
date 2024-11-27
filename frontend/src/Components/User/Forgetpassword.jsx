import React, { useEffect } from 'react'
import Loader from '../Loader/Loader'
import {useDispatch,useSelector} from 'react-redux'
import { useState } from 'react'
import MailOnlineIcon from '@material-ui/icons/MailOutline'
import Metadata from "../Layout/Metadata"
import "../../Styles/ForgotPassword.css"
import { forgotPassword } from '../../actions/UserAction'
import { toast } from 'react-toastify'


const Forgetpassword = () => {
    const dispatch = useDispatch();
    const {loading} = useSelector(state=>state.user);
    const {error,message} = useSelector(state=>state.forgotPassword);

    useEffect(() => {
      if(error){
        toast.error(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
    
      
    }, [error])
    

    const [email, setemail] = useState("");

    const forgetpasswordSubmit = (e)=>{
      e.preventDefault();
      const myform = new FormData();

      myform.set("email",email);
      dispatch(forgotPassword(myform));
    }
  return (
    <div>
      {loading?<Loader/>:<div className="forgotPasswordContainer">
      <Metadata title={"Forget Password"}/>
        <div className="forgotPasswordBox">
          <h2 className='forgotPasswordHeading'>Forgot Password</h2>
          <form className='forgotPasswordform' encType='multipart/form-data' onSubmit={forgetpasswordSubmit}>
                <div className="forgotPasswordEmail">
                    <MailOnlineIcon/>
                    <input type="email" placeholder='Enter Email' name='email' required value={email} onChange={(e)=>setemail(e.target.value)}/>
                </div>
                <div>
                 {message && message.message}
                </div>
                <input type="submit" className='forgotPasswordBtn' value="Reset Password" />
          </form>
        </div>
      </div>}
    </div>
  )
}

export default Forgetpassword

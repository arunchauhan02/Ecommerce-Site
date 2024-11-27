import React from 'react'
import {useState,useRef,useEffect} from 'react'
import MailOnlineIcon from '@material-ui/icons/MailOutline'
import FaceIcon from "@material-ui/icons/Face"
import '../../Styles/Resetpassword.css'
import { useDispatch,useSelector } from 'react-redux'
import { loadUser, updatePassword,resetPassword } from '../../actions/UserAction'
import {useAlert} from 'react-alert'
import Loader from '../Loader/Loader'
import {useNavigate} from 'react-router-dom';
import { UPDATE_PROFILE_RESET } from '../../constants/UserConstant'
import Metadata from "../Layout/Metadata"
import LockOpenIcon from '@material-ui/icons/LockOpen'
import LockIcon from '@material-ui/icons/Lock'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import { useParams } from 'react-router-dom'



const Resetpassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const {success,loading,error} = useSelector(state=>state.forgotPassword);

    const [password, setpassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const params = useParams();
    
    const resetoldPassword = (e)=>{
      e.preventDefault();

      const myform = new FormData();
      myform.set("password",password)
      myform.set("confirmPassword",confirmPassword)

      dispatch(resetPassword(params.token,myform));
    }
    
    
    useEffect(() => {
      if(success){
        navigate("/login");

      }
    }, [navigate,success,dispatch])
  return (
    <div>
      {loading?<Loader/>:<div className="resetPasswordContainer">
      <Metadata title={"Update Password"}/>
        <div className="resetPasswordBox">
          <h2 className='resetPasswordHeading'>Update Password</h2>
          <form className='resetPasswordform' encType='multipart/form-data' onSubmit={resetoldPassword}>
            <div className="loginPassword">
              <LockOpenIcon/>
                <input type="Password" placeholder='New Password' required value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
            </div>
            <div className="loginPassword">
              <LockIcon/>
                <input type="Password" placeholder='Confirm Password' required value={confirmPassword} onChange={(e)=>{setconfirmPassword(e.target.value)}}/>
            </div>
            <input type="submit" className='resetPasswordBtn' value="Update" />
          </form>
        </div>
      </div>}
    </div>
  )
}

export default Resetpassword

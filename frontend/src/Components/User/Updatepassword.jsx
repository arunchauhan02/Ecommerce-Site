import React from 'react'
import {useState,useRef,useEffect} from 'react'
import { Link } from 'react-router-dom'
import MailOnlineIcon from '@material-ui/icons/MailOutline'
import FaceIcon from "@material-ui/icons/Face"
import '../../Styles/Updatepassword.css'
import { useDispatch,useSelector } from 'react-redux'
import { loadUser, updatePassword } from '../../actions/UserAction'
import {useAlert} from 'react-alert'
import Loader from '../Loader/Loader'
import {useNavigate} from 'react-router-dom';
import { UPDATE_PROFILE_RESET } from '../../constants/UserConstant'
import Metadata from "../Layout/Metadata"
import LockOpenIcon from '@material-ui/icons/LockOpen'
import LockIcon from '@material-ui/icons/Lock'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { toast } from 'react-toastify'
import { CLEAR_ERRORS } from '../../constants/UserConstant'


const Updatepassword = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();

    const {isUpdated,loading,error} = useSelector(state=>state.profile);

    const [oldPassword, setoldPassword] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

  const updateoldPassword = (e)=>{
    e.preventDefault();
    const myform = new FormData();
    myform.set("oldPassword",oldPassword)
    myform.set("newPassword",newPassword)
    myform.set("confirmPassword",confirmPassword)
    myform.set("token",localStorage.getItem("Token"));
    dispatch(updatePassword(myform));
  }


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
        dispatch({type:CLEAR_ERRORS});
    }
    if(isUpdated){
      navigate("/account");
      toast.success('PassWord Updated Successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      dispatch({type:UPDATE_PROFILE_RESET});
    }
  }, [navigate,isUpdated,error,dispatch])
  return (
    <div>
      {loading?<Loader/>:<div className="updatePasswordContainer">
      <Metadata title={"Update Password"}/>
        <div className="updatePasswordBox">
          <h2 className='upadatePasswordHeading'>Update Password</h2>
          <form className='updatePasswordform' encType='multipart/form-data' onSubmit={updateoldPassword}>
            <div className="loginPassword">
              <VpnKeyIcon/>
                <input type="Password" placeholder='Old Password' required value={oldPassword} onChange={(e)=>{setoldPassword(e.target.value)}}/>
            </div>
            <div className="loginPassword">
              <LockOpenIcon/>
                <input type="Password" placeholder='New Password' required value={newPassword} onChange={(e)=>{setnewPassword(e.target.value)}}/>
            </div>
            <div className="loginPassword">
              <LockIcon/>
                <input type="Password" placeholder='Confirm Password' required value={confirmPassword} onChange={(e)=>{setconfirmPassword(e.target.value)}}/>
            </div>
            <input type="submit" className='loginBtn' value="Update" />
          </form>
        </div>
      </div>}
    </div>
  )
}

export default Updatepassword

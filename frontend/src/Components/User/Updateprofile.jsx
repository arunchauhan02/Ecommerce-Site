import React from 'react'
import {useState,useRef,useEffect} from 'react'
import { Link } from 'react-router-dom'
import MailOnlineIcon from '@material-ui/icons/MailOutline'
import FaceIcon from "@material-ui/icons/Face"
import '../../Styles/Updateprofile.css'
import { useDispatch,useSelector } from 'react-redux'
import { loadUser, updateProfile } from '../../actions/UserAction'
import {useAlert} from 'react-alert'
import Loader from '../Loader/Loader'
import {useNavigate} from 'react-router-dom';
import { UPDATE_PROFILE_RESET } from '../../constants/UserConstant'
import Metadata from "../Layout/Metadata"

const Updateprofile = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user} = useSelector(state=>state.user);
    const {isUpdated,loading,error} = useSelector(state=>state.profile);

    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [avatar, setavatar] = useState();
    const [avatarPreview, setavatarPreview] = useState();

    const updateProfileSubmit = (e)=>{
      e.preventDefault();
      const myform = new FormData();
      myform.set("name",name)
      myform.set("email",email)
      myform.set("avatar",avatarPreview);
      myform.set("token",localStorage.getItem("Token"));
      dispatch(updateProfile(myform));
  }

  const updateProfileDataChange = (e)=>{
    const reader = new FileReader();
    reader.onload=()=>{
      if(reader.readyState === 2){
        setavatarPreview(reader.result)
        setavatar(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  useEffect(() => {
    if(user){
      setname(user.name);
      setemail(user.email);
      setavatarPreview(user.avatar.url)
    }

    if(isUpdated){
      dispatch(loadUser())
      navigate("/account")

      dispatch({type:UPDATE_PROFILE_RESET});
    }
  }, [navigate,isUpdated,dispatch,user])

  return (
    <div>
      {loading?<Loader/>:<div className="updateProfileContainer">
      <Metadata title={"Update Profile"}/>
        <div className="updateProfileBox">
          <h2 className='upadateProfileHeading'>Update Profile</h2>
          <form className='updateProfileform' encType='multipart/form-data' onSubmit={updateProfileSubmit}>
                 <div className="updateProfileName">
                    <FaceIcon/>
                    <input type="text" placeholder='Enter Name' name='name' required value={name} onChange={(e)=>setname(e.target.value)}/>
                </div>
                <div className="updateProfileEmail">
                    <MailOnlineIcon/>
                    <input type="email" placeholder='Enter Email' name='email' required value={email} onChange={(e)=>setemail(e.target.value)}/>
                </div>
                <div className="updateProfileImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input type="file" name='avatar' onChange={updateProfileDataChange} />
                </div>
                <input type="submit" className='updateProfileBtn' value="Update" />
          </form>
        </div>
      </div>}
    </div>
  )
}

export default Updateprofile

import React from 'react'
import {useState,useRef,useEffect} from 'react'
import { Link } from 'react-router-dom'
import MailOnlineIcon from '@material-ui/icons/MailOutline'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import FaceIcon from "@material-ui/icons/Face"
import '../../Styles/Loginpage.css'
import img from "../../assets/icons/right-header-img1.png"
import { useDispatch,useSelector } from 'react-redux'
import { login,registerUser } from '../../actions/UserAction'
import {useAlert} from 'react-alert'
import Loader from '../Loader/Loader'
import {useNavigate,useLocation} from 'react-router-dom';
import { toast } from 'react-toastify'

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [loginEmail, setloginEmail] = useState("")
    const [loginPassword, setloginPassword] = useState("")

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const swictherTab = useRef(null);

    const [user, setuser] = useState({
        name:"",
        email:"",
        password:""
    })
    const [avatar, setavatar] = useState();
    const [avatarPreview, setavatarPreview] = useState("/Profile.png")

    const {name,email,password} = user;

    const registerSubmit = (e)=>{
        e.preventDefault();
        const myform = new FormData();
        myform.set("name",name)
        myform.set("email",email)
        myform.set("password",password)
        myform.set("avatar",avatarPreview)
        dispatch(registerUser(myform))
    }
    const registerDataChange = (e)=>{
        if(e.target.name == 'avatar'){
            const reader = new FileReader();
            reader.onload=()=>{
                if(reader.readyState === 2){
                    setavatarPreview(reader.result)
                    setavatar(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }
        else{
            setuser({...user,[e.target.name]:e.target.value})
        }
    }
    
    const loginSubmit = (e)=>{
        e.preventDefault();
        dispatch(login(loginEmail,loginPassword));
        toast("login successfully");
    }
    const {loading,isAuthenticated,error,} = useSelector(state=>state.user);
    
    const redirect = location.search?location.search.split("=")[1]:"/account"
    
    useEffect(() => {
        if(isAuthenticated){
            navigate(redirect);
        }
    }, [navigate,isAuthenticated,redirect])
    
    
    const switchTab = (e,tab)=>{
        if(tab == "login"){
            swictherTab.current.classList.add("shiftToNeutral")
            swictherTab.current.classList.remove("shiftToRight")

            registerTab.current.classList.remove("shiftToNeutralForm")
            loginTab.current.classList.remove("shiftToLeft")
        }
        if(tab == "register"){
            swictherTab.current.classList.add("shiftToRight");
            swictherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }

  return (
    <div>
      {loading?<Loader/>:<div className="loginSignUpContainer">
        <div className="loginSignUpBox">
            <div>
                <div className="login_signup_toggle">
                    <p onClick={(e)=>{switchTab(e,"login")}}>LOGIN</p>
                    <p onClick={(e)=>{switchTab(e,"register")}}>REGISTER</p>
                </div>
                <button ref={swictherTab}></button>
            </div>
            <form className='loginform' ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                    <MailOnlineIcon/>
                    <input type="email" placeholder='Enter Email' required value={loginEmail} onChange={(e)=>{setloginEmail(e.target.value)}}/>
                </div>
                <div className="loginPassword">
                    <LockOpenIcon/>
                    <input type="Password" placeholder='Enter Password' required value={loginPassword} onChange={(e)=>{setloginPassword(e.target.value)}}/>
                </div>
                <Link to = {`password/forgot`}>Forget Password ?</Link>
                <input type="submit" className='loginBtn' value="Login" />
            </form>
            <form className='signupform' ref={registerTab} encType='multipart/form-data' onSubmit={registerSubmit}>
                <div className="signUpName">
                    <FaceIcon/>
                    <input type="text" placeholder='Enter Name' name='name' required value={name} onChange={registerDataChange}/>
                </div>
                <div className="signUpEmail">
                    <MailOnlineIcon/>
                    <input type="email" placeholder='Enter Email' name='email' required value={email} onChange={registerDataChange}/>
                </div>
                <div className="signUpPassword">
                    <LockOpenIcon/>
                    <input type="password" placeholder='Enter Password' name='password' required value={password} onChange={registerDataChange}/>
                </div>
                <div className="registerImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input type="file" name='avatar' placeholder={"jbhjbbj"} onChange={registerDataChange} />
                </div>
                <input type="submit" className='loginBtn' value="Register" />
            </form>
        </div>
      </div>}
    </div>
  )
}

export default Login

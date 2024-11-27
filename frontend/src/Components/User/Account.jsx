import React from 'react'
import {useDispatch,useSelector} from "react-redux";
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react'
import "../../Styles/Profile.css"
import {logout} from "../../actions/UserAction"
import MyOrders from '../MyOrders/MyOrders';
import { toast } from 'react-toastify';
import Metadata from '../Layout/Metadata';
import Lorder from '../MyOrders/Lorder';

const Account = () => {

  const {loading,user,isAuthenticated} = useSelector(state=>state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(isAuthenticated === false && loading === false){
        navigate("/login")
    }
  }, [navigate,isAuthenticated])
  
  const Logout = ()=>{
    dispatch(logout())
  }

  return (
    <div>
      <Metadata title={`${user && user.name} - OnlyMenWants`}/>
      {
        loading || isAuthenticated === false?<Loader/>:
        <div>
        <div className='Myaccount'>
          <h1>My Account</h1>
          <div className="userInformation">
            <div>
              { <img src={user && user.avatar && user.avatar.url} alt="" />  }
            </div>
            <div className='nameandemail'>
              <div>
                <h4>Name :</h4>
                <p>{user && user.name}</p>
              </div>
              <div>
                <h4>Email :</h4>
                <p>{user && user.email}</p>
              </div>
              <div>
                <h4>Joined on :</h4>
                <p>{user && user.createdAt && user.createdAt.slice(0,10)}</p>
              </div>
            </div>
          </div>
          <div className='accountbtn'>
            <Link className='Editprofilebtn' to ="/me/update"><button>Edit Profile</button></Link>
            <Link className='Changepasswordbtn' to="/password/update"><button>Change Password</button></Link>
            <button className='logoutBtn' onClick={Logout}>Log out</button>
            {
              user && user.role ==="admin" && <Link className='Changepasswordbtn' to="/admin/dashboard"><button>Dashboard</button></Link>
            }
            </div>
          </div>
          <div>
            <Lorder/>
          </div>
        </div>
      }
    </div>
  )
}

export default Account
import './App.css';
import Footer from './Components/Layout/Footer';
import Header from "./Components/Layout/Header"
import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom';
import Home from './Components/Home/Home'
import ProductDetails from './Components/Product/ProductDetails';
import Glassess from "./Components/Product/Glassess"
import Login from './Components/User/Login';
import {loadUser} from "./actions/UserAction"
import {useEffect,useState} from 'react'
import {useSelector,useDispatch} from "react-redux";
import Useroptions from './Components/Layout/Useroptions';
import Account from './Components/User/Account';
import ProtectedRoute from './Components/Route/ProtectedRoute';
import Updateprofile from './Components/User/Updateprofile';
import Updatepassword from "./Components/User/Updatepassword";
import Forgetpassword from './Components/User/Forgetpassword';
import Resetpassword from "./Components/User/Resetpassword"
import Cart from "./Components/Cart/Cart"
import Shipping from "./Components/Cart/Shipping"
import Order from "./Components/Cart/Order.jsx"
import WebFont from "webfontloader"
import axios from 'axios';
import PaymentWrap from './Components/Cart/PaymentWrap.jsx';
import { OrderDetails } from './Components/MyOrders/OrderDetails.jsx';
import Dashboard from "./Components/Admin/Dashboard.jsx";
import Private from './Components/Admin/Private.jsx';
import Protectedroute from './Components/Admin/Protectedroute.jsx';
import Productlist from './Components/Admin/Productlist.jsx';
import NewProduct from './Components/Admin/NewProduct.jsx';
import UpdateProduct from './Components/Admin/UpdateProduct.jsx';
import OrderList from './Components/Admin/OrderList.jsx';
import ProcessOrder from './Components/Admin/ProcessOrder.jsx';
import UsersList from './Components/Admin/UsersList.jsx';
import UpdateUser from './Components/Admin/UpdateUser.jsx';
import ProductReviews from './Components/Admin/ProductReviews.jsx';
import BuySingleItem from './Components/BuySingleItem/BuySingleItemShipping.jsx';
import BuySingleItemOrder from './Components/BuySingleItem/BuySingleItemOrder.jsx';
import BuySingleItemPayment from './Components/BuySingleItem/BuySingleItemPayment.jsx';
import buySingleItemPaymentWrap from './Components/BuySingleItem/BuySingleItwmWrap.jsx';
import Success from './Components/Cart/Success.jsx';

function App() {
  const dispatch = useDispatch();
  const {isAuthenticated,user} = useSelector(state=>state.user);

  const {cartItems} = useSelector(state=>state.Cart)
  const [noOfItems, setnoOfItems] = useState(cartItems.length);


  useEffect(() => {
    WebFont.load({
      google:{
        families:["Roboto"]
      }
    })
    dispatch(loadUser());
  }, [dispatch])
  return (
    <div className="App">
      <Router>
        <Header noOfItems={noOfItems} />
        <Routes>
          <Route  path="/" element={<Home setnoOfItems={setnoOfItems}/>}/>
          <Route  path='/product/:id'  element={<ProductDetails setnoOfItems= {setnoOfItems}/>}/>
          <Route path='/collections/:id' Component={Glassess}/>
          <Route path='/account' Component={Account}/>
          <Route path='/me/update' Component={Updateprofile}/>
          <Route path='/password/update' Component={Updatepassword}/>
          <Route path='/login' Component={Login}/>
          <Route path='/login/password/forgot' Component={Forgetpassword}/>
          <Route path='/password/reset/:token' Component={Resetpassword}/>
          <Route path='/cart' element={<Cart setnoOfItems={setnoOfItems}/>} />

          <Route path='/shipping' Component={Shipping}/>

          <Route path='/order/confirm' Component={Order}/>

          <Route path='/process/payment' Component={PaymentWrap}/>

          <Route path='/order/:id' Component={OrderDetails}/> 
          <Route path='/buysingleitem/shipping' Component={BuySingleItem}/> 
          <Route path='/buysingleitem/shipping/order/confirm' Component={BuySingleItemOrder}/> 
          <Route path='/buysingleitem/process/payment' Component={buySingleItemPaymentWrap}/> 
          <Route path='/success' Component={Success}/>

          <Route Component={Protectedroute}>
            <Route Component={Dashboard} path='/admin/dashboard'/>
            <Route Component={Productlist} path='/admin/products'/>
            <Route Component={NewProduct} path='/admin/product'/>
            <Route Component={UpdateProduct} path='/admin/product/:id'/>
            <Route Component={OrderList} path='/admin/orders'/>
            <Route Component={ProcessOrder} path='/admin/order/:id'/>
            <Route Component={UsersList} path='/admin/users'/>
            <Route Component={UpdateUser} path='/admin/user/:id'/>
            <Route Component={ProductReviews} path='/admin/reviews'/>
          </Route>

        </Routes>
      </Router>
        <Footer/>
        
    </div>
  );
}

export default App;

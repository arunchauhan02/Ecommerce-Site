import React from 'react'
import {Link} from 'react-router-dom'
import "../../Styles/Productstyle.css"
import ReactStars from "react-rating-stars-component";
import add from "../../assets/icons/right-header-img3.png"
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { addItemsToCart } from '../../actions/CartActions';



const Product = ({pr}) => {

    const dispatch = useDispatch();
  const addToCartHandler = async (e)=>{
    e.stopPropagation();
    e.preventDefault();
    dispatch(addItemsToCart(pr._id,1));
    toast.success('Item added successfully to cart', {
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
    const options = {
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size:window.innerWidth<600?20:25,
        value:pr.rating,
        isHalf:true
    }
    return (
    <div>
        <Link to = {`/product/${pr._id}`}>
        <div className="latest-combo-items">
                    <div className="latest-combo-div">
                        <img className="latest-combo-img" src={pr.images[0]?pr.images[0].url:"none"} alt={pr.name}/>
                        <div className="add-to-favourite " onClick={addToCartHandler} id="myLI"><LocalGroceryStoreOutlinedIcon/></div>
                    </div>
                    <div className="latest-combo-details">
                        <div className="latest-combo-info">
                            <h4>{pr.name}</h4>
                            <div className="latest-combo-price">
                                <div className="latest-combo-prices">
                                    <p><s>₹ 600</s></p>
                                    <p className='originalPrice'>₹{pr.price}</p>
                                </div>
                                <div>
                                    <ReactStars {...options}/>
                                    <p>({pr.numofreviews} reviews)</p>
                                </div>
                            </div>
                            <div onClick={addToCartHandler} className="add-to-cart">Add to cart</div>
                        </div>
                    </div>
                </div>
        </Link>
    </div>
  )
}

export default Product

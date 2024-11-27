import React from 'react'
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import { addItemsToCart } from '../../actions/CartActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import "./Hamburgur.css";

const Hamburgur = (props) => {

  const dispatch = useDispatch();
  const pr = props.pr;
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
    <div className='eachSearchProduct'>
      <Link to = {`/product/${pr._id}`}>
        <div className="searchItems">
                    <div className="">
                        <img className="search-product-img" src={pr.images[0]?pr.images[0].url:"none"} alt={pr.name}/>
                    </div>
                    <div className="latest-combo-details">
                        <div className="latest-combo-info">
                            <h4>{pr.name}</h4>
                            <div className="latest-combo-price">
                                <div className="latest-combo-prices">
                                    <p className='originalPrice'>₹{pr.price}</p>
                                </div>
                                <div>
                                    <ReactStars {...options}/>
                                    <p>({pr.numofreviews} reviews)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={addToCartHandler} className='addToCartBtn'>Add To Cart</button>
                </div>
        </Link>
      
    </div>
  )
}

export default Hamburgur

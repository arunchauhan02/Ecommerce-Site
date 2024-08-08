import React from 'react'
import Carousel from "react-material-ui-carousel";
import {useSelector,useDispatch} from 'react-redux';
import { useEffect,useState } from 'react';
import {useLocation, useParams} from 'react-router-dom';
import { ClearErros, getProductDetails, newReiview } from '../../actions/ProductAction';
import Metadata from '../Layout/Metadata'
import Loader from '../Loader/Loader';
import '../../Styles/ProductDetailsStyle.css'
import ReactStars from "react-rating-stars-component";
import Review from './Review';
import {addItemsToCart} from "../../actions/CartActions"
import {Dialog,DialogActions,DialogContent,Button, DialogTitle} from "@material-ui/core";
import {Rating} from "@material-ui/lab"
import { NEW_REVIEW_RESET } from '../../constants/ProductConstant1';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { buySingleItem } from '../../actions/SingleProductBuyAction';
import { useNavigate } from 'react-router-dom';
import {WhatsappShareButton,FacebookShareButton,TwitterShareButton} from 'react-share';
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { SiWhatsapp } from "react-icons/si";
import ImageSilder from '../Home/ImageSilder';

const ProductDetails = ({setnoOfItems}) => {

  const {cartItems} = useSelector(state=>state.Cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [qunatity, setqunatity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  
  const {product,loading} = useSelector(state=>state.productDetails);
  const location = useLocation();
  
  const {success,error:reviewError} = useSelector(state=>state.NewReview);
  const options = {
    size:"large",
    value:product.rating,
    readOnly:true,
    precision:0.1
  }
  useEffect(() => {
    if(reviewError){
      dispatch(ClearErros());
    }
    
    if(success){
      toast.success('Review Submitted Successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      dispatch({type:NEW_REVIEW_RESET});
    }
    dispatch(getProductDetails(params.id));
    setnoOfItems(cartItems.length);
  }, [dispatch,params.id,success,reviewError,cartItems.length]);
  
  const decQuantity = ()=>{
    if(qunatity>0){
      setqunatity(qunatity-1);
    }
  }
  const incQuatntiy = ()=>{
    if(product.stock>qunatity){
      setqunatity(qunatity+1);
    }
  }
  const images = product &&  product.images && product.images.map((item)=>item.url);
  console.log(images ,loading);
  
  const addToCartHandler = ()=>{
    dispatch(addItemsToCart(params.id,qunatity));
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
  const buyNow = ()=>{
    dispatch(buySingleItem(params.id,qunatity));
    navigate("/buysingleitem/shipping")
  }
  const discount = product.discount;

  const submitReviewToggle = ()=>{
    open?setOpen(false):setOpen(true);
  }

  const reviewSubmitHandler = ()=>{
    const myForm = new FormData();
    myForm.set("rating",rating);
    myForm.set("comment",comment);
    myForm.set("productId",params.id);
    dispatch(newReiview(myForm));

    setOpen(false);
  }
  const priceWithoutdiscount = Math.round(product.price*100/(100-product.discount));
  return (
    <div>{loading?<Loader/>:
    <div className='Singleproduct'>
      <Metadata title={`${product.name} - OnlyMenWants`}/>
        <div className="productDetails">
          <div>
            {
              loading?<Loader/>:product && product.images && <ImageSilder images={images}/>
            }
          </div>
        </div>
        <div className='detailsBlock'>
          <div className="detailsBlock1">
            <h2>{product.name}</h2>
          </div>
          <div className="detailsBlock2">
            <Rating {...options}/>
            <p>({product.numofreviews} review)</p>
          </div>
          <div className="detailsBlock3">
            <div className='discount'>
              <h2><s>₹{priceWithoutdiscount}</s>₹{product.price}</h2>
              <p>{discount}</p>
              <div>
                <p>%</p>
                <p>OFF</p>
              </div>
            </div>
            <div className="detailsBlock3-1">
              <div className="detailsBlock3-1-1">
                <button onClick={decQuantity}>-</button>
                  <input type="number" readOnly value={qunatity} />
                <button onClick={incQuatntiy}>+</button>
                <button class="buy-now-btn" onClick={buyNow} disabled= {product.stock<1?true:false}>Buy Now</button>
              </div>
                <button disabled= {product.stock<1?true:false} onClick={addToCartHandler} className='addToCart'>Add to cart</button>
              <p>status : 
                <b className={product.stock<1?"redColor":"greenColor"}>
                  {product.stock<1?"OutOfStock":"InStock"}
                </b>
              </p>
              <p className={product.stock>=1?"green":"red"}></p>
              <div className='share-option'>
                <p>Share</p>
                <div>
                  <WhatsappShareButton url={`http://${location.hostname}/product/${product._id}`}><SiWhatsapp/></WhatsappShareButton>
                  <FacebookShareButton url={`http://${location.hostname}/product/${product._id}`}><CiFacebook/></FacebookShareButton>
                  <TwitterShareButton url={`http://${location.hostname}/product/${product._id}`}><FaXTwitter/></TwitterShareButton>
                </div>
              </div>
            </div>
          </div>
          <div className="detailsBlock4">
            <h3>Descrition </h3><p>{product.description}</p>
          </div>
          <button onClick={submitReviewToggle} className='submitReview'>Write a review</button>
        </div>
    </div>
    }
    <h2 className='reviewsHeading'>Customer Reviews</h2>
    <Dialog
    aria-labelledby='simple-dialog-title' open={open} onClose={submitReviewToggle}>
      <DialogTitle>Submit Review</DialogTitle>
      <DialogContent className='submitDialog'>
        <Rating onChange={(e)=>{setRating(e.target.value)}}
          value={rating}
          size={"large"}/>
        <textarea className='submitDialogTextArea' cols={30} rows={5} value={comment} onChange={(e)=>{setComment(e.target.value)}}>

        </textarea>
      </DialogContent>
      <DialogActions>
        <Button onClick={reviewSubmitHandler} color='primary'>Submit</Button>
        <Button onClick={submitReviewToggle} color='secondary'>Cancel</Button>
      </DialogActions>
    </Dialog>
    <div className='reviewssection'>
      <div className='productreviews'>
        {product.reviews && product.reviews[0] ? product.reviews.map((rev)=>(
          <Review rev={rev}/>
        )):<div className='noReviews'>No Reviews Yet</div>}
      </div>
    </div>
    </div>
  )
}

export default ProductDetails

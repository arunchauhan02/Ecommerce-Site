import React from 'react'
import { Link } from 'react-router-dom'
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import { useDispatch } from 'react-redux';
import { addItemsToCart } from '../../actions/CartActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Pandents = ({item}) => {

  const dispatch = useDispatch();
  const addToCartHandler = async (e)=>{
    e.stopPropagation();
    e.preventDefault();
    dispatch(addItemsToCart(item._id,1));
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
  return (
    <div>
      <Link to = {`/product/${item._id}`}>
        <img src={item && item.images && item.images[0].url} alt="" />
        <button onClick={addToCartHandler} className='add-to-cart-pandent'><p>Add To Cart</p><LocalGroceryStoreOutlinedIcon/></button>
      </Link>
    </div>
  )
}

export default Pandents

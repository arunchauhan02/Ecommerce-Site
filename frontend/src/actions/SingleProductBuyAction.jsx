import { SINGLE_ITEM_BUY } from "../constants/BuySingleItemConstants";
import axios from "axios";


export const buySingleItem = (id,qunatity)=>async(dispatch,getState)=>{
    let {data} = await axios.get(`/api/v1/product/${id}`);
    dispatch({type:SINGLE_ITEM_BUY,
        payload:{
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.images.length>=1?data.product.images[0].url:"",
            stock:data.product.stock,
            qunatity
        }
    })
    localStorage.setItem("buyProduct",JSON.stringify(getState().BuySingleItem.productSell));
}
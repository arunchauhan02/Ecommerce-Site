import { SINGLE_ITEM_BUY, SINGLE_ITEM_BUY_CANCEL } from "../constants/BuySingleItemConstants";
import {ADD_TO_CART,REMOVE_FROM_CART, SAVE_SHIPPING_INFO} from "../constants/CartConstatnt";

export const Cartreducer = (state = {cartItems:[],shippingInfo:{}},action)=>{
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const isItemExist = state.cartItems.find(
                (i)=>i.product === item.product
            );
            if(isItemExist){
                return{
                    ...state,
                    cartItems:state.cartItems.map(
                        (i)=>i.product === item.product?item:i   
                    )
                }
            }
            else{
                return {
                    ...state,
                    cartItems:[...state.cartItems,item]
                }
            }
        case REMOVE_FROM_CART:
            return{
                ...state,
                cartItems:state.cartItems.filter((i)=>(i.product !== action.payload))
            }
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo:action.payload
            }
        default:
            return state;
    }
}

export const BuySingleItemReducer = (state = {cartItems:[],shippingInfo:{}},action)=>{
    switch (action.type) {
        case SINGLE_ITEM_BUY:
            const item = action.payload;
            return {
                ...state,
                productSell:item
            }
        case SINGLE_ITEM_BUY_CANCEL:
            return{
                ...state
            }
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo:action.payload
            }
        default:
            return state;
    }
}
import {createStore,combineReducers,applyMiddleware} from "redux";

import {thunk} from "redux-thunk";

import {composeWithDevTools} from "redux-devtools-extension"
import { newProductReducer, newReviewReducer, productDetailsReducer, ProductReducer, productReviewsReducer, productsReducer, reviewReducer, searchProductReducer } from "./reducers/Productreducer";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer, } from "./reducers/Userreducer";
import {BuySingleItemReducer, Cartreducer} from "./reducers/Cartreducer";
import { forgotPassword } from "./actions/UserAction";
import {OrderDetailsReducer, allOrderReducer, myOrderReducer, newOrderReducer, orderReducer} from "./reducers/Orderreducer";

const reducer = combineReducers({
    products:productsReducer,
    productDetails:productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    Cart:Cartreducer,
    newOrder:newOrderReducer,
    MyOrder:myOrderReducer,
    OrderDetails:OrderDetailsReducer,
    NewReview:newReviewReducer,
    NewProduct:newProductReducer,
    Product:ProductReducer,
    allOrders:allOrderReducer,
    order:orderReducer,
    allUsers:allUsersReducer,
    userDetails:userDetailsReducer,
    productReviews:productReviewsReducer,
    review:reviewReducer,
    searchProduct:searchProductReducer,
    BuySingleItem:BuySingleItemReducer
})

let initialstate = {
    Cart:{
        cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
        shippingInfo:localStorage.getItem("shippingInfo")?JSON.parse(localStorage.getItem("shippingInfo")):{},
    },
    BuySingleItem:{
        productSell:localStorage.getItem("buyProduct")?JSON.parse(localStorage.getItem("buyProduct")):[],
        shippingInfo:localStorage.getItem("shippingInfo")?JSON.parse(localStorage.getItem("shippingInfo")):{},
    }

}

const middleware = [thunk];

const store = createStore(reducer,initialstate,composeWithDevTools(applyMiddleware(...middleware)));

export default store;
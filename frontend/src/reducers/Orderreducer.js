import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_RESET,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_RESET,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS
} from "../constants/OrderConstants"


export const newOrderReducer = (state={},action)=>{
    switch(action.type){

        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading:true,
            }
        case CREATE_ORDER_SUCCESS:
            return {
                order:action.payload,
                loading:false,
            }
        case CREATE_ORDER_FAIL:
            return {
                loading:false,
                order:action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }

        default:
            return state
    }
}

export const myOrderReducer = (state={orders:[]},action)=>{
    switch(action.type){

        case MY_ORDER_REQUEST:
            return {
                lodaing:true
            }

        case MY_ORDER_SUCCESS:
            return {
                loading:false,
                orders:action.payload
            }

        case MY_ORDER_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }

        default:
            return state;
    }

}


export const OrderDetailsReducer = (state={order:{}},action)=>{
    switch(action.type){

        case ORDER_DETAILS_REQUEST:
            return {
                lodaing:true
            }

        case ORDER_DETAILS_SUCCESS:
            return {
                loading:false,
                order:action.payload.order
            }

        case ORDER_DETAILS_FAIL:
            return {
                loading:false,
                error:action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }

        default:
            return state;
    }

}

export const allOrderReducer = (state={orders:[]},action)=>{
    switch(action.type){

        case ALL_ORDERS_REQUEST:
            return {
                lodaing:true
            }

        case ALL_ORDERS_SUCCESS:
            return {
                loading:false,
                orders:action.payload
            }

        case ALL_ORDERS_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }

        default:
            return state;
    }

}

export const orderReducer = (state={},action)=>{
    switch(action.type){

        case UPDATE_ORDER_REQUEST:
        case DELETE_ORDER_REQUEST:
            return {
                ...state,
                lodaing:true
            }

        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading:false,
                isUpdated:action.payload
            }
        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                lodaing:false,
                isDeleted:action.payload
            }
            
        case UPDATE_ORDER_FAIL:
        case DELETE_ORDER_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        case UPDATE_ORDER_RESET:
            return {
                ...state,
                loading:false,
                isUpdated:false
            }
        case DELETE_ORDER_RESET:
            return {
                ...state,
                lodaing:false,
                isDeleted:false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }

        default:
            return state;
    }

}





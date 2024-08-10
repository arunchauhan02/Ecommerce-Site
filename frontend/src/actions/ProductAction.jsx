import axios from "axios";
import {ALL_PRODUCT_FAIL,ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS,CLEAR_ERRORS,
    PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    SEARCH_PRODUCT_FAIL,
    SEARCH_PRODUCT_REQUEST,
    SEARCH_PRODUCT_SUCCESS,} from "../constants/ProductConstant1";


    // const baseUrl = "https://hj-u6tp.onrender.com"
    const baseUrl = "https://hj-4.onrender.com"

export const getproduct = (currentpage) => async(dispatch)=>{
    try {
        dispatch({type:ALL_PRODUCT_REQUEST});
        
        let link = `${baseUrl}/api/v1/products?page=${currentpage}`;
        const {data} = await axios.get(link);

        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        });

    } catch (error) {
        dispatch({type:ALL_PRODUCT_FAIL,payload:error.reponse.data.message});
    }
}

export const getAdminProducts = ()=>async(dispatch)=>{
    try {
        dispatch({type:ADMIN_PRODUCT_REQUEST});
        
        let {data} = await axios.get(`${baseUrl}/api/v1/admin/products`);

        dispatch({type:ADMIN_PRODUCT_SUCCESS,payload:data.products});
        
    } catch (error) {
        dispatch({type:ADMIN_PRODUCT_FAIL,payload:error.response.data.message});
    }

}
export const getAllProducts = ()=>async(dispatch)=>{
    try {
        dispatch({type:ADMIN_PRODUCT_REQUEST});
        
        let {data} = await axios.get(`${baseUrl}/api/v1/products`);

        dispatch({type:ADMIN_PRODUCT_SUCCESS,payload:data.products});
        
    } catch (error) {
        dispatch({type:ADMIN_PRODUCT_FAIL,payload:error.response.data.message});
    }

}
export const getProductDetails = (id)=> async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST});

        let {data} = await axios.get(`${baseUrl}/api/v1/product/${id}`);
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product
        })
    }catch(error){
        dispatch({type:PRODUCT_DETAILS_FAIL,payload:error.reponse.data.message});
    }
}

export const byCollectionProduct = (category,currentpage,price=[0,25000],rating=0) => async(dispatch)=>{
    try {
        dispatch({type:ALL_PRODUCT_REQUEST});
        let link = `${baseUrl}/api/v1/collections/${category.id}?page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`;
        const {data} = await axios.get(link);

        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        });

    } catch (error) {
        dispatch({type:ALL_PRODUCT_FAIL,payload:error.reponse.data.message});
    }
}

export const newReiview = (reviewData)=> async(dispatch)=>{
    try {
        dispatch({type:NEW_REVIEW_REQUEST});

        const config = {
            headers:{"Content-Type":"application/json"}
        }
        let {data} = await axios.put(`${baseUrl}/api/v1/review`,reviewData,config);

        dispatch({type:NEW_REVIEW_SUCCESS,payload:data.success});
    } catch (error) {
        dispatch({type:NEW_REVIEW_FAIL,payload:error.response.data.message});
    }
}

export const createProduct = (productData)=> async(dispatch)=>{
    try {
        dispatch({type:NEW_PRODUCT_REQUEST});

        const config = {
            headers:{"Content-Type":"multipart/form-data"}
        }

        let {data} = await axios.post(`${baseUrl}/api/v1/admin/product/new`,productData,config);

        dispatch({type:NEW_PRODUCT_SUCCESS,payload:data});

    } catch (error) {
        console.log(error)
        dispatch({type:NEW_PRODUCT_FAIL,payload:error.response.data.message});
    }
}

export const deleteProduct = (id) => async(dispatch)=>{
    try {
        dispatch({type:DELETE_PRODUCT_REQUEST});

        let {data} = await axios.delete(`${baseUrl}/api/v1/admin/product/${id}`);

        dispatch({type:DELETE_PRODUCT_SUCCESS,payload:data.success});

    } catch (error) {
        dispatch({type:DELETE_PRODUCT_FAIL,payload:error.response.data.message});
    }
}

export const updateProduct = (id,productData)=> async(dispatch)=>{
    try {
        dispatch({type:UPDATE_PRODUCT_REQUEST});

        const config = {
            headers:{"Content-Type":"appliaction/json"}
        }
        let {data} = await axios.put(`${baseUrl}/api/v1/admin/product/${id}`,productData,config);

        dispatch({type:UPDATE_PRODUCT_SUCCESS,payload:data.success});
    } catch (error) {
        dispatch({type:UPDATE_PRODUCT_FAIL,payload:error.response.data.message});
    }
}

export const getAllReviews = (id) => async (dispatch) => {
    try {
      dispatch({ type: ALL_REVIEW_REQUEST });
  
      const { data } = await axios.get(`${baseUrl}/api/v1/reviews?id=${id}`);
  
      dispatch({
        type: ALL_REVIEW_SUCCESS,
        payload: data.review,
      });
    } catch (error) {
      dispatch({
        type: ALL_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete Review of a Product
  export const deleteReviews = (reviewId, productId) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_REVIEW_REQUEST });
  
      const { data } = await axios.delete(
        `${baseUrl}/api/v1/reviews?id=${reviewId}&productId=${productId}`
      );
  
      dispatch({
        type: DELETE_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const SearchProduct = (keyword)=>async(dispatch)=>{
    try {
        dispatch({type:SEARCH_PRODUCT_REQUEST});

        let {data} = await axios.get(`${baseUrl}/api/v1/search?keyword=${keyword}`);

        dispatch({type:SEARCH_PRODUCT_SUCCESS,payload:data.products})
        
    } catch (error) {
        dispatch({
            type:SEARCH_PRODUCT_FAIL,
            payload:error.reponse.data.message
        })
    }

  }
  
export const ClearErros = async (dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}
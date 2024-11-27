import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL, CLEAR_ERRORS, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL,
    UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_SUCCESS,UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,UPDATE_PASSWORD_SUCCESS,UPDATE_PASSWORD_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS, DELETE_USER_RESET, DELETE_USER_FAIL} from "../constants/UserConstant";
import {REGISTER_USER_REQUEST,REGISTER_USER_SUCCESS,REGISTER_USER_FAIL} from "../constants/UserConstant"
import axios from "axios";

const baseUrl = "https://lop-1.onrender.com"

export const login = (email,password) => async(dispatch)=>{
    try {
        dispatch({type:LOGIN_REQUEST});
        
        const config = {headers:{'Content-Type':"application/json"},withCredentials: true}
        
        let res = await axios.post(`${baseUrl}/api/v1/login`,{email,password},{withCredentials: true});
        localStorage.setItem("Token",res.data.token)

        
        dispatch({type:LOGIN_SUCCESS,payload:res.data.user});
        
    } catch (error) {
        
        dispatch({type:LOGIN_FAIL,payload:error.response.data.error})
    }
    
}
export const logout = ()=>async(dispatch)=>{
    try {
        let {data} = axios.get(`${baseUrl}/api/v1/logout`);
        localStorage.setItem("Token",null);

        dispatch({type:LOGOUT_SUCCESS});
    } catch (error) {
        dispatch({type:LOGOUT_FAIL,payload:error.response.data.error});
    }
}

export const registerUser = (userData)=> async (dispatch)=>{
    try {
        dispatch({type:REGISTER_USER_REQUEST});

        const config = {headers:{'Content-Type':"multipart/form-data"}};
        let res = await axios.post(`${baseUrl}/api/v1/register`,userData,config);
        localStorage.setItem("Token",res.data.token);
        dispatch({type:REGISTER_USER_SUCCESS,payload:res.data.user});
        
      } catch (error) {
        dispatch({type:REGISTER_USER_FAIL,payload:error.response.data.error});
      }
      
    }

    export const loadUser = () => async(dispatch)=>{
      try {
        dispatch({type:LOAD_USER_REQUEST});

        const config = {headers:{'Content-Type':"application/json"}};
        let token = localStorage.getItem("Token");
        const {data} = await axios.post(`${baseUrl}/api/v1/me`,{token},config);
        
        dispatch({type:LOAD_USER_SUCCESS,payload:data.user});
    } catch (error) {
        dispatch({type:LOAD_USER_FAIL,payload:error.response.data.error});
    }
}


//Update profile user data
export const updateProfile = (userData)=> async (dispatch)=>{
    try {
        dispatch({type:UPDATE_PROFILE_REQUEST});
        const config = {headers:{'Content-Type':"multipart/form-data"}};
        let {data} = await axios.put(`${baseUrl}/api/v1/me/update`,userData,config);
        dispatch({type:UPDATE_PROFILE_SUCCESS,payload:data.success});

    } catch (error) {
        dispatch({type:UPDATE_PROFILE_FAIL,payload:error.response.data.error});
    }
}

export const updatePassword = (userData)=> async (dispatch)=>{
    try {
        dispatch({type:UPDATE_PASSWORD_REQUEST});
        const config = {headers:{'Content-Type':"application/json"}};
        let {data} = await axios.put(`${baseUrl}/api/v1/password/update`,userData,config);
        dispatch({type:UPDATE_PASSWORD_SUCCESS,payload:data.success});

    } catch (error) {
        dispatch({type:UPDATE_PASSWORD_FAIL,payload:error.response.data.error});
    }
}


export const forgotPassword = (email)=> async(dispatch)=>{
    try {
        dispatch({type:FORGOT_PASSWORD_REQUEST});
        const config = {headers:{'Content-Type':"application/json"}};
        let {data} = await axios.post(`${baseUrl}/api/v1/password/forget`,email,config);
        console.log(data);
        dispatch({type:FORGOT_PASSWORD_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:FORGOT_PASSWORD_FAIL,payload:error.response.data.error});
    }
}

//Reset password
export const resetPassword = (token,passwords)=>async(dispatch)=>{
    try {
        dispatch({type:RESET_PASSWORD_REQUEST});
        const config = {headers:{'Content-Type':"application/json"}};

        let {data} = await axios.put(`${baseUrl}/api/v1/password/reset/${token}`,passwords,config);
  
        dispatch({type:RESET_PASSWORD_SUCCESS,payload:data.success})
    } catch (error) {
        
    }
}

export const getAllUsers = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_USERS_REQUEST });
      const config = {
        headers:{"Content-Type":"application/json"}
    }
    let token = localStorage.getItem("Token");
      const { data } = await axios.post(`${baseUrl}/api/v1/admin/users`,{token},config);
  
      dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
      dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
  };


  export const getUserDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });
      const config = {
        headers:{"Content-Type":"application/json"}
      }
      let token = localStorage.getItem("Token");
      const { data } = await axios.post(`${baseUrl}/api/v1/admin/user/${id}`,{token},config);
  
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
    }
  };
  
  // Update User
  export const updateUser = (id, userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(
        `${baseUrl}/api/v1/admin/user/${id}`,
        userData,
        config
      );
  
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete User
  export const deleteUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_USER_REQUEST });
      const config = {
        headers:{"Content-Type":"application/json"}
      }
      let token = localStorage.getItem("Token");
  
      const { data } = await axios.delete(`${baseUrl}/api/v1/admin/user/${id}`,{data:{token}},config);
  
      dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Clearing Errors
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
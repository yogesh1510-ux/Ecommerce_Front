import { ADMIN_PRODUCT_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ALL_REVIEW_FAIL, ALL_REVIEW_REQUEST, ALL_REVIEW_SUCCESS, CLEAR_ALL_ERRORS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, GET_ALL_PRODUCT_FAIL, GET_ALL_PRODUCT_REQUEST, GET_ALL_PRODUCT_SUCCESS, GET_SINGLE_PRODUCT_FAIL, GET_SINGLE_PRODUCT_REQUEST, GET_SINGLE_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "../constants/productConstant"
import axios from "axios";


export const getProducts = (keyword="",currentPage=1,price=[0,25000],category,ratings=0) => async(dispatch) =>{
    try {
        dispatch({type:GET_ALL_PRODUCT_REQUEST})

        let link = `https://ecommerce-website-nuyo.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if(category && category !=="All" ){

          
            link = `https://ecommerce-website-nuyo.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }

        const config = {
          withCredentials: true, 
        };



        const {data} = await axios.get(link,config);

        // products:action.payload.products,
        // productCount:action.payload.productCount,
        // resultPerPage:action.payload.resultPerPage,
        // filterProductCount:action.payload.filterProductCount,

        console.log("data : "+data.productCount);

        dispatch({
            type:GET_ALL_PRODUCT_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:GET_ALL_PRODUCT_FAIL,
            payload:error.response.data.message
        })
    }
}

// export const getSingleProduct = (id) => async(dispatch) =>{
//     try {
//         dispatch({type:PRODUCT_DETAILS_REQUEST})

//         const {data} = await axios.get(`/api/v1/product/${id}`);

//         dispatch({
//             type:PRODUCT_DETAILS_SUCCESS,
//             payload:data
//         })

//     } catch (error) {
//         dispatch({
//             type:PRODUCT_DETAILS_FAIL,
//             payload:error.response.data.message
//         })
//     }
// }


export const clearErrors = () => async(dispatch) =>{
    dispatch({type:CLEAR_ALL_ERRORS});
};


export const newReview = (reviewData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_REVIEW_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, 
      };
  
      const { data } = await axios.put(`https://ecommerce-website-nuyo.onrender.com/api/v1/review`, reviewData, config);
  
      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  export const getAdminProduct = () => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_PRODUCT_REQUEST });
      const config = {
        withCredentials: true, 
      };
  
      const { data } = await axios.get("https://ecommerce-website-nuyo.onrender.com/api/v1/admin/products",config);
  
      dispatch({
        type: ADMIN_PRODUCT_SUCCESS,
        payload: data.products,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const deleteProduct = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_PRODUCT_REQUEST });
      const config = {
        withCredentials: true, 
      };
  
      const { data } = await axios.delete(`https://ecommerce-website-nuyo.onrender.com/api/v1/admin/product/${id}`,config);
  
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const createProduct = (productData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_PRODUCT_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, 
      };
  
      const { data } = await axios.post(
        `https://ecommerce-website-nuyo.onrender.com/api/v1/admin/product/new`,
        productData,
        config
      );
  
      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const getProductDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
      const config = {
        withCredentials: true, 
      };
  
      const { data } = await axios.get(`https://ecommerce-website-nuyo.onrender.com/api/v1/product/${id}`,config);
  
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  

  export const updateProduct = (id, productData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, 
      };
  
      const { data } = await axios.put(
        `https://ecommerce-website-nuyo.onrender.com/api/v1/admin/product/${id}`,
        productData,
        config
      );
  
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  export const getAllReviews = (id) => async (dispatch) => {
    try {
      dispatch({ type: ALL_REVIEW_REQUEST });

      const config = {
        withCredentials: true, 
      };
      const { data } = await axios.get(`https://ecommerce-website-nuyo.onrender.com/api/v1/reviews?id=${id}`,config);
  
      dispatch({
        type: ALL_REVIEW_SUCCESS,
        payload: data.reviews,
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
      const config = {
        withCredentials: true, 
      };
  
      const { data } = await axios.delete(
        `https://ecommerce-website-nuyo.onrender.com/api/v1/reviews?id=${reviewId}&productId=${productId}`,config
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
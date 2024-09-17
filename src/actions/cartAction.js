import axios from "axios"
import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstants";


export const addItemsToCart = (id,quantity) => async(dispatch,getState) => {

  const config = {
    withCredentials: true, 
  };
    const {data} = await axios.get(`https://ecommerce-website-nuyo.onrender.com/api/v1/product/${id}`,config);

    dispatch({
        type:ADD_TO_CART,
        payload:{
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stocks: data.product.stocks,
            quantity
        }

    });

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
};


export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };
  
  // SAVE SHIPPING INFO
  export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: data,
    });
  
    localStorage.setItem("shippingInfo", JSON.stringify(data));
  };
  
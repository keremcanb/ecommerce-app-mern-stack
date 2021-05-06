import { get } from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD
} from '../constants/cartConstants';
// Add to cart
// Take id and qty from url
// Save entire cart to localstorage, with getState take entire state tree
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const {
    data: { _id, name, price, image, countInStock }
  } = await get(`/api/products/${id}`);
  dispatch({ type: CART_ADD_ITEM, payload: { product: _id, name, image, price, countInStock, qty } });
  // After dispatch save in localstorage, get js object, stringify it
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
// Remove from cart
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
// Save shipping address
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};
// Save payment method
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
  localStorage.setItem('paymentMethod', JSON.stringify(data));
};

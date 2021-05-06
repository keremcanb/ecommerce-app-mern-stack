import axios, { get, put, post } from 'axios';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL
} from '../constants/productConstants';
import { logout } from './userActions';
// List products (Also handle keyword & pagenumber)
export const listProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    });
  }
};
// List product details
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    });
  }
};
// Delete product
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    const { userLogin } = getState();
    await axios.delete(`/api/products/${id}`, { headers: { Authorization: `Bearer ${userLogin.userInfo.token}` } });
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (err) {
    const message = err.response && err.response.data.message ? err.response.data.message : err.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
  }
};
// Create product
export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    const { userLogin } = getState();
    const { data } = await post(
      `/api/products`,
      {},
      { headers: { Authorization: `Bearer ${userLogin.userInfo.token}` } }
    );
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (err) {
    const message = err.response && err.response.data.message ? err.response.data.message : err.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
  }
};
// Update product
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });
    const { userLogin } = getState();
    const { data } = await put(`/api/products/${product._id}`, product, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userLogin.userInfo.token}`
      }
    });
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (err) {
    const message = err.response && err.response.data.message ? err.response.data.message : err.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({ type: PRODUCT_UPDATE_FAIL, payload: message });
  }
};
// Product reviews
export const createProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });
    const { userLogin } = getState();
    await post(`/api/products/${productId}/reviews`, review, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userLogin.userInfo.token}`
      }
    });
    dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
  } catch (err) {
    const message = err.response && err.response.data.message ? err.response.data.message : err.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({ type: PRODUCT_CREATE_REVIEW_FAIL, payload: message });
  }
};
// List top products
export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });
    const { data } = await get(`/api/products/top`);
    dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    });
  }
};

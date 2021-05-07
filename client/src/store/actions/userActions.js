import axios, { post, get, put } from 'axios';
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_RESET,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST
} from '../constants/userConstants';
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await post('/api/users/login', { email, password });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    // Set user to local storage, has to be string to save to localStorage
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const { data } = await post('/api/users', { name, email, password });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    // Get logged in user info (token) with Redux getState method
    const { userLogin } = getState();
    const { data } = await get(`/api/users/${id}`, {
      headers: { Authorization: `Bearer ${userLogin.userInfo.token}` }
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
    const { userLogin } = getState();
    const { data } = await put(`/api/users/profile`, user, {
      headers: { Authorization: `Bearer ${userLogin.userInfo.token}` }
    });
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const { userLogin } = getState();
    const { data } = await get(`/api/users`, { headers: { Authorization: `Bearer ${userLogin.userInfo.token}` } });
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });
    const { userLogin } = getState();
    await axios.delete(`/api/users/${id}`, { headers: { Authorization: `Bearer ${userLogin.userInfo.token}` } });
    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (err) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });
    const { userLogin } = getState();
    const { data } = await put(`/api/users/${user._id}`, user, {
      headers: { Authorization: `Bearer ${userLogin.userInfo.token}` }
    });
    dispatch({ type: USER_UPDATE_SUCCESS });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
  dispatch({ type: USER_LIST_RESET });
};

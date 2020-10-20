import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL
  //   ORDER_DETAILS_REQUEST,
  //   ORDER_DETAILS_SUCCESS,
  //   ORDER_DETAILS_FAIL,
  //   ORDER_PAY_REQUEST,
  //   ORDER_PAY_FAIL,
  //   ORDER_PAY_SUCCESS,
  //   ORDER_PAY_RESET,
  //   ORDER_LIST_MY_REQUEST,
  //   ORDER_LIST_MY_SUCCESS,
  //   ORDER_LIST_MY_FAIL,
  //   ORDER_LIST_MY_RESET,
  //   ORDER_LIST_FAIL,
  //   ORDER_LIST_SUCCESS,
  //   ORDER_LIST_REQUEST,
  //   ORDER_DELIVER_FAIL,
  //   ORDER_DELIVER_SUCCESS,
  //   ORDER_DELIVER_REQUEST,
  //   ORDER_DELIVER_RESET,
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        orders: payload
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};

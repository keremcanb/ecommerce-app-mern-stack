/* eslint-disable no-else-return */
/* eslint-disable no-case-declarations */
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD
} from '../constants/cartConstants';

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ADD_ITEM:
      const item = payload;
      // Check if item exists
      // if product id (x.product) is equal to current item
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          // Map through current cart items
          // If current item id is equal to exist item id, then return item
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          )
        };
        // If it doesn't exist we will push it to array
      } else
        return {
          // Take all items in the state
          ...state,
          // Set to an array of current items and add new item
          cartItems: [...state.cartItems, item]
        };

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== payload)
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payload
      };

    default:
      return state;
  }
};

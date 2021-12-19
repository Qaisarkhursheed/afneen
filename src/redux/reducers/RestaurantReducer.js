import {
  RESTAURANT_LOGIN,
  MERCHANT_CREDIT_CARD,
  RESTAURANT_SIGNUP,
  ADD_PAYMENT,
  GET_ALL_CUISINES,
  ORDER,
  ORDER_METHOD,
  CREATE_ORDER,
  PLACE_ORDER,
  GET_ALL_PACKAGES,
  INFORMATION,
  GET_RESTAURANT,
  GET_RESTAURANTS,
  GET_MENU,
  GET_PUBLISHABLE_KEY,
  BILL,
  GET_CLIENT_ID,
  SEARCH_MERCHANT,
  RESTAURANT_INFO_ADD,
  GET_OPENING, 
  ADD_TABLE_BOOKING,
  GET_SINGLE_VOUCHER,
  SET_CHECKEDOUT,
  EDIT_VOUCHER,
  RESTAURANT,
  GET_MERCHANT_RATING,
  CART_ITEM,
} from "../actions/actions";
import uuid from "uuid/dist/v4";

const defaultState = {
  moveToNextStep1: false,
  moveToNextStep2: false,
  cuisines: [],
  creditCards: [],
  orderMethod: "Delivery",
  orderInformation: {},
  finalOrder: {},
  isOrderPlacing: false,
  isOrderPlaced: false,
  isLoading: false,
  orders: [],
  sub_total: 0,
  order: {},
  paymentInformation: {},
  publishable_key: "",
  restaurantInfo: {},
  isGettingRestaurantInfo: false,
  restaurantsList: [],
  menu: [],
  packages: [],
  current:{},
  isGettingPublishKey: false,
  isGettingClientId: false,
  restaurantsInfo: {},
  openinghours: {},
  isAddingTableBooking: false,
  voucher: undefined,
  isGettingVoucher: false,
  voucher_discount: 0,
  isCheckedout: false,
  ratings: [],
isGettingRating: false,
isGettingCuisines: false,
isGettingPackages: false,
};

const RestaurantReducer = (state = defaultState, action) => {
  switch (action.type) {
    case `${RESTAURANT_LOGIN}_REQUEST`:
      return { ...state };
    case `${RESTAURANT_LOGIN}_SUCCESS`:
      return { ...state };
    case `${RESTAURANT_LOGIN}_FAILURE`:
      return { ...state };
    case `${GET_ALL_CUISINES}_REQUEST`:
      return { ...state, cuisines: [], isGettingCuisines: true };
    case `${GET_ALL_CUISINES}_SUCCESS`:
      return { ...state, cuisines: action.payload, isGettingCuisines: false };
    case `${GET_ALL_CUISINES}_FAILURE`:
      return { ...state, cuisines: [], isGettingCuisines: false };
    case `${GET_ALL_PACKAGES}_REQUEST`:
      return { ...state, packages: [], isGettingPackages: true };
    case `${GET_ALL_PACKAGES}_SUCCESS`:
      return { ...state, packages: action.payload, isGettingPackages: false };
    case `${GET_ALL_PACKAGES}_FAILURE`:
      return { ...state, packages: [], isGettingPackages: false };
    // case `${RESTAURANT_SIGNUP}_REQUEST`:
    //   return { ...state, moveToNextStep1: false, moveToNextStep2: false };
    // case `${RESTAURANT_SIGNUP}_SUCCESS`:
    //   return { ...state, moveToNextStep1: true, moveToNextStep2: false };
    // case `${RESTAURANT_SIGNUP}_FAILURE`:
    //   return { ...state, moveToNextStep1: false, moveToNextStep2: false };
    case `${RESTAURANT_INFO_ADD}_ADD`:
      return { ...state, moveToNextStep1: true, moveToNextStep2: false, restaurantsInfo: action.payload };
    case `${RESTAURANT_SIGNUP}_REQUEST`:
      return { ...state, moveToNextStep1: false, moveToNextStep2: false };
    case `${RESTAURANT_SIGNUP}_SUCCESS`:
      return { ...state, moveToNextStep1: true, moveToNextStep2: true };
    case `${RESTAURANT_SIGNUP}_FAILURE`:
        return { ...state, moveToNextStep1: false, moveToNextStep2: false };
    // case `${ADD_PAYMENT}_REQUEST`:
    //   return { ...state, moveToNextStep1: false, moveToNextStep2: false };
    // case `${ADD_PAYMENT}_SUCCESS`:
    //   return { ...state, moveToNextStep1: false, moveToNextStep2: true };
    // case `${ADD_PAYMENT}_FAILURE`:
    //   return { ...state, moveToNextStep1: false, moveToNextStep2: false };
    case `${GET_PUBLISHABLE_KEY}_REQUEST`:
      return { ...state, isGettingPublishKey: true };
    case `${GET_PUBLISHABLE_KEY}_SUCCESS`:
      return { ...state, publishable_key: action.payload, isGettingPublishKey: false };
    case `${GET_PUBLISHABLE_KEY}_FAILURE`:
      return { ...state, isGettingPublishKey: false, publishable_key: "" };
    case `${GET_CLIENT_ID}_REQUEST`:
        return { ...state, isGettingClientId: true };
    case `${GET_CLIENT_ID}_SUCCESS`:
        return { ...state, client_id: action.payload, isGettingClientId: false };
    case `${GET_CLIENT_ID}_FAILURE`:
        return { ...state, isGettingClientId: false, publishable_key: "" };
    case `${MERCHANT_CREDIT_CARD}_ADD`:
      return {
        ...state,
        creditCards: [
          ...state.creditCards,
          { ...action.payload, uuid: uuid() },
        ],
      };
    case `${ORDER}_ADD`:
      const orders = [...state.orders, { ...action.payload, uuid: uuid() }];
      return {
        ...state,
        orders: orders,
        sub_total: orders.map(item=> item.total_bill).reduce((a, b) => a + b, 0)
      };
    case `${ORDER}_EDIT`:
      const newOrders = state.orders.map((record) => {
          if (record.uuid === action.payload.uuid) {
            return action.payload;
          }
          return record;
        });
        console.log(newOrders);
      return {
        ...state,
        orders: newOrders,
        sub_total: newOrders.map(item=> item.total_bill).reduce((a, b) => a + b, 0)
      };
      case `${CART_ITEM}_INCREMENT`:
        const quantity_inc = state.orders.filter((record) => {
          if(record.uuid === action.payload.uuid){
            record.quantity++;
             return record;
          }
            return record;
        });
          console.log(quantity_inc);
        return {
          ...state,
          orders: quantity_inc,
          sub_total:  state.sub_total + parseFloat(action.payload.price)
        };
        case `${CART_ITEM}_DECREMENT`:
          const quantity_dec = state.orders.filter((record) => {
            if(record.uuid === action.payload.uuid){
              record.quantity--;
               return record;
            }
              return record;
          });
          return {
            ...state,
            orders: quantity_dec,
            sub_total: state.sub_total - parseFloat(action.payload.price)
          };
    case `${ORDER}_DELETE`:
      const orderAfterDel = state.orders.filter((record) => record.uuid !== action.payload.uuid);
      console.log(orderAfterDel);
      return {
        ...state,
        orders: orderAfterDel,
        sub_total: orderAfterDel.map(item=> item.total_bill).reduce((a, b) => a + b, 0)
      };
    case `${ORDER_METHOD}_ADD`:
      return { ...state, orderMethod: action.payload };
    case `${CREATE_ORDER}_ADD`:
      return { ...state, orderInformation: action.payload };
    case `${INFORMATION}_ADD`:
      return {
        ...state,
        paymentInformation: {
          ...state.paymentInformation,
          ...action.payload,
        },
      };
    case `${BILL}_ADD`:
      return { ...state, finalOrder: action.payload };
    case `${PLACE_ORDER}_REQUEST`:
      return {
        ...state,
        isOrderPlacing: true,
      };
    case `${PLACE_ORDER}_SUCCESS`:
      return {
        ...state,
        isOrderPlacing: false,
        isOrderPlaced: true,
        finalOrder: {
          ...state.finalOrder,
          ...action.payload
        },
      };
    case `${PLACE_ORDER}_FAILURE`:
      return {
        ...state,
        isOrderPlacing: false,
        isOrderPlaced: false,
      };
      case `${GET_RESTAURANT}_REQUEST`:
        return { ...state, isGettingRestaurantInfo: true,};
      case `${GET_RESTAURANT}_SUCCESS`:
        return { ...state, isGettingRestaurantInfo: false, restaurantInfo: action.payload };
      case `${GET_RESTAURANT}_FAILURE`:
        return { ...state, isGettingRestaurantInfo: false,};
    case `${GET_RESTAURANTS}_REQUEST`:
      return { ...state, isLoading: true,};
    case `${GET_RESTAURANTS}_SUCCESS`:
      return { ...state, isLoading: false, restaurantsList: action.payload };
    case `${GET_RESTAURANTS}_FAILURE`:
      return { ...state, isLoading: false, restaurantsList: [] };
    case `${SEARCH_MERCHANT}_REQUEST`:
      return { ...state, isLoading: true, restaurantsList: [] };
    case `${SEARCH_MERCHANT}_SUCCESS`:
      return { ...state, isLoading: false, restaurantsList: action.payload };
    case `${SEARCH_MERCHANT}_FAILURE`:
        return { ...state, isLoading: false, restaurantsList: [] };
    case `${GET_MENU}_REQUEST`:
      return { ...state, isLoading: true, menu: [] };
    case `${GET_MENU}_SUCCESS`:
      return { ...state, isLoading: false, menu: action.payload };
    case `${GET_MENU}_FAILURE`:
      return { ...state, isLoading: false, menu: [] };
    case `${GET_OPENING}_REQUEST`:
      return { ...state, isLoading: true, openinghours: [] };
    case `${GET_OPENING}_SUCCESS`:
      return { ...state, isLoading: false, openinghours: action.payload };
    case `${GET_OPENING}_FAILURE`:
      return { ...state, isLoading: false, openinghours: [] };
    case `${ADD_TABLE_BOOKING}_REQUEST`:
      return { ...state, isAddingTableBooking: true};
    case `${ADD_TABLE_BOOKING}_SUCCESS`:
      return { ...state, isAddingTableBooking: false};
    case `${ADD_TABLE_BOOKING}_FAILURE`:
      return { ...state, isAddingTableBooking: false};
    case `${GET_SINGLE_VOUCHER}_REQUEST`:
      return { ...state, isGettingVoucher: true, voucher: undefined, voucher_discount: 0 };
    case `${GET_SINGLE_VOUCHER}_SUCCESS`:
      return {
        ...state,
        isGettingVoucher: false,
        voucher: action.payload,
        voucher_discount: action.payload.discount,
      };
    case `${GET_SINGLE_VOUCHER}_FAILURE`:
      return { ...state, isGettingVoucher: false, voucher: undefined, voucher_discount: 0 };
    case `${MERCHANT_CREDIT_CARD}_ADD`:
      return {
        ...state,
        creditCards: [
          ...state.creditCards,
          { ...action.payload, uuid: uuid() },
        ],
      };
    case `${SET_CHECKEDOUT}_ADD`:
      return {
        ...state,
        isCheckedout: action.payload,
      };
    case `${RESTAURANT}_CLEAR`:
      return defaultState;
    case `${GET_MERCHANT_RATING}_REQUEST`:
        return { ...state, isGettingRating: true };
    case `${GET_MERCHANT_RATING}_SUCCESS`:
        return { ...state, ratings: action.payload, isGettingRating: false };
    case `${GET_MERCHANT_RATING}_FAILURE`:
        return { ...state, isGettingRating: false };
    default:
      return state;
  }
};

export default RestaurantReducer;

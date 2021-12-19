import { takeLatest, call, put } from "redux-saga/effects";
// import { push } from 'react-router-redux';
import { message } from "antd";
import {
  asyncActionGenerator,
  RESTAURANT_SIGNUP,
  ADD_PAYMENT,
  GET_CUISINE,
  GET_ALL_CUISINES,
  GET_ALL_PACKAGES,
  GET_RESTAURANTS,
  GET_RESTAURANT,
  GET_CLIENT_ID,
  GET_MENU,
  GET_PUBLISHABLE_KEY,
  PLACE_ORDER,
  SEARCH_MERCHANT,
  GET_OPENING,
  ADD_TABLE_BOOKING,
  GET_SINGLE_VOUCHER,
  EDIT_VOUCHER,
  RESTAURANT,
  GET_MERCHANT_RATING,
} from "../actions";
import {
  addTableBooking,
  getOpening,
  restaurantSignup,
  addPayment,
  getAllPackages,
  getAllCuisines,
  getRestaurantInfo,
  getAllRestaurants,
  getMenu,
  getPublishableKey,
  placeOrder,
  getClientKey,
  search,
  getSingleVoucher,
  editVoucher,
  getMerchantRating
} from "../../services/Restaurant";
import { push } from "react-router-redux";

const searchActions = asyncActionGenerator(SEARCH_MERCHANT);
const signupActions = asyncActionGenerator(RESTAURANT_SIGNUP);
const addPaymentActions = asyncActionGenerator(ADD_PAYMENT);
const getCuisineActions = asyncActionGenerator(GET_ALL_CUISINES);
const getAllPackagesActions = asyncActionGenerator(GET_ALL_PACKAGES);
const getRestaurantInfoActions = asyncActionGenerator(GET_RESTAURANT);
const getAllRestaurantsActions = asyncActionGenerator(GET_RESTAURANTS);
const getMenuActions = asyncActionGenerator(GET_MENU);
const getPublishKeyActions = asyncActionGenerator(GET_PUBLISHABLE_KEY);
const getClientKeyActions = asyncActionGenerator(GET_CLIENT_ID);
const placeOrderActions = asyncActionGenerator(PLACE_ORDER);
const gethoursActions = asyncActionGenerator(GET_OPENING);
const bookActions = asyncActionGenerator(ADD_TABLE_BOOKING);
const voucherActions = asyncActionGenerator(GET_SINGLE_VOUCHER);
const voucherEditActions = asyncActionGenerator(EDIT_VOUCHER);
const merchantRatingActions = asyncActionGenerator(GET_MERCHANT_RATING);
const clearAction = asyncActionGenerator(RESTAURANT);

function* handleSignupFunc(action) {
  try {
    yield call(restaurantSignup, action.payload);
    message.success("Restaurant Registred");
    yield put(signupActions.success());
    yield put(clearAction.clear());
  } catch (error) {
    yield put(signupActions.failure());
    message.error("Something Went Wrong");
  }
}

function* handleAddPaymentFunc(action) {
  try {
    yield call(addPayment, action.payload);
    yield put(addPaymentActions.success());
  } catch (error) {
    yield put(addPaymentActions.failure());
    message.error("Something Went Wrong");
  }
}

function* handleBookTableFunc(action) {
  try {
    yield call(addTableBooking, action.payload);
    yield put(bookActions.success());
    message.success('Your Table has been booked');
  } catch (error) {
    yield put(bookActions.failure());
    message.error("Something Went Wrong");
  }
}

function* handleGetAllCuisineFunc(action) {
  try {
    const response = yield call(getAllCuisines, action.payload);
    console.log(response);
    yield put(getCuisineActions.success(response.data.data));
  } catch (error) {
    yield put(getCuisineActions.failure());
    message.error("Something Went Wrong");
  }
}
function* handleGetAllPackagesFunc(action) {
  try {
    const response = yield call(getAllPackages, action.payload);
    console.log(response);
    yield put(getAllPackagesActions.success(response.data.data));
  } catch (error) {
    yield put(getAllPackagesActions.failure());
    message.error("Something Went Wrong");
  }
}
function* handleGetRestaurantInfoFunc(action) {
  try {
    const response = yield call(getRestaurantInfo, action.payload);
    console.log(response);
    yield put(getRestaurantInfoActions.success(response.data.data));
  } catch (error) {
    yield put(getRestaurantInfoActions.failure());
    message.error("Something Went Wrong");
  }
}
function* handleGetAllRestaurantsFunc(action) {
  try {
    const response = yield call(getAllRestaurants, action.payload);
    console.log(response);
    yield put(getAllRestaurantsActions.success(response.data.data));
  } catch (error) {
    yield put(getAllRestaurantsActions.failure());
    message.error("Something Went Wrong");
  }
}
function* handleGetOpeningFunc(action) {
  try {
    const response = yield call(getOpening, action.payload);
    console.log(response);
    yield put(gethoursActions.success(response.data.data));
  } catch (error) {
    yield put(gethoursActions.failure());
    message.error("Something Went Wrong");
  }
}
function* handleGetAllRestaurantFunc(action) {
  try {
    const response = yield call(getAllRestaurants);
    console.log(response);
    yield put(getAllPackagesActions.success(response.data.data));
  } catch (error) {
    yield put(getAllPackagesActions.failure());
    message.error("Something Went Wrong");
  }
}
function* handleGetMenuFunc(action) {
  try {
    const response = yield call(getMenu, action.payload);
    console.log(response);
    yield put(getMenuActions.success(response.data.data));
  } catch (error) {
    yield put(getMenuActions.failure());
    message.error("Something Went Wrong");
  }
}
function* handleGetPublishKeyFunc() {
  try {
    const response = yield call(getPublishableKey);
    console.log(response);
    yield put(getPublishKeyActions.success(response.data.publishable_key));
  } catch (error) {
    yield put(getPublishKeyActions.failure());
    message.error("Something Went Wrong");
  }
}
function* handleGetClientKeyFunc() {
  try {
    const response = yield call(getClientKey);
    yield put(getClientKeyActions.success(response.data.client_id));
  } catch (error) {
    yield put(getClientKeyActions.failure());
    message.error("Something Went Wrong");
  }
}
function* handlePlaceOrderFunc(action) {
  try {
    const {voucher} = action.payload;
    const response = yield call(placeOrder,action.payload);
    yield put(placeOrderActions.success());
    message.success('Your order has been placed');
    yield put(clearAction.clear());
    yield put(voucherEditActions.request(voucher));
    yield put(push('/receipt'));
  } catch (error) {
    yield put(placeOrderActions.failure());
    message.error("Something Went Wrong");
  }
}
function* handleSearchFunc(action) {
  try {
    const response = yield call(search, action.payload);
    yield put(searchActions.success(response.data.data));
    yield put(push('/pick-restaurant'));
  } catch (error) {
    yield put(searchActions.failure());
    message.error("Could not get restaurants");
  }
}
function* handleGetSingleVoucherFunc(action) {
  try {
    const {user_id, merchant_name}  = action.payload;
    const response = yield call(getSingleVoucher, action.payload);
    if(response.data.data.used_by.includes(user_id)) {
    yield put(voucherActions.failure());
      message.info('Already Availed');
    }
    else if (response.data.data.restaurant_name !== merchant_name) {
      yield put(voucherActions.failure());
      message.info('Not Applicable to this restaurant.');
    }
    else {
      yield put(voucherActions.success(response.data.data));
      message.success('Voucher Added.');
    }
  } catch (error) {
    yield put(voucherActions.failure());
    message.error("Could not find voucher.");
  }
}
function* handleEditVoucherFunc(action) {
  try {
    if(action.payload.used_by) {
      const cat = action.payload.used_by + `,${action.payload.user_id}`;
      yield call(editVoucher, {id: action.payload.id, used_by: cat});
    } else {
      yield call(editVoucher, {id: action.payload.id, used_by: action.payload.user_id});
      yield put(voucherEditActions.success());
    }
  } catch (error) {
    yield put(voucherEditActions.failure());
  }
}
function* handleMerhantRatingFunc(action) {
  try {
    const response = yield call(getMerchantRating, action.payload);
    yield put(merchantRatingActions.success(response.data.data));
  } catch (error) {
    yield put(merchantRatingActions.failure());
    message.error("Could not get ratings");
  }
}
export function* handleRestaurantSignup() {
  yield takeLatest(`${RESTAURANT_SIGNUP}_REQUEST`, handleSignupFunc);
}
export function* handleAddPayment() {
  yield takeLatest(`${ADD_PAYMENT}_REQUEST`, handleAddPaymentFunc);
}
export function* handleGetCuisine() {
  yield takeLatest(`${GET_ALL_CUISINES}_REQUEST`, handleGetAllCuisineFunc);
}
export function* handleGetAllPackages() {
  yield takeLatest(`${GET_ALL_PACKAGES}_REQUEST`, handleGetAllPackagesFunc);
}
export function* handleGetRestaurantInfo() {
  yield takeLatest(`${GET_RESTAURANT}_REQUEST`, handleGetRestaurantInfoFunc);
}
export function* handleGetRestaurants() {
  yield takeLatest(`${GET_RESTAURANTS}_REQUEST`, handleGetAllRestaurantsFunc);
}
export function* handleGetMenu() {
  yield takeLatest(`${GET_MENU}_REQUEST`, handleGetMenuFunc);
}
export function* handleGetPublishKey() {
  yield takeLatest(`${GET_PUBLISHABLE_KEY}_REQUEST`, handleGetPublishKeyFunc);
}
export function* handleGetClientKey() {
  yield takeLatest(`${GET_CLIENT_ID}_REQUEST`, handleGetClientKeyFunc);
}
export function* handlePlaceOrder() {
  yield takeLatest(`${PLACE_ORDER}_REQUEST`, handlePlaceOrderFunc);
}
export function* handleSearch() {
  yield takeLatest(`${SEARCH_MERCHANT}_REQUEST`, handleSearchFunc);
}
export function* handleGetOpening() {
  yield takeLatest(`${GET_OPENING}_REQUEST`, handleGetOpeningFunc);
}
export function* handleBookTable() {
  yield takeLatest(`${ADD_TABLE_BOOKING}_REQUEST`, handleBookTableFunc);
}
export function* handleGetVoucher() {
  yield takeLatest(`${GET_SINGLE_VOUCHER}_REQUEST`, handleGetSingleVoucherFunc);
}
export function* handleVoucherEdit() {
  yield takeLatest(`${EDIT_VOUCHER}_REQUEST`, handleEditVoucherFunc);
}
export function* handleMerhantRating() {
  yield takeLatest(`${GET_MERCHANT_RATING}_REQUEST`, handleMerhantRatingFunc);
}
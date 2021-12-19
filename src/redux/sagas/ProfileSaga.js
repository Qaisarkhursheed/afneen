import { takeLatest, call, put } from 'redux-saga/effects';
import { message } from 'antd'; 
import {
  asyncActionGenerator,
  setError,
  CHANGE_PASSWORD,
  SAVE_ADDRESS,
  SAVE_CREDIT,
  SAVE_PROFILE,
  UPLOAD_PICTURE,
  GET_ADDRESS,
  GET_CREDIT_CARD,
  GET_PROFILE,
  UPDATE_ADDRESS,
  DELETE_ADDRESS,
  DELETE_CREDIT,
  UPDATE_CREDIT,
  GET_VOUCHERS,
  GET_ORDERS,
  GET_BOOKING,
  GET_RATING,
  EDIT_RATING,
  DELETE_RATING,
  ADD_FAVORITE,
  GET_FAVORITE,
  REMOVE_FAVORITE,
  ADD_RATING,
} from '../actions';
import {
  changePassword,
  saveProfile,
  saveAddress,
  deleteAddress,
  editCredtCard,
  getAddress,
  getCreditCard,
  getProfile,
  editAddress,
  deleteCredit,
  saveCredit,
  uploadPicture,
  getOrders,
  getVouchers,
  getBooking,
  getRating,
  editRating,
  deleteRating,
  getFavourites,
  addFavorites,
  removeFavourite,
  addRating
} from '../../services/User';

const changePasswordActions = asyncActionGenerator(CHANGE_PASSWORD);
const addressActions = asyncActionGenerator(SAVE_ADDRESS);
const creditActions = asyncActionGenerator(SAVE_CREDIT);
const profileActions = asyncActionGenerator(SAVE_PROFILE);
const pictureActions = asyncActionGenerator(UPLOAD_PICTURE);
const getAddressActions = asyncActionGenerator(GET_ADDRESS);
const getCreditActions = asyncActionGenerator(GET_CREDIT_CARD);
const getProfileActions = asyncActionGenerator(GET_PROFILE);
const deleteAddressActions = asyncActionGenerator(DELETE_ADDRESS);
const deleteCreditActions = asyncActionGenerator(DELETE_CREDIT);
const getBookingActions = asyncActionGenerator(GET_BOOKING);
const getOrderActions = asyncActionGenerator(GET_ORDERS);
const getVoucherActions = asyncActionGenerator(GET_VOUCHERS);
const getRatingActions = asyncActionGenerator(GET_RATING);
const addRatingActions = asyncActionGenerator(ADD_RATING);
const editRatingActions = asyncActionGenerator(EDIT_RATING);
const deleteRatingActions = asyncActionGenerator(DELETE_RATING);
const getFavActions = asyncActionGenerator(GET_FAVORITE);
const removeFavActions = asyncActionGenerator(REMOVE_FAVORITE);
const addFavActions = asyncActionGenerator(ADD_FAVORITE);

function* handleChangePasswordFunc(action) {
  try {
    yield call(changePassword, action.payload);
    yield put(changePasswordActions.success());
    message.success('Updated Successfully');
  } catch (error) {
    yield put(changePasswordActions.failure());
    if(error.response) yield put(setError('Error Occured.'))
    // message.error("Something Went Wrong");
  }
}
function* handleSaveAdressFunc(action) {
  try {
    yield call(saveAddress, action.payload);
    yield put(addressActions.success());
    yield put(getAddressActions.request({user_id: action.payload.user_id}));
    message.success('Updated Successfully');
  } catch (error) {
    yield put(addressActions.failure());
    if(error.response) yield put(setError('Error Occured.'));
    // message.error("Something Went Wrong");
  }
}
function* handleEditAddressFunc(action) {
  try {
    const response = yield call(editAddress, action.payload);
    const {user_id} = action.payload;
    yield put(addressActions.success());
    yield put(getAddressActions.request({user_id}));
    message.success('Updated Successfully');
  } catch (error) {
    yield put(addressActions.failure());
    if(error.response) yield put(setError('Error Occured.'))
    // message.error("Something Went Wrong");
  }
}
function* handleSaveCreditFunc(action) {
  try {
    yield call(saveCredit, action.payload);
    const {user_id} = action.payload;
    yield put(creditActions.success());
    yield put(getCreditActions.request({user_id}))
    message.success('Card Added');
  } catch (error) {
    yield put(creditActions.failure());
    if(error.response) yield put(setError('Error Occured.'))
    // message.error("Something Went Wrong");
  }
}
function* handleEditCreditFunc(action) {
  try {
    yield call(editCredtCard, action.payload);
    yield put(creditActions.success());
    const {user_id} = action.payload;
    yield put(getCreditActions.request({user_id}));
    message.success('Updated Successfully');
  } catch (error) {
    yield put(creditActions.failure());
    // message.error("Something Went Wrong");
  }
}
function* handleSaveProfileFunc(action) {
  try {
    const response =  yield call(saveProfile, action.payload);
    yield put(profileActions.success(response.data.data));
    message.success('Updated Successfully');
  } catch (error) {
    yield put(profileActions.failure());
    if(error.response) yield put(setError('Error Occured.'));
    // message.error("Something Went Wrong");
  }
}
function* handleUploadPictureFunc(action) {
  try {
    const response =  yield call(uploadPicture, action.payload);
    console.log(response);
    yield put(pictureActions.success());
  } catch (error) {
    yield put(pictureActions.failure());
    if(error.response) yield put(setError('Error Occured.'))
    // message.error("Something Went Wrong");
  }
}

function* handleGetAddressFunc(action) {
  try {
    const response = yield call(getAddress, action.payload);
    yield put(getAddressActions.success(response.data.data[0].address));
  } catch (error) {
    yield put(getAddressActions.failure());
    if(error.response) yield put(setError('Error Occured.'))
    // message.error("Something Went Wrong");
  }
}
function* handleGetCreditFunc(action) {
  try {
    const response = yield call(getCreditCard, action.payload);
    yield put(getCreditActions.success(response.data.data[0].card_info));
  } catch (error) {
    yield put(getAddressActions.failure());
    // message.error("Something Went Wrong");
  }
}
function* handleGetProfileFunc(action) {
  try {
    const response = yield call(getProfile, action.payload);
    yield put(getProfileActions.success(response.data.data[0]));
  } catch (error) {
    yield put(getProfileActions.failure());
    if(error.response) yield put(setError('Error Occured.'))
    // message.error("Something Went Wrong");
  }
}
function* handleDeleteAddressFunc(action) {
  try {
    const {user_id, id} = action.payload;
    yield call(deleteAddress, {id});
    yield put(deleteAddressActions.success());
    yield put(getAddressActions.request({user_id}))
    message.success("Entry deleted");
  } catch (error) {
    yield put(deleteAddressActions.failure());
    if(error.response) yield put(setError('Error Occured.'))
    // message.error("Something Went Wrong");
  }
}
function* handleDeleteCreditFunc(action) {
  try {
    const {user_id, id} = action.payload;
    yield call(deleteCredit, {id});
    yield put(deleteCreditActions.success());
    yield put(getCreditActions.request({user_id}))
    message.success("Entry deleted");
  } catch (error) {
    yield put(deleteCreditActions.failure());
    // message.error("Something Went Wrong");
  }
}
function* handleGetOrdersFunc(action) {
  try {
    const response = yield call(getOrders, action.payload);
    yield put(getOrderActions.success(response.data.data));
  } catch (error) {
    yield put(getOrderActions.failure());
    // if(error.response) yield put(setError('Something Went Wrong'));
    if(error.response) yield put(setError('Error Occured.'));
  }
}
function* handleGetVouchersFunc() {
  try {
    const response = yield call(getVouchers);
    yield put(getVoucherActions.success(response.data.data));
  } catch (error) {
    yield put(getVoucherActions.failure());
    if(error.response) yield put(setError('Error Occured.'))
    // message.error("Could not get vouchers");
  }
}
function* handleGetBookingFunc(action) {
  try {
    const {user_id} = action.payload;
    const response = yield call(getBooking, {user_id});
    yield put(getBookingActions.success(response.data.data));
  } catch (error) {
    yield put(getBookingActions.failure());
    if(error.response) yield put(setError('Error Occured.'))
    // message.error("Could not get Table bookings.");
  }
}

function* handleGetRatingsFunc(action) {
  try {
    const {user_id} = action.payload;
    const response = yield call(getRating, {user_id});
    yield put(getRatingActions.success(response.data.data));
  } catch (error) {
    yield put(getRatingActions.failure());
    if(error.response) yield put(setError('Error Occured.'))
    // message.error("Could not get Reviews");
  }
}
function* handleEditRatingsFunc(action) {
  try {
    const {user_id} = action.payload;
    yield call(editRating, action.payload);
    yield put(editRatingActions.success());
    yield put(getRatingActions.request({
      user_id
    }));
  } catch (error) {
    yield put(editRatingActions.failure());
    if(error.response) yield put(setError('Error Occured.'))
    // message.error("Could not edit Review");
  }
}
function* handleDeleteRatingFunc(action) {
  try {
    const {user_id} = action.payload;
    yield call(deleteRating, action.payload);
    yield put(deleteRatingActions.success());
    yield put(getRatingActions.request({
      user_id
    }));
  } catch (error) {
    yield put(deleteRatingActions.failure());
    if(error.response) yield put(setError('Error Occured.'))
    // message.error("Could not Delete Review");
  }
}
function* handleAddRatingFunc(action) {
  try {
    yield call(addRating, action.payload);
    yield put(addRatingActions.success());
    yield put(getRatingActions.request(action.payload));
  } catch (error) {
    yield put(addRatingActions.failure());
    if(error.response) yield put(setError('Error Occured.'))
    // message.error("Could not Add a Review");
  }
}
function* handleGetFavsFunc(action) {
  try {
    const response = yield call(getFavourites, action.payload);
    yield put(getFavActions.success(response.data.data));
  } catch (error) {
    yield put(getFavActions.failure());
    if(error.response) yield put(setError('Error Occured.'))
    // message.error("Could not get Favorites.");
  }
}
function* handleAddFavFunc(action) {
  try {
    yield call(addFavorites, action.payload);
    yield put(addFavActions.success());
  } catch (error) {
    yield put(addFavActions.failure());
    if(error.response) yield put(setError('Error Occured.'))
    // message.error("Could not mark favorite.");
  }
}
function* handleRemoveFavFunc(action) {
  try {
    yield call(removeFavourite, action.payload);
    yield put(removeFavActions.success());
    yield put(getFavActions.request(action.payload));
  } catch (error) {
    yield put(removeFavActions.failure());
    if(error.response) yield put(setError('Error Occured.'))
    // message.error("Could not unmark favorite.");
  }
}
export function* handleChangePassword() {
  yield takeLatest(`${CHANGE_PASSWORD}_REQUEST`, handleChangePasswordFunc);
}
export function* handleSaveAdress() {
  yield takeLatest(`${SAVE_ADDRESS}_REQUEST`, handleSaveAdressFunc);
}
export function* handleSaveCredit() {
  yield takeLatest(`${SAVE_CREDIT}_REQUEST`, handleSaveCreditFunc);
}
export function* handleSaveProfile() {
  yield takeLatest(`${SAVE_PROFILE}_REQUEST`, handleSaveProfileFunc);
}
export function* handleUploadPicture() {
  yield takeLatest(`${UPLOAD_PICTURE}_REQUEST`, handleUploadPictureFunc);
}
export function* handleGetAddress() {
  yield takeLatest(`${GET_ADDRESS}_REQUEST`, handleGetAddressFunc);
}
export function* handleGetCredit() {
  yield takeLatest(`${GET_CREDIT_CARD}_REQUEST`, handleGetCreditFunc);
}
export function* handleGetProfile() {
  yield takeLatest(`${GET_PROFILE}_REQUEST`, handleGetProfileFunc);
}
export function* handleEditAddress() {
  yield takeLatest(`${UPDATE_ADDRESS}_REQUEST`, handleEditAddressFunc);
}
export function* handleEditCredit() {
  yield takeLatest(`${UPDATE_CREDIT}_REQUEST`, handleEditCreditFunc);
}
export function* handleDeleteAddress() {
  yield takeLatest(`${DELETE_ADDRESS}_REQUEST`, handleDeleteAddressFunc);
}
export function* handleDeleteCredit() {
  yield takeLatest(`${DELETE_CREDIT}_REQUEST`, handleDeleteCreditFunc);
}
export function* handleGetOrders() {
  yield takeLatest(`${GET_ORDERS}_REQUEST`, handleGetOrdersFunc);
}
export function* handleGetVouchers() {
  yield takeLatest(`${GET_VOUCHERS}_REQUEST`, handleGetVouchersFunc);
}
export function* handleGetBooking() {
  yield takeLatest(`${GET_BOOKING}_REQUEST`, handleGetBookingFunc);
}
export function* handleGetRatings() {
  yield takeLatest(`${GET_RATING}_REQUEST`, handleGetRatingsFunc);
}
export function* handleEditRatings() {
  yield takeLatest(`${EDIT_RATING}_REQUEST`, handleEditRatingsFunc);
}
export function* handleAddRatings() {
  yield takeLatest(`${ADD_RATING}_REQUEST`, handleAddRatingFunc);
}
export function* handleDeleteRating() {
  yield takeLatest(`${DELETE_RATING}_REQUEST`, handleDeleteRatingFunc);
}
export function* handleGetFavs() {
  yield takeLatest(`${GET_FAVORITE}_REQUEST`, handleGetFavsFunc);
}
export function* handleAddFav() {
  yield takeLatest(`${ADD_FAVORITE}_REQUEST`, handleAddFavFunc);
}
export function* handleRemoveFav() {
  yield takeLatest(`${REMOVE_FAVORITE}_REQUEST`, handleRemoveFavFunc);
}
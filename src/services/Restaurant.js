import axios from "axios";
import {Http} from './Http';

// const axio_instance = axios.create({
//   baseURL: `https://devlab.mygastrofox.ch/laravel/public/api/`,
//   responseType: "json",
// });

export const restaurantSignup = (payload) => {
  return Http.post("merchanct/register", payload);
};

export const getAllCuisines = (payload) => {
  return Http.get("cuisine/get", payload);
};
export const getAllPackages = (payload) => {
  return Http.get("package/get", payload);
};
export const addPayment = (payload) => {
  // axios.post("#", payload);
  return true;
};
export const addTableBooking = (payload) => {
  return Http.post("table/add", payload);
};
export const getRestaurantInfo = (payload) => {
  return Http.post("merchanct/get/single", payload);
};
export const getAllRestaurants = (payload) => {
  return Http.get("merchanct/all", payload);
};
export const getOpening = (payload) => {
  return Http.post("openhour/get", payload);
};
export const postOrder = (payload) => {
  Http.post("#", payload);
  return true;
};
export const getMenu = (payload) => {
  return Http.post("menu/getbymerchantid", payload);
};
export const getPublishableKey = (payload) => {
  return Http.get("stripe/get", payload);
};
export const getClientKey = (payload) => {
  return Http.get("paypal/get", payload);
};
export const placeOrder = (payload) => {
  return Http.post("order/add", payload);
};
export const search = payload => {
  return Http.get(`searching/${payload.params}/${payload.query}`, { params: { [payload.params]: `${payload.query}` } });
};
export const getSingleVoucher = payload => {
  return Http.post("vouchar/single/get", payload);
};
export const editVoucher = payload => {
  return Http.post("vouchar/update", payload);
};
export const getMerchantRating = payload => {
  return Http.post("rating/get/merchant", payload);
};
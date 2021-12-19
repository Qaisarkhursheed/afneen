import axios from 'axios';
import {Http} from './Http';

// const axio_instance = axios.create({
//   baseURL: `https://devlab.mygastrofox.ch/laravel/public/api/`,
//   responseType: "application/json",
//   Accept: "application/json",
// });

export const login = payload => {
  return Http.post("login", payload);
};
export const signup = payload => {
  return Http.post("register", payload);
};
export const signupCheck = payload => {
  return Http.post("register/check", payload);
};
export const forgetPassword = payload => {
  axios.post("/", payload);
};
export const recoverPassword = payload => {
  axios.post("/", payload);
};
export const changePassword = payload => {
  return Http.post('changePassword', payload)
}

export const saveProfile = payload => {
  return Http.post('UserEditProfile', payload);
}
export const uploadPicture = payload => {
  // console.log("image=>", payload.avatar.get('file'));
  return Http.post('profile', payload, {headers:{
    "Content-Type": "multipart/form-data"
  }});
}
export const getAddress = payload => {
  return Http.post('UserAddress/getAddress',payload)
}

export const saveAddress = payload => {
  return Http.post('UserAddress', payload);
}
export const editAddress = payload => {
  return Http.post('UserAddress/edit', payload);
}
export const deleteAddress = payload => {
  return Http.post('UserAddress/delete', payload);
}
export const deleteCredit = payload => {
  return Http.post('Usercardinfo/delete', payload);
}

export const getCreditCard = payload => {
  return Http.post('Usercardinfo/getcardinfo', payload);
}
export const saveCredit = payload => {
  return Http.post('addUsercardinfo', payload);
}
export const editCredtCard = payload => {
  return Http.post('Usercardinfo/edit', payload);
}
export const getProfile = payload => {
  return Http.post('user/get', payload)
};
export const getOrders = payload => {
  return Http.post('order/user/get', payload)
};
export const getBooking = payload => {
  return Http.post('table/get/byuser', payload)
};
export const getVouchers = () => {
  return Http.get('vouchar/get')
};
export const voucherAvailed = payload => {
  return Http.post('vouchar/update', payload)
};
export const getRating = payload => {
  return Http.post('rating/get/user', payload)
};
export const addRating = payload => {
  return Http.post('rating/add', payload)
};
export const editRating = payload => {
  return Http.post('rating/update', payload)
};
export const deleteRating = payload => {
  return Http.post('rating/delete', payload)
};
export const getFavourites = payload => {
  return Http.post('favourite/get', payload)
};
export const addFavorites = payload => {
  return Http.post('favourite/add', payload)
};
export const removeFavourite = payload => {
  return Http.post('favourite/delete', payload)
};
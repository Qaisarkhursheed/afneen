import { message } from 'antd';
import axios from 'axios';
import {store} from '../redux';
import { asyncActionGenerator, LOGOUT, setError } from '../redux/actions';

const logoutActions = asyncActionGenerator(LOGOUT);


class Http {
  static async get(url, options = {}) {
    return this._axiosRequest({ method: 'get', url, options });
  }

  static async post(url, data, options) {
    return this._axiosRequest({ method: 'post', url, data, options });
  }

  static async patch(url, data, options) {
    return this._axiosRequest({ method: 'patch', url, data, options });
  }

  static async put(url, data, options) {
    return this._axiosRequest({ method: 'put', url, data, options });
  }

  static async delete(url, data, options) {
    return this._axiosRequest({ method: 'delete', url, data, options });
  }

  // eslint-disable-next-line consistent-return
  static async _axiosRequest({ method, url, data, options }) {
      const {access_token} = store.getState().AuthenticationReducer.loginResponse;
    const _options = {
      headers: { Authorization: `Bearer ${access_token}` },
      ...options,
    };
    try {
      const response = data
        ? await axios[method](`https://devlab.mygastrofox.ch/laravel/public/api/${url}`, data, _options)
        : await axios[method](`https://devlab.mygastrofox.ch/laravel/public/api/${url}`, _options);

      return response;
    } catch (error) {
      if (!error.response) {
        error.response = { data: { message: 'Server not responded.' } };
      }
      const { status, data } = error.response;
      if (status === 401){
          // message.error("Session Expired.");
          store.dispatch(logoutActions.request());
          store.dispatch(setError('Session Expired.'));
      } else {
        // store.dispatch(setError('Error Occured While getting some data.'));
        throw error;
      }
    }
  }
}

export { Http };
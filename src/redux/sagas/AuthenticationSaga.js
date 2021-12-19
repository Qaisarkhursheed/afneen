import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { message } from 'antd'; 
import {
  asyncActionGenerator,
  LOGIN,
  SIGNUP,
  FORGET_PASSWORD,
  LOGOUT,
  RECOVER_PASSWORD,
  SIGNUP_CHECK
} from '../actions';
import { login, signup, forgetPassword, recoverPassword, signupCheck } from '../../services/User';

const loginActions = asyncActionGenerator(LOGIN);
const signupActions = asyncActionGenerator(SIGNUP);
const signupCheckActions = asyncActionGenerator(SIGNUP_CHECK);
const forgetPasswordActions = asyncActionGenerator(FORGET_PASSWORD);
const recoverPasswordActions = asyncActionGenerator(RECOVER_PASSWORD);
const logoutActions = asyncActionGenerator(LOGOUT);

function* handleLoginFunc(action) {
  try {
    const response = yield call(login, action.payload);
    yield put(loginActions.success(response.data));
    message.success("Login okay");
    yield put(push('/profile'));
  } catch (error) {
    yield put(loginActions.failure());
    message.error(error.response.data.message);
  }
}

function* handleSignupCheckFunc(action) {
  try {
    yield call(signupCheck, action.payload);
    yield put(signupCheckActions.success());
  } catch (error) {
    yield put(signupCheckActions.failure());
    message.error("Already exist");
  }
}

function* handleSignupFunc(action) {
  try {
    yield call(signup, action.payload);
    yield put(signupActions.success());
    message.success("Account Successfully created");
  } catch (error) {
    yield put(signupActions.failure());
    message.error("Something Went Wrong");
  }
}

function* handleForgetPasswordFunc(action) {
  try {
    yield call(forgetPassword, action.payload);
    yield put(forgetPasswordActions.success());
  } catch (error) {
    yield put(forgetPasswordActions.failure());
  }
}
function* handleRecoverPasswordFunc(action) {
  try {
    yield call(recoverPassword, action.payload);
    yield put(recoverPasswordActions.success());
  } catch (error) {
    yield put(recoverPasswordActions.failure());
  }
}
function* handleLogoutFunc() {
  yield put(push('/'));
    yield put(logoutActions.success());
  }
export function* handleLogin() {
  yield takeLatest(`${LOGIN}_REQUEST`, handleLoginFunc);
}

export function* handleSignup() {
  yield takeLatest(`${SIGNUP}_REQUEST`, handleSignupFunc);
}

export function* handleSignupCheck() {
  yield takeLatest(`${SIGNUP_CHECK}_REQUEST`, handleSignupCheckFunc);
}

export function* handleForgetPassword() {
  yield takeLatest(`${FORGET_PASSWORD}_REQUEST`, handleForgetPasswordFunc);
}
export function* handleRecoverPassword() {
  yield takeLatest(`${RECOVER_PASSWORD}_REQUEST`, handleRecoverPasswordFunc);
}
export function* handleLogout() {
  yield takeLatest(`${LOGOUT}_REQUEST`, handleLogoutFunc);
}
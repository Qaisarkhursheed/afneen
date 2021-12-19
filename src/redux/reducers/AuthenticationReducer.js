import {LOGIN,SIGNUP,FORGET_PASSWORD, LOGOUT, SIGNUP_CHECK} from '../actions/actions';

const defaultState = {
  loginResponse:{},
  isAuthenticated: false,
  isLoggingIn: false,
  isSigning: false,
  isChecking: false,
  getPassword: false,
  isSendingEmail: false,
  ErrorOccurred: false,
  errorMessage: '',
};

const AuthenticationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case `${LOGIN}_REQUEST`:
      return { ...state, isLoggingIn: true  };
    case `${LOGIN}_SUCCESS`:
      return { ...state, 
        isAuthenticated: true,
        loginResponse:action.payload,
        isLoggingIn: false,
      };
      case `${LOGIN}_FAILURE`:
    return { ...state,
      isAuthenticated: false,
      loginResponse:{},
      isLoggingIn: false,
      };
    case `${SIGNUP}_REQUEST`:
      return { ...state, isSigning: true  };
    case `${SIGNUP}_SUCCESS`:
      return { ...state, isSigning: false, getPassword: false};
      case `${SIGNUP}_FAILURE`:
    return { ...state, isSigning: false, };
    case `${SIGNUP_CHECK}_REQUEST`:
      return { ...state, isChecking: true, getPassword: false};
    case `${SIGNUP_CHECK}_SUCCESS`:
      return { ...state, isChecking: false, getPassword: true};
      case `${SIGNUP_CHECK}_FAILURE`:
    return { ...state, isChecking: false, getPassword: false };
    case `${FORGET_PASSWORD}_REQUEST`:
      return { ...state, isSendingEmail: true  };
    case `${FORGET_PASSWORD}_SUCCESS`:
      return { ...state, isSendingEmail: false };
      case `${FORGET_PASSWORD}_FAILURE`:
    return { ...state, isSendingEmail: false };
    case `${LOGOUT}_REQUEST`:
      return { ...state  };
    case `${LOGOUT}_SUCCESS`:
      return { ...state,
        isAuthenticated:false,
        loginResponse:{}
      };
    case `${LOGOUT}_FAILURE`:
      return {  ...state,
        isAuthenticated:true, 
      };
    case "ERROR_SET":
      return {
        ...state,
        ErrorOccurred: true,
        errorMessage: action.payload,
      };
    case "ERROR_CLEAR":
      return {
        ...state,
        ErrorOccurred: false,
        errorMessage: '',
      };
    default:
      return state;
  }
};

export default AuthenticationReducer;

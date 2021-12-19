import { 
  ADDRESS,
  CREDIT,
  GET_ADDRESS,
  GET_CREDIT_CARD,
  GET_PROFILE,
  SAVE_PROFILE,
  SAVE_ADDRESS,
  UPDATE_ADDRESS,
  DELETE_ADDRESS,
  SAVE_CREDIT,
  UPDATE_CREDIT,
  DELETE_CREDIT,
  UPLOAD_PICTURE,
  GET_BOOKING,
  GET_VOUCHERS,
  GET_ORDERS,
  GET_RATING,
  EDIT_RATING,
  DELETE_RATING,
  GET_FAVORITE,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  ADD_RATING,
} from '../actions/actions';
import uuid from 'uuid/dist/v4';

const defaultState = {
  address:[],
  creditCards:[],
  profile:{},
  picture: '',
  isGettingProfile: false,
  isSavingProfile: false,
  isGettingAddress: false,
  isSavingAddress: false,
  isGettingCredit: false,
  bookings: [],
  isGettingBooking: false,
  vouchers: [],
  isGettingVouchers: false,
  orders: [],
  isGettingOrders: false,
  ratings: [],
  isGettingRating: false,
  isDeletingRating: false,
  isEditingRating: false,
  isGettingFavorites: false,
  isAddingFavorites: false,
  isRemovingFavorites: false,
  isAddingRating: false,
  favorites: [],
};

const ProfileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case `${GET_PROFILE}_REQUEST`:
      return {
        ...state,
        profile: {},
        isGettingProfile: true,
      };
      case `${GET_PROFILE}_SUCCESS`:
      return {
        ...state,
        profile: action.payload,
        isGettingProfile: false,
      };
      case `${GET_PROFILE}_FAILURE`:
      return {
        ...state,
        profile: {},
        isGettingProfile: false,
      };
    case `${SAVE_PROFILE}_REQUEST`:
      return {
        ...state,
        profile: {},
        isGettingProfile: true,
        isSavingProfile: true,
      };
      case `${SAVE_PROFILE}_SUCCESS`:
      return {
        ...state,
        profile: action.payload,
        isGettingProfile: false,
        isSavingProfile: false,
      };
      case `${SAVE_PROFILE}_FAILURE`:
      return {
        ...state,
        profile: {},
        isGettingProfile: false,
        isSavingProfile: false,
      };
    case `${GET_ADDRESS}_REQUEST`:
      return {
        ...state,
        isGettingAddress: true,
      };
      case `${GET_ADDRESS}_SUCCESS`:
      return {
        ...state,
        address: action.payload,
        isGettingAddress: false,
      };
      case `${GET_ADDRESS}_FAILURE`:
      return {
        ...state,
        address: [],
        isGettingAddress: false,
      };
      case `${SAVE_ADDRESS}_REQUEST`:
      return {
        ...state,
        isGettingAddress: true,
      };
      case `${SAVE_ADDRESS}_SUCCESS`:
      return {
        ...state,
        isGettingAddress: false,
      };
      case `${SAVE_ADDRESS}_FAILURE`:
      return {
        ...state,
        isGettingAddress: false,
      };
      case `${UPDATE_ADDRESS}_REQUEST`:
      return {
        ...state,
        isSavingAddress: true,
      };
      case `${UPDATE_ADDRESS}_SUCCESS`:
      return {
        ...state,
        isSavingAddress: false,
      };
      case `${UPDATE_ADDRESS}_FAILURE`:
      return {
        ...state,
        isSavingAddress: false,
      };
      case `${DELETE_ADDRESS}_REQUEST`:
      return {
        ...state,
        isGettingAddress: true,
      };
      case `${DELETE_ADDRESS}_SUCCESS`:
      return {
        ...state,
        isGettingAddress: false,
      };
      case `${DELETE_ADDRESS}_FAILURE`:
      return {
        ...state,
        isGettingAddress: false,
      };
      case `${GET_CREDIT_CARD}_REQUEST`:
        return {
          ...state,
          creditCards: [],
        };
        case `${GET_CREDIT_CARD}_SUCCESS`:
        return {
          ...state,
          creditCards: action.payload,
        };
        case `${GET_CREDIT_CARD}_FAILURE`:
        return {
          ...state,
          creditCards: [],
        };
        case `${UPLOAD_PICTURE}_REQUEST`:
        return {
          ...state,
          picture: ''
        };
        case `${UPLOAD_PICTURE}_SUCCESS`:
        return {
          ...state,
          picture: action.payload,
        };
        case `${UPLOAD_PICTURE}_FAILURE`:
        return {
          ...state,
          picture: '',
        };
        case `${SAVE_CREDIT}_REQUEST`:
        case `${UPDATE_CREDIT}_REQUEST`:
        case `${DELETE_CREDIT}_REQUEST`:
        return {
          ...state,
          isGettingCredit: true,
        };
        case `${SAVE_CREDIT}_SUCCESS`:
        case `${UPDATE_CREDIT}_SUCCESS`:
        case `${DELETE_CREDIT}_SUCCESS`:
        return {
          ...state,
          isGettingCredit: false,
        };
        case `${SAVE_CREDIT}_FAILURE`:
        case `${UPDATE_CREDIT}_FAILURE`:
        case `${DELETE_CREDIT}_FAILURE`:
        return {
          ...state,
          isGettingCredit: false,
        };
    case `${ADDRESS}_ADD`:
      return { ...state , address: [
        ...state.address,
        { ...action.payload, uuid: uuid() }]
      };
    case `${ADDRESS}_EDIT`:
      return { ...state,
        address: state.address.map(
            record => {
              if (record.uuid === action.payload.record.uuid) {
                return action.payload.record;
              }
              return record;
            }
          ),
      };
    case `${ADDRESS}_DELETE`:
      return {
        ...state,
        address: 
          state.address.filter(
            record => record.uuid !== action.payload.uuid
          )
        ,
      };
      case `${CREDIT}_ADD`:
        return { ...state , creditCards: [
          ...state.creditCards,
          { ...action.payload, uuid: uuid() }]
        };
      case `${CREDIT}_EDIT`:
        return { ...state,
          creditCards: state.creditCards.map(
              record => {
                if (record.uuid === action.payload.record.uuid) {
                  return action.payload.record;
                }
                return record;
              }
            ),
        };
      case `${CREDIT}_DELETE`:
        return { 
          ...state,
          creditCards: 
          state.creditCards.filter(
            record => record.uuid !== action.payload.uuid
          )
        ,
        };
    case `${GET_BOOKING}_REQUEST`:
      return {
        ...state,
        isGettingBooking: true
      };
    case `${GET_BOOKING}_SUCCESS`:
      return {
        ...state,
        isGettingBooking: false,
        bookings: action.payload,
      };
    case `${GET_BOOKING}_FAILURE`:
      return {
        ...state,
        isGettingBooking: false
      };
    case `${GET_VOUCHERS}_REQUEST`:
      return {
        ...state,
        isGettingVouchers: true
      };
    case `${GET_VOUCHERS}_SUCCESS`:
      return {
        ...state,
        isGettingVouchers: false,
        vouchers: action.payload,
      };
    case `${GET_VOUCHERS}_FAILURE`:
      return {
        ...state,
        isGettingVouchers: false
      };
    case `${GET_ORDERS}_REQUEST`:
      return {
        ...state,
        isGettingOrders: true
      };
    case `${GET_ORDERS}_SUCCESS`:
      return {
        ...state,
        isGettingOrders: false,
        orders: action.payload,
      };
    case `${GET_ORDERS}_FAILURE`:
      return {
        ...state,
        isGettingOrders: false
      };
    case `${GET_RATING}_REQUEST`:
      return {
        ...state,
        isGettingRating: true
      };
    case `${GET_RATING}_SUCCESS`:
      return {
        ...state,
        isGettingRating: false,
        ratings: action.payload,
      };
    case `${GET_RATING}_FAILURE`:
      return {
        ...state,
        isGettingRating: false
      };
    case `${EDIT_RATING}_REQUEST`:
      return {
        ...state,
        isEditingRating: true
      };
    case `${EDIT_RATING}_SUCCESS`:
      return {
        ...state,
        isEditingRating: false,
      };
    case `${EDIT_RATING}_FAILURE`:
      return {
        ...state,
        isEditingRating: false
      };
    case `${ADD_RATING}_REQUEST`:
      return {
        ...state,
        isAddingRating: true
      };
    case `${ADD_RATING}_SUCCESS`:
      return {
        ...state,
        isAddingRating: false,
      };
    case `${ADD_RATING}_FAILURE`:
      return {
        ...state,
        isAddingRating: false
      };
    case `${DELETE_RATING}_REQUEST`:
      return {
        ...state,
        isDeletingRating: true
      };
    case `${DELETE_RATING}_SUCCESS`:
      return {
        ...state,
        isDeletingRating: false,
      };
      case `${DELETE_RATING}_FAILURE`:
        return {
          ...state,
          isDeletingRating: false
        };
    case `${GET_FAVORITE}_REQUEST`:
      return {
        ...state,
        isGettingFavorites: true
      };
    case `${GET_FAVORITE}_SUCCESS`:
      return {
        ...state,
        isGettingFavorites: false,
        favorites: action.payload,
      };
    case `${GET_FAVORITE}_FAILURE`:
      return {
        ...state,
        isGettingFavorites: false
      };
    case `${ADD_FAVORITE}_REQUEST`:
      return {
        ...state,
        isAddingFavorites: true
      };
    case `${ADD_FAVORITE}_SUCCESS`:
      return {
        ...state,
        isAddingFavorites: false,
      };
    case `${ADD_FAVORITE}_FAILURE`:
      return {
        ...state,
        isAddingFavorites: false
      };
      case `${REMOVE_FAVORITE}_REQUEST`:
        return {
          ...state,
          isRemovingFavorites: true
        };
      case `${REMOVE_FAVORITE}_SUCCESS`:
        return {
          ...state,
          isRemovingFavorites: false,
        };
      case `${REMOVE_FAVORITE}_FAILURE`:
        return {
          ...state,
          isRemovingFavorites: false
        };
    default:
      return state;
  }
};

export default ProfileReducer;

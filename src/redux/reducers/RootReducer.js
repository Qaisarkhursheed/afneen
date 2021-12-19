import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createEncryptor from "redux-persist-transform-encrypt";
import immutableTransform from "redux-persist-transform-immutable";
import AuthenticationReducer from "./AuthenticationReducer";
import RestaurantReducer from "./RestaurantReducer";
import ProfileReducer from "./ProfileReducer";

const encryptor = createEncryptor({
  secretKey: "COVID",
  onError(error) {
    console.error("[Encryptor]", error);
  },
});

const persistConfig = {
  key: "gastro",
  storage,
  transforms: [encryptor, immutableTransform()],
  whitelist: ["AuthenticationReducer", "RestaurantReducer"],
};

const RootReducer = combineReducers({
  AuthenticationReducer,
  RestaurantReducer,
  ProfileReducer,
});

export default persistReducer(persistConfig, RootReducer);

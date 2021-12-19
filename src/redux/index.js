import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import {persistStore} from 'redux-persist';
import { logger } from 'redux-logger';
import rootReducer from './reducers/RootReducer';
import history from '../utils/History';

export const sagaMiddleware = createSagaMiddleware();
let middlewares = [sagaMiddleware, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  middlewares = [...middlewares, logger];
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);
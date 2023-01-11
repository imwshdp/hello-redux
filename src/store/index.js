import { combineReducers, createStore, applyMiddleware } from 'redux';

import { customerReducer } from './customerReducer';
import { cashReducer } from './cashReducer';
import { countReducer } from './countReducer';
import { userReducer } from './userReducer';

import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createSagaMiddleware from '@redux-saga/core';
import { countWatcher } from '../saga/countSaga';
import { rootWatcher } from '../saga';

const sagaMiddleware = createSagaMiddleware()

const rootReaducer = combineReducers({
  cash: cashReducer,
  customers: customerReducer,
  count: countReducer,
  users: userReducer,
})

// store
// export const store = createStore(rootReaducer, composeWithDevTools(applyMiddleware(thunk)))

// saga store
export const store = createStore(rootReaducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootWatcher)
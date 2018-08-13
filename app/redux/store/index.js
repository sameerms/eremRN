import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/';
import thunk from 'redux-thunk';

const middlewares = [];

middlewares.push(thunk);

const store = composeWithDevTools(applyMiddleware(...middlewares))(createStore)(rootReducer);

export default store;
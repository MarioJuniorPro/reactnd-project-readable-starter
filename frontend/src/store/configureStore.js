import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import toastify from './middlewares/toastify'
import rootReducer from './ducks';

const configureStore = () => {
  const middlewares = [thunk, toastify];

  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middlewares)
  );
};

export default configureStore;
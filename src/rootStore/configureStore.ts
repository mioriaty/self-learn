import createSagaMiddleware from '@redux-saga/core';
import { applyMiddleware, combineReducers, compose, createStore, Middleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducers from 'rootStore/rootReducers';
import rootSaga from 'rootStore/rootSagas';

const isDev = process.env.NODE_ENV === 'development';

const composeEnhancers =
  ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) ||
  compose;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const _combineReducers = combineReducers({
  ...rootReducers,
});

const sagaMiddleware = createSagaMiddleware();
const reducers = persistReducer(persistConfig, _combineReducers);
const middlewares: Middleware[] = [sagaMiddleware, thunk];

if (isDev) {
  // middlewares.push(logger);
}

const store = createStore(reducers, undefined, composeEnhancers(applyMiddleware(...middlewares)));
sagaMiddleware.run(rootSaga);
const persistor = persistStore(store as any);

export type Reducers = ReturnType<typeof _combineReducers>;

export { store, persistor };

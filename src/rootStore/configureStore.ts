import { Middleware, createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from '@redux-saga/core';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import rootSaga from 'rootStore/rootSagas';
import rootReducers from 'rootStore/rootReducers';

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
const logger = createLogger({
  titleFormatter: (action: any, time: string, took: number) => {
    return `${window.location.href} - action ${action.type} | ${time} | in ${took.toFixed(2)} ms`;
  },
});
if (isDev) {
  middlewares.push(logger);
}

const store = createStore(reducers, undefined, composeEnhancers(applyMiddleware(...middlewares)));
sagaMiddleware.run(rootSaga);
const persistor = persistStore(store as any);

export type Reducers = ReturnType<typeof _combineReducers>;

export { store, persistor };

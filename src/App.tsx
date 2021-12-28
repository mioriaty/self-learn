import React from 'react';
import { Provider } from 'react-redux';
import Routes from 'routes';
import 'antd/dist/antd.css';
import { store } from 'store/configureStore';

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;

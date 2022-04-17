import { AppProvider } from 'containers/AppProvider/AppProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'rootStore/configureStore';
import Routes from 'routes';

function App() {
  return (
    <Provider store={store}>
      <AppProvider>
        <Routes />
      </AppProvider>
    </Provider>
  );
}

export default App;

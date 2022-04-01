import { AppProvider } from 'containers/AppProvider/AppProvider';
import React from 'react';
import Routes from 'routes';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Routes />
      </div>
    </AppProvider>
  );
}

export default App;

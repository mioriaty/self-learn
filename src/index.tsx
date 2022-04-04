import 'styles/normalize.css';
import 'styles/index.css';
import { createRoot } from 'react-dom/client';
import { getUseDispatchRedux } from 'wiloke-react-core/utils';
import { useDispatch } from 'react-redux';
import App from './App';

import reportWebVitals from './reportWebVitals';
getUseDispatchRedux(useDispatch);

const rootElement = document.getElementById('root') as HTMLElement;

const root = createRoot(rootElement);

root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

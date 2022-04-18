import 'styles/normalize.css';
import 'styles/index.css';
import { render } from 'react-dom';
import { getUseDispatchRedux } from 'wiloke-react-core/utils';
import { useDispatch } from 'react-redux';
import App from './App';
import 'antd/dist/antd.css';

import reportWebVitals from './reportWebVitals';
getUseDispatchRedux(useDispatch);

const rootElement = document.getElementById('root') as HTMLElement;

render(<App />, rootElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import { getUseDispatchRedux } from 'core';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';

getUseDispatchRedux(useDispatch);

ReactDOM.render(<App />, document.getElementById('root'));

reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import UserContextProvider from 'store/User';
import moment from 'moment';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'moment/min/locales';

moment.locale('ko');

ReactDOM.render(
  <UserContextProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </UserContextProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

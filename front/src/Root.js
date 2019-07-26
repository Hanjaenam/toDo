import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from 'components/App';
import configure from 'store/configure';
import GlobalStyles from 'styles/global';

const store = configure();

const Root = () => (
  <Provider store={store}>
    <GlobalStyles />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

export default Root;

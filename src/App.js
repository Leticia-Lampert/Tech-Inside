import Router from './router/Router';
import { Provider } from 'react-redux';
import React from 'react'

import store from './store/redux'

function App() {
  return(
    <Provider store={store}>
      <Router/>
    </Provider>
  )
}

export default App;

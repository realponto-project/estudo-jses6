import React from 'react';
import { applyMiddleware, createStore } from 'redux'
// import { connectRouter, routerMiddleware } from 'connected-react-router'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// import { MemoryRouter } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from './store/reducers'
import Routes from './routes'
// import history from './routes/history'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)


export const store = applyMiddleware(thunk, multi, promise)(createStore)(persistedReducer, composeWithDevTools())

// const middlewarer = [
//   thunk,
//   multi,
//   promise,
//   routerMiddleware(history),
//   persistedReducer,
//   composeWithDevTools(),
// ]

// export const store = createStore(connectRouter(history)(() => {}), applyMiddleware(...middlewarer))

      
const persistor = persistStore(store)
      
const App = () => (
  // <MemoryRouter >
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Routes />
    </PersistGate>
  </Provider>

  // </MemoryRouter>
)
export default App
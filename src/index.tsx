// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import GlobalStyles from './components/GlobalStyles'
import { store } from './store/store'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   // <React.StrictMode>
   <Provider store={store}>
      <GlobalStyles>
         <App />
      </GlobalStyles>
   </Provider>,
   // </React.StrictMode>,
)

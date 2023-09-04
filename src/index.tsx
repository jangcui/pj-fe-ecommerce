// import React from 'react'
import GlobalStyles from './components/GlobalStyles'
import ReactDOM from 'react-dom/client'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import App from './App'
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

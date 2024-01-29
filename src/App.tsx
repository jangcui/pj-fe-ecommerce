import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routeCustom } from './routes/routes'
import { Fragment, ComponentType, FC } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

import DefaultLayout from './layouts/DefaultLayout'
import ScrollTopWhenPageChange from './hook/ScrollTop'
import ModalLogin from './components/ModalLogin/ModalLogin'
import ModalCustom from './components/ModalCustom'

const App: FC = () => {
   return (
      <>
         <Router>
            <div className="App">
               <ScrollTopWhenPageChange />
               <ModalLogin />
               <ToastContainer
                  position="top-right"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={true}
                  rtl={false}
                  draggable
                  className="fw-bold"
                  theme="light"
               />
               <ModalCustom />
               <Routes>
                  <>
                     {routeCustom.map((route, i) => {
                        const Page = route.component
                        let Layout: ComponentType<any> = DefaultLayout
                        if (route.layout === null) {
                           Layout = Fragment
                        } else if (route.layout) {
                           Layout = route.layout
                        }

                        return (
                           <Route
                              key={i}
                              path={route.path}
                              element={
                                 <Layout>
                                    <Page />
                                 </Layout>
                              }
                           />
                        )
                     })}
                  </>
               </Routes>
            </div>
         </Router>
      </>
   )
}

export default App

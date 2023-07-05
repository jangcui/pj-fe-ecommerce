import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRouter } from './routes/routes'
import { Fragment, ComponentType, FC } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import DefaultLayout from './layouts/DefaultLayout'
import ScrollTopWhenPageChange from './hook/ScroolTop'
import ModalLogin from './components/ModalLogin/ModalLogin'

const App: FC = () => {
   return (
      <>
         <Router>
            <div className="App">
               <ScrollTopWhenPageChange />
               <ModalLogin />
               <Routes>
                  {publicRouter.map((route, i) => {
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
                              <>
                                 <ToastContainer
                                    position="top-right"
                                    autoClose={2000}
                                    hideProgressBar={false}
                                    newestOnTop={true}
                                    rtl={false}
                                    draggable
                                    theme="light"
                                 />
                                 <Layout>
                                    <Page />
                                 </Layout>
                              </>
                           }
                        />
                     )
                  })}
               </Routes>
            </div>
         </Router>
      </>
   )
}

export default App

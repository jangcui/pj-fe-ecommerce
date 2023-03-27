import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRouter } from './routes/routes'
import { Fragment, ComponentType } from 'react'
import DefaultLayout from './layouts/DefaultLayout'

function App() {
   return (
      <>
         <Router>
            <div className="App">
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

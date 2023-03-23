import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRouter } from './routes/routes'
import { Fragment, FC } from 'react'
import DefaultLayout from './layouts/DefaultLayout'

const App: FC = () => {
   return (
      <>
         <Router>
            <div className="App">
               <Routes>
                  {publicRouter.map((route, i) => {
                     const Page = route.component
                     let Layout = DefaultLayout
                     if (route.layout) {
                        Layout = route.layout
                     } else if (route.layout === null) {
                        Layout = Fragment
                     }

                     return (
                        <Route
                           key={i}
                           path={route.path}
                           element={
                              <>
                                 <Page />
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

import { ReactNode } from 'react'
import Footer from '../Footer'
import Header from '../Header'

function DefaultLayout({ children }: { children: ReactNode }) {
   return (
      <>
         <Header />
         {children}
         <Footer />
      </>
   )
}

export default DefaultLayout

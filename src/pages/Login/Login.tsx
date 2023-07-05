import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import { LoginComp } from '.'

function Login() {
   return (
      <>
         <ChangeTitle title={'Login'} />
         <BreadCrumb title={'Login'} />
         <LoginComp />
      </>
   )
}

export default Login

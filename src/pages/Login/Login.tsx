import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import { LoginComp } from '.'

function Login() {
   return (
      <>
         <ChangeTitle title={'Login'} />
         <BreadCrumb title={'Login'} />
         <div className="col-10 col-md-8 col-lg-6">
            <LoginComp />
         </div>
      </>
   )
}

export default Login

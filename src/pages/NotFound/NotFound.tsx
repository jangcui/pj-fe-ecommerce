import { AiOutlineRollback } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import Button from '~/components/Button'
import Loading from '~/components/Loading/Loading'

function NotFound() {
   const navigate = useNavigate()
   return (
      <>
         <div className="d-flex justify-content-center flex-column w-100 mt-5">
            <Loading />
         </div>
         <h1 className="text-center w-100 mt-3" style={{ fontSize: '50px' }}>
            4 0 4
         </h1>
         <h1 className="text-center fs-1 w-100 mt-3">Page Not Found </h1>
         <p className="text-center w-100 mt-3">
            <Button
               onClick={() => navigate('/')}
               primary
               className="px-4 py-2"
               leftIcon={<AiOutlineRollback className="icon me-2" />}
            >
               Return to Home Page
            </Button>
         </p>
      </>
   )
}

export default NotFound

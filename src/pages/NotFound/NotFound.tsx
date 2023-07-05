import Loading from '~/components/Loading/Loading'

function NotFound() {
   return (
      <>
         <div className="d-flex justify-content-center flex-column w-100">
            <Loading />
         </div>
         <h1 className="text-center w-100">Page Not Found </h1>
      </>
   )
}

export default NotFound

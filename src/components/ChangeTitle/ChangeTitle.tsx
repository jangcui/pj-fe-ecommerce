import { Helmet } from 'react-helmet'

function ChangeTitle({ title }: { title: string }) {
   return (
      <Helmet>
         <meta charSet="utf-8" />
         <title>{title} | Digitic.</title>
      </Helmet>
   )
}

export default ChangeTitle

import { Helmet } from 'react-helmet'

function ChangeTitle({ title }: { title?: string }) {
   return (
      <Helmet>
         <meta charSet="utf-8" />
         <title>{title}</title>
      </Helmet>
   )
}

export default ChangeTitle

import classNames from 'classnames/bind'
import styles from './NotFound.module.scss'
import Loading from '~/components/Loading/Loading'
const cx = classNames.bind(styles)

function NotFound() {
   return (
      <div>
         <Loading />
         <h1>Page NotFound</h1>
      </div>
   )
}

export default NotFound

import classNames from 'classnames/bind'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { IoFilterOutline } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '~/redux/store/store'
import Button from '~/components/Button'
import styles from './MenuHeader.module.scss'
import config from '~/routes/config'
import { getAllProducts } from '~/redux/features/products/productsService'

const cx = classNames.bind(styles)

function MenuHeader() {
   const dispatch = useDispatch<AppDispatch>()
   const { isLogin } = useSelector((state: RootState) => state.auth)
   const [isActive, setIsActive] = useState(false)
   const navigate = useNavigate()
   const { categoriesList } = useSelector((state: RootState) => state.prodCates)

   const handleActive = () => {
      setIsActive(!isActive)
   }

   const handleRedirection = async (value: string) => {
      setIsActive(false)
      navigate(`/product?${`category=${encodeURIComponent(value.trim())}`}`)
      await dispatch(getAllProducts({ category: value }))
   }
   return (
      <div className={cx('wrapper', 'row d-flex justify-content-center d-none d-md-flex')}>
         <div className="col-10 col-lg-11  d-flex justify-content-center">
            <Button className={cx('nav', 'd-block d-sm-none')} text>
               <IoFilterOutline className={cx('icon')} />
            </Button>
            <div className={cx('wrap-btn', isActive && 'active')}>
               <Button
                  className={cx('btn-drop')}
                  leftIcon={<IoFilterOutline className={cx('icon')} />}
                  rightIcon={<IoIosArrowDown className={cx('icon', 'right-icon', 'd-none d-md-block')} />}
                  onClick={handleActive}
               >
                  <p className="mb-0 d-none d-md-block">SHOP CATEGORIES</p>
               </Button>

               <div className={cx('select')}>
                  <>
                     {categoriesList?.map((item, index) => (
                        <Button text className={cx('option')} key={index} onClick={() => handleRedirection(item)}>
                           {item}
                        </Button>
                     ))}
                  </>
               </div>
            </div>

            <div className={cx('list', 'd-none d-md-flex')}>
               <Button text className={cx('btn')} to={config.routes.home}>
                  home
               </Button>
               <Button
                  text
                  className={cx('btn')}
                  onClick={() => {
                     navigate('/product')
                     dispatch(getAllProducts({}))
                  }}
               >
                  Store
               </Button>
               <Button text className={cx('btn')} to={config.routes.blogs}>
                  blogs
               </Button>
               <Button text className={cx('btn')} to={config.routes.contact}>
                  contact
               </Button>
               {isLogin && (
                  <Button text className={cx('btn')} to={config.routes.order}>
                     my orders
                  </Button>
               )}
            </div>
         </div>
      </div>
   )
}

export default MenuHeader

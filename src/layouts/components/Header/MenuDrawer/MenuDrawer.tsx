import classNames from 'classnames/bind'
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { useNavigate } from 'react-router-dom'
import { RxMagnifyingGlass } from 'react-icons/rx'
import { IoMdClose } from 'react-icons/io'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styles from './MenuDrawer.module.scss'
import Button from '~/components/Button'
import { AppDispatch, RootState } from '~/store/store'
import config from '~/config/config'
import { getProducts } from '~/features/products/productsService'
import { FaceBookIcon, GitHubIcon, GmailIcon } from '~/components/Icon'
import { logOutUser } from '~/features/customers/customerSlice'
import { openModalLogin } from '~/features/modalLogin/modalLoginSlice'
const cx = classNames.bind(styles)

interface SearchProductType {
   id: number
   product: string
   name: string
}
interface NavBarType {
   data: SearchProductType[]
   categoryList: string[]
   isOpen: boolean
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
function MenuDrawer({ data, categoryList, isOpen, setIsOpen }: NavBarType) {
   const dispatch = useDispatch<AppDispatch>()
   const { user } = useSelector((state: RootState) => state?.customer)

   const [active, setActive] = useState<boolean>(true)

   const navigate = useNavigate()

   const handleRedirection = async (value: string) => {
      setIsOpen(false)
      navigate(`/product?${`category=${encodeURIComponent(value.trim())}`}`)
      await dispatch(getProducts({ category: value }))
   }

   const handleLogOut = () => {
      dispatch(logOutUser())
      window.location.reload()
      setIsOpen(false)
   }
   const handleLogIn = () => {
      setIsOpen(false)
      dispatch(openModalLogin())
   }
   return (
      <div className={cx('wrapper', isOpen && 'open')}>
         <div className={cx('container', 'row d-flex justify-content-center align-items-start flex-column')}>
            <Button text className={cx('btn-close')} onClick={() => setIsOpen(false)}>
               <IoMdClose className={cx('icon')} />{' '}
            </Button>
            <i className="col-11 fs-4 text-center">Free Ship Over 100$ And Free Return </i>
            <div className={cx('input-form', 'col-12')}>
               <RxMagnifyingGlass className={cx('icon-search')} />
               <Typeahead
                  id="pagination-example"
                  options={data}
                  onChange={(selected: any) => {
                     if (selected.length > 0) {
                        const slug = selected[0].product
                        if (slug) {
                           navigate(`/product/${slug}`)
                           setIsOpen(false)
                        }
                     }
                  }}
                  className={cx('input')}
                  minLength={2}
                  labelKey={'name'}
                  placeholder="Search for product here..."
                  renderMenuItemChildren={(option: any) => <span className="text-body ">{option.name}</span>}
               />
            </div>
            <div className="row col-12 pe-0">
               <Button className={cx('btn-tab', 'col-6', active && 'active')} text onClick={() => setActive(true)}>
                  Category
               </Button>
               <Button className={cx('btn-tab', 'col-6', !active && 'active')} text onClick={() => setActive(false)}>
                  Main Menu
               </Button>
            </div>
            <div className={cx('tab-content', 'col-12 row')}>
               {active ? (
                  <>
                     {categoryList?.map((item, index) => (
                        <Button text className={cx('btn')} key={index} onClick={() => handleRedirection(item)}>
                           {item}
                        </Button>
                     ))}
                  </>
               ) : (
                  <>
                     <Button text className={cx('btn')} to={config.routes.home} onClick={() => setIsOpen(false)}>
                        home
                     </Button>
                     <Button
                        text
                        className={cx('btn')}
                        onClick={() => {
                           setIsOpen(false)
                           navigate('/product')
                           dispatch(getProducts({}))
                        }}
                     >
                        Store
                     </Button>
                     <Button text className={cx('btn')} to={config.routes.blogs} onClick={() => setIsOpen(false)}>
                        blogs
                     </Button>
                     <Button text className={cx('btn')} to={config.routes.contact} onClick={() => setIsOpen(false)}>
                        contact
                     </Button>
                     {user ? (
                        <>
                           <Button text className={cx('btn')} to={config.routes.order} onClick={() => setIsOpen(false)}>
                              my orders
                           </Button>
                           <Button
                              text
                              className={cx('btn')}
                              to={config.routes.profile}
                              onClick={() => setIsOpen(false)}
                           >
                              profile
                           </Button>
                           <Button text className={cx('btn')} onClick={handleLogOut}>
                              log out
                           </Button>
                        </>
                     ) : (
                        <>
                           {' '}
                           <Button text className={cx('btn')} onClick={handleLogIn}>
                              log in
                           </Button>{' '}
                        </>
                     )}
                  </>
               )}
            </div>
            <div className={cx('contact', 'row mt-auto pe-0 w-100')}>
               <Button
                  text
                  style={{ color: '#fff' }}
                  className="col-4"
                  to="https://github.com/jangcui?tab=repositories"
               >
                  <GitHubIcon />
               </Button>
               <Button text className="col-4" to="https://www.facebook.com/profile.php?id=100004998315019">
                  <FaceBookIcon />
               </Button>
               <Button text className="col-4" to="https://mail.google.com/mail/u/0/?tab=km#inbox">
                  <GmailIcon />
               </Button>
            </div>
         </div>
      </div>
   )
}

export default MenuDrawer

import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { AiOutlineBars, AiOutlineHeart, AiOutlineUser } from 'react-icons/ai'
import { BiLogOut } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { RxMagnifyingGlass } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import images from '~/assets/images'
import Button from '~/components/Button'
import Image from '~/components/Image'
import ModalCustom from '~/components/ModalCustom'
import { getAllProdCates } from '~/redux/features/prodCategories/productCateService'
import { AppDispatch, RootState } from '~/redux/store/store'
import config from '~/routes/config/config'
import styles from './Header.module.scss'
import MenuCart from './MenuCart'
import MenuDrawer from './MenuDrawer'
import MenuHeader from './MenuHeader/MenuHeader'
import { getCart } from '~/redux/features/user/cart/cartService'
import { logout } from '~/redux/features/user/auth/authService'

const cx = classNames.bind(styles)

interface SearchProductType {
   id: number
   product: string
   name: string
}

function Header() {
   const dispatch = useDispatch<AppDispatch>()
   const { user, isLogin } = useSelector((state: RootState) => state.auth)
   const { productList } = useSelector((state: RootState) => state?.products)
   const [isDropDown, setIsDropDown] = useState<boolean>(false)
   const [openNavBar, setOpenNavBar] = useState<boolean>(false)
   const [productOpt, setProductOpt] = useState<SearchProductType[]>([])
   const [openModal, setOpenModal] = useState(false)
   const [isScroll, setIsScroll] = useState(false)

   const dropdownRef = useRef<HTMLDivElement>(null)
   const navigate = useNavigate()

   useEffect(() => {
      dispatch(getAllProdCates())
      if (isLogin) {
         dispatch(getCart())
      } else {
         return
      }
   }, [dispatch, isLogin])

   useEffect(() => {
      const onScroll = () => {
         window.scrollY >= 40 ? setIsScroll(true) : setIsScroll(false)
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => {
         window.removeEventListener('scroll', onScroll)
      }
   }, [])

   useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropDown(false)
         }
      }
      document.addEventListener('click', handleOutsideClick)
      return () => {
         document.removeEventListener('click', handleOutsideClick)
      }
   }, [])

   useEffect(() => {
      const data = productList?.map((element, index) => ({
         id: index,
         product: element?.slug || ' ',
         name: element?.title || ' ',
      }))
      setProductOpt(data)
   }, [productList])

   const handleLogout = () => {
      dispatch(logout())
      setOpenModal(false)
      // window.location.reload()
   }

   return (
      <div className={cx('wrapper', 'row d-flex justify-content-center w-100')}>
         <div className={cx('container', 'col-12')}>
            <ModalCustom title={'Log Out'} open={openModal} onOk={handleLogout} onCancel={() => setOpenModal(false)} />

            <MenuDrawer data={productOpt} isOpen={openNavBar} setIsOpen={setOpenNavBar} />

            <div className={cx('contact', 'row d-flex justify-content-center')}>
               <div className="col-11 d-flex justify-content-center justify-content-md-between align-items-center">
                  <i className="d-none d-md-block fs-4 fs-sm-5">Free Ship Over 100$ And Free Return </i>
                  <span className="fs-4">Hotline: +84 84 666 9107</span>
               </div>
            </div>
            <div className={cx('content', 'row d-flex justify-content-center shadow', isScroll && 'fixed')}>
               <div className={cx('content-main', 'row col-11 ')}>
                  <div className="col-4 d-sm-flex d-md-none justify-content-start d-flex align-items-center">
                     <Button text onClick={() => setOpenNavBar(true)}>
                        <AiOutlineBars className={cx('icon')} />
                     </Button>
                  </div>

                  <div className={cx('trademark', 'row col-4 col-md-3 col-lg-1 col-xl-2 p-0')}>
                     <Button
                        text
                        to={config.routes.home}
                        className="justify-content-center justify-content-md-start w-100 p-0"
                     >
                        <Image src={images.logo} className={cx('img')} />
                     </Button>
                  </div>

                  <div className={cx('input-form', 'd-none d-md-flex col-md-5 ')}>
                     <Typeahead
                        id="pagination-example"
                        options={productOpt}
                        onChange={(selected: any) => {
                           if (selected.length > 0) {
                              const slug = selected[0].product
                              if (slug) {
                                 navigate(`/product/${slug}`)
                              }
                           }
                        }}
                        className={cx('input')}
                        minLength={2}
                        labelKey={'name'}
                        placeholder="Search for product here..."
                        renderMenuItemChildren={(option: any) => <span className="text-body ">{option.name}</span>}
                     />
                     <RxMagnifyingGlass className={cx('icon-search')} />
                  </div>

                  <div className="col-4 col-md-3  col-lg-4">
                     <div className={cx('option-wrapper', 'w-100')}>
                        <>
                           <Button
                              text
                              className={cx('option')}
                              leftIcon={<AiOutlineHeart className={cx('icon')} />}
                              to={config.routes.wishlist}
                           >
                              <div className={cx('text', 'mb-0 ms-2 d-none d-lg-block')}>
                                 <p className={cx('name', 'fs-4 mb-0')}>Favorite</p>
                                 <p className={cx('name', 'fs-4 mb-0')}>Wishlist</p>
                              </div>
                           </Button>
                           {!isLogin ? (
                              <Button
                                 className={cx('btn-action')}
                                 text
                                 leftIcon={<AiOutlineUser className={cx('icon')} />}
                                 to={config.routes.login}
                              >
                                 <div className={cx('text', 'mb-0 d-none d-lg-block')}>
                                    <p className={cx('name', 'fs-4 mb-0 text-light ms-2')}>Log In</p>
                                 </div>
                              </Button>
                           ) : (
                              <>
                                 <div className={cx('option', isDropDown && 'active')} ref={dropdownRef}>
                                    <Button
                                       text
                                       className={cx('btn-action')}
                                       leftIcon={<AiOutlineUser className={cx('icon')} />}
                                       onClick={() => setIsDropDown(!isDropDown)}
                                    >
                                       <div className={cx('text', 'mb-0 ms-2 d-none d-lg-block')}>
                                          <p className={cx('name', 'fs-4 mb-0')}>{user.first_name}</p>
                                          <p className={cx('name', 'fs-4 mb-0')}>{user.last_name}</p>
                                       </div>
                                    </Button>
                                    <div className={cx('drop-down')}>
                                       <Button className={cx('drop-element')} text onClick={() => setOpenModal(true)}>
                                          Log Out
                                          <BiLogOut className={cx('icon')} />
                                       </Button>
                                       <Button
                                          text
                                          className={cx('drop-element')}
                                          onClick={() => setIsDropDown(false)}
                                          to={config.routes.profile}
                                       >
                                          Go to profile
                                          <CgProfile className={cx('icon')} />
                                       </Button>{' '}
                                    </div>
                                 </div>
                                 <div className={cx('option')}>
                                    <MenuCart />
                                 </div>
                              </>
                           )}
                        </>
                     </div>
                  </div>
               </div>
            </div>
            <>
               <MenuHeader />
            </>
         </div>
      </div>
   )
}

export default Header

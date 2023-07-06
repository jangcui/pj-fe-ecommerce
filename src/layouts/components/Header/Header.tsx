import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { AiOutlineBars, AiOutlineHeart, AiOutlineUser } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { IoMdArrowDropdown } from 'react-icons/io'
import { RxMagnifyingGlass } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BiLogOut } from 'react-icons/bi'

import ModalCustom from '~/components/ModalCustom'
import config from '~/config/config'
import { getCarts } from '~/features/customers/customerService'
import { logOutUser } from '~/features/customers/customerSlice'
import { AppDispatch, RootState } from '~/store/store'
import styles from './Header.module.scss'
import Button from '~/components/Button'
import MenuHeader from './MenuHeader'
import { TiShoppingCart } from 'react-icons/ti'
import MenuDrawer from './MenuDrawer'
import { getProdCates } from '~/features/prodCategories/productCateService'
import Image from '~/components/Image/Image'
import images from '~/assets/images'
const cx = classNames.bind(styles)

interface SearchProductType {
   id: number
   product: string
   name: string
}

function Header() {
   const dispatch = useDispatch<AppDispatch>()
   const { cartList, user, totalPrice } = useSelector((state: RootState) => state?.customer)
   const { productList } = useSelector((state: RootState) => state?.products)
   const categories = useSelector((state: RootState) => state.prodCates.itemList)

   const [isDropDown, setIsDropDown] = useState<boolean>(false)
   const [openNavBar, setOpenNavBar] = useState<boolean>(false)
   const [productOpt, setProductOpt] = useState<SearchProductType[]>([])
   const [categoryList, setCategoryList] = useState<string[]>([])
   const [openModal, setOpenModal] = useState(false)
   const [isScroll, setIsScroll] = useState(false)

   const dropdownRef = useRef<HTMLDivElement>(null)
   const navigate = useNavigate()

   useEffect(() => {
      dispatch(getProdCates())
      if (user) {
         dispatch(getCarts())
      } else {
         return
      }
   }, [dispatch, user])
   useEffect(() => {
      if (categories) {
         const data = categories.map((item) => item.title || '')
         setCategoryList(data)
      }
   }, [categories])

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
      dispatch(logOutUser())
      window.location.reload()
   }

   return (
      <div className={cx('wrapper', 'row d-flex justify-content-center w-100')}>
         <div className={cx('container', 'col-12')}>
            <ModalCustom title={'Log Out'} open={openModal} onOk={handleLogout} onCancel={() => setOpenModal(false)} />
            <MenuDrawer data={productOpt} categoryList={categoryList} isOpen={openNavBar} setIsOpen={setOpenNavBar} />
            <div className={cx('contact', 'row d-flex justify-content-center')}>
               <div className="col-11 d-flex justify-content-center justify-content-md-between align-items-center">
                  <i className="d-none d-md-block fs-4 fs-sm-5">Free Ship Over 100$ And Free Return </i>
                  <span className="fs-4 fs-sm-5">Hotline: +84 84 666 9107</span>
               </div>
            </div>
            <div className={cx('content', 'row d-flex justify-content-center', isScroll && 'fixed')}>
               <div className={cx('content-main', 'row col-11 ')}>
                  <div className="col-4 d-sm-flex d-md-none justify-content-start d-flex align-items-center">
                     <Button text onClick={() => setOpenNavBar(true)}>
                        <AiOutlineBars className={cx('icon')} />
                     </Button>
                  </div>

                  <div className={cx('trademark', 'row col-4 col-md-3 col-lg-1 col-xl-2')}>
                     <Button
                        text
                        to={config.routes.home}
                        className="justify-content-center justify-content-md-start w-100"
                     >
                        <Image src={images.logo} className={cx('img')} />
                     </Button>
                  </div>

                  <div className={cx('input-form', 'd-none d-md-flex col-md-6 ')}>
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
                           {user && (
                              <Button
                                 text
                                 className={cx('option')}
                                 leftIcon={<AiOutlineHeart className={cx('icon')} />}
                                 to={config.routes.wishlist}
                              >
                                 <p className="mb-0">Favorite Wishlist </p>
                              </Button>
                           )}
                           {!user ? (
                              <Button
                                 className={cx('option', 'w-100 d-flex justify-content-center')}
                                 text
                                 leftIcon={<AiOutlineUser className={cx('icon')} />}
                                 to={config.routes.login}
                              >
                                 <p className="mb-0">Log In</p>
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
                                       <p className="mb-0">
                                          <span className={cx('name')}>{user.fist_name}</span>
                                          <span className={cx('name')}>{user.last_name}</span>
                                       </p>
                                       <IoMdArrowDropdown className={cx('icon-drop', !isDropDown && 'rotate')} />
                                    </Button>
                                    <div className={cx('drop-down')}>
                                       <Button className={cx('drop-element')} text onClick={() => setOpenModal(true)}>
                                          Log Out
                                          <BiLogOut className={cx('icon')} />
                                       </Button>
                                       <Button text className={cx('drop-element')} to={config.routes.profile}>
                                          Go to profile
                                          <CgProfile className={cx('icon')} />
                                       </Button>{' '}
                                    </div>
                                 </div>

                                 <div className={cx('option')}>
                                    <Link to={config.routes.cart}>
                                       <TiShoppingCart className={cx('icon-cart')} />
                                    </Link>
                                    <div className={cx('option-content')}>
                                       <span className={cx('quantity')}>{cartList?.length ? cartList?.length : 0}</span>
                                       <span className={cx('total')}>${totalPrice ? totalPrice : 0}</span>
                                    </div>
                                 </div>
                              </>
                           )}
                        </>
                     </div>
                  </div>
               </div>
            </div>
            <>
               <MenuHeader data={categoryList} />
            </>
         </div>
      </div>
   )
}

export default Header

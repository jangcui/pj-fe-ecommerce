import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { AiOutlineHeart, AiOutlineUser } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { IoIosArrowDown, IoMdArrowDropdown } from 'react-icons/io'
import { IoFilterOutline } from 'react-icons/io5'
import { RxMagnifyingGlass } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BiLogOut } from 'react-icons/bi'

import images from '~/assets/images'
import Image from '~/components/Image'
import ModalCustom from '~/components/ModalCustom'
import config from '~/config/config'
import { getCarts } from '~/features/customers/customerService'
import { logOutUser } from '~/features/customers/customerSlice'
import { AppDispatch, RootState } from '~/store/store'
import styles from './Header.module.scss'
import Button from '~/components/Button'
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
   const [isDropDown, setIsDropDown] = useState<boolean>(false)
   const [productOpt, setProductOpt] = useState<SearchProductType[]>([])
   const navigate = useNavigate()

   const [openModal, setOpenModal] = useState(false)
   const [isScroll, setIsScroll] = useState(false)
   const [paginate, setPaginate] = useState(true)
   const dropdownRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      if (user) {
         dispatch(getCarts())
      } else {
         return
      }
   }, [dispatch, user])

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
         product: element?._id || ' ',
         name: element?.title || ' ',
      }))
      setProductOpt(data)
   }, [productList])

   const handleLogout = () => {
      dispatch(logOutUser())
      window.location.reload()
   }
   return (
      <div className={cx('wrapper')}>
         <div className={cx('container')}>
            <ModalCustom title={'Log Out'} open={openModal} onOk={handleLogout} onCancel={() => setOpenModal(false)} />
            <div className={cx('contact')}>
               <div className={cx('contact-container')}>
                  <span>Free Ship Over 100$ And Free Return </span>
                  <span>Hotline: +84 84 666 9107</span>
               </div>
            </div>
            <div className={cx('content', isScroll && 'fixed')}>
               <div className={cx('content-main')}>
                  <div className={cx('trademark')}>
                     <Button text to={config.routes.home}>
                        <h1 className={cx('logo')}>Digitic.</h1>
                     </Button>
                  </div>
                  <div className={cx('input-form')}>
                     <Typeahead
                        id="pagination-example"
                        options={productOpt}
                        onChange={(selected: any) => {
                           if (selected.length > 0) {
                              const productId = selected[0].product
                              if (productId) {
                                 navigate(`/product/${productId}`)
                              }
                           }
                        }}
                        inputProps={{
                           style: {
                              padding: '8px',
                              borderRadius: '4px 0 0 4px',
                              fontWeight: 600,
                              fontSize: '14px',
                              minWidth: '400px',
                              height: '36px',
                              maxWidth: '500px',
                           },
                        }}
                        minLength={2}
                        paginate={paginate}
                        labelKey={'name'}
                        placeholder="Search for product here..."
                        renderMenuItemChildren={(option: any) => <span className="text-body ">{option.name}</span>}
                     />
                     <RxMagnifyingGlass className={cx('icon-search')} />
                  </div>
                  <div className={cx('option-wrapper')}>
                     <>
                        <Button
                           text
                           leftIcon={<AiOutlineHeart className={cx('icon')} />}
                           to={config.routes.wishlist}
                           className={cx('option')}
                        >
                           <p>Favorite Wishlist </p>
                        </Button>
                        {!user ? (
                           <Button
                              text
                              leftIcon={<AiOutlineUser className={cx('icon')} />}
                              to={config.routes.login}
                              className={cx('option')}
                           >
                              <p>Log In My Account</p>
                           </Button>
                        ) : (
                           <>
                              <div className={cx('option')} ref={dropdownRef}>
                                 <Button
                                    text
                                    className={cx('btn-action')}
                                    leftIcon={<AiOutlineUser className={cx('icon')} />}
                                    onClick={() => setIsDropDown(!isDropDown)}
                                 >
                                    <p>
                                       <span className={cx('fist-name')}>{user.fist_name}</span>
                                       <span className={cx('last-name')}>{user.last_name}</span>
                                    </p>
                                    <IoMdArrowDropdown
                                       style={{ width: '24px', height: '24px' }}
                                       className={cx(isDropDown ? 'icon-drop' : 'active')}
                                    />
                                 </Button>
                                 {isDropDown && (
                                    <ul className={cx('drop-down')}>
                                       <li>
                                          <Button
                                             className={cx('btn-tooltip')}
                                             text
                                             onClick={() => {
                                                console.log(123)
                                                setOpenModal(true)
                                             }}
                                          >
                                             Log Out
                                          </Button>
                                          <BiLogOut className={cx('icon')} />
                                       </li>
                                       <li>
                                          <Button text className={cx('btn-tooltip')} to={config.routes.profile}>
                                             Go to profile
                                          </Button>{' '}
                                          <CgProfile className={cx('icon')} />
                                       </li>
                                    </ul>
                                 )}
                              </div>

                              <div className={cx('option')}>
                                 <Link to={config.routes.cart}>
                                    <Image src={images.logo} className={cx('img')} />
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
            <div className={cx('menu')}>
               <div className={cx('menu-container')}>
                  <Button
                     leftIcon={<IoFilterOutline className={cx('icon')} />}
                     rightIcon={<IoIosArrowDown className={cx('icon')} />}
                     className={cx('menu-drop')}
                  >
                     <span>SHOP CATEGORIES</span>
                  </Button>
                  <div className={cx('menu-option')}>
                     <Button text className={cx('btn')} to={config.routes.home}>
                        home
                     </Button>
                     <Button text className={cx('btn')} to={config.routes.store}>
                        our store
                     </Button>
                     <Button text className={cx('btn')} to={config.routes.blogs}>
                        blogs
                     </Button>
                     <Button text className={cx('btn')} to={config.routes.contact}>
                        contact
                     </Button>
                     {user && (
                        <Button text className={cx('btn')} to={config.routes.order}>
                           my orders
                        </Button>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Header

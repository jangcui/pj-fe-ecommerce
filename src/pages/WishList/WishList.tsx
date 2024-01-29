import classNames from 'classnames/bind'
import styles from './WishList.module.scss'
import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import Image from '~/components/Image'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/redux/store/store'
import { useEffect, useState } from 'react'
import Button from '~/components/Button'
import Loading from '~/components/Loading/Loading'
import { useNavigate } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { getUserWishList, toggleWWishListProduct } from '~/redux/features/user/wishList/wishListService'

const cx = classNames.bind(styles)
interface ValueType {
   index: number
   id?: string
}
function WishList() {
   const dispatch = useDispatch<AppDispatch>()
   const { isLogin } = useSelector((state: RootState) => state.auth)
   const { wishList, isLoading } = useSelector((state: RootState) => state.wishListData)
   const [dataList, setDataList] = useState<typeof wishList>(wishList)
   const [open, setOpen] = useState(false)
   const [value, setValue] = useState<ValueType>({
      index: 0,
      id: '',
   })
   const navigate = useNavigate()
   useEffect(() => {
      if (!isLogin) {
         navigate('/login')
      } else {
         dispatch(getUserWishList())
      }
   }, [isLogin, navigate, dispatch])

   useEffect(() => {
      if (wishList) {
         setDataList(wishList)
      }
   }, [wishList])

   const handleRemoveProduct = async ({ index, id }: { index: number; id?: string }) => {
      if (id) {
         const newData = [...dataList]
         newData.splice(index, 1)
         setOpen(false)
         setDataList(newData)
         await dispatch(toggleWWishListProduct({ prodId: id }))
      }
   }

   return (
      <>
         <ChangeTitle title={'WishList'} />
         <BreadCrumb title={'WishList'} />
         <div
            className={cx(
               'wrapper',
               'w-100 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-4',
            )}
         >
            {isLoading ? (
               <div className={cx('loading')}>
                  <Loading />
               </div>
            ) : (
               <>
                  {dataList?.length === 0 && (
                     <div className={cx('loading')}>
                        <h2>No data.</h2>{' '}
                     </div>
                  )}
                  {dataList?.map((data, index) => {
                     return (
                        <div key={index} className="col">
                           <div className={cx('container')}>
                              <>
                                 <Button
                                    text
                                    className={cx('btn-close')}
                                    onClick={() => {
                                       value.index = index
                                       value.id = data?.prodId
                                       setValue({ ...value })
                                       setOpen(true)
                                    }}
                                 >
                                    <AiOutlineClose className={cx('icon')} />
                                 </Button>

                                 <Button
                                    text
                                    className={cx('btn')}
                                    onClick={() => {
                                       navigate(`/product/${data?.slug}`)
                                    }}
                                 ></Button>
                                 <div className={cx('wrap-img')}>
                                    <Image className={cx('img')} src={data.image ? data.image : ''} />
                                 </div>
                                 <div className={cx('content')}>
                                    <h3 className={cx('title')}>{data.title}</h3>
                                    {data?.discountCode ? (
                                       <p className={cx('price')}>${data?.price_after_discount.toFixed(2)}</p>
                                    ) : (
                                       <p className={cx('price')}> ${data.price.toFixed(2)}</p>
                                    )}
                                 </div>
                              </>
                           </div>
                        </div>
                     )
                  })}
               </>
            )}
            {/* <ModalCustom
               title={'Remove to wishlist '}
               open={open}
               onOk={() => handleRemoveProduct({ index: value.index, id: value.id })}
               onCancel={() => setOpen(false)}
            /> */}
         </div>
      </>
   )
}

export default WishList

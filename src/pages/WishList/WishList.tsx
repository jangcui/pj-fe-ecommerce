import classNames from 'classnames/bind'
import styles from './WishList.module.scss'
import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import Image from '~/components/Image'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/store/store'
import { useEffect, useState } from 'react'
import { addToWishList, getUserWishList } from '~/features/customers/customerService'
import { ProductType } from '~/types/productStage'
import { ImgType } from '~/types/imageStage'
import Button from '~/components/Button'
import Loading from '~/components/Loading/Loading'
import ModalCustom from '~/components/ModalCustom'
import { useNavigate } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'

const cx = classNames.bind(styles)
interface ValueType {
   index: number
   id?: string
}
function WishList() {
   const dispatch = useDispatch<AppDispatch>()
   const { wishlist, isLoading, user } = useSelector((state: RootState) => state.customer)
   const [dataList, setDataList] = useState<ProductType[]>([])
   const [open, setOpen] = useState(false)
   const [value, setValue] = useState<ValueType>({
      index: 0,
      id: '',
   })
   const navigate = useNavigate()
   useEffect(() => {
      if (!user) {
         navigate('/login')
      } else {
         dispatch(getUserWishList())
      }
   }, [user, navigate, dispatch])

   useEffect(() => {
      if (wishlist) {
         setDataList(wishlist)
      }
   }, [wishlist])

   const handleRemoveProduct = async ({ index, id }: { index: number; id?: string }) => {
      if (id) {
         const newData = [...dataList]
         newData.splice(index, 1)
         setOpen(false)
         setDataList(newData)
         await dispatch(addToWishList({ prodId: id }))
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
                  {' '}
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
                     const product = data
                     const imgList = product.images?.map((img: ImgType) => img.url)

                     return (
                        <div key={index} className="col">
                           <div className={cx('container')}>
                              <>
                                 <Button
                                    text
                                    onClick={() => {
                                       value.index = index
                                       value.id = product._id
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
                                       navigate(`/product/${product?.slug}`)
                                    }}
                                 ></Button>
                                 <div className={cx('wrap-img')}>
                                    <Image className={cx('img')} src={imgList ? imgList[0] : ''} />
                                 </div>
                                 <div className={cx('content')}>
                                    <h3 className={cx('title')}>{product.title}</h3>
                                    {product?.discountCode ? (
                                       <p className={cx('price')}>${product?.price_after_discount.toFixed(2)}</p>
                                    ) : (
                                       <p className={cx('price')}> ${product.price.toFixed(2)}</p>
                                    )}
                                 </div>
                              </>{' '}
                           </div>
                        </div>
                     )
                  })}
               </>
            )}
            <ModalCustom
               title={'Remove to wishlist '}
               open={open}
               onOk={() => handleRemoveProduct({ index: value.index, id: value.id })}
               onCancel={() => setOpen(false)}
            />
         </div>
      </>
   )
}

export default WishList

import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import Marquee from 'react-fast-marquee'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import BreadCrumb from '~/components/BreadCrumb'
import Button from '~/components/Button'
import CardProduct from '~/components/CardProduct'
import ChangeTitle from '~/components/ChangeTitle'
import Loading from '~/components/Loading'
import StarRatingCustom from '~/components/StarRatingCustom'
import { openModalLogin } from '~/redux/features/modals/modalSlice'
import { ProductType } from '~/redux/features/products/productType'
import { getAProduct, getAllProducts, rateProduct } from '~/redux/features/products/productsService'
import { getCart } from '~/redux/features/user/cart/cartService'
import { getUserWishList } from '~/redux/features/user/wishList/wishListService'
import { AppDispatch, RootState } from '~/redux/store'
import DetailProduct from './DetailProduct'

import styles from './SingleProduct.module.scss'

const cx = classNames.bind(styles)

function SingleProduct() {
   const dispatch = useDispatch<AppDispatch>()
   const { product, productList, isLoading } = useSelector((state: RootState) => state.products)
   const { isLogin } = useSelector((state: RootState) => state.auth)

   const [productPop, setProductPop] = useState<ProductType[]>([])
   const [star, setStar] = useState<number>(0)
   const [comment, setComment] = useState<string>('')

   const { slug } = useParams()
   const navigate = useNavigate()

   useEffect(() => {
      if (!slug) {
         navigate('/')
      } else {
         navigate('')
         dispatch(getAProduct(slug))
         dispatch(getAllProducts({}))
         if (isLogin) {
            dispatch(getUserWishList())
            dispatch(getCart())
         }
      }
   }, [isLogin, navigate, dispatch, slug])

   useEffect(() => {
      const data = productList?.filter((element: ProductType) => {
         return element?.tags === 'popular'
      })
      setProductPop(data)
   }, [productList])

   // useEffect(() => {
   //    for (const index in cartList) {
   //       if (product?._id === cartList[index]?.product?._id) {
   //          `setAllReadyAdded`(true)
   //       } else {
   //          setAllReadyAdded(false)
   //       }
   //    }
   // }, [dispatch, product, cartList])

   const handleRating = async () => {
      if (!isLogin) {
         dispatch(openModalLogin())
      } else if (star === 0) {
         toast.error('Please add star rating')
         return
      } else if (comment === '') {
         toast.error('Please write a review about product.')
         return
      } else {
         if (slug) {
            await dispatch(rateProduct({ star: star, comment: comment, prodId: product?._id }))
            await dispatch(getAProduct(slug))
            setComment('')
            setStar(0)
         }
      }
   }

   return (
      <>
         <ChangeTitle title={`${product?.title}`} />
         <BreadCrumb title={`${product?.title}`} />
         <div className={cx('wrapper', 'row mt-4')}>
            <div className={cx('container', 'row col-12 col-lg-11')}>
               {isLoading ? (
                  <div className={cx('loading')}>
                     <Loading />
                  </div>
               ) : (
                  <>
                     <DetailProduct data={product} />
                  </>
               )}
               <div className={cx('description-container', 'w-100')}>
                  <h2>Description</h2>
                  <p className={cx('description')} dangerouslySetInnerHTML={{ __html: product?.description }}></p>
               </div>
               <div className={cx('review-container', 'w-100')}>
                  <h2>Review</h2>
                  <div className={cx('reviews')}>
                     <div className={cx('form-submit')}>
                        <h4>Rating</h4>
                        <StarRatingCustom initStar={star} readOnly={false} onClick={(e) => setStar(e)} />{' '}
                        <h4>Comments</h4>
                        <textarea
                           value={comment}
                           onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
                           className={cx('textarea')}
                           placeholder="Enter review"
                        />
                        <div className={cx('btn-submit', 'd-flex justify-content-center justify-content-md-end')}>
                           <Button primary className={cx('btn')} lazyLoad={isLoading} onClick={handleRating}>
                              Submit review
                           </Button>
                        </div>
                     </div>
                     {product?.ratings?.map((item, index) => (
                        <div className={cx('comments')} key={index}>
                           <span className={cx('btn-report')}>Report as inappropriate </span>
                           <StarRatingCustom initStar={item.star} /> <h3 className={cx('content')}>{item.comment}</h3>
                           <p className={cx('text')}>(anonymous)</p>
                        </div>
                     ))}
                  </div>
               </div>

               <div className={cx('popular-container')}>
                  <h2>Our Products Popular</h2>
                  <div className="w-100 row">
                     <Marquee
                        delay={2}
                        pauseOnHover={true}
                        gradientWidth={5}
                        gradientColor={[255, 255, 255]}
                        className={cx('marquee')}
                        autoFill={true}
                     >
                        {productPop?.map((product, index) => {
                           return (
                              <div key={index} className={cx('popular-cart')}>
                                 <CardProduct data={product} />
                              </div>
                           )
                        })}
                     </Marquee>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default SingleProduct

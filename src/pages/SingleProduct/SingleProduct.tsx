import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AiOutlineHeart, AiOutlineMinus, AiOutlinePlus, AiTwotoneHeart } from 'react-icons/ai'
import classNames from 'classnames/bind'
import ReactImageMagnify from 'react-image-magnify'
import Marquee from 'react-fast-marquee'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import styles from './SingleProduct.module.scss'
import Button from '~/components/Button'
import { AppDispatch, RootState } from '~/redux/store/store'
import images from '~/assets/images'
import { ProductType } from '~/redux/features/products/productType'
import Loading from '~/components/Loading'
import StarRatingCustom from '~/components/StarRatingCustom'
import CardProduct from '~/components/CardProduct'
import { getAProduct, getAllProducts, rateProduct } from '~/redux/features/products/productsService'
import { openModalLogin } from '~/redux/features/modalLogin/modalLoginSlice'
import { getUserWishList, toggleWWishListProduct } from '~/redux/features/user/wishList/wishListService'
import { addToCart, getCart } from '~/redux/features/user/cart/cartService'

const cx = classNames.bind(styles)

function SingleProduct() {
   const dispatch = useDispatch<AppDispatch>()
   const { product, productList, isLoading } = useSelector((state: RootState) => state.products)
   const { isLogin } = useSelector((state: RootState) => state.auth)
   const cartList = useSelector((state: RootState) => state.cartData.productList)
   const { wishList } = useSelector((state: RootState) => state.wishListData)

   const [colorId, setColorId] = useState<string>('')

   const [productPop, setProductPop] = useState<ProductType[]>([])
   const [allReadyAdded, setAllReadyAdded] = useState<boolean>(false)
   const [isWishlist, setIsWishlist] = useState<boolean>(false)
   const [star, setStar] = useState<number>(0)
   const [comment, setComment] = useState<string>('')
   const [quantity, setQuantity] = useState<number>(1)

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
   const handleWishlist = async () => {
      if (!isLogin) {
         dispatch(openModalLogin())
      } else {
         setIsWishlist(!isWishlist)
         await dispatch(toggleWWishListProduct({ prodId: product._id }))
         await dispatch(getUserWishList())
      }
   }

   useEffect(() => {
      const data = productList?.filter((element: ProductType) => {
         return element?.tags === 'popular'
      })
      setProductPop(data)
   }, [productList])

   useEffect(() => {
      wishList?.map((item) => {
         if (item?.prodId === product?._id) {
            setIsWishlist(true)
         }
      })
   }, [wishList, product])

   useEffect(() => {
      for (const index in cartList) {
         if (product?._id === cartList[index]?.productId?._id) {
            setAllReadyAdded(true)
         } else {
            setAllReadyAdded(false)
         }
      }
   }, [dispatch, product, cartList])

   const handleAddToCart = async () => {
      if (!colorId) {
         toast.error('Please Chose color!')
         return
      } else {
         const data = { color: colorId, productId: product?._id, price: product?.price, quantity: quantity }
         await dispatch(addToCart(data))
         await dispatch(getCart())
      }
   }

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
   console.log(product)
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
                  <div className={cx('detail', 'row col-12 justify-content-center')}>
                     <div className={cx('wrap-img', 'row col-12 col-lg-6')}>
                        <div className={cx('img-zoom', 'w-100')}>
                           <div className={cx('img')}>
                              <ReactImageMagnify
                                 enlargedImagePosition="over"
                                 style={{ cursor: 'zoom-in' }}
                                 {...{
                                    smallImage: {
                                       isFluidWidth: true,
                                       src: product?.images[0]?.url ? product?.images[0]?.url : images.errorImage,
                                    },
                                    largeImage: {
                                       src: product?.images[0]?.url ? product?.images[0]?.url : images.errorImage,
                                       width: 2000,
                                       height: 2000,
                                    },
                                 }}
                              />
                           </div>
                        </div>
                        <div className="d-flex justify-content-evenly row-100 gap-4">
                           <div className={cx('img', 'col-6')}>
                              <ReactImageMagnify
                                 style={{ cursor: 'zoom-in' }}
                                 enlargedImagePosition="over"
                                 {...{
                                    smallImage: {
                                       isFluidWidth: true,
                                       src: product?.images[1]?.url ? product?.images[1]?.url : images.errorImage,
                                    },
                                    largeImage: {
                                       src: product?.images[1]?.url ? product?.images[1]?.url : images.errorImage,

                                       width: 1200,
                                       height: 1200,
                                    },
                                 }}
                              />
                           </div>
                           <div className={cx('img', 'col-6')}>
                              <ReactImageMagnify
                                 style={{ cursor: 'zoom-in' }}
                                 enlargedImagePosition="over"
                                 {...{
                                    smallImage: {
                                       isFluidWidth: true,
                                       src: product?.images[2]?.url ? product?.images[2]?.url : images.errorImage,
                                    },
                                    largeImage: {
                                       src: product?.images[2]?.url ? product?.images[2]?.url : images.errorImage,
                                       width: 1200,
                                       height: 1200,
                                    },
                                 }}
                              />
                           </div>
                        </div>
                     </div>
                     <div className="row col-12 col-lg-6">
                        <div className={cx('content')}>
                           <h3 className={cx('title')}>{product?.title} </h3>
                           <div className={cx('price')}>
                              {product?.discountCode ? (
                                 <div className={cx('discount')}>
                                    {' '}
                                    <>
                                       <s className="fw-bold"> ${product.price.toFixed(2)}</s>
                                       <p className={cx('origin-price')}>
                                          {' '}
                                          ${product?.price_after_discount.toFixed(2)}
                                       </p>
                                    </>
                                    <span className={cx('badge')}>-{product?.discountCode.percentage}%</span>
                                 </div>
                              ) : (
                                 <p className={cx('origin-price')}> ${product.price.toFixed(2)}</p>
                              )}
                           </div>
                           <div className="d-flex">
                              <span className="me-3">({product?.ratings?.length}) reviews</span>
                              <StarRatingCustom initStar={product.totalRating as number} readOnly={true} />{' '}
                           </div>
                           <>
                              <div className="d-flex align-items-center mb-4">
                                 <span className="fs-2 fw-bold me-3">Brand:</span>
                                 <Button
                                    text
                                    className={cx('btn-nav')}
                                    onClick={() => {
                                       navigate(`/product?${`brand=${encodeURIComponent(product?.brand)}`}`)
                                       dispatch(getAllProducts({ brand: product?.brand }))
                                    }}
                                 >
                                    {product?.brand}
                                 </Button>
                              </div>
                              <div className="d-flex align-items-center mb-4">
                                 <span className="fs-2 fw-bold me-3">Type:</span>
                                 <Button
                                    className={cx('btn-nav')}
                                    onClick={() => {
                                       navigate(
                                          `/product?${`category=${encodeURIComponent(product?.category.trim())}`}`,
                                       )
                                       dispatch(getAllProducts({ category: product?.category }))
                                    }}
                                 >
                                    {product?.category}
                                 </Button>
                              </div>
                              <div className="d-flex align-items-center mb-4">
                                 <span className="fs-2 fw-bold me-3">Tags:</span>
                                 <Button
                                    className={cx('btn-nav')}
                                    onClick={() => {
                                       navigate(`/product?${`tags=${encodeURIComponent(product?.tags)}`}`)
                                       dispatch(getAllProducts({ tag: product?.tags }))
                                    }}
                                 >
                                    {product?.tags}
                                 </Button>
                              </div>

                              {!allReadyAdded && (
                                 <div className="d-flex align-items-center flex-wrap mb-4">
                                    <span className="fs-2 fw-bold me-3">Color:</span>
                                    <div className="d-flex gap-1">
                                       {product?.color.map((color, index) => (
                                          <div
                                             key={index}
                                             className={cx('color-select', colorId === color?._id ? 'active' : '')}
                                          >
                                             <Button
                                                text
                                                className={cx('btn-color')}
                                                onClick={() => setColorId(color?._id)}
                                                style={{ backgroundColor: color?.title }}
                                             />
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              )}
                              <div className="d-flex align-items-center mb-4">
                                 <div className={cx('option')}>
                                    {!allReadyAdded && (
                                       <div className={cx('wrap-input')}>
                                          <span className="fs-2 fw-bold me-3">Quantity:</span>
                                          <Button
                                             className={cx('input-btn')}
                                             text
                                             onClick={() => quantity > 0 && setQuantity((prev) => prev - 1)}
                                          >
                                             <AiOutlineMinus className={cx('icon')} />
                                          </Button>
                                          <input
                                             type="number"
                                             value={quantity}
                                             onChange={() => setQuantity}
                                             min={0}
                                             step={1}
                                             max={1000}
                                          />
                                          <Button className={cx('input-btn')} text>
                                             <AiOutlinePlus
                                                className={cx('icon')}
                                                onClick={() => quantity < 1000 && setQuantity((prev) => prev + 1)}
                                             />
                                          </Button>
                                       </div>
                                    )}
                                    <div className={cx('wrap-btn')}>
                                       {allReadyAdded ? (
                                          <Button className={cx('btn')} primary onClick={() => navigate('/cart')}>
                                             Go To Cart
                                          </Button>
                                       ) : (
                                          <Button
                                             className={cx('btn')}
                                             primary
                                             onClick={!isLogin ? () => dispatch(openModalLogin()) : handleAddToCart}
                                             lazyLoad={isLoading}
                                          >
                                             ADD TO CART
                                          </Button>
                                       )}
                                    </div>
                                 </div>
                              </div>
                           </>
                           <div className={cx('btn-wishlist')}>
                              {!isLoading && (
                                 <Button
                                    onClick={handleWishlist}
                                    className={cx('btn')}
                                    text
                                    leftIcon={
                                       isWishlist ? (
                                          <AiTwotoneHeart style={{ color: '#dd551b' }} className={cx('icon')} />
                                       ) : (
                                          <AiOutlineHeart
                                             style={{ color: '#dd551b' }}
                                             className={cx('icon', 'icon-active')}
                                          />
                                       )
                                    }
                                 >
                                    Add to wishlist
                                 </Button>
                              )}
                           </div>

                           <div className="d-flex align-items-center mb-4">
                              <h2 className="fs-2 fw-bold me-3">Shipping and returns:</h2>
                              <i> Free shipping and returns available all orders </i>
                           </div>
                        </div>
                     </div>
                  </div>
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
                        className="w-100"
                     >
                        {productPop?.map((product, index) => {
                           return (
                              <div key={index} className="w-50  d-flex">
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

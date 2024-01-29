import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactImageMagnify from 'react-image-magnify'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AiOutlineHeart, AiOutlineMinus, AiOutlinePlus, AiTwotoneHeart } from 'react-icons/ai'

import { ProductType } from '~/redux/features/products/productType'
import Button from '~/components/Button'
import images from '~/assets/images'
import StarRatingCustom from '~/components/StarRatingCustom'
import { AppDispatch, RootState } from '~/redux/store'
import { openModalLogin } from '~/redux/features/modals/modalSlice'
import { getUserWishList, toggleWWishListProduct } from '~/redux/features/user/wishList/wishListService'
import { addToCart, getCart } from '~/redux/features/user/cart/cartService'
import { getAllProducts } from '~/redux/features/products/productsService'

import styles from './SingleProduct.module.scss'
import { TiShoppingCart } from 'react-icons/ti'

const cx = classNames.bind(styles)

function DetailProduct({ data }: { data: ProductType }) {
   const [quantity, setQuantity] = useState<number>(1)
   const [colorId, setColorId] = useState({
      _id: data?.color[0]?._id,
      title: data?.color[0]?.title,
   })
   const [isWishlist, setIsWishlist] = useState<boolean>(false)

   const dispatch = useDispatch<AppDispatch>()
   const { isLoading } = useSelector((state: RootState) => state.products)
   const { isLogin } = useSelector((state: RootState) => state.auth)
   const { wishList } = useSelector((state: RootState) => state.wishListData)

   const isInCart = useSelector((state: RootState) =>
      state.cartData.productList.some((item) => item.product?._id === data?._id),
   )
   const navigate = useNavigate()

   const handleWishlist = async () => {
      if (!isLogin) {
         dispatch(openModalLogin())
      } else {
         setIsWishlist(!isWishlist)
         await dispatch(toggleWWishListProduct({ prodId: data._id }))
         await dispatch(getUserWishList())
      }
   }

   const handleAddToCart = async () => {
      await dispatch(addToCart({ productId: data._id, colorId: colorId._id, quantity: quantity }))
      await dispatch(getCart())
   }

   useEffect(() => {
      wishList?.map((item) => {
         if (item?.prodId === data?._id) {
            setIsWishlist(true)
         }
      })
   }, [wishList, data])

   const handleNavigateForBrand = () => {
      navigate(`/product?${`brand=${encodeURIComponent(data?.brand)}`}`)
      dispatch(getAllProducts({ brand: data?.brand }))
   }
   const handleNavigateForCategory = () => {
      navigate(`/product?${`category=${encodeURIComponent(data?.category.trim())}`}`)
      dispatch(getAllProducts({ category: data?.category }))
   }
   const handleNavigateForTag = () => {
      navigate(`/product?${`tags=${encodeURIComponent(data?.tags)}`}`)
      dispatch(getAllProducts({ tag: data?.tags }))
   }

   const handleIncrQuantity = () => {
      quantity < 10 && setQuantity((prev) => prev + 1)
   }
   const handleDecrQuantity = () => {
      quantity > 1 && setQuantity((prev) => prev - 1)
   }

   return (
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
                           src: data?.images[0]?.url ? data?.images[0]?.url : images.errorImage,
                        },
                        largeImage: {
                           src: data?.images[0]?.url ? data?.images[0]?.url : images.errorImage,
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
                           src: data?.images[1]?.url ? data?.images[1]?.url : images.errorImage,
                        },
                        largeImage: {
                           src: data?.images[1]?.url ? data?.images[1]?.url : images.errorImage,

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
                           src: data?.images[2]?.url ? data?.images[2]?.url : images.errorImage,
                        },
                        largeImage: {
                           src: data?.images[2]?.url ? data?.images[2]?.url : images.errorImage,
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
               <h3 className={cx('title')}>{data?.title} </h3>
               <div className={cx('price')}>
                  {data?.discountCode ? (
                     <div className={cx('discount')}>
                        {' '}
                        <>
                           <s className="fw-bold"> ${data.price}</s>
                           <p className={cx('origin-price')}> ${data?.price_after_discount}</p>
                        </>
                        <span className={cx('badge')}>-{data?.discountCode.percentage}%</span>
                     </div>
                  ) : (
                     <p className={cx('origin-price')}> ${data.price}</p>
                  )}
               </div>
               <div className="d-flex">
                  <span className="me-3">({data?.ratings?.length}) reviews</span>
                  <StarRatingCustom initStar={data.totalRating as number} readOnly={true} />{' '}
               </div>
               <>
                  <div className="d-flex align-items-center mb-4">
                     <span className="fs-3 fw-bold me-3">Brand:</span>
                     <Button text className={cx('btn-nav')} onClick={handleNavigateForBrand}>
                        {data?.brand}
                     </Button>
                  </div>
                  <div className="d-flex align-items-center mb-4">
                     <span className="fs-3 fw-bold me-3">Type:</span>
                     <Button className={cx('btn-nav')} onClick={handleNavigateForCategory}>
                        {data?.category}
                     </Button>
                  </div>
                  <div className="d-flex align-items-center mb-4">
                     <span className="fs-3 fw-bold me-3">Tags:</span>
                     <Button className={cx('btn-nav')} onClick={handleNavigateForTag}>
                        {data?.tags}
                     </Button>
                  </div>
                  {!isInCart ? (
                     <div className="d-flex align-items-center flex-wrap mb-4">
                        <span className="fs-3 fw-bold me-3">Color:</span>
                        <div className="d-flex gap-1 flex-wrap">
                           {data?.color.map((color, index) => (
                              <div
                                 key={index}
                                 className={cx('color-select', colorId._id === color?._id ? 'active' : '')}
                              >
                                 <Button
                                    text
                                    className={cx('btn-color')}
                                    onClick={() => setColorId({ title: color?.title, _id: color?._id })}
                                    style={{ backgroundColor: color?.title }}
                                 />
                              </div>
                           ))}
                        </div>
                     </div>
                  ) : (
                     <div className="d-flex align-items-center gap-2">
                        <TiShoppingCart className="fs-2" />
                        <p className="fw-bold mb-0 fs-4">Product existed in cart</p>
                     </div>
                  )}
                  <div className="d-flex align-items-center mb-4">
                     <div className={cx('option')}>
                        {!isInCart && (
                           <div className={cx('quantity-block')}>
                              <span className="fs-3 fw-bold me-3">Quantity:</span>
                              <Button className={cx('quantity-btn')} text onClick={handleDecrQuantity}>
                                 <AiOutlineMinus className={cx('icon')} />
                              </Button>

                              <div className={cx('quantity-value')}>{quantity} </div>
                              <Button className={cx('quantity-btn')} text>
                                 <AiOutlinePlus className={cx('icon')} onClick={handleIncrQuantity} />
                              </Button>
                           </div>
                        )}
                        <div className={cx('wrap-btn')}>
                           {isInCart ? (
                              <Button className={cx('btn')} primary to={'/cart'}>
                                 Go to cart
                              </Button>
                           ) : (
                              <Button
                                 className={cx('btn')}
                                 primary
                                 // onClick={!isLogin ? () => dispatch(openModalLogin()) : handleAddToCart}
                                 // onClick={handleAddToCartClient}
                                 onClick={handleAddToCart}
                                 lazyLoad={isLoading}
                              >
                                 Ad to cart
                              </Button>
                           )}
                        </div>
                        <div className={cx('wrap-btn')}>
                           <Button className={cx('btn')} secondary to={'/cart'}>
                              Buy now
                           </Button>
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
                              <AiOutlineHeart style={{ color: '#dd551b' }} className={cx('icon', 'icon-active')} />
                           )
                        }
                     >
                        Add to wishlist
                     </Button>
                  )}
               </div>

               <div className="d-flex align-items-center mb-4">
                  <h2 className="fs-3 fw-bold me-3">Shipping and returns:</h2>
                  <i> Free shipping and returns available all orders </i>
               </div>
            </div>
         </div>
      </div>
   )
}

export default DetailProduct

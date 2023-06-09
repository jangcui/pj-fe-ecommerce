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
import Button from '~/components/Button/Button'
import { AppDispatch, RootState } from '~/store/store'
import { getAProduct, getProducts, rateProduct } from '~/features/products/productsService'
import images from '~/assets/images'
import { addToCart, addToWishList, getCarts, getUserWishList } from '~/features/customers/customerService'
import { ItemType } from '~/types/itemStage'
import { ProductType } from '~/types/productStage'
import Collection from '~/components/Collection'
import Loading from '~/components/Loading/Loading'
import StarRatingCustom from '~/components/StarRatingCustom'
import { openModalLogin } from '~/features/modalLogin/modalLoginSlice'

const cx = classNames.bind(styles)

function SingleProduct() {
   const dispatch = useDispatch<AppDispatch>()
   const { product, productList, isLoading } = useSelector((state: RootState) => state.products)
   const { cartList, wishlist, user } = useSelector((state: RootState) => state.customer)
   const imgList = product?.images?.map((img) => img.url)
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
         dispatch(getProducts({}))
         if (user) {
            dispatch(getUserWishList())
            dispatch(getCarts())
         }
      }
   }, [user, navigate, dispatch, slug])
   const handleWishlist = async () => {
      if (!user) {
         dispatch(openModalLogin())
      } else {
         setIsWishlist(!isWishlist)
         await dispatch(addToWishList({ prodId: product._id || '' }))
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
      wishlist?.map((item) => {
         if (item?._id === product?._id) {
            setIsWishlist(true)
         }
      })
   }, [wishlist, product])
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
         await dispatch(getCarts())
      }
   }

   const handleRating = async () => {
      if (!user) {
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
         <div className={cx('wrapper')}>
            <div className={cx('detail-container')}>
               {isLoading ? (
                  <div className={cx('loading')}>
                     <Loading />
                  </div>
               ) : (
                  <div className={cx('detail')}>
                     <div className={cx('wrap-img')}>
                        <div className={cx('img-zoom')}>
                           <div className={cx('img')}>
                              <ReactImageMagnify
                                 enlargedImagePosition="over"
                                 {...{
                                    smallImage: {
                                       isFluidWidth: true,
                                       src: imgList && imgList[0] ? imgList[0] : images.errorImage,
                                    },
                                    largeImage: {
                                       src: imgList && imgList[0] ? imgList[0] : images.errorImage,
                                       width: 2000,
                                       height: 2000,
                                    },
                                 }}
                              />
                           </div>
                        </div>
                        <div className={cx('grid')}>
                           <div className={cx('img')}>
                              <ReactImageMagnify
                                 enlargedImagePosition="over"
                                 {...{
                                    smallImage: {
                                       isFluidWidth: true,
                                       src: imgList && imgList[1] ? imgList[1] : images.errorImage,
                                    },
                                    largeImage: {
                                       src: imgList && imgList[1] ? imgList[1] : images.errorImage,

                                       width: 1200,
                                       height: 1200,
                                    },
                                 }}
                              />
                           </div>
                           <div className={cx('img')}>
                              <ReactImageMagnify
                                 enlargedImagePosition="over"
                                 {...{
                                    smallImage: {
                                       isFluidWidth: true,
                                       src: imgList && imgList[2] ? imgList[2] : images.errorImage,
                                    },
                                    largeImage: {
                                       src: imgList && imgList[2] ? imgList[2] : images.errorImage,
                                       width: 1200,
                                       height: 1200,
                                    },
                                 }}
                              />
                           </div>
                        </div>
                     </div>
                     <div className={cx('content')}>
                        <h3 className={cx('title')}>{product?.title} </h3>
                        <div className={cx('price')}>
                           {product?.discountCode ? (
                              <div className={cx('discount')}>
                                 {' '}
                                 <>
                                    <s className="fw-bold"> ${product.price.toFixed(2)}</s>
                                    <p className={cx('origin-price')}> ${product?.price_after_discount.toFixed(2)}</p>
                                 </>
                                 <span className={cx('badge')}>-{product?.discountCode.percentage}%</span>
                              </div>
                           ) : (
                              <p className={cx('origin-price')}> ${product.price.toFixed(2)}</p>
                           )}
                        </div>
                        <div className={cx('d-flex')}>
                           <span className="me-3">({product?.ratings?.length}) reviews</span>
                           <StarRatingCustom initStar={product.totalRating as number} readOnly={true} />{' '}
                        </div>
                        <>
                           <div className={cx('field')}>
                              <span className={cx('name')}>Brand:</span>
                              <Button
                                 text
                                 className={cx('value')}
                                 onClick={() => {
                                    navigate(`/product?${`brand=${encodeURIComponent(product?.brand)}`}`)
                                    dispatch(getProducts({ brand: product?.brand }))
                                 }}
                              >
                                 {product?.brand}
                              </Button>
                           </div>
                           <div className={cx('field')}>
                              <span className={cx('name')}>Type:</span>
                              <Button
                                 className={cx('value')}
                                 onClick={() => {
                                    navigate(`/product?${`category=${encodeURIComponent(product?.category.trim())}`}`)
                                    dispatch(getProducts({ category: product?.category }))
                                 }}
                              >
                                 {product?.category}
                              </Button>
                           </div>
                           <div className={cx('field')}>
                              <span className={cx('name')}>Tags:</span>
                              <Button
                                 className={cx('value')}
                                 onClick={() => {
                                    navigate(`/product?${`tags=${encodeURIComponent(product?.tags)}`}`)
                                    dispatch(getProducts({ tag: product?.tags }))
                                 }}
                              >
                                 {product?.tags}
                              </Button>
                           </div>

                           {!allReadyAdded && (
                              <div className={cx('field')}>
                                 <span className={cx('name')}>Color:</span>
                                 <div className={cx('color')}>
                                    {product?.color.map((color: ItemType | any, index) => (
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
                           <div className={cx('field')}>
                              <div className={cx('option')}>
                                 {!allReadyAdded && (
                                    <div className={cx('wrap-input')}>
                                       <span className={cx('name')}>Quantity:</span>
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
                                       <Button className={cx('btn')} primary to={'/cart'}>
                                          Go To Cart
                                       </Button>
                                    ) : (
                                       <Button
                                          className={cx('btn')}
                                          primary
                                          onClick={!user ? () => dispatch(openModalLogin()) : handleAddToCart}
                                          lazyLoad={isLoading}
                                       >
                                          ADD TO CART
                                       </Button>
                                    )}
                                    <Button className={cx('btn')} secondary to={!user ? '/checkout' : ''}>
                                       Buy it now{' '}
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

                        <div className={cx('field')}>
                           <h2 className={cx('name')}>Shipping and returns:</h2>
                           <i> Free shipping and returns available all orders </i>
                        </div>
                     </div>
                  </div>
               )}
               <div className={cx('description-container')}>
                  <h2>Description</h2>
                  <p className={cx('description')} dangerouslySetInnerHTML={{ __html: product?.description || '' }}></p>
               </div>
               <div className={cx('review-container')}>
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
                        <div className={cx('btn-submit')}>
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
                  <div className={cx('products')}>
                     <Marquee
                        delay={4}
                        pauseOnHover={true}
                        gradientWidth={10}
                        gradientColor={[255, 255, 255]}
                        className="w-100"
                     >
                        {productPop?.map((product, index) => {
                           return (
                              <div key={index} className="w-50">
                                 <Collection data={product} />
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

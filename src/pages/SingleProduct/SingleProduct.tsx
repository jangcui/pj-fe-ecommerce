import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AiOutlineHeart, AiOutlineMinus, AiOutlinePlus, AiTwotoneHeart } from 'react-icons/ai'
import classNames from 'classnames/bind'
import ReactImageMagnify from 'react-image-magnify'
import Marquee from 'react-fast-marquee'
import { useNavigate, useParams } from 'react-router-dom'
import { HiArrowPath } from 'react-icons/hi2'
import { StarRating } from 'star-rating-react-ts'
import { useDispatch, useSelector } from 'react-redux'

import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import styles from './SingleProduct.module.scss'
import Button from '~/components/Button/Button'
import { AppDispatch, RootState } from '~/store/store'
import { getAProduct, rateProduct } from '~/features/products/productsService'
import images from '~/assets/images'
import { addToCart, addToWishList, getCarts, getUserWishList } from '~/features/customers/customerService'
import { ItemType } from '~/types/itemStage'
import { ProductType } from '~/types/productStage'
import Collection from '~/components/Collection'

const cx = classNames.bind(styles)

function SingleProduct() {
   const dispatch = useDispatch<AppDispatch>()
   const { product, productList, isLoading } = useSelector((state: RootState) => state.products)
   const { cartList, wishlist, user } = useSelector((state: RootState) => state.customer)
   const imgList = product?.images?.map((img) => img.url)
   const [color, setColor] = useState<string>('')
   const [productPop, setProductPop] = useState<ProductType[]>([])
   const [allReadyAdded, setAllReadyAdded] = useState<boolean>(false)
   const [isWishlist, setIsWishlist] = useState<boolean>(false)
   const [star, setStar] = useState<number>(0)
   const [comment, setComment] = useState<string>('')
   const [quantity, setQuantity] = useState<number>(1)
   const { productId } = useParams()
   const navigate = useNavigate()

   useEffect(() => {
      if (!user) {
         navigate('/login')
      } else if (!productId) {
         navigate('/')
      } else {
         navigate('')
         dispatch(getUserWishList())
         dispatch(getAProduct(productId))
         dispatch(getCarts())
      }
   }, [user, navigate, dispatch, productId])

   const handleWishlist = async () => {
      setIsWishlist(!isWishlist)
      await dispatch(addToWishList({ prodId: productId || '' }))
      await dispatch(getUserWishList())
   }

   useEffect(() => {
      const data = productList?.filter((element: ProductType) => {
         return element?.tags === 'popular'
      })
      setProductPop(data)
   }, [productList])

   useEffect(() => {
      wishlist?.map((item) => {
         if (item._id === productId) {
            setIsWishlist(true)
         }
      })
   }, [wishlist, productId])

   useEffect(() => {
      for (const index in cartList) {
         if (productId === cartList[index]?.productId?._id) {
            setAllReadyAdded(true)
         } else {
            setAllReadyAdded(false)
         }
      }
   }, [dispatch, productId, cartList])

   const handleAddToCart = async () => {
      if (!color) {
         toast.error('Please Chose color!')
         return
      } else {
         const data = { color: color, productId: product._id, price: product.price, quantity: quantity }
         await dispatch(addToCart(data))
         await dispatch(getCarts())
      }
   }

   const handleRating = async () => {
      if (star === 0) {
         toast.error('Please add star rating')
         return
      } else if (comment === '') {
         toast.error('Please write a review about product.')
         return
      } else {
         if (productId) {
            await dispatch(rateProduct({ star: star, comment: comment, prodId: productId }))
            await dispatch(getAProduct(productId))
         }
      }
   }

   return (
      <>
         <ChangeTitle title={`${product?.title}`} />
         <BreadCrumb title={`${product?.title}`} />
         <div className={cx('wrapper')}>
            <div className={cx('detail-container')}>
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
                     <h3 className={cx('title')}>{product.title}</h3>
                     <span className={cx('price')}>$ {product.price}</span>
                     <div className={cx('star')}>
                        <StarRating
                           initialRating={product.totalRating ? product.totalRating : product.totalRating}
                           theme={{
                              size: 24,
                              colors: {
                                 backgroundColorHover: '#ffd333',
                                 backgroundColorActive: '#ffd333',
                              },
                           }}
                        />
                        <span className={cx('review')}>({product.totalRating})</span>
                     </div>
                     <>
                        <div className={cx('field')}>
                           <span className={cx('name')}>Type:</span>
                           <span className={cx('value')}>Headsets</span>
                        </div>
                        <div className={cx('field')}>
                           <span className={cx('name')}>Brand:</span>
                           <span className={cx('value')}>{product.brand}</span>
                        </div>
                        <div className={cx('field')}>
                           <span className={cx('name')}>Categories:</span>
                           <span className={cx('value')}>{product.category}</span>
                        </div>
                        <div className={cx('field')}>
                           <span className={cx('name')}>Tags:</span>
                           <span className={cx('value')}>{product.tags}</span>
                        </div>

                        <div className={cx('field')}>
                           <span className={cx('name')}>Availability:</span>
                           <span className={cx('value')}>541 in stock</span>
                        </div>

                        {!allReadyAdded && (
                           <div className={cx('field')}>
                              <span className={cx('name')}>Color</span>
                              <div className={cx('color')}>
                                 {product?.color &&
                                    product?.color.map((color: ItemType | any, index) => (
                                       <Button
                                          text
                                          className={cx('btn-color')}
                                          key={index}
                                          onClick={() => setColor(color?._id)}
                                          style={{ backgroundColor: color?.title }}
                                       />
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
                                    <Button className={cx('btn')} primary onClick={handleAddToCart}>
                                       ADD TO CART
                                    </Button>
                                 )}
                                 <Button className={cx('btn')} secondary>
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
               <div className={cx('description-container')}>
                  <h2>Description</h2>
                  <p
                     className={cx('description')}
                     dangerouslySetInnerHTML={{ __html: product.description as string }}
                  ></p>
               </div>
               <div className={cx('review-container')}>
                  <h2>Review</h2>
                  <div className={cx('reviews')}>
                     {/* <h3>Customer Review</h3> */}
                     {/* <div className={cx('rating')}>
                           <StarRating
                              initialRating={5}
                              readOnly
                              theme={{
                                 size: 14,
                              }}
                           />{' '}
                           Based on 2 reviews
                        <span>
                           <p>write a review</p>
                        </span>
                     </div> */}
                     <div className={cx('form-submit')}>
                        <h4>Rating</h4>
                        <StarRating
                           initialRating={star}
                           onClick={(e) => setStar(e)}
                           theme={{
                              size: 20,
                              colors: {
                                 backgroundColorHover: '#ffd333',
                                 backgroundColorActive: '#ffd333',
                              },
                           }}
                        />{' '}
                        <h4>Comments</h4>
                        <textarea
                           value={comment}
                           onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
                           className={cx('textarea')}
                           placeholder="Give your review a title"
                        />
                        <div className={cx('btn-submit')}>
                           <Button primary className={cx('btn')} onClick={handleRating}>
                              Submit review
                           </Button>
                        </div>
                     </div>
                     {product?.ratings?.map((item, index) => (
                        <div className={cx('comments')} key={index}>
                           <span className={cx('btn-report')}>Report as inappropriate </span>
                           <StarRating
                              initialRating={item.star}
                              readOnly
                              theme={{
                                 size: 18,
                                 colors: {
                                    backgroundColorHover: '#ffd333',
                                    backgroundColorActive: '#ffd333',
                                 },
                              }}
                           />{' '}
                           <h3 className={cx('content')}>{item.comment}</h3>
                           {/* <div className={cx('date')}>
                              <span>jangcui</span>on
                              <span>jun 20 2020</span>
                           </div>
                           <p className={cx('text')}>{item.comment}</p> */}
                           <p className={cx('text')}>(anonymous)</p>
                           <input className={cx('reply')} type="text" />
                        </div>
                     ))}
                  </div>
               </div>

               <div className={cx('popular-container')}>
                  <h2>Our Products Popular</h2>
                  <div className={cx('products')}>
                     <Marquee delay={4} pauseOnHover={true} gradientWidth={10} gradientColor={[255, 255, 255]}>
                        {productPop?.map((product, index) => {
                           return (
                              <div key={index} className={cx('item')}>
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

import classNames from 'classnames/bind'
import ReactImageMagnify from 'react-image-magnify'

import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import styles from './SingleProduct.module.scss'
import { StarRating } from 'star-rating-react-ts'
import Button from '~/layouts/components/Button/Button'
import { CompareIcon, LikeIcon, MinusIcon, PlusIcon } from '~/components/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/store/store'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAProduct } from '~/features/products/productsService'
import images from '~/assets/images'
import { TfiAngleDown } from 'react-icons/tfi'
import { addToCart } from '~/features/customers/customerService'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

const cx = classNames.bind(styles)

function SingleProduct() {
   const dispatch = useDispatch<AppDispatch>()
   const { product } = useSelector((state: RootState) => state.products)
   const imgList = product?.images?.map((img) => img.url)
   const [color, setColor] = useState<string>('')
   const [quantity, setQuantity] = useState<number>(1)
   const { productId } = useParams()

   useEffect(() => {
      if (productId) {
         dispatch(getAProduct(productId))
      }
   }, [dispatch, productId])

   // const handleAddToCart()=> {
   //    dispatch(addToCart)
   // }

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
                                    src: imgList !== undefined ? imgList[0] : images.errorImage,
                                 },
                                 largeImage: {
                                    src: imgList !== undefined ? imgList[0] : images.errorImage,
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
                                    src: imgList !== undefined ? imgList[1] : images.errorImage,
                                 },
                                 largeImage: {
                                    src: imgList !== undefined ? imgList[1] : images.errorImage,
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
                                    src: imgList !== undefined ? imgList[2] : images.errorImage,
                                 },
                                 largeImage: {
                                    src: imgList !== undefined ? imgList[2] : images.errorImage,
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
                           initialRating={product.totalRating}
                           theme={{
                              size: 24,
                              colors: {
                                 backgroundColorHover: '#ffd333',
                                 backgroundColorActive: '#ffd333',
                              },
                           }}
                        />
                        <span className={cx('review')}>( {product.totalRating})</span>
                     </div>
                     <input className={cx('input')} type="text" placeholder="Write a review" />
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
                           <span className={cx('name')}>SKU:</span>
                           <span className={cx('value')}>SKU027</span>
                        </div>
                        <div className={cx('field')}>
                           <span className={cx('name')}>Availability:</span>
                           <span className={cx('value')}>541 in stock</span>
                        </div>
                        <div className={cx('field')}>
                           <span className={cx('name')}>Size</span>
                           <div className={cx('size')}>
                              <p className={cx('active')}>S</p>
                              <p>L</p>
                              <p>XL</p>
                           </div>
                        </div>
                        <div className={cx('field')}>
                           <span className={cx('name')}>Color</span>
                           <div className={cx('color')}>
                              <p />
                              <p className={cx('active')} />
                              <p />
                           </div>
                        </div>
                        <div className={cx('field')}>
                           <span className={cx('name')}>Quantity:</span>
                           <div className={cx('option')}>
                              <div className={cx('wrap-input')}>
                                 <Button
                                    className={cx('input-btn')}
                                    text
                                    onClick={() => quantity > 0 && setQuantity((prev) => prev - 1)}
                                 >
                                    <AiOutlineMinus className={cx('icon')} />
                                 </Button>
                                 <input type="number" value={quantity} min={0} step={1} max={1000} />
                                 <Button className={cx('input-btn')} text>
                                    <AiOutlinePlus
                                       className={cx('icon')}
                                       onClick={() => quantity < 1000 && setQuantity((prev) => prev + 1)}
                                    />
                                 </Button>
                              </div>
                              <div className={cx('wrap-btn')}>
                                 <Button className={cx('btn')} primary>
                                    ADD TO CART
                                 </Button>
                                 <Button className={cx('btn')} secondary>
                                    Buy it now{' '}
                                 </Button>
                              </div>
                           </div>
                        </div>
                     </>
                     <>
                        <div className={cx('other-btn')}>
                           <p>
                              <Button text leftIcon={<CompareIcon width={'14px'} height={'14px'} />}>
                                 Add to compare
                              </Button>
                           </p>
                           <p>
                              <Button text leftIcon={<LikeIcon width={'14px'} height={'14px'} />}>
                                 Add to wishlist
                              </Button>
                           </p>
                        </div>
                     </>
                     <>
                        <div className={cx('option')}>
                           <span className={cx('text')}>Shipping and returns</span>
                           <TfiAngleDown className={cx('icon')} />
                        </div>
                        <div className={cx('option')}>
                           <span className={cx('text')}>Materials </span>
                           <TfiAngleDown className={cx('icon')} />
                        </div>
                        <div className={cx('option')}>
                           <span className={cx('text')}>Dimensions</span>
                           <TfiAngleDown className={cx('icon')} />
                        </div>
                        <div className={cx('option')}>
                           <span className={cx('text')}>Care Instructions</span>
                           <TfiAngleDown className={cx('icon')} />
                        </div>
                     </>
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
                     <h3>Customer Review</h3>
                     <div className={cx('rating')}>
                        <span>
                           <StarRating
                              initialRating={5}
                              readOnly
                              theme={{
                                 size: 14,
                              }}
                           />{' '}
                           Based on 2 reviews
                        </span>
                        <span>
                           <p>write a review</p>
                        </span>
                     </div>
                     <div className={cx('form-submit')}>
                        <h3>Write a review</h3>
                        <span className={cx('form-input')}>
                           <p>Name</p>
                           <input className={cx('input')} type="text" placeholder="Enter your name" />
                        </span>
                        <span className={cx('form-input')}>
                           <p>Email</p>
                           <input className={cx('input')} type="text" placeholder="jangcui@example.com" />
                        </span>{' '}
                        <div className={cx('form-input')}>
                           <p>Rating</p>
                           <StarRating
                              initialRating={0}
                              theme={{
                                 size: 14,
                              }}
                           />{' '}
                        </div>
                        <span className={cx('form-input')}>
                           <p>Review title</p>
                           <input className={cx('input')} type="text" placeholder="Give your review a title" />
                        </span>{' '}
                        <span className={cx('form-input')}>
                           <p>Review title</p>
                           <textarea className={cx('textarea')} placeholder="Give your review a title" />
                        </span>
                        <div className={cx('btn-submit')}>
                           <Button primary className={cx('btn')}>
                              Submit review
                           </Button>
                        </div>
                        <div className={cx('comments')}>
                           <span className={cx('btn-report')}>Report as inappropriate </span>
                           <StarRating
                              initialRating={4}
                              theme={{
                                 size: 18,
                              }}
                           />{' '}
                           <h3 className={cx('content')}>Good</h3>
                           <div className={cx('date')}>
                              <span>jangcui</span>on
                              <span>jun 20 2020</span>
                           </div>
                           <p className={cx('text')}>
                              Dạ, giá sản phẩm bên mình đã bao gồm VAT rồi bạn nha. Để được hỗ trợ chi tiết, bạn hãy để
                              lại SĐT hoặc bớt chút thời gian liên hệ tổng đài miễn phí 1800
                           </p>
                           <input className={cx('reply')} type="text" />
                        </div>
                        <div className={cx('comments')}>
                           <span className={cx('btn-report')}>Report as inappropriate </span>
                           <StarRating
                              initialRating={4}
                              theme={{
                                 size: 18,
                              }}
                           />{' '}
                           <h3 className={cx('content')}>Good</h3>
                           <div className={cx('date')}>
                              <span>jangcui</span>on
                              <span>jun 20 2020</span>
                           </div>
                           <p className={cx('text')}>
                              Dạ, giá sản phẩm bên mình đã bao gồm VAT rồi bạn nha. Để được hỗ trợ chi tiết, bạn hãy để
                              lại SĐT hoặc bớt chút thời gian liên hệ tổng đài miễn phí 1800
                           </p>
                           <div className={cx('replied')}>
                              <h3>-Jangcui</h3>
                              <p>Giá này đã bao gồm VAT chưa shop? 1 ngày trước Thích Trả lời</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default SingleProduct

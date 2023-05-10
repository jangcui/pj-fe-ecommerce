import classNames from 'classnames/bind'
import ReactImageMagnify from 'react-image-magnify'

import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import styles from './SingleProduct.module.scss'
import { StarRating } from 'star-rating-react-ts'
import Button from '~/layouts/components/Button/Button'
import { CompareIcon, DropIcon, LikeIcon, MinusIcon, PlusIcon } from '~/components/Icon'
import Image from '~/components/Image/Image'
const cx = classNames.bind(styles)

declare module 'swiper/react' {
   export interface SwiperSlideProps {
      isActive?: boolean
      isPrev?: boolean
      isNext?: boolean
   }
}
function SingleProduct() {
   return (
      <>
         <ChangeTitle title={'Dynamic Product Name'} />
         <BreadCrumb title={'Dynamic Product Name'} />
         <div className={cx('wrapper')}>
            <div className={cx('detail-container')}>
               <div className={cx('detail')}>
                  <div className={cx('wrap-img')}>
                     {/* <Image src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/310682455_1762406820778371_5312311738616970341_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=knQEZlY3eP8AX-JtItR&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfAhOK9HbtZIsyF85dgdbReVsAuEJQXvVgHJtitscsFyWQ&oe=643A226E" /> */}
                     <div className={cx('img-magnify')}>
                        <ReactImageMagnify
                           className={cx('img-main')}
                           hoverDelayInMs={100}
                           enlargedImageContainerDimensions={{ width: '80%', height: '60%' }}
                           {...{
                              smallImage: {
                                 isFluidWidth: true,
                                 src: 'https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/310682455_1762406820778371_5312311738616970341_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=knQEZlY3eP8AX-JtItR&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfAhOK9HbtZIsyF85dgdbReVsAuEJQXvVgHJtitscsFyWQ&oe=643A226E',
                              },
                              largeImage: {
                                 src: 'https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/310682455_1762406820778371_5312311738616970341_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=knQEZlY3eP8AX-JtItR&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfAhOK9HbtZIsyF85dgdbReVsAuEJQXvVgHJtitscsFyWQ&oe=643A226E',
                                 width: 2500,
                                 height: 3500,
                              },
                           }}
                        />
                     </div>

                     <div className={cx('img-other')}>
                        <Image
                           className={cx('img-sub')}
                           src={
                              'https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/5/27/637577064561995165_ss-tab-a7-lite-xam-1.jpg'
                           }
                        />
                        <Image
                           className={cx('img-sub')}
                           src={
                              'https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/5/27/637577064561995165_ss-tab-a7-lite-xam-1.jpg'
                           }
                        />
                        <Image
                           className={cx('img-sub')}
                           src={
                              'https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/5/27/637577064561995165_ss-tab-a7-lite-xam-1.jpg'
                           }
                        />
                        <Image
                           className={cx('img-sub')}
                           src={
                              'https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/5/27/637577064561995165_ss-tab-a7-lite-xam-1.jpg'
                           }
                        />
                     </div>
                  </div>
                  <div className={cx('content')}>
                     <h3 className={cx('title')}>Kids Headphones Bulk 10 Pack Multi Colored For Students</h3>
                     <span className={cx('price')}>$ 100.00</span>
                     <div className={cx('star')}>
                        <StarRating
                           initialRating={5}
                           readOnly
                           theme={{
                              size: 16,
                           }}
                        />
                        <span className={cx('review')}>( 2 review)</span>
                     </div>
                     <input className={cx('input')} type="text" placeholder="Write a review" />
                     <>
                        <div className={cx('field')}>
                           <span className={cx('name')}>Type:</span>
                           <span className={cx('value')}>Headsets</span>
                        </div>
                        <div className={cx('field')}>
                           <span className={cx('name')}>Brand:</span>
                           <span className={cx('value')}>Havells</span>
                        </div>
                        <div className={cx('field')}>
                           <span className={cx('name')}>Categories:</span>
                           <span className={cx('value')}>
                              airpods, camera&apos;s, Computer & Laptop, headphones, mini speaker, our, Portable
                              Speaker, smartphones, Smart television, Smartwatches
                           </span>
                        </div>
                        <div className={cx('field')}>
                           <span className={cx('name')}>Tags:</span>
                           <span className={cx('value')}>headphones, laptop, oppo, mobile, speaker</span>
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
                                 <Button className={cx('input-btn')} text>
                                    <MinusIcon />
                                 </Button>
                                 <input type="number" defaultValue={0} min={0} step={1} max={1000} readOnly />
                                 <Button className={cx('input-btn')} text>
                                    <PlusIcon />
                                 </Button>
                              </div>
                              <Button className={cx('btn')} primary>
                                 ADD TO CART
                              </Button>
                              <Button className={cx('btn')} secondary>
                                 Buy it now{' '}
                              </Button>
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
                           <DropIcon className={cx('icon')} />
                        </div>
                        <div className={cx('option')}>
                           <span className={cx('text')}>Materials </span>
                           <DropIcon className={cx('icon')} />
                        </div>
                        <div className={cx('option')}>
                           <span className={cx('text')}>Dimensions</span>
                           <DropIcon className={cx('icon')} />
                        </div>
                        <div className={cx('option')}>
                           <span className={cx('text')}>Care Instructions</span>
                           <DropIcon className={cx('icon')} />
                        </div>
                     </>

                     <div className={cx('payment')}>
                        <h3 className={cx('title')}> Pay,emt methods </h3>
                        <div className={cx('img-card')}>
                           <Image src={'https://fptshop.com.vn/Content/v4/images/ft-img11.png?v=1'} />
                           <Image src={'https://fptshop.com.vn/Content/v4/images/ft-img11.png?v=1'} />
                           <Image src={'https://fptshop.com.vn/Content/v4/images/ft-img11.png?v=1'} />
                           <Image src={'https://fptshop.com.vn/Content/v4/images/ft-img11.png?v=1'} />
                           <Image src={'https://fptshop.com.vn/Content/v4/images/ft-img11.png?v=1'} />
                        </div>
                     </div>
                  </div>
               </div>
               <div className={cx('description-container')}>
                  <h2>Description</h2>
                  <p className={cx('description')}>
                     James with Web Hosting 9 ngày trước Overall, this tutorial provides a comprehensive and practical
                     guide to building an e-commerce website using React JS. Whether you are a beginner or an
                     experienced developer, this tutorial is an excellent resource for anyone looking to build a modern
                     and functional e-commerce website.
                  </p>
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

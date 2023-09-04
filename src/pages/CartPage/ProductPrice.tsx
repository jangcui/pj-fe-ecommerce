import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import { useDispatch } from 'react-redux'
import debounce from 'lodash.debounce'
import { FiMinus } from 'react-icons/fi'
import { BiPlus } from 'react-icons/bi'
import styles from './CartPage.module.scss'
import { AiFillDelete } from 'react-icons/ai'

import Image from '~/components/Image'
import { AppDispatch } from '~/redux/store/store'
import images from '~/assets/images'
import Button from '~/components/Button'
import { CartType } from '~/redux/features/user/cart/cartSlice'
import { getCart, removeProductFromCart, updateQuantityProductFromCart } from '~/redux/features/user/cart/cartService'

const cx = classNames.bind(styles)

function ProductPrice({ data }: { data: CartType }) {
   const dispatch = useDispatch<AppDispatch>()
   const [quantity, setQuantity] = useState<number>(0)
   const [total, setTotal] = useState<number>(0)

   const handleRemoveProduct = debounce(async () => {
      await dispatch(removeProductFromCart(data?._id as string))
      await dispatch(getCart())
   }, 800)

   useEffect(() => {
      if (data.quantity) {
         setQuantity(data.quantity)
      }
   }, [data])

   useEffect(() => {
      const totalOrigin = data?.productId?.price * data?.quantity
      const totalAfterDiscount = data?.productId?.price_after_discount * data?.quantity
      setTotal(data?.productId?.discountCode ? totalAfterDiscount : totalOrigin)
   }, [quantity, data])

   useEffect(() => {
      const debouncedUpdateQuantity = debounce(async (cartItemId, quantity) => {
         await dispatch(updateQuantityProductFromCart({ cartItemId, quantity }))
      }, 1000)
      const priceOrigin = data?.productId?.price * quantity
      const priceAfterDiscount = data?.productId?.price_after_discount * quantity
      if (data?.productId && data?._id) {
         debouncedUpdateQuantity(data._id, quantity)
         setTotal(data?.productId?.discountCode ? priceAfterDiscount : priceOrigin)
      }

      return () => {
         debouncedUpdateQuantity.cancel()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [quantity, dispatch])
   return (
      <>
         <div className="col-8 d-flex justify-content-between">
            <div className={cx('product-detail')}>
               <div className={cx('info', 'row')}>
                  <Button className="col-3" text to={`/product/${data?.productId?.slug}`}>
                     <Image
                        className={cx('img')}
                        src={data?.productId?.image ? data?.productId?.image : images.errorImage}
                     />
                  </Button>
                  <div className="col-8">
                     <Button text to={`/product/${data?.productId?.slug}`}>
                        {' '}
                        <h3 className={cx('content')}>{data?.productId?.title}</h3>
                     </Button>
                     <p>
                        <span
                           className={cx('color')}
                           style={{ backgroundColor: data?.color.title ? data?.color.title : ' ' }}
                        ></span>
                     </p>
                     {data?.productId?.discountCode ? (
                        <div className="d-flex gap-2" style={{ color: '#99a2aa' }}>
                           <s className="fs-3">${data?.productId?.price.toFixed(2)}</s>{' '}
                           <span className="fs-3 fw-bolder" style={{ color: '#dd551b' }}>
                              ${data?.productId?.price_after_discount.toFixed(2)}
                           </span>
                        </div>
                     ) : (
                        <p className="fs-3 ">${data?.productId?.price.toFixed(2)}</p>
                     )}
                  </div>
               </div>
            </div>
            <div className={cx('price', 'd-none d-md-flex')}>
               $
               {data.productId?.discountCode
                  ? data.productId?.price_after_discount.toFixed(2)
                  : data.productId?.price.toFixed(2)}
            </div>
         </div>
         <div className="col-3 d-flex flex-column flex-md-row justify-content-around justify-content-md-between">
            <div className="d-flex align-items-center">
               <div className="w-100 d-flex flex-row-reverse flex-md-column justify-content-between">
                  <Button
                     text
                     className={cx('btn-quantity', 'col-2 col-md-4')}
                     onClick={() => {
                        setQuantity(quantity + 1)
                     }}
                  >
                     <BiPlus className={cx('icon')} />
                  </Button>
                  <input
                     className="col-3 col-md-4"
                     type="number"
                     onChange={() => setQuantity}
                     value={quantity}
                     min={0}
                     step={1}
                     max={1000}
                  />
                  <Button
                     text
                     className={cx('btn-quantity', 'col-2 col-md-4')}
                     onClick={() => {
                        if (quantity > 0) {
                           setQuantity(quantity - 1)
                        }
                     }}
                  >
                     <FiMinus className={cx('icon')} />
                  </Button>
               </div>
            </div>
            <div className="d-flex flex-row-reverse flex-md-row justify-content-between align-items-center">
               <Button text className={cx('btn-delete')} onClick={() => handleRemoveProduct()}>
                  <AiFillDelete className={cx('icon')} />
               </Button>
               <span className="fs-2 fs-md-3 fw-bold ms-2"> ${total}</span>
            </div>
         </div>
      </>
   )
}

export default ProductPrice

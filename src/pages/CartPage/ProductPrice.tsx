import Image from '~/components/Image/Image'
import classNames from 'classnames/bind'
import styles from './CartPage.module.scss'
import { AiFillDelete, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import Button from '~/components/Button/Button'
import { CartType } from '~/types/cartStage'
import { useEffect, useState } from 'react'
import { getCarts, removeProductFromCart, updateQuantityProductFromCart } from '~/features/customers/customerService'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '~/store/store'
import images from '~/assets/images'
import debounce from 'lodash.debounce'

const cx = classNames.bind(styles)

function ProductPrice({ data }: { data: CartType }) {
   const dispatch = useDispatch<AppDispatch>()
   const [quantity, setQuantity] = useState<number>(0)
   const [total, setTotal] = useState<number>(0)

   const handleRemoveProduct = debounce(async () => {
      await dispatch(removeProductFromCart(data?._id as string))
      await dispatch(getCarts())
   }, 800)

   useEffect(() => {
      if (data.quantity) {
         setQuantity(data.quantity)
      }
   }, [data])

   useEffect(() => {
      const totalOrigin = data?.productId.price * data?.quantity
      const totalAfterDiscount = data?.productId?.price_after_discount * data?.quantity
      setTotal(data?.productId?.discountCode ? totalAfterDiscount : totalOrigin)
   }, [quantity, data])

   useEffect(() => {
      const debouncedUpdateQuantity = debounce(async (cartItemId, quantity) => {
         await dispatch(updateQuantityProductFromCart({ cartItemId, quantity }))
      }, 1000)
      const priceOrigin = data?.productId.price * quantity
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
      <div className={cx('section')}>
         <div className={cx('block')}>
            <div className={cx('product-detail')}>
               <div className={cx('info')}>
                  <Button text to={`/product/${data?.productId?.slug}`}>
                     <Image
                        className={cx('img')}
                        src={data?.productId?.images?.[0]?.url ? data?.productId?.images?.[0]?.url : images.errorImage}
                     />
                  </Button>
                  <div className={cx('content')}>
                     <Button text to={`/product/${data?.productId?.slug}`}>
                        {' '}
                        <h3>{data?.productId?.title}</h3>
                     </Button>
                     <p>
                        <span
                           className={cx('color')}
                           style={{ backgroundColor: data?.color?.title ? data?.color?.title : ' ' }}
                        ></span>
                     </p>
                     {data?.productId?.price_after_discount ? (
                        <div className="d-flex gap-2" style={{ color: '#99a2aa' }}>
                           <s className="fs-3">${data?.productId.price}</s>{' '}
                           <span className="fs-3 fw-bolder" style={{ color: '#dd551b' }}>
                              ${data?.productId?.price_after_discount}
                           </span>
                        </div>
                     ) : (
                        <p className="fs-3 ">${data?.productId.price}</p>
                     )}
                  </div>
               </div>
            </div>
            <span className={cx('price')}>
               ${data.productId?.price_after_discount ? data.productId?.price_after_discount : data.productId?.price}
            </span>
         </div>
         <div className={cx('block')}>
            <div className={cx('quantity')}>
               <div className={cx('update-quantity')}>
                  <Button
                     text
                     onClick={() => {
                        setQuantity(quantity + 1)
                     }}
                  >
                     <AiOutlinePlus className={cx('icon')} />
                  </Button>
                  <input type="number" onChange={() => setQuantity} value={quantity} min={0} step={1} max={1000} />
                  <Button
                     text
                     onClick={() => {
                        if (quantity > 0) {
                           setQuantity(quantity - 1)
                        }
                     }}
                  >
                     <AiOutlineMinus className={cx('icon')} />
                  </Button>
               </div>
            </div>
            <span className={cx('price')}>
               <Button text className={cx('btn-delete')} onClick={() => handleRemoveProduct()}>
                  <AiFillDelete className={cx('icon')} />
               </Button>
               ${total}
            </span>
         </div>
      </div>
   )
}

export default ProductPrice

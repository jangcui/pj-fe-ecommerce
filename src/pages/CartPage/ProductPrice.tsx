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
      if (data?.productId?.price && data?.quantity) {
         setTotal(data?.productId.price * data?.quantity)
      }
   }, [quantity, data])

   useEffect(() => {
      const debouncedUpdateQuantity = debounce(async (cartItemId, quantity) => {
         await dispatch(updateQuantityProductFromCart({ cartItemId, quantity }))
      }, 1000)

      if (data?._id && data?.productId?.price) {
         debouncedUpdateQuantity(data._id, quantity)
         setTotal(data.productId.price * quantity)
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
               <span className={cx('info')}>
                  <Image
                     className={cx('img')}
                     src={data?.productId?.images?.[0]?.url ? data?.productId?.images?.[0]?.url : images.errorImage}
                  />
                  <span className={cx('content')}>
                     <p dangerouslySetInnerHTML={{ __html: data.productId?.description as string }}></p>

                     <p>
                        Color:
                        <span
                           className={cx('color')}
                           style={{ backgroundColor: data?.color?.title ? data?.color?.title : ' ' }}
                        ></span>
                     </p>
                  </span>
               </span>
            </div>
            <span className={cx('price')}>${data.productId?.price}</span>
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

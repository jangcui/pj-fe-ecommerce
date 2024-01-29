import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import { useDispatch } from 'react-redux'
import debounce from 'lodash.debounce'
import { FiMinus } from 'react-icons/fi'
import styles from './CartPage.module.scss'
import { AiFillDelete, AiOutlinePlus } from 'react-icons/ai'

import Image from '~/components/Image'
import { AppDispatch } from '~/redux/store/store'

import images from '~/assets/images'
import Button from '~/components/Button'
import { CartType } from '~/redux/features/user/cart/cartSlice'
import { getCart, removeProductFromCart, updateQuantityProduct } from '~/redux/features/user/cart/cartService'
import { openModalConfirm } from '~/redux/features/modals/modalSlice'
import InputCustom from '~/components/InputCustom'

const cx = classNames.bind(styles)

function ProductPrice({ data }: { data: CartType }) {
   const dispatch = useDispatch<AppDispatch>()
   const [quantity, setQuantity] = useState<number>(data.quantity)
   const [isInputFocused, setIsInputFocused] = useState(false)

   const handleRemoveProduct = debounce(async () => {
      await dispatch(removeProductFromCart({ colorId: data.color._id, productId: data.product._id }))
      await dispatch(getCart())
   }, 800)

   const handleQuantityChange = (event: number) => {
      if (!isNaN(event)) {
         setQuantity(event)
         setIsInputFocused(true)
      }
   }

   const handleOpenModal = () => {
      dispatch(
         openModalConfirm({
            title: 'Remove product from cart? ',
            onConfirm: () => handleRemoveProduct(),
            type: 'danger',
         }),
      )
   }

   const handleIncrease = () => {
      setQuantity((prevQuantity) => {
         const newQuantity = prevQuantity + 1
         return newQuantity
      })
   }

   const handleDecrease = () => {
      if (quantity > 1) {
         setQuantity((prevQuantity) => {
            const newQuantity = prevQuantity - 1
            return newQuantity
         })
      }
   }
   const handleUpdateQuantity = async () => {
      await dispatch(updateQuantityProduct({ colorId: data.color._id, productId: data.product._id, quantity }))
      await dispatch(getCart())
   }

   useEffect(() => {
      setQuantity(() => data.quantity)
   }, [data])

   useEffect(() => {
      if (isInputFocused) return
      const debouncedUpdateQuantity = debounce(() => {
         handleUpdateQuantity()
      }, 2000)
      if (data?.product && data?._id) {
         debouncedUpdateQuantity()
      }
      return () => {
         debouncedUpdateQuantity.cancel()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [quantity, dispatch, isInputFocused])

   return (
      <>
         <div className="col-8 d-flex justify-content-between">
            <div className="d-flex">
               <div className={cx('info', 'row')}>
                  <Button className="col-3" text to={`/product/${data?.product?.slug}`}>
                     <Image
                        className={cx('img')}
                        src={data?.product?.thumb ? data?.product?.thumb : images.errorImage}
                     />
                  </Button>
                  <div className="col-8">
                     <Button text to={`/product/${data?.product?.slug}`}>
                        {' '}
                        <h3 className={cx('content')}>{data?.product?.title}</h3>
                     </Button>

                     {data?.product?.price_after_discount ? (
                        <div className="d-flex gap-2" style={{ color: '#99a2aa' }}>
                           <s className="fs-3">${data?.product?.price}</s>{' '}
                           <span className="fs-3 fw-bolder" style={{ color: '#dd551b' }}>
                              ${data?.product?.price_after_discount}
                           </span>
                        </div>
                     ) : (
                        <p className="fs-3">${data?.product?.price}</p>
                     )}

                     <span
                        className={cx('color', 'my-2')}
                        style={{ backgroundColor: data?.color ? data?.color.title : ' ' }}
                     ></span>
                  </div>
               </div>
            </div>
            <div className={cx('price', 'd-none d-md-flex')}>
               ${data.product?.price_after_discount ? data.product?.price_after_discount : data.product?.price}
            </div>
         </div>
         <div className="col-3 d-flex flex-column flex-md-row justify-content-around justify-content-md-between">
            <div className="d-flex align-items-center gap-3 justify-content-center">
               <span className="col-4 col-md-4 fs-3 fw-bold ">
                  {' '}
                  <InputCustom
                     value={quantity}
                     onChange={handleQuantityChange}
                     onBlur={() => setIsInputFocused(false)}
                     type={'number'}
                  />
               </span>
               <div className="w-full d-flex flex-column gap-3">
                  <Button className="border round-2 p-2" text onClick={handleIncrease}>
                     <AiOutlinePlus className="fs-2" />
                  </Button>{' '}
                  {quantity > 1 ? (
                     <Button text className="border round-2 p-2" onClick={handleDecrease}>
                        <FiMinus className="fs-2" />
                     </Button>
                  ) : (
                     <Button text className="p-2" onClick={handleOpenModal}>
                        <AiFillDelete className="fs-2" />
                     </Button>
                  )}
               </div>
            </div>
            <div className="d-flex flex-row-reverse flex-md-row justify-content-between align-items-center">
               <span className="fs-2 fs-md-3 fw-bold ms-2"> ${data.total}</span>
            </div>
         </div>
      </>
   )
}

export default ProductPrice

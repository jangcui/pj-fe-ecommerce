import classNames from 'classnames/bind'
import debounce from 'lodash.debounce'
import { AiFillDelete, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useDispatch } from 'react-redux'

import styles from './MenuCart.module.scss'
import { useEffect, useState } from 'react'

import images from '~/assets/images'
import Button from '~/components/Button'
import Image from '~/components/Image'
import { openModalConfirm } from '~/redux/features/modals/modalSlice'
import { getCart, removeProductFromCart, updateQuantityProduct } from '~/redux/features/user/cart/cartService'
import { CartType } from '~/redux/features/user/cart/cartSlice'
import { AppDispatch } from '~/redux/store'

const cx = classNames.bind(styles)

const ProductCart = ({ data }: { data: CartType }) => {
   const dispatch = useDispatch<AppDispatch>()
   const [quantity, setQuantity] = useState(data.quantity)

   const handleRemoveProduct = debounce(async () => {
      await dispatch(removeProductFromCart({ colorId: data.color._id, productId: data.product._id }))
      await dispatch(getCart())
   }, 800)

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
      const debouncedUpdateQuantity = debounce(() => {
         handleUpdateQuantity()
      }, 1000)
      if (data?.product && data?._id) {
         debouncedUpdateQuantity()
      }
      return () => {
         debouncedUpdateQuantity.cancel()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [quantity, dispatch])
   console.log(data)
   return (
      <div className="row d-flex justify-content-between">
         <div className="col d-flex justify-content-between ">
            <div className="w-full d-flex">
               <div className="col-4 p-0 d-flex justify-content-center align-items-center">
                  <Image className={cx('img')} src={data?.product?.thumb ? data?.product?.thumb : images.errorImage} />
               </div>
               <div className="d-flex flex-column">
                  <Button text to={`/product/${data?.product?.slug}`}>
                     <h3 className={cx('title')}> {data?.product?.title}</h3>
                  </Button>
                  <div className="d-flex justify-content-between">
                     {data?.product?.price_after_discount ? (
                        <div className="d-flex gap-2 mb-2" style={{ color: '#99a2aa' }}>
                           <s className="fs-4 ms-2">${data?.product?.price}</s>{' '}
                           <span className="fs-4 fw-bolder" style={{ color: '#dd551b' }}>
                              ${data?.product?.price_after_discount}
                           </span>
                        </div>
                     ) : (
                        <p className="fs-4 mb-0 ms-2">${data?.product?.price}</p>
                     )}
                  </div>
                  <div className={cx('circle')} style={{ backgroundColor: data.color.title }}></div>
                  <div className="d-flex mt-auto mx-2 gap-5 justify-content-around align-item-end">
                     <p className="fs-3  fw-bold">{quantity}</p>
                     {quantity > 1 ? (
                        <Button className="position-relative z-2 p-3" text onClick={handleDecrease}>
                           <AiOutlineMinus className="fs-3" />
                        </Button>
                     ) : (
                        <Button text className={cx('btn-delete')} onClick={handleOpenModal}>
                           <AiFillDelete className={cx('icon-delete')} />
                        </Button>
                     )}
                     <Button className="position-relative z-2 p-3" text onClick={handleIncrease}>
                        <AiOutlinePlus className="fs-3" />
                     </Button>{' '}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ProductCart

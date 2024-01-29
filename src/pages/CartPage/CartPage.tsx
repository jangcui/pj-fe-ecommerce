import classNames from 'classnames/bind'
import { BsArrowLeft } from 'react-icons/bs'
import { useSelector } from 'react-redux'

import BreadCrumb from '~/components/BreadCrumb'
import Button from '~/components/Button'
import ChangeTitle from '~/components/ChangeTitle'
import { RootState } from '~/redux/store'
import styles from './CartPage.module.scss'
import ProductPrice from './ProductPrice'

const cx = classNames.bind(styles)

function CartPage() {
   const { productList, totalPrice } = useSelector((state: RootState) => state.cartData)

   return (
      <>
         <ChangeTitle title={'Cart'} />
         <BreadCrumb title={'Cart'} />
         <div className={cx('wrapper', 'w-100 row m-0 justify-content-center')}>
            <div className={cx('title', 'row row-cols-2 gy-2 mt-0 justify-content-between')}>
               <div className="col-8 d-flex justify-content-between">
                  <h3 className="ms-5">Product</h3>
                  <h3 className="d-none d-md-block">Price</h3>
               </div>
               <div className="col-3 d-flex justify-content-end justify-content-md-between ">
                  <h3 className="d-none d-md-block">Quantity</h3>
                  <h3 className="me-5 me-md-0">Total</h3>
               </div>
            </div>
            {productList.length > 0 ? (
               productList?.map((data, index) => {
                  return (
                     <div key={index} className={cx('title', 'row row-cols-2 gy-2 mt-0 justify-content-between')}>
                        <ProductPrice data={data} />
                     </div>
                  )
               })
            ) : (
               <div className="my-5">
                  {' '}
                  <h1 className="fs-2 fw-bold text-center mt-3">Your cart is currently empty.</h1>
               </div>
            )}
            <div className={cx('title', 'row row-cols-2 gy-2  mt-0')}>
               <div className={cx('country', 'col-12 col-md-8')}>
                  <Button leftIcon={<BsArrowLeft />} to={'/product'} primary className={cx('btn')}>
                     Country Shopping
                  </Button>
               </div>
               {totalPrice !== 0 && (
                  <div className="row col-12 col-md-4 mt-5 mt-md-0 ">
                     <div className={cx('text', 'col text-center text-md-end ')}>
                        Subtotal: <span className="d-flex flex-column gap-4 fs-1 fw-bold ms-3">${totalPrice}</span>
                     </div>
                     <Button to={'/checkout'} primary className={cx('btn')}>
                        Check out
                     </Button>
                  </div>
               )}
            </div>
         </div>
      </>
   )
}

export default CartPage

import classNames from 'classnames/bind'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Button from '~/layouts/components/Button/Button'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'

import styles from '~/components/StyleModule/AdminStyle.module.scss'
import { AppDispatch, RootState } from '~/store/store'
import { CouponType } from '~/types/couponStage'
import { deleteCoupon, getCoupons } from '~/features/coupon/couponService'
import ModalCustom from '~/components/ModalCustom/ModalCustom'
import { toast } from 'react-toastify'
const cx = classNames.bind(styles)

interface DataType extends CouponType {
   key: React.Key
   action: JSX.Element
}

const columns: any = [
   {
      title: 'SNo',
      dataIndex: 'key',
   },
   {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a: any, b: any) => a.name.length - b.name.length,
   },
   {
      title: 'Discount',
      dataIndex: 'discount',
      sorter: (a: any, b: any) => a.discount.length - b.discount.length,
   },
   {
      title: 'Expiry',
      dataIndex: 'expiry',
   },

   {
      title: 'Action',
      dataIndex: 'action',
   },
]

function CouponList() {
   const dispatch = useDispatch<AppDispatch>()

   const couponState = useSelector((state: RootState) => state.coupons.coupons)

   useEffect(() => {
      dispatch(getCoupons())
   }, [dispatch])

   const [couponId, setCouponId] = useState<string>('')

   const [open, setOpen] = useState(false)

   const showModal = (value?: string) => {
      setOpen(true)
      if (value) {
         setCouponId(value)
      }
   }

   const hideModal = () => {
      setOpen(false)
   }
   const handleDelete = (id?: string) => {
      dispatch(deleteCoupon(id))
      hideModal()
      setTimeout(() => {
         dispatch(getCoupons())
      }, 200)
      toast.success('Deleted!')
   }
   const data1: DataType[] = []
   for (let i = 0; i < couponState.length; i++) {
      data1.push({
         key: i + 1,
         name: couponState[i].name,
         expiry: new Date(couponState[i].expiry as Date)
            .toLocaleString('vi-VN', {
               hour: '2-digit',
               minute: '2-digit',
               second: '2-digit',
               hour12: true,
               year: 'numeric',
               month: '2-digit',
               day: '2-digit',
            })
            .replace(' ', ', '),
         discount: couponState[i].discount,
         action: (
            <>
               <Button text to={`/admin/coupon/${couponState[i]._id}`}>
                  <BiEdit className={cx('icon')} />
               </Button>
               <Button text onClick={() => showModal(couponState[i]._id)}>
                  <AiFillDelete className={cx('icon')} />
               </Button>
            </>
         ),
      })
   }

   return (
      <div className={cx('wrapper')}>
         <h1>Coupon List </h1>
         <div className={cx('chart')}>
            <div className={cx('content')}>
               <Table columns={columns} dataSource={data1} />
            </div>
            <ModalCustom
               title={'This brand will be delete?'}
               open={open}
               onOk={() => handleDelete(couponId)}
               onCancel={hideModal}
            />
         </div>
      </div>
   )
}

export default CouponList

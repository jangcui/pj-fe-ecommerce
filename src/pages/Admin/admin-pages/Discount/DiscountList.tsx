import classNames from 'classnames/bind'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Button from '~/components/Button/Button'
import { AiFillDelete } from 'react-icons/ai'
import ForwardTable from 'antd/lib/table/Table'
import { toast } from 'react-toastify'
import { BiEdit } from 'react-icons/bi'

import styles from '~/components/StyleModule/AdminStyle.module.scss'
import { AppDispatch, RootState } from '~/store/store'
import ModalCustom from '~/components/ModalCustom'
import { deleteDiscount, getDiscounts } from '~/features/discount/discountService'
const cx = classNames.bind(styles)

interface DataType {
   key: React.Key
   action: JSX.Element
   name?: string
   expiry: string
   percentage: string
}

const columns: any = [
   {
      title: 'SNo',
      dataIndex: 'key',
   },
   {
      title: 'Code',
      dataIndex: 'name',
   },
   {
      title: 'Percentage',
      dataIndex: 'percentage',
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

function DiscountList() {
   const dispatch = useDispatch<AppDispatch>()

   const discountState = useSelector((state: RootState) => state.discount.discounts)

   useEffect(() => {
      dispatch(getDiscounts())
   }, [dispatch])

   const [discountId, setCouponId] = useState<string>('')

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
      dispatch(deleteDiscount(id))
      hideModal()
      setTimeout(() => {
         dispatch(getDiscounts())
      }, 200)
      toast.success('Deleted!')
   }
   const data1: DataType[] = []
   for (let i = 0; i < discountState.length; i++) {
      data1.push({
         key: i + 1,
         name: discountState[i]?.name,
         expiry: new Date(discountState[i].expiry as Date)
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
         percentage: discountState[i].percentage + '%',
         action: (
            <>
               <Button text to={`/admin/discount/${discountState[i]._id}`}>
                  <BiEdit className={cx('icon')} />
               </Button>
               <Button text onClick={() => showModal(discountState[i]._id)}>
                  <AiFillDelete className={cx('icon')} />
               </Button>
            </>
         ),
      })
   }

   return (
      <div className={cx('wrapper')}>
         <h1>Discount Code List </h1>
         <div className={cx('chart')}>
            <div className={cx('content')}>
               <ForwardTable columns={columns} dataSource={data1} />
            </div>
            <ModalCustom
               title={'This Discount Code will be delete?'}
               open={open}
               onOk={() => handleDelete(discountId)}
               onCancel={hideModal}
            />
         </div>
      </div>
   )
}

export default DiscountList

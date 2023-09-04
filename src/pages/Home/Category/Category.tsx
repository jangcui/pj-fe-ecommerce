import classNames from 'classnames/bind'
import { BsSmartwatch, BsSpeakerFill } from 'react-icons/bs'
import { FaLaptopCode } from 'react-icons/fa'
import { FcCamera, FcHeadset, FcSlrBackSide, FcSmartphoneTablet } from 'react-icons/fc'
import { SiYoutubegaming } from 'react-icons/si'
import styles from './Category.module.scss'
import Button from '~/components/Button/Button'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '~/redux/store/store'
import { useNavigate } from 'react-router-dom'
import { getAllProducts } from '~/redux/features/products/productsService'

const cx = classNames.bind(styles)

const CATEGORY_ITEMS = [
   {
      id: 1,
      title: 'Mobiles & Tablets',
      icon: <FcSmartphoneTablet className={cx('icon')} />,
   },
   {
      id: 2,
      title: 'Headphones',
      icon: <FcHeadset className={cx('icon')} />,
   },
   {
      id: 3,
      title: 'Smart Television',
      icon: <FcSlrBackSide className={cx('icon')} />,
   },
   {
      id: 4,
      title: 'Cameras & Videos',
      icon: <FcCamera className={cx('icon')} />,
   },
   {
      id: 5,
      title: 'Music & gaming',
      icon: <SiYoutubegaming className={cx('icon')} />,
   },
   {
      id: 6,
      title: 'Portable Speakers',
      icon: <BsSpeakerFill className={cx('icon')} />,
   },
   {
      id: 7,
      title: 'Computers & Laptop',
      icon: <FaLaptopCode className={cx('icon')} />,
   },
   {
      id: 8,
      title: 'Smartwatches',
      icon: <BsSmartwatch className={cx('icon')} />,
   },
]

function Category() {
   const dispatch = useDispatch<AppDispatch>()
   const navigate = useNavigate()

   const handleRedirection = async (value: string) => {
      navigate(`/product?${`category=${encodeURIComponent(value.trim())}`}`)
      await dispatch(getAllProducts({ category: value }))
   }
   return (
      <>
         {/* <h1 className="text-center text-uppercase fs-1 fw-bold">Categories </h1> */}
         <div className={cx('wrapper', 'row  row-cols-2 row-cols-sm-3  row-cols-lg-4')}>
            {CATEGORY_ITEMS.map((item, index) => (
               <div className={cx('container', 'col')} key={index}>
                  <Button text className={cx('content')} onClick={() => handleRedirection(item.title)}>
                     <div className={cx('title')}>{item.title}</div>
                     <div>{item.icon}</div>
                  </Button>
               </div>
            ))}
         </div>
      </>
   )
}

export default Category

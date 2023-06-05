import styles from './OurStore.module.scss'
import BreadCrumb from '~/components/BreadCrumb'
import { TfiLayoutColumn3, TfiLayoutColumn2, TfiAngleDown, TfiAlignJustify } from 'react-icons/tfi'
import classNames from 'classnames/bind'
import ChangeTitle from '~/components/ChangeTitle'
import Collection from '../../components/Collection/Collection'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '~/store/store'
import { getProducts } from '~/features/products/productsService'
import { useEffect, useState } from 'react'
import Button from '~/components/Button/Button'
import Loading from '~/components/Loading/Loading'
const cx = classNames.bind(styles)

function OurStore() {
   const dispatch = useDispatch<AppDispatch>()
   const { productList, isLoading } = useSelector((state: RootState) => state.products)
   const [params, setParams] = useState({})
   const [sortBtn, setSortBtn] = useState([
      {
         id: 0,
         isActive: true,
         classSort: 'sort-4',
         icon: <TfiAlignJustify className={cx('icon')} style={{ transform: 'rotate(90deg)' }} />,
      },
      { id: 1, isActive: false, classSort: 'sort-3', icon: <TfiLayoutColumn3 className={cx('icon')} /> },
      { id: 2, isActive: false, classSort: 'sort-2', icon: <TfiLayoutColumn2 className={cx('icon')} /> },
      { id: 3, isActive: false, classSort: 'sort-1', icon: <TfiAlignJustify className={cx('icon')} /> },
   ])
   const [sortClass, setSortClass] = useState<string>('')
   const handleSortClick = (id: number) => {
      const newSort = sortBtn.map((el) => {
         if (el.id === id) {
            return { ...el, isActive: true }
         } else {
            return { ...el, isActive: false }
         }
      })
      setSortBtn(newSort)
   }

   useEffect(() => {
      dispatch(getProducts(params))
   }, [dispatch, params])
   useEffect(() => {
      const activeSortBtn = sortBtn.find((btn) => btn.isActive)
      const activeSortClass = activeSortBtn ? activeSortBtn.classSort : ''
      setSortClass(activeSortClass)
   }, [sortBtn])
   return (
      <>
         <ChangeTitle title={'Our Store'} />
         <BreadCrumb title={'Our Store'} />
         <div className={cx('wrapper')}>
            <div className={cx('filter-list')}>
               <div className={cx('filter-block')}>
                  <h1 className={cx('title')}>Shop by categories</h1>
                  <div className={cx('option')}>
                     <span>watch</span>
                     <span>tv</span>
                     <span>camera</span>
                     <span>laptop</span>
                  </div>
               </div>
               <div className={cx('filter-block')}>
                  <h1 className={cx('title')}>Filter by</h1>
                  <div className={cx('availability')}>
                     <h2>availability</h2>
                     <span>
                        <input type="checkbox" />
                        In stock(0)
                     </span>
                     <span>
                        <input type="checkbox" /> out of stock (1)
                     </span>
                  </div>
                  <div className={cx('availability')}>
                     <h2>Price</h2>
                     <div className={cx('price')}>
                        <span className={cx('price-range')}>from</span>
                        <span className={cx('price-range')}>to</span>
                     </div>
                  </div>
                  <div className={cx('availability')}>
                     <h2>color</h2>
                     <div className={cx('color')}>
                        <span className={cx('color-circle')} />
                        <span className={cx('color-circle')} />
                        <span className={cx('color-circle')} />
                        <span className={cx('color-circle')} />
                        <span className={cx('color-circle')} />
                        <span className={cx('color-circle')} />
                        <span className={cx('color-circle')} />
                        <span className={cx('color-circle')} />
                        <span className={cx('color-circle')} />
                        <span className={cx('color-circle')} />
                        <span className={cx('color-circle')} />
                     </div>
                  </div>
                  <div className={cx('availability')}>
                     <h2>size</h2>
                     <span>
                        <input type="checkbox" /> s
                     </span>
                     <span>
                        <input type="checkbox" /> m
                     </span>
                  </div>
               </div>
               <div className={cx('filter-block')}>
                  <h1 className={cx('title')}>Product Tags</h1>
                  <div className={cx('product-tags')}>
                     <span>#HeadPhone</span>
                     <span>#Laptop</span>
                     <span>#Camera</span>
                     <span>#Watch</span>
                  </div>
               </div>
               <div className={cx('filter-block')}>
                  <h1 className={cx('title')}>Random Product</h1>
                  <div className={cx('product-tags')}>
                     <span>#HeadPhone</span>
                     <span>#Laptop</span>
                     <span>#Camera</span>
                     <span>#Watch</span>
                  </div>
               </div>
            </div>
            <div className={cx('products')}>
               <div className={cx('filter-sort')}>
                  <div className={cx('sort-by')}>
                     <span>Sort By: </span>
                     <span className={cx('option')}>
                        <p>Best selling</p> <TfiAngleDown />
                     </span>
                  </div>
                  <div className={cx('sort-icons')}>
                     <p>{productList.length} product</p>
                     <div className={cx('wrap-icon')}>
                        {sortBtn.map((el, i) => (
                           <Button text onClick={() => handleSortClick(el.id)} key={i}>
                              <span className={cx('icon-filter', el.isActive && 'active')}>{el.icon}</span>
                           </Button>
                        ))}
                     </div>
                  </div>
               </div>

               <div className={cx('product', sortClass)}>
                  {isLoading ? (
                     <Loading />
                  ) : (
                     <>
                        {productList?.map((product, index) => (
                           <div className={cx('collection')} key={index}>
                              <Collection data={product} isSort={sortClass === 'sort-1'} />
                           </div>
                        ))}
                     </>
                  )}
               </div>
            </div>
         </div>
      </>
   )
}

export default OurStore

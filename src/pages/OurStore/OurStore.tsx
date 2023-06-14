import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { BiReset } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import BreadCrumb from '~/components/BreadCrumb'
import Button from '~/components/Button/Button'
import ChangeTitle from '~/components/ChangeTitle'
import { Sort2Icon, Sort3Icon, Sort4Icon, SortHorizon } from '~/components/Icon'
import Loading from '~/components/Loading/Loading'
import { getProducts } from '~/features/products/productsService'
import { AppDispatch, RootState } from '~/store/store'
import { ProductType } from '~/types/productStage'
import Collection from '../../components/Collection/Collection'
import styles from './OurStore.module.scss'
const cx = classNames.bind(styles)

function OurStore() {
   const dispatch = useDispatch<AppDispatch>()
   const { productList, isLoading } = useSelector((state: RootState) => state.products)
   const [sortClass, setSortClass] = useState<string>('')
   const [sortBtn, setSortBtn] = useState([
      {
         id: 0,
         isActive: true,
         classSort: 'sort-4',
         icon: <Sort4Icon className={cx('icon')} />,
      },
      { id: 1, isActive: false, classSort: 'sort-3', icon: <Sort3Icon className={cx('icon')} /> },
      {
         id: 2,
         isActive: false,
         classSort: 'sort-2',
         icon: <Sort2Icon className={cx('icon')} />,
      },
      {
         id: 3,
         isActive: false,
         classSort: 'sort-1',
         icon: <SortHorizon className={cx('icon')} />,
      },
   ])
   const [brands, setBrands] = useState<string[]>([])
   const [categories, setCategories] = useState<string[]>([])
   const [tags, setTags] = useState<string[]>([])

   ////filter
   const [brand, setBrand] = useState<string>('')
   const [category, setCategory] = useState<string>('')
   const [tag, setTag] = useState<string>('')
   const [minPrice, setMinPrice] = useState<number>(1)
   const [maxPrice, setMaxPrice] = useState<number>(999)
   const [sort, setSort] = useState<string>('')

   useEffect(() => {
      dispatch(
         getProducts({
            brand: brand,
            category: category,
            tags: tag,
            sort: sort,
            minPrice: minPrice,
            maxPrice: maxPrice,
         }),
      )
   }, [dispatch, brand, category, tag, sort, minPrice, maxPrice])

   useEffect(() => {
      const activeSortBtn = sortBtn.find((btn) => btn.isActive)
      const activeSortClass = activeSortBtn ? activeSortBtn.classSort : ''
      setSortClass(activeSortClass)
   }, [sortBtn])

   useEffect(() => {
      const uniqueBrands = new Set<string>()
      const uniqueCategories = new Set<string>()
      const uniqueTags = new Set<string>()

      productList?.forEach((product: ProductType) => {
         uniqueBrands.add(product.brand)
         uniqueCategories.add(product.category)
         uniqueTags.add(product.tags)
      })
      setTags(Array.from(uniqueTags))
      setBrands(Array.from(uniqueBrands))
      setCategories(Array.from(uniqueCategories))
   }, [productList])

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
   const handleReset = () => {
      setBrand('')
      setCategory('')
      setTag('')
      setMinPrice(1)
      setMaxPrice(999)
      setSort('')
   }

   return (
      <>
         <ChangeTitle title={'Our Store'} />
         <BreadCrumb title={'Our Store'} />
         <div className={cx('wrapper')}>
            <div className={cx('filter-list')}>
               <div className={cx('filter-block')}>
                  <div className={cx('filter-container')}>
                     <h1 className={cx('title')}>Sort by Categories</h1>
                     <div className={cx('option')}>
                        {categories?.map((category, index) => (
                           <span key={index}>
                              <Button text className="btn btn-light" onClick={() => setCategory(category)}>
                                 {category}
                              </Button>
                           </span>
                        ))}
                     </div>
                  </div>
               </div>

               <div className={cx('filter-block')}>
                  <div className={cx('filter-container')}>
                     <h1 className={cx('title')}>Price</h1>
                     <div className={cx('price')}>
                        <input
                           value={minPrice}
                           className={cx('input')}
                           onChange={(e: any) => e.target.value > 0 && setMinPrice(e.target.value)}
                           type="number"
                           placeholder="From"
                        />
                        <input
                           className={cx('input')}
                           value={maxPrice}
                           onChange={(e: any) => setMaxPrice(e.target.value)}
                           type="number"
                           placeholder="To"
                        />
                     </div>
                  </div>

                  <div className={cx('filter-container')}>
                     <div className={cx('filter-block')}>
                        <h1 className={cx('title')}>Product Brands</h1>
                        <div className={cx('option')}>
                           {brands?.map((brand, index) => (
                              <span key={index}>
                                 <Button text className={cx('btn')} onClick={() => setBrand(brand)}>
                                    {brand}
                                 </Button>
                              </span>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className={cx('filter-container')}>
                     <div className={cx('filter-block')}>
                        <h1 className={cx('title')}>Product Tags</h1>
                        <div className={cx('option')}>
                           {tags?.map((tag, index) => (
                              <span key={index}>
                                 <Button text className={cx('btn')} onClick={() => setTag(tag)}>
                                    {tag}
                                 </Button>
                              </span>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className={cx('products')}>
               <div className={cx('filter-sort')}>
                  <div className={cx('sort-by')}>
                     <span className="mb-0 d-block" style={{ width: '130px' }}>
                        Sort By:{' '}
                     </span>
                     <select
                        onChange={(e: any) => setSort(e.target.value)}
                        name=""
                        defaultValue="manula"
                        className="form-control form-select fs-3 m-2"
                        id=""
                     >
                        <option value="title">Alphabetically, A-Z</option>
                        <option value="-title">Alphabetically, Z-A</option>
                        <option value="price">Price, Low to Hight</option>
                        <option value="-price">Price, Hight to Low </option>
                        <option value="createAt">Date, Old to New</option>
                        <option value="-createAt">Date, New to Old </option>
                     </select>
                     <Button text className="btn btn-light" onClick={handleReset}>
                        <span> Reset</span>
                        <BiReset className="icon" />
                     </Button>
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

import classNames from 'classnames/bind'
import { ChangeEvent, useEffect, useState } from 'react'
import { BiReset } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import debounce from 'lodash.debounce'

import { useDispatch, useSelector } from 'react-redux'
import BreadCrumb from '~/components/BreadCrumb'
import Button from '~/components/Button/Button'
import ChangeTitle from '~/components/ChangeTitle'
import { Sort2Icon, Sort3Icon, Sort4Icon, SortHorizon } from '~/components/Icon'
import Loading from '~/components/Loading/Loading'
import { getProducts } from '~/features/products/productsService'
import { AppDispatch, RootState } from '~/store/store'
import { ProductType } from '~/types/productStage'
import styles from './OurStore.module.scss'
import Collection from '~/components/Collection'
import { getBrands } from '~/features/brands/brandService'
const cx = classNames.bind(styles)

function OurStore() {
   const dispatch = useDispatch<AppDispatch>()
   const { productList, isLoading } = useSelector((state: RootState) => state.products)
   const categoryList = useSelector((state: RootState) => state.prodCates.itemList)
   const brandList = useSelector((state: RootState) => state.brands.itemList)
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
   const [tags, setTags] = useState<string[]>(['featured ', 'popular', 'special'])

   ////filter
   const [brand, setBrand] = useState<string>('')
   const [category, setCategory] = useState<string>('')
   const [tag, setTag] = useState<string>('')
   const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
   const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)
   const [sort, setSort] = useState<string>('')
   const navigate = useNavigate()

   useEffect(() => {
      const queryParams = [
         brand && `brand=${brand}`,
         tag && `tag=${tag}`,
         category && `category=${encodeURIComponent(category)}`,
         minPrice && `price[gte]=${minPrice}`,
         maxPrice && `price[lte]=${maxPrice}`,
         sort && `sort=${sort}`,
      ].filter(Boolean)

      const searchParams = new URLSearchParams(window.location.search)
      const replacedQuery = Array.from(searchParams)
         .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
         .join('&')

      const queryString = queryParams.join('&&')
      const url = `/product${queryString ? `?${queryString}` : `?${replacedQuery}`}`
      navigate(url)

      if (queryParams.length > 0) {
         dispatch(getProducts({ brand, category, tag, sort, minPrice, maxPrice }))
      }
   }, [dispatch, brand, category, sort, minPrice, maxPrice, tag, navigate])

   useEffect(() => {
      const activeSortBtn = sortBtn.find((btn) => btn.isActive)
      const activeSortClass = activeSortBtn ? activeSortBtn.classSort : ''
      setSortClass(activeSortClass)
   }, [sortBtn])

   useEffect(() => {
      dispatch(getBrands())
   }, [dispatch])

   // useEffect(() => {
   //    const uniqueBrands = new Set<string>()
   //    const uniqueTags = new Set<string>()
   //    productList?.forEach((product: ProductType) => {
   //       uniqueBrands.add(product.brand)
   //       uniqueTags.add(product.tags)
   //    })
   //    setTags(Array.from(uniqueTags))
   //    setBrands(Array.from(uniqueBrands))
   //    if (categoryList) {
   //       const data = categoryList.map((item) => item.title || '')
   //       setCategories(data)
   //    }
   // }, [productList, categoryList])
   useEffect(() => {
      if (brandList) {
         const data = brandList.map((item) => item.title || '')
         setBrands(data)
      }
      if (categoryList) {
         const data = categoryList.map((item) => item.title || '')
         setCategories(data)
      }
   }, [brandList, categoryList])
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
      setMinPrice(undefined)
      setMaxPrice(undefined)
      setSort('')
      navigate('')
      dispatch(getProducts({}))
   }

   const handleMinPriceChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
      const newValue = +e.target.value
      setMinPrice(newValue > 0 ? newValue : 0)
   }, 1000)
   const handleMaxPriceChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
      const newValue = +e.target.value
      setMaxPrice(newValue)
   }, 1000)

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
                              <Button
                                 text
                                 className="btn btn-light"
                                 onClick={() => {
                                    setCategory(category.trim())
                                 }}
                              >
                                 {category}
                              </Button>
                           </span>
                        ))}
                     </div>
                  </div>
               </div>

               <div className={cx('filter-block')}>
                  <div className={cx('filter-container')}>
                     <h1 className={cx('title')}>Price :</h1>
                     <div className={cx('price')}>
                        <input
                           value={minPrice}
                           className={cx('input')}
                           onChange={handleMinPriceChange}
                           type="number"
                           step={10}
                           placeholder="From"
                           inputMode="numeric"
                           pattern="[0-9]*"
                        />
                        <input
                           className={cx('input')}
                           value={maxPrice}
                           onChange={handleMaxPriceChange}
                           type="number"
                           placeholder="To"
                           inputMode="numeric"
                           step={10}
                           pattern="[0-9]*"
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
                        {productList.length > 0 ? (
                           productList?.map((product, index) => (
                              <div className={cx('collection')} key={index}>
                                 <Collection data={product} isSort={sortClass === 'sort-1'} />
                              </div>
                           ))
                        ) : (
                           <h1 className="text-center mt-5 w-100">No data.</h1>
                        )}
                     </>
                  )}
               </div>
            </div>
         </div>
      </>
   )
}

export default OurStore

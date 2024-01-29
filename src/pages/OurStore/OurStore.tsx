import classNames from 'classnames/bind'
import { ChangeEvent, useEffect, useState } from 'react'
import { BiReset } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import debounce from 'lodash.debounce'
import { AiFillCaretDown } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
// import Pagination from '~/components/Pagination'

import BreadCrumb from '~/components/BreadCrumb'
import Button from '~/components/Button'
import ChangeTitle from '~/components/ChangeTitle'
import { Sort2Icon, Sort3Icon, Sort4Icon, SortHorizon } from '~/components/Icon'
import Loading from '~/components/Loading'
import { AppDispatch, RootState } from '~/redux/store/store'
import styles from './OurStore.module.scss'
import CardProduct from '~/components/CardProduct'
import { getAllProducts } from '~/redux/features/products/productsService'
import { getAllBrands } from '~/redux/features/brands/brandService'

const cx = classNames.bind(styles)

function OurStore() {
   const dispatch = useDispatch<AppDispatch>()
   const { productList, isLoading } = useSelector((state: RootState) => state.products)
   const categoryList = useSelector((state: RootState) => state.prodCates.categoriesList)
   const { brandList } = useSelector((state: RootState) => state.brands)
   const [sortClass, setSortClass] = useState<string>('')
   //    const [currentPage, setCurrentPage] = useState<number>(0)

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
   const tags = ['featured ', 'popular', 'special']

   ////filter
   const [brand, setBrand] = useState<string>('')
   const [category, setCategory] = useState<string>('')
   const [tag, setTag] = useState<string>('')
   const [minPrice, setMinPrice] = useState<number | undefined>()
   const [maxPrice, setMaxPrice] = useState<number | undefined>()
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
         dispatch(getAllProducts({ brand, category, tag, sort, minPrice, maxPrice }))
      }
   }, [dispatch, brand, category, sort, minPrice, maxPrice, tag, navigate])

   useEffect(() => {
      const activeSortBtn = sortBtn.find((btn) => btn.isActive)
      const activeSortClass = activeSortBtn ? activeSortBtn.classSort : ''
      setSortClass(activeSortClass)
   }, [sortBtn])

   useEffect(() => {
      dispatch(getAllBrands())
   }, [dispatch])

   useEffect(() => {
      if (brandList) {
         const data = brandList.map((item) => item.title)
         setBrands(data)
      }
      if (categoryList) {
         const data = categoryList.map((item) => item)
         setCategories(data)
      }
   }, [brandList, categoryList])

   const handleSortClick = (id: number) => {
      const sortButton = sortBtn.find((button) => button.id === id)
      if (sortButton && !sortButton.isActive) {
         const newSort = sortBtn.map((el) => {
            if (el.id === id) {
               return { ...el, isActive: true }
            } else {
               return { ...el, isActive: false }
            }
         })
         setSortBtn(newSort)
      }
   }
   const handleReset = () => {
      setBrand('')
      setCategory('')
      setTag('')
      setMinPrice(0)
      setMaxPrice(0)
      setSort('')
      navigate('')
      dispatch(getAllProducts({}))
   }

   const handleMinPriceChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
      const newValue = +e.target.value
      setMinPrice(isNaN(newValue) || newValue <= 0 ? undefined : newValue)
   }, 1000)

   const handleMaxPriceChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
      const newValue = +e.target.value
      setMaxPrice(newValue)
   }, 1000)
   //    const handlePageChange = (selectedItem: { selected: number }) => {
   //       setCurrentPage(selectedItem.selected)
   //    }
   //    const startIndex = currentPage * itemsPerPage
   //    const endIndex = startIndex + itemsPerPage

   //    const visibleProducts = productList.slice(startIndex, endIndex)

   return (
      <>
         <ChangeTitle title={'Store'} />
         <BreadCrumb title={'Store'} />

         <div className={cx('wrapper', 'row col-11')}>
            <div className="multi-collapse  col-12 col-lg-2 p-0 me-0 me-lg-3">
               <div className="col-3 col-lg-12 mb-1">
                  <Button
                     className="w-100 d-flex btn btn-secondary"
                     data-bs-toggle="collapse"
                     href="#collapseOption"
                     aria-expanded="true"
                  >
                     <AiFillCaretDown className={cx('icon')} />
                  </Button>
               </div>
               <div id="collapseOption" className={cx('filter-list', 'collapse show')}>
                  <div className={cx('filter-block', 'd-none gap-5 d-lg-block col-12 col-lg')}>
                     <h1 className="fs-3 mb-0 mb-lg-3 ">Sort by Categories: </h1>
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
                  <div className={cx('filter-block', 'd-flex gap-5 d-lg-block col-12 col-lg')}>
                     <h1 className="fs-3  mb-0 mb-lg-3 col-1 col-lg-12">Price: </h1>
                     <div className="d-flex gap-2 col">
                        <input
                           defaultValue={minPrice}
                           className={cx('input', 'col')}
                           onChange={handleMinPriceChange}
                           type="number"
                           step={10}
                           placeholder="From"
                           inputMode="numeric"
                           pattern="[0-9]*"
                        />
                        <input
                           className={cx('input', 'col')}
                           defaultValue={maxPrice}
                           onChange={handleMaxPriceChange}
                           type="number"
                           placeholder="To"
                           inputMode="numeric"
                           step={10}
                           pattern="[0-9]*"
                        />
                     </div>
                  </div>
                  <div className={cx('filter-block', 'd-flex gap-5 d-lg-block col-12 col-lg')}>
                     <h1 className="fs-3  mb-0 mb-lg-3 col-1 col-lg-12">Brands: </h1>
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
                  <div className={cx('filter-block', 'd-flex gap-5 d-lg-block col-12 col-lg')}>
                     <h1 className="fs-3  mb-0 mb-lg-3 col-1 col-lg-12">Tags: </h1>
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
            <div className={cx('products', 'col ms-0 ms-lg-2')}>
               <div className={cx('filter-sort', 'w-100 row row-cols-2 justify-content-between mx-0')}>
                  <div className={cx('sort-by', 'col-7 md-6')}>
                     <span className="mb-0 d-none d-sm-block" style={{ width: '130px' }}>
                        Sort By:{' '}
                     </span>
                     <select
                        onChange={(e: any) => setSort(e.target.value)}
                        name=""
                        defaultValue="manula"
                        className="form-control form-select fs-4"
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
                        <span className="d-none d-sm-block"> Reset</span>
                        <BiReset className="icon" />
                     </Button>
                  </div>
                  <div className={cx('sort-icons', 'col-4 col-md-5')}>
                     <p>{productList.length} Pcs</p>
                     <div className={cx('wrap-icon')}>
                        {sortBtn.map((el, i) => (
                           <Button
                              text
                              onClick={() => handleSortClick(el.id)}
                              key={i}
                              className={cx(`btn-sort-${el.id}`)}
                           >
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
                                 <CardProduct data={product} isSort={sortClass === 'sort-1'} />
                              </div>
                           ))
                        ) : (
                           <h1 className="text-center mt-5 w-100">No data.</h1>
                        )}
                        {/* <div className="w-100 d-flex justify-content-center">
                  <Pagination
                     pageCount={Math.ceil(productList.length / itemsPerPage)}
                     onPageChange={handlePageChange}
                  />
               </div>{' '} */}
                     </>
                  )}
               </div>
            </div>
         </div>
      </>
   )
}

export default OurStore

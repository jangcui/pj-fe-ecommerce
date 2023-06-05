import classNames from 'classnames/bind'
import Marquee from 'react-fast-marquee'
import 'swiper/css'
import styles from './Home.module.scss'
import Image from '~/components/Image'
import Category from './Category'
import Banner from './Banner/Banner'
import SpecialProducts from './SpecialProducts/SpecialProducts'
import ChangeTitle from '~/components/ChangeTitle'
import Collection from '~/components/Collection'
import BlogComp from '~/components/BlogComp'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/store/store'
import { useEffect } from 'react'
import { getProducts } from '~/features/products/productsService'
const cx = classNames.bind(styles)

type Item = {
   src?: string
}

const ITEM_MARQUEE: Item[] = [
   {
      src: 'https://fptshop.com.vn/Content/v4/images/ft-img6.png?v=1',
   },
   {
      src: 'https://fptshop.com.vn/Content/v4/images/ft-img7.png?v=1',
   },
   {
      src: 'https://fptshop.com.vn/Content/v4/images/ft-img8.png?v=1',
   },
   {
      src: 'https://fptshop.com.vn/Content/v4/images/ft-img9.png?v=1',
   },
   {
      src: 'https://fptshop.com.vn/Content/v4/images/ft-img10.png?v=1',
   },
   {
      src: 'https://fptshop.com.vn/Content/v4/images/ft-img11.png?v=1',
   },
   {
      src: 'https://fptshop.com.vn/Content/v4/images/ft-img12.png?v=1',
   },
]

function Home() {
   const dispatch = useDispatch<AppDispatch>()
   const { productList } = useSelector((state: RootState) => state.products)

   useEffect(() => {
      dispatch(getProducts({}))
   }, [dispatch])
   console.log(productList)
   return (
      <div className={cx('wrapper')}>
         <ChangeTitle title={'E-commerce'} />
         <section className={cx('banner')}>
            <Banner />
         </section>
         <h1>Category</h1>
         <section className={cx('category')}>
            <Category />
         </section>
         <section className={cx('marquee')}>
            <Marquee gradientWidth={10} gradientColor={[255, 255, 255]}>
               {ITEM_MARQUEE.map((item: Item, index: number) => (
                  <Image src={item.src} key={index} className={cx('marquee-img')} />
               ))}
            </Marquee>
         </section>
         <h1>Featured Collection</h1>
         <section className={cx('special')}>
            {productList?.map((product, index) => {
               if (product.tags === 'featured') {
                  return <SpecialProducts data={product} key={index} />
               }
            })}
         </section>
         <h1>Special Products</h1>
         <section className={cx('special')}>
            {productList?.map((product, index) => {
               if (product.tags === 'special') {
                  return <SpecialProducts data={product} key={index} />
               }
            })}
         </section>
         <h1>Popular Products</h1>
         <section className={cx('popular')}>
            {productList?.map((product, index) => {
               if (product.tags === 'popular') {
                  return <Collection data={product} key={index} />
               }
            })}
         </section>

         <h1>Blogs</h1>
         {/* <section className={cx('blogs')}>
               <BlogComp />
               <BlogComp />
            
            </section> */}
      </div>
   )
}

export default Home

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
   return (
      <div className={cx('wrapper')}>
         <ChangeTitle title={'E-commerce'} />
         <div className={cx('container')}>
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
            <h1>Collections</h1>
            <section className={cx('collection')}>
               <Collection />
               <Collection />
               <Collection />
               <Collection />
               <Collection />
               <Collection />
               <Collection />
               <Collection />
            </section>

            <h1>Special Products</h1>
            <section className={cx('special')}>
               <SpecialProducts />
               <SpecialProducts />
               <SpecialProducts />
               <SpecialProducts />
               <SpecialProducts />
               <SpecialProducts />
               <SpecialProducts />
            </section>

            <h1>Blogs</h1>
            <section className={cx('blogs')}>
               <BlogComp />
               <BlogComp />
               <BlogComp />
               <BlogComp />
               <BlogComp />
               <BlogComp />
               <BlogComp />
               <BlogComp />
               <BlogComp />
            </section>
         </div>
      </div>
   )
}

export default Home

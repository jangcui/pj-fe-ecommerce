import classNames from 'classnames/bind'
import styles from './Category.module.scss'
import Image from '~/components/Image/Image'

const cx = classNames.bind(styles)

type Item = {
   src?: string
   title?: string
}

const CATEGORY_ITEMS: Item[] = [
   {
      title: 'Music & gaming',
      src: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.6435-9/108634973_1169230400096019_7100257337843355309_n.jpg?stp=c0.157.1443.1443a_dst-jpg_s851x315&_nc_cat=108&ccb=1-7&_nc_sid=da31f3&_nc_ohc=Mgn5zvov_3EAX-Ij5R1&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfCFjliyQ6678vqX3axM6B5Nh_QQXQ7x8NZ_GMGQfw9cJA&oe=644B9EBE',
   },
   {
      title: 'Cameras',
      src: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.6435-9/108634973_1169230400096019_7100257337843355309_n.jpg?stp=c0.157.1443.1443a_dst-jpg_s851x315&_nc_cat=108&ccb=1-7&_nc_sid=da31f3&_nc_ohc=Mgn5zvov_3EAX-Ij5R1&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfCFjliyQ6678vqX3axM6B5Nh_QQXQ7x8NZ_GMGQfw9cJA&oe=644B9EBE',
   },
   {
      title: 'Smart TVs',
      src: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.6435-9/108634973_1169230400096019_7100257337843355309_n.jpg?stp=c0.157.1443.1443a_dst-jpg_s851x315&_nc_cat=108&ccb=1-7&_nc_sid=da31f3&_nc_ohc=Mgn5zvov_3EAX-Ij5R1&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfCFjliyQ6678vqX3axM6B5Nh_QQXQ7x8NZ_GMGQfw9cJA&oe=644B9EBE',
   },
   {
      title: 'Smart Watches',
      src: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.6435-9/108634973_1169230400096019_7100257337843355309_n.jpg?stp=c0.157.1443.1443a_dst-jpg_s851x315&_nc_cat=108&ccb=1-7&_nc_sid=da31f3&_nc_ohc=Mgn5zvov_3EAX-Ij5R1&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfCFjliyQ6678vqX3axM6B5Nh_QQXQ7x8NZ_GMGQfw9cJA&oe=644B9EBE',
   },
   {
      title: 'Music & gaming',
      src: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.6435-9/108634973_1169230400096019_7100257337843355309_n.jpg?stp=c0.157.1443.1443a_dst-jpg_s851x315&_nc_cat=108&ccb=1-7&_nc_sid=da31f3&_nc_ohc=Mgn5zvov_3EAX-Ij5R1&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfCFjliyQ6678vqX3axM6B5Nh_QQXQ7x8NZ_GMGQfw9cJA&oe=644B9EBE',
   },
   {
      title: 'Cameras',
      src: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.6435-9/108634973_1169230400096019_7100257337843355309_n.jpg?stp=c0.157.1443.1443a_dst-jpg_s851x315&_nc_cat=108&ccb=1-7&_nc_sid=da31f3&_nc_ohc=Mgn5zvov_3EAX-Ij5R1&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfCFjliyQ6678vqX3axM6B5Nh_QQXQ7x8NZ_GMGQfw9cJA&oe=644B9EBE',
   },
   {
      title: 'Smart TVs',
      src: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.6435-9/108634973_1169230400096019_7100257337843355309_n.jpg?stp=c0.157.1443.1443a_dst-jpg_s851x315&_nc_cat=108&ccb=1-7&_nc_sid=da31f3&_nc_ohc=Mgn5zvov_3EAX-Ij5R1&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfCFjliyQ6678vqX3axM6B5Nh_QQXQ7x8NZ_GMGQfw9cJA&oe=644B9EBE',
   },
   {
      title: 'Smart Watches',
      src: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.6435-9/108634973_1169230400096019_7100257337843355309_n.jpg?stp=c0.157.1443.1443a_dst-jpg_s851x315&_nc_cat=108&ccb=1-7&_nc_sid=da31f3&_nc_ohc=Mgn5zvov_3EAX-Ij5R1&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfCFjliyQ6678vqX3axM6B5Nh_QQXQ7x8NZ_GMGQfw9cJA&oe=644B9EBE',
   },
]

function Category() {
   return (
      <div className={cx('wrapper')}>
         {CATEGORY_ITEMS.map((item: Item, index: number) => (
            <div className={cx('container')} key={index}>
               <div className={cx('wrap-img')}>
                  <div className={cx('title')}>{item.title}</div>
                  <Image className={cx('img')} src={item.src} key={index} />
               </div>
            </div>
         ))}
      </div>
   )
}

export default Category

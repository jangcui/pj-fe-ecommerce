import BlogComp from '~/components/BlogComp/BlogComp'
import SliderCustom from '~/components/SliderCustom/SliderCustom'
import { useSelector } from 'react-redux'
import { RootState } from '~/redux/store/store'

function BlogSlider() {
   const { blogList } = useSelector((state: RootState) => state.blogs)

   return (
      <>
         <SliderCustom isBullet={false}>
            {blogList?.map((blog, index) => {
               return (
                  <div key={index} className="pe-2">
                     <BlogComp data={blog} />
                  </div>
               )
            })}
         </SliderCustom>
      </>
   )
}

export default BlogSlider

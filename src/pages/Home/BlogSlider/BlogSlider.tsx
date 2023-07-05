import { BlogType } from '~/types/blogStage'
import BlogComp from '~/components/BlogComp/BlogComp'
import SliderCustom from '~/components/SliderCustom/SliderCustom'

function BlogSlider({ data }: { data: BlogType[] }) {
   return (
      <>
         <SliderCustom isBullet={false}>
            {data?.map((blog, index) => {
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

import React from 'react'
import ReactImageMagnify from 'react-image-magnify'
import ReactSlick from 'react-slick'

interface ImageData {
   srcSet: { src: string; setting: string }[]
   small: string
   large: string
}

interface ReactSlickExampleProps {
   dataSource: ImageData[]
   rimProps?: any
   rsProps?: any
}

const ReactSlickExample: React.FC<ReactSlickExampleProps> = ({ dataSource, rimProps, rsProps }) => {
   const frontSrcSet = dataSource[0].srcSet.map((item) => `${item.src} ${item.setting}`).join(', ')

   const backSrcSet = dataSource[1].srcSet.map((item) => `${item.src} ${item.setting}`).join(', ')

   return (
      <ReactSlick dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1} {...rsProps}>
         {dataSource.map((src, index) => (
            <div key={index}>
               <ReactImageMagnify
                  smallImage={{
                     alt: 'Wristwatch by Versace',
                     isFluidWidth: true,
                     src: src.small,
                     srcSet: index === 0 ? frontSrcSet : backSrcSet,
                     sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px',
                  }}
                  largeImage={{
                     src: src.large,
                     width: 1426,
                     height: 2000,
                  }}
                  lensStyle={{ backgroundColor: 'rgba(0,0,0,.6)' }}
                  {...rimProps}
               />
            </div>
         ))}
      </ReactSlick>
   )
}

export default ReactSlickExample

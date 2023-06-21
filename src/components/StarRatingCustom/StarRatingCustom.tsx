import { StarRating } from 'star-rating-react-ts'

interface StarProps {
   size?: number
   numStars?: number
   readOnly?: boolean
   initStar: number
   colorActive?: string
   colorDefault?: string
   colorHover?: string
   onClick?: (value: any) => void
}

function StarRatingCustom(props: StarProps) {
   const {
      size = 18,
      readOnly = true,
      initStar,
      colorActive = '#ffd333',
      colorDefault = '#ccc',
      colorHover = '#ffd333',
      onClick,
      numStars = 5,
   } = props

   return (
      <StarRating
         initialRating={initStar}
         readOnly={readOnly}
         onClick={onClick}
         numStars={numStars}
         theme={{
            size: size,
            colors: {
               backgroundDefault: colorDefault,
               backgroundColorHover: colorHover,
               backgroundColorActive: colorActive,
            },
         }}
      />
   )
}

export default StarRatingCustom

type props = {
   width?: string
   height?: string
   className?: string
   style?: React.CSSProperties
}

export const SearchIcon = ({ width = '24px', height = '24px', className }: props) => (
   <svg
      width={width}
      height={height}
      className={className}
      data-e2e=""
      viewBox="0 0 48 48"
      fill="currentcolor"
      xmlns="http://www.w3.org/2000/svg"
   >
      <path
         fillRule="evenodd"
         clipRule="evenodd"
         d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"
      ></path>
   </svg>
)
export const LikeIcon = ({ width = '24px', height = '24px', className }: props) => (
   <svg
      width={width}
      className={className}
      height={height}
      aria-hidden="true"
      focusable="false"
      data-prefix="far"
      data-icon="heart"
      fill="currentColor"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
   >
      <path
         fill="currentColor"
         d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"
      ></path>
   </svg>
)
export const UserIcon = ({ width = '24px', height = '24px', className }: props) => (
   <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
   >
      <path
         fillRule="evenodd"
         clipRule="evenodd"
         d="M24.0003 7C20.1343 7 17.0003 10.134 17.0003 14C17.0003 17.866 20.1343 21 24.0003 21C27.8663 21 31.0003 17.866 31.0003 14C31.0003 10.134 27.8663 7 24.0003 7ZM13.0003 14C13.0003 7.92487 17.9252 3 24.0003 3C30.0755 3 35.0003 7.92487 35.0003 14C35.0003 20.0751 30.0755 25 24.0003 25C17.9252 25 13.0003 20.0751 13.0003 14ZM24.0003 33C18.0615 33 13.0493 36.9841 11.4972 42.4262C11.3457 42.9573 10.8217 43.3088 10.2804 43.1989L8.32038 42.8011C7.77914 42.6912 7.4266 42.1618 7.5683 41.628C9.49821 34.358 16.1215 29 24.0003 29C31.8792 29 38.5025 34.358 40.4324 41.628C40.5741 42.1618 40.2215 42.6912 39.6803 42.8011L37.7203 43.1989C37.179 43.3088 36.6549 42.9573 36.5035 42.4262C34.9514 36.9841 29.9391 33 24.0003 33Z"
      ></path>
   </svg>
)
export const CompareIcon = ({ width = '24px', height = '24px', className }: props) => (
   <svg
      className={className}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      fill="currentColor"
      data-name="Layer 1"
      viewBox="0 0 122.61 122.88"
   >
      <title>update</title>
      <path d="M111.9,61.57a5.36,5.36,0,0,1,10.71,0A61.3,61.3,0,0,1,17.54,104.48v12.35a5.36,5.36,0,0,1-10.72,0V89.31A5.36,5.36,0,0,1,12.18,84H40a5.36,5.36,0,1,1,0,10.71H23a50.6,50.6,0,0,0,88.87-33.1ZM106.6,5.36a5.36,5.36,0,1,1,10.71,0V33.14A5.36,5.36,0,0,1,112,38.49H84.44a5.36,5.36,0,1,1,0-10.71H99A50.6,50.6,0,0,0,10.71,61.57,5.36,5.36,0,1,1,0,61.57,61.31,61.31,0,0,1,91.07,8,61.83,61.83,0,0,1,106.6,20.27V5.36Z" />
   </svg>
)
export const FilterIcon = ({ width = '24px', height = '24px', className }: props) => (
   <svg
      width={width}
      height={height}
      enableBackground="new 0 0 15 15"
      viewBox="0 0 15 15"
      x="0"
      y="0"
      className="shopee-svg-icon"
   >
      <g>
         <polyline
            fill="currentColor"
            points="5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
         ></polyline>
      </g>
   </svg>
)
export const DropIcon = ({ width = '24px', height = '24px', className }: props) => (
   <svg
      className={className}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
   >
      <path
         fill="currentColor"
         d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z"
      ></path>
   </svg>
)
export const GitHubIcon = ({ width = '24px', height = '24px', className }: props) => (
   <svg
      className={className}
      width={width}
      height={height}
      aria-hidden="true"
      viewBox="0 0 16 16"
      version="1.1"
      fill="currentColor"
      data-view-component="true"
   >
      <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
   </svg>
)
export const FaceBookIcon = ({ width = '24px', height = '24px', className }: props) => (
   <svg
      className={className}
      width={width}
      height={height}
      data-e2e=""
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
   >
      <path
         d="M24 47C36.7025 47 47 36.7025 47 24C47 11.2975 36.7025 1 24 1C11.2975 1 1 11.2975 1 24C1 36.7025 11.2975 47 24 47Z"
         fill="white"
      ></path>
      <path
         d="M24 1C11.2964 1 1 11.2964 1 24C1 35.4775 9.40298 44.9804 20.3846 46.7205L20.3936 30.6629H14.5151V24.009H20.3936C20.3936 24.009 20.3665 20.2223 20.3936 18.5363C20.4206 16.8503 20.7542 15.2274 21.6288 13.7487C22.9722 11.4586 25.0639 10.3407 27.6335 10.0251C29.7432 9.76362 31.826 10.0521 33.9087 10.3407C34.0529 10.3587 34.125 10.3767 34.2693 10.4038C34.2693 10.4038 34.2783 10.6472 34.2693 10.8005C34.2603 12.4053 34.2693 16.0839 34.2693 16.0839C33.2685 16.0659 31.6096 15.9667 30.5096 16.138C28.6884 16.4175 27.6425 17.5806 27.6064 19.4108C27.5704 20.8354 27.5884 24.009 27.5884 24.009H33.9988L32.962 30.6629H27.5974V46.7205C38.597 44.9984 47.009 35.4775 47.009 24C47 11.2964 36.7036 1 24 1Z"
         fill="#0075FA"
      ></path>
   </svg>
)

// export const StarIcon = ({ width = '24px', height = '24px', className, style }: props) => (
//    <svg
//       className={className}
//       width={width}
//       height={height}
//       id="Layer_1"
//       style={{ backgroundColor: 'white', ...style }}
//       version="1.1"
//       viewBox="0 0 512 512"
//       xmlns="http://www.w3.org/2000/svg"
//    >
//       <path d="M480,207H308.6L256,47.9L203.4,207H32l140.2,97.9L117.6,464L256,365.4L394.4,464l-54.7-159.1L480,207z M362.6,421.2  l-106.6-76l-106.6,76L192,298.7L84,224h131l41-123.3L297,224h131l-108,74.6L362.6,421.2z" />
//    </svg>
// )
export const StarIcon = ({ width = '24px', height = '24px', className }: props) => (
   <svg className={className} width={width} height={height} viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
         <path
            d="M30.757 1.144 38.2 16.948a1.968 1.968 0 0 0 1.475 1.123l16.644 2.534a2.08 2.08 0 0 1 1.086 3.502L45.362 36.408a2.115 2.115 0 0 0-.563 1.818l2.843 17.37a1.98 1.98 0 0 1-2.843 2.164l-14.887-8.201a1.88 1.88 0 0 0-1.824 0l-14.887 8.2a1.98 1.98 0 0 1-2.843-2.163l2.843-17.37a2.115 2.115 0 0 0-.563-1.818L.594 24.107a2.08 2.08 0 0 1 1.086-3.502l16.644-2.534a1.968 1.968 0 0 0 1.475-1.123l7.444-15.804a1.92 1.92 0 0 1 3.514 0Z"
            fill="#000000"
            className="fill-f6ab27"
         ></path>
         <path
            d="M17.148 38.872a6.124 6.124 0 0 0-1.654-5.264L6.07 23.983l12.857-1.957a5.966 5.966 0 0 0 4.49-3.37L29 6.802l5.581 11.85a5.969 5.969 0 0 0 4.492 3.374l12.857 1.957-9.426 9.627a6.125 6.125 0 0 0-1.652 5.264l2.184 13.348-11.194-6.167a5.88 5.88 0 0 0-5.683 0l-11.195 6.167 2.184-13.35Z"
            fill="#ffffff"
            className="fill-f4cd1e"
         ></path>
      </g>
   </svg>
)
export const StarActiveIcon = ({ width = '24px', height = '24px', className }: props) => (
   <svg className={className} width={width} height={height} viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
         <path
            d="M30.757 1.144 38.2 16.948a1.968 1.968 0 0 0 1.475 1.123l16.644 2.534a2.08 2.08 0 0 1 1.086 3.502L45.362 36.408a2.115 2.115 0 0 0-.563 1.818l2.843 17.37a1.98 1.98 0 0 1-2.843 2.164l-14.887-8.201a1.88 1.88 0 0 0-1.824 0l-14.887 8.2a1.98 1.98 0 0 1-2.843-2.163l2.843-17.37a2.115 2.115 0 0 0-.563-1.818L.594 24.107a2.08 2.08 0 0 1 1.086-3.502l16.644-2.534a1.968 1.968 0 0 0 1.475-1.123l7.444-15.804a1.92 1.92 0 0 1 3.514 0Z"
            fill="#ffb300"
            className="fill-f6ab27"
         ></path>
         <path
            d="M17.148 38.872a6.124 6.124 0 0 0-1.654-5.264L6.07 23.983l12.857-1.957a5.966 5.966 0 0 0 4.49-3.37L29 6.802l5.581 11.85a5.969 5.969 0 0 0 4.492 3.374l12.857 1.957-9.426 9.627a6.125 6.125 0 0 0-1.652 5.264l2.184 13.348-11.194-6.167a5.88 5.88 0 0 0-5.683 0l-11.195 6.167 2.184-13.35Z"
            fill="#ffb300"
            className="fill-f4cd1e"
         ></path>
      </g>
   </svg>
)

export const GmailIcon = ({ width = '24px', height = '24px', className }: props) => (
   <svg
      className={className}
      width={width}
      height={height}
      data-e2e=""
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
   >
      <path
         fillRule="evenodd"
         clipRule="evenodd"
         d="M43 24.4313C43 23.084 42.8767 21.7885 42.6475 20.5449H24.3877V27.8945H34.8219C34.3724 30.2695 33.0065 32.2818 30.9532 33.6291V38.3964H37.2189C40.885 35.0886 43 30.2177 43 24.4313Z"
         fill="#4285F4"
      ></path>
      <path
         fillRule="evenodd"
         clipRule="evenodd"
         d="M24.3872 43.001C29.6219 43.001 34.0107 41.2996 37.2184 38.3978L30.9527 33.6305C29.2165 34.7705 26.9958 35.4441 24.3872 35.4441C19.3375 35.4441 15.0633 32.1018 13.5388 27.6108H7.06152V32.5337C10.2517 38.7433 16.8082 43.001 24.3872 43.001Z"
         fill="#34A853"
      ></path>
      <path
         fillRule="evenodd"
         clipRule="evenodd"
         d="M13.5395 27.6094C13.1516 26.4695 12.9313 25.2517 12.9313 23.9994C12.9313 22.7472 13.1516 21.5295 13.5395 20.3894V15.4668H7.06217C5.74911 18.0318 5 20.9336 5 23.9994C5 27.0654 5.74911 29.9673 7.06217 32.5323L13.5395 27.6094Z"
         fill="#FBBC04"
      ></path>
      <path
         fillRule="evenodd"
         clipRule="evenodd"
         d="M24.3872 12.5568C27.2336 12.5568 29.7894 13.5155 31.7987 15.3982L37.3595 9.94866C34.0018 6.88281 29.6131 5 24.3872 5C16.8082 5 10.2517 9.25777 7.06152 15.4674L13.5388 20.39C15.0633 15.8991 19.3375 12.5568 24.3872 12.5568Z"
         fill="#EA4335"
      ></path>
   </svg>
)
export const LikeIconActive = ({ width = '24px', height = '24px', className }: props) => (
   <svg
      width={width}
      className={className}
      height={height}
      data-e2e=""
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
   >
      <g clipPath="url(#HeartFill_clip0)">
         <g filter="url(#HeartFill_filter0_d)">
            <path
               fillRule="evenodd"
               clipRule="evenodd"
               d="M7.5 2.25C10.5 2.25 12 4.25 12 4.25C12 4.25 13.5 2.25 16.5 2.25C20 2.25 22.5 4.99999 22.5 8.5C22.5 12.5 19.2311 16.0657 16.25 18.75C14.4095 20.4072 13 21.5 12 21.5C11 21.5 9.55051 20.3989 7.75 18.75C4.81949 16.0662 1.5 12.5 1.5 8.5C1.5 4.99999 4 2.25 7.5 2.25Z"
            ></path>
         </g>
         <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.40179 12.1998C3.58902 14.6966 5.7592 16.9269 7.74989 18.75C9.5504 20.3989 10.9999 21.5 11.9999 21.5C12.9999 21.5 14.4094 20.4072 16.2499 18.75C19.231 16.0657 22.4999 12.5 22.4999 8.49997C22.4999 8.41258 22.4983 8.32566 22.4952 8.23923C20.5671 13.6619 13.6787 18.5 11.75 18.5C10.3127 18.5 5.61087 15.8131 2.40179 12.1998Z"
            fillOpacity="0.03"
         ></path>
      </g>
      <defs>
         <filter
            id="HeartFill_filter0_d"
            x="-0.9"
            y="1.05"
            width="25.8"
            height="24.05"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
         >
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feColorMatrix
               in="SourceAlpha"
               type="matrix"
               values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
               result="hardAlpha"
            ></feColorMatrix>
            <feOffset dy="1.2"></feOffset>
            <feGaussianBlur stdDeviation="1.2"></feGaussianBlur>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"></feColorMatrix>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend>
         </filter>
         <clipPath id="HeartFill_clip0">
            <rect width="24" height="24" fill="white"></rect>
         </clipPath>
      </defs>
   </svg>
)

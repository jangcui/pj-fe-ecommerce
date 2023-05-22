const routes = {
   home: '/',
   products: '/products',
   product: '/product/:productId',
   store: '/our-store',
   blogs: '/blogs',
   blog: '/blog/:blogId',
   contact: '/contact',
   compare: '/compare',
   wishlist: '/wishlist',
   login: '/login',
   forgotPwd: '/forgot-password',
   checkout: '/checkout',
   cart: '/cart',
   admin: '/admin/*',
   loginAdmin: '/admin/login',
   signup: '/signup',
   notfound: '*',
}
const config = {
   routes,
}

export default config

const routes = {
   home: '/',
   products: '/product',
   product: '/product/:slug',
   blogs: '/blogs',
   blog: '/blog/:blogId',
   contact: '/contact',
   wishlist: '/wishlist',
   login: '/login',
   forgotPwd: '/forgot-password',
   resetPwd: '/reset-password/:token',
   checkout: '/checkout',
   cart: '/cart',
   admin: '/admin/*',
   loginAdmin: '/admin/login',
   signup: '/signup',
   order: '/order',
   profile: '/profile',
   notfound: '*',
}
const config = {
   routes,
}

export default config

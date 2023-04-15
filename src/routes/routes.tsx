import config from '~/config'
import BlogPage from '~/pages/BlogPage/BlogPage'
import CartPage from '~/pages/CartPage'
import CheckOut from '~/pages/CheckOut'
import CompareProducts from '~/pages/CompareProducts'
import Contact from '~/pages/Contact'
import Home from '~/pages/Home'
import Login from '~/pages/Login'
import ForgotPwd from '~/pages/Login/ForgotPwd'
import SignUp from '~/pages/Login/SignUp'
import OurStore from '~/pages/OurStore'
import Products from '~/pages/Products'
import SingleBlog from '~/pages/SingleBlog'
import SingleProduct from '~/pages/SingleProduct'
import WishList from '~/pages/WishList'

interface Route {
   path: string
   component: React.ComponentType<any>
   layout?: React.ComponentType<any> | null
}

const publicRouter: Route[] = [
   { path: config.routes.home, component: Home },
   { path: config.routes.products, component: Products },
   { path: config.routes.product, component: SingleProduct },
   { path: config.routes.store, component: OurStore },
   { path: config.routes.blogs, component: BlogPage },
   { path: config.routes.blog, component: SingleBlog },
   { path: config.routes.compare, component: CompareProducts },
   { path: config.routes.contact, component: Contact },
   { path: config.routes.wishlist, component: WishList },
   { path: config.routes.cart, component: CartPage },
   { path: config.routes.forgotPwd, component: ForgotPwd },
   { path: config.routes.signup, component: SignUp },
   { path: config.routes.checkout, component: CheckOut },
   { path: config.routes.login, component: Login },
]

export { publicRouter }

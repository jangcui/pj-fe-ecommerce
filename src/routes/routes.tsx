import config from '~/config'
import Home from '~/pages/Home'
import Products from '~/pages/Products'
import Some from '~/pages/Some'

interface Route {
   path: string
   component: React.ComponentType<any>
   layout?: React.ComponentType<any> | null
}

const publicRouter: Route[] = [
   { path: config.routes.home, component: Home },
   { path: config.routes.products, component: Products },
   { path: config.routes.some, component: Some, layout: null },
]

export { publicRouter }

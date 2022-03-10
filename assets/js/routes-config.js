// import components
import {ProductsComponent} from './components/products.js'
import {HomeComponent} from './components/home.js'
import {ContentComponent} from './components/content.js'


console.log('route-config.js - eNursery', eNursery)

const routes = [	
	{ path: '/', component: HomeComponent, props: { siteid: eNursery.siteId, siteinfo: eNursery.siteInfo  } },
	{ path: '/products', component: ProductsComponent, props: { siteid: eNursery.siteId } },
	{ path: '/contents/show/:contentId/:contentTitleSlug', component: ContentComponent, props: { siteid: eNursery.siteId } },
]

export {routes}
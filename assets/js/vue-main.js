// import vuex store
import {store} from './store.js'

// import components
import {TopNavComponent} from './components/topnav.js'
import {CartNavComponent} from './components/cartnav.js'
import {ProductsComponent} from './components/products.js'
import {ProductDetailsComponent} from './components/product-details.js'
import {HomeComponent} from './components/home.js'
import {ContentComponent} from './components/content.js'
import {PageTitleComponent} from './components/page-title.js'
import {AlertMessageComponent} from './components/alert-message.js'
import {LoginComponent} from './components/login.js'


firstReq.then(function(json) {
    console.log('req2', json)
    eNursery.site_url = json.result.site_url
    eNursery.siteInfo = json.result.site_info
    eNursery.image_path = json.result.image_path

    // Route configuration -------------------------------------------------
    const routes = [	
        { name:'home', path: '/', component: HomeComponent },
        { name:'login', path: '/login', component: LoginComponent },
        { name: 'products', path: '/products', component: ProductsComponent },
        { name:'productdetails', path: '/products/details/:categoryId/:productId/:categoryNameSlug/:productNameSlug', component: ProductDetailsComponent },
        { name: 'contentpage', path: '/contents/show/:contentId/:contentTitleSlug', component: ContentComponent },
    ]        
    console.log('routes', routes); 

    const router = new VueRouter({
        mode: 'history',
        routes
    })
    router.beforeResolve((to, from, next) => {
        console.log(to.name)
        if (to.name) {
            
            NProgress.start()
        }
        next()
    })
    router.afterEach((to, from) => {
        console.log(to)
        if(to.name) {
            $('.navbar-nav li').removeClass('active')
            let linkId = to.name+'TopNavLink'
            if(to.name == 'contentpage') {
                linkId = 'contentTopNavLink'+to.params.contentTitleSlug
            }            
            $('#'+linkId).addClass('active')

            if($('#collapseTopNavCart')) {
                $('#collapseTopNavCart').collapse('hide')
            }

            if($('#navbarsExampleDefault')) {
                $('#navbarsExampleDefault').collapse('hide')
            }
        }
        NProgress.done()
    })

    // Vue instance -----------------------------------------------------
    app = new Vue({
        store,
        router,        
        data: {
            siteId: eNursery.siteId,
            siteInfo: eNursery.siteInfo,
            image_path: eNursery.image_path
        },
        beforeCreate () {
            this.siteId = eNursery.siteInfo.id
            this.siteInfo = eNursery.siteInfo
            this.image_path = eNursery.image_path
        },
        created () {
            this.siteId = eNursery.siteInfo.id
            this.siteInfo = eNursery.siteInfo
            this.image_path = eNursery.image_path
            $('#firstPaint').hide()
        }
    }).$mount('#app')

}.bind(this)).catch(function(err) {
    console.log('Fetch problem: ' + err.message);
});

import {productsTemplate} from '../templates/products.js'
import {ProductBoxComponent} from './product-box.js'

var ProductsComponent = Vue.component('products', {
	template: productsTemplate,	
	data: function() {
		return {
			siteid: eNursery.siteInfo.id,
			siteinfo: eNursery.siteInfo,
			products: [],
			categories: []
		}
	},
	created: function() {
		this.fetchProduct()
	},
	methods: {
		fetchProduct: function() {
			if(this.siteid) {
				let url = '//www.letsgreenify.com/api/getCategoryProducts/'+this.siteid
				this.apiGet(url).then((responseJson) => {
					this.products = responseJson.result.Products;
					this.categories = responseJson.result.Categories;
				})
			}
		},
		
	}
})

export {ProductsComponent}
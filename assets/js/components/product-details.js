import {productsDetailsTemplate} from '../templates/product-details.js'
import {AddToCartComponent} from '../components/add-to-cart.js'
import { store } from '../store.js'

var ProductDetailsComponent = Vue.component('product-details', {
	template: productsDetailsTemplate,	
	data: function() {
		return {
			siteid: eNursery.siteInfo.id,
			siteinfo: eNursery.siteInfo,
			categoryId: this.$route.params.categoryId,
			categoryNameSlug: this.$route.params.categoryNameSlug,			
			productId: this.$route.params.productId,
			productNameSlug: this.$route.params.productNameSlug,
			products: [],
			categories: [],
			product: '',
			showCarousel: false,
		}
	},
	created: function() {		
		this.fetchProduct()
	},
	updated: function() {
		$('.carousel').carousel('pause')
	},
	methods: {
		fetchProduct: function() {
			if(this.siteid) {
				let url = '//www.letsgreenify.com/api/getCategoryProduct/'+this.siteid+'/'+this.categoryId+'/'+this.productId
				this.apiGet(url).then((responseJson) => {
					this.products = responseJson.result.Products
					this.categories = responseJson.result.Categories
					this.product = this.products[this.categoryId][this.productId]
				})
			}
		},
		getClass: function(className, index) {
			return className+index
		},
		openModal: function(className, index) {
			const id = '#'+className+index
			$(id).modal()
		},
		setActiveImage: function(index) {
			$('.carousel').carousel(index)
			$('.carousel').carousel('pause')
			$('.image-tile').removeClass('border')
			$('.image-tile').removeClass('border-warning')
			$('#image-tile-'+index).addClass('border')
			$('#image-tile-'+index).addClass('border-warning')
		}
		
	}
	
})

export {ProductDetailsComponent}
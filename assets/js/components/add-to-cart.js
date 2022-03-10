import {addToCartTemplate} from '../templates/add-to-cart.js'

var AddToCartComponent = Vue.component('add-to-cart', {
	template: addToCartTemplate,
	props: ['product'],
	data: function() {
		return {
			siteid: eNursery.siteInfo.id,
			siteinfo: eNursery.siteInfo,
			quantity: 1,
			processing: false
		}
	},
	methods: {
		addToCart: function(showRequestPriceQuoteForm) {
			const data = {
				productId: this.product.id,
				quantity: this.quantity,
				categoryId: this.product.category_id,
				shoppingCartId: this.getShoppingCartId()
			}
			const url = '//www.letsgreenify.com/api/addProductToCart/'+this.siteid

			this.processing = true
			this.apiPost(url, data).then((responseJson) => {				
				this.$store.commit('updateCart')
				
				let message = {
					message: 'Product added to cart',
					type: 'success'
				}
				this.$store.commit('alert', message)
				
				if(showRequestPriceQuoteForm) {
					this.$store.commit('showRequestPriceQuoteForm', true)
				} else {					
					this.$store.commit('showRequestPriceQuoteForm', false)
				}		

				if(responseJson.result.shoppingCartId > 0) {
					this.quantity = 1
				}
				var shoppingCartId = this.getShoppingCartId()
				if((!shoppingCartId || shoppingCartId == '') && responseJson.result.shoppingCartId) {
					this.setShoppingCartId(responseJson.result.shoppingCartId)					
				}
			}).then((responseJson) => {
				this.processing = false
			})
		},
		requestPriceQuote: function() {
			let showRequestPriceQuoteForm = true			
			this.addToCart(showRequestPriceQuoteForm)
		},	
		highlightCart: function() {
			$('#cartNav').removeClass('bg-white')
			$('#cartNav').addClass('alert-success')
			var that = this
			setTimeout(function() { 
				$('#cartNav').removeClass('alert-success')
				$('#cartNav').addClass('bg-white')
			}, 1000);
		}
		
	},
})

export {AddToCartComponent}
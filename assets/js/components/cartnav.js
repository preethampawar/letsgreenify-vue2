
import {cartNavTemplate} from '../templates/cartnav.js'

var CartNavComponent = Vue.component('cart-nav', {
	template: cartNavTemplate,
	props: ['siteid'],
	data: function() {
		return {
			siteinfo: eNursery.siteInfo,
			shoppingCartInfo: '',
			shoppingCartProduct: '',
			siteinfo: eNursery,
			shoppingCartId: '',
			userName: '',
			userEmail: '',
			userMobile: '',
			userAddress: '',
			userMessage: '',
			invalidUserName: false,
			invalidUserEmail: false,
			invalidUserMobile: false,
			invalidUserAddress: false,
			enableUpdate: false,
			errors: {
				userName: false,
				userEmail: false,
				userMobile: false,
				userAddress: false,
			},
			orderType: '',
			processing: false,
			updateProcessing: false,
			hideCartNav: false
		}
	},
	created: function() {
		this.loadData()
		let shoppingCartAddress = this.getShoppingCartAddress()
		
		this.userName = shoppingCartAddress.userName
		this.userEmail = shoppingCartAddress.userEmail
		this.userMobile = shoppingCartAddress.userMobile
		this.userAddress = shoppingCartAddress.userAddress
		
	},
	updated: function() {
		if(this.showRequestPriceQuoteForm) {				
			$('#collapseTopNavCart').collapse('show')
			$('#userName').focus()
			this.$store.commit('showRequestPriceQuoteForm', false)
		}		
	},
	computed: {
		cartUpdateValue: function() {
			return this.$store.state.cartUpdated
		},
		cartTotal: function() {
			let total = 0
			if(this.shoppingCartInfo.ShoppingCartProduct) {				
				this.shoppingCartInfo.ShoppingCartProduct.forEach(element => {
					if(element.quantity && element.quantity > 0) {
						total += parseInt(element.quantity)
					}
				});				
			}
			return total
		},
		showRequestPriceQuoteForm: function() {
			return this.$store.state.showRequestPriceQuoteForm
		}
	},
	watch:{
		cartUpdateValue: function(newVal, oldVal) {
			if(oldVal != newVal) {
				this.loadData()
			}
		},
		shoppingCartProduct: {
			deep: true, 
			handler: function(newVal, oldVal) {
				if(oldVal) {
					this.enableUpdate = true
				}
			}
		},
		userName: function(newVal) {
			if(newVal.trim().length < 2) {
				this.$set(this.errors, 'userName', true)
			} else {				
				this.$set(this.errors, 'userName', false)
			}
			this.setCartDetails()
		},
		userEmail: function(newVal) {
			if (!this.validEmail(newVal)) {
				this.$set(this.errors, 'userEmail', true)
			} else {
				this.$set(this.errors, 'userEmail', false)
			}
			this.setCartDetails()
		},
		userMobile: function(newVal) {
			if(newVal > 0 && (newVal+'').length != 10)  {
				this.$set(this.errors, 'userMobile', true)
			} else {
				this.$set(this.errors, 'userMobile', false)
			}
			this.setCartDetails()
		},
		userAddress: function(newVal) {
			if(newVal.trim().length < 5) {
				this.$set(this.errors, 'userAddress', true)
			} else {
				this.$set(this.errors, 'userAddress', false)
			}
			this.setCartDetails()
		},
		
	},
	methods: {
		loadData() {
			this.shoppingCartId = this.getShoppingCartId()
			if(this.siteid && this.shoppingCartId > 0) {				
				this.shoppingCartProduct = null
				let url = '//www.letsgreenify.com/api/getShoppingCartDetails/'+this.siteid+'/'+this.shoppingCartId
				this.apiGet(url).then((responseJson) => {
					this.shoppingCartInfo = responseJson.result
					this.shoppingCartProduct = this.shoppingCartInfo.ShoppingCartProduct
					this.hideCartNav = false
					if(this.shoppingCartInfo.ShoppingCartProduct.length == 0) {
						this.hideCartNav = true
					}					
					this.enableUpdate = false
				})			
			}
		},
		bookNow(type) {
			this.orderType = type
		},
		confirmOrder() {
			this.processing = true
			const data = {
				shoppingCartId: this.getShoppingCartId(),
				orderType: this.orderType,
				cartDetails: this.getCartDetails()
			}
			const url = '//www.letsgreenify.com/api/confirmOrder/'+this.siteid

			this.apiPut(url, data).then((responseJson) => {
				$('#cartModalCenter').modal('hide')
				if(responseJson.result.orderPlaced) {
					this.setShoppingCartId('')
					this.shoppingCartId = ''			
					this.shoppingCartInfo = ''
					this.shoppingCartProduct = ''

					let message = {
						type: 'success',
						message: 'Order request has been placed. Please check your email for more details.'
					}
					this.$store.commit('alert', message)
				} else {
					let message = {
						type: 'error',
						message: 'Order could not be placed. Please try again.'
					}
					this.$store.commit('alert', message)
				}
				this.enableUpdate = false
				this.processing = false
			})
		},
		removeProductFromCart(index) {
			this.$delete(this.shoppingCartProduct, index)
		},
		updateCart() {
			this.updateProcessing = true
			this.shoppingCartProduct.forEach(function(element, index) {
				if(element.quantity < 1 ) {
					this.removeProductFromCart(index)
				}
			}.bind(this))
			const data = {
				shoppingCartId: this.getShoppingCartId(),
				cart: this.shoppingCartProduct,				
			}
			const url = '//www.letsgreenify.com/api/updateShoppingCart/'+this.siteid

			this.apiPut(url, data).then((responseJson) => {
				let message = {}
				if(this.shoppingCartProduct.length > 0) {				
					message = {
						type: 'success',
						message: 'Your cart has been updated.'					
					}
				} else {
					message = {
						type: 'info',
						message: 'Your cart has been removed as there are no products in it.'
					}
				}
				this.$store.commit('alert', message)
				this.enableUpdate = false
				this.updateProcessing = false
				this.loadData()
			})
		},
		validEmail(email) {
			var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		},
		setCartDetails() {
			let cart = {
				userName: this.userName,
				userEmail: this.userEmail,
				userMobile: this.userMobile,
				userAddress: this.userAddress,
			}
			this.setShoppingCartAddress(cart)
			return cart
		},
		getCartDetails() {
			let cart = {
				userName: this.userName,
				userEmail: this.userEmail,
				userMobile: this.userMobile,
				userAddress: this.userAddress,
				userMessage: this.userMessage
			}
			
			return cart
		}
	},
	
})

export {CartNavComponent}
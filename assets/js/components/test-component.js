
import {testComponentTemplate} from '../templates/test-component-template.js'

var TestComponent = Vue.component('hii', {
	template: testComponentTemplate,
	props: ['siteid'],
	data: function() {
		return {
			msg: 'yo you...'
		}
	},
	created: function() {
		this.fetchProduct()
	},
	watch: {
		siteid: function(newVal, oldVal) {
			//this.fetchProduct()
		}
	},
	methods: {
		fetchProduct: function() {
			console.log('fetch products', this.siteid)
			if(this.siteid) {
				fetch('http://www.letsgreenify.com/api/getProducts/'+this.siteid).then(function(response) {			
					return response.json();
				}).then(function(json) {
					console.log('response', json);
					let products = json;			
				}).catch(function(err) {
					console.log('Fetch problem: ' + err.message);
				});
			}
		}
	}
})

export {TestComponent}
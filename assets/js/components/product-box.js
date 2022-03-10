
const productBoxTemplate = `	
	<div class="shadow rounded p-1 ">
		<div class="d-flex justify-content-center mt-1 w-100">
			<router-link :to="getProductDetailsUrl(product)" >
				<img :src="getProductImageUrl(product)" :alt="getProductImageCaption(product)" class="d-block product-image-tile rounded w-100">
			</router-link>
		</div>
		<div class="text-center font-weight-bold mt-2">
			<router-link :to="getProductDetailsUrl(product)" >{{product.name}}</router-link>
		</div>
		<div class="mb-1"></div>
	</div>
`

var ProductBoxComponent = Vue.component('product-box', {
	template: productBoxTemplate,
	props: ['product'],
	methods: {
		getProductDetailsUrl: function(product) {
			return '/products/details/'+product.category_id+'/'+product.id+'/'+product.category_name_slug+'/'+product.name_slug
		},
		getProductImageUrl: function(product) {
			return product.Image[0].medium_url
		},
		getProductImageCaption: function(product) {
			return product.Image[0].caption
		}
	},
})

export {ProductBoxComponent}
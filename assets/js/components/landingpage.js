
import {landingPageTemplate} from '../templates/landingpage.js'

var LandingPageComponent = Vue.component('landing-page', {
	template: landingPageTemplate,
	props: ['siteid', 'siteinfo'],
	data: function() {
		return {
			contentInfo: '',
			contentImages: '',
			siteInfo: eNursery,
			showCarousel: false
		}
	},
	created: function() {
		this.loadData()
	},
	updated: function() {
		$('.carousel').carousel({
			interval: 2000
		})
	},
	methods: {
		loadData() {
			if(this.siteid) {
				let url = '//www.letsgreenify.com/api/getLandingPageInfo/'+this.siteid
				this.apiGet(url).then((jsonResponse) => {
					this.contentInfo = jsonResponse.result.Content
					this.contentImages = jsonResponse.result.Images
				})
			}
		}
	}
})

export {LandingPageComponent}
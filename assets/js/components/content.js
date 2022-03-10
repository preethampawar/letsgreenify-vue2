
import {contentTemplate} from '../templates/content.js'

var ContentComponent = Vue.component('content-page', {
	template: contentTemplate,
	data: function() {
		return {
			contentInfo: '',
			contentImages: [],
			contentId: this.$route.params.contentId,
			contentSlug: this.$route.params.contentTitleSlug,
			siteInfo: eNursery,
			showCarousel: false
		}
	},
	beforeRouteUpdate (to, from, next) {
		if(from.path != to.path) {
			this.contentId = to.params.contentId
			this.contentSlug = to.params.contentTitleSlug
			this.loadData()
		}
		next()
	},
	created: function() {
		this.loadData()
	},
	updated: function() {
		$('.carousel').carousel('pause')
	},
	methods: {
		loadData: function() {
			if(this.siteInfo.siteInfo.id) {
				let url = '//www.letsgreenify.com/api/getPageContent/'+this.siteInfo.siteInfo.id+'/'+this.contentId+'/'+this.contentSlug
				this.apiGet(url).then((responseJson) => {
					this.contentInfo = responseJson.result.Content
					this.contentImages = responseJson.result.Images
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

export {ContentComponent}
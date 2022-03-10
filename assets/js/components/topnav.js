import {topNavTemplate} from '../templates/topnav.js'

var TopNavComponent = Vue.component('top-nav', {
	template: topNavTemplate,
	props: ['siteid'],
	data: function() {
		return {
			navLinks: '',
			siteinfo: eNursery,
			showLoginLink: true,
			userInfo: ''
		}
	},
	created: function() {
		this.loadData()
		// if user logged in then hide login link and show logout link
		let userDetails = this.getUserDetails()
		this.showLoginLink = true
		if(userDetails.isAuthenticated && userDetails.token != '' && userDetails.userInfo.firstname) {
			this.userInfo = userDetails.userInfo
			this.showLoginLink = false
		}

		console.log('userDetails',userDetails)
	},
	methods: {
		loadData: function() {
			if(this.siteid) {
				let url = '//www.letsgreenify.com/api/getNavLinks/'+this.siteid
				this.apiGet(url).then((jsonResponse) => {
					this.navLinks = jsonResponse.result;
				})				
			}
		}
	}
})

export {TopNavComponent}
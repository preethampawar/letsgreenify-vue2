
import {homeTemplate} from '../templates/home.js'
import {LandingPageComponent} from './landingpage.js'

var HomeComponent = Vue.component('home', {
	template: homeTemplate,
	data: function() {
		return {
			siteid: eNursery.siteInfo.id,
			siteinfo: eNursery.siteInfo			
		}
	}	
})

export {HomeComponent}
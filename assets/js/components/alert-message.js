
const alertMessageTemplate = `
	<div id="alertMessage" class="fixed-top text-center container mt-5" style="display: none;">
		<div v-if="message != '' ":class="[getClass()]" class="shadow p-4 small mb-3 mt-2 alert alert-dismissible fade show" role="alert" id="alertDiv">
			{{message}} 
			<button type="button" class="close p-1 small" aria-label="Close" @click="hideAlert">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>		
	</div>
`

var AlertMessageComponent = Vue.component('alert-message', {
	template: alertMessageTemplate,
	props: [],
	data: function() {
		return {			
			message: '',
			type: ''
		}
	},
	created: function () {
		$('#alertMessage').hide()
	},
	computed: {
		alertMessage: function() {
			return this.$store.state.alertMessage
		},
	},	
	watch: {
		alertMessage: function(newVal, oldVal) {
			if(newVal != '') {				
				this.alert()
			}
		}
	},
	methods: {
		alert: function() {
			this.type = this.alertMessage.type
			this.message = this.alertMessage.message			
			if(this.type != 'error') {
				$('#alertMessage').show().delay(2500).fadeOut()
				//this.autoTimeout()
			}
		},
		autoTimeout: function() {
			var that = this
			setTimeout(function() { 
				that.message = ''
				that.type = ''
				// that.$store.commit('alert', {message: '', type: ''})
			}, 2000)
		},
		hideAlert: function() {
			this.message = ''
			this.type = ''
		},
		getClass: function() {
			if(this.type == 'success') {
				return 'alert-success border-success'
			}
			if(this.type == 'warning') {
				return 'alert-warning border-warning'
			}
			if(this.type == 'error') {
				return 'alert-danger border-danger'
			}			
			return 'alert-info border-info'
		}
	}
})

export {AlertMessageComponent}
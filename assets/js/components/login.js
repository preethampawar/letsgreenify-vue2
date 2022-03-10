const loginTemplate = `
	<div class="text-center">
		<form class="form-signin" submit="return false">			
			<h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
			<div class=" mb-3">
				<label for="inputEmail" class="sr-only">Email address</label>
				<input v-model.trim="email" type="email" id="inputEmail" :class="[(!validEmail ? 'is-invalid' : '')]" class="form-control" placeholder="Email address" required autofocus>
				<div v-if="!validEmail" class="invalid-feedback text-left">
					Please enter valid email address
				</div>
			</div>

			<div class=" mb-3">
				<label for="inputPassword" class="sr-only">Password</label>
				<input v-model="password" type="password" id="inputPassword" :class="[(!validPassword ? 'is-invalid' : '')]" class="form-control" placeholder="Password" required>
				<div v-if="!validEmail" class="invalid-feedback text-left">
					Invalid password (minimum 4 chars)
				</div>
			</div>
					
			<div class=" mb-3  text-center">
				<button v-if="validForm" class="btn btn-md btn-primary btn-block" type="button" @click = "login">Sign in</button>
				<button v-else class="btn btn-md btn-disabled btn-block" type="button" >Sign in</button>
				<p class="mt-5 mb-3 text-muted">&copy; 2019-2020</p>
			</div>
		</form>
	</div>
`

var LoginComponent = Vue.component('login', {
	template: loginTemplate,
	props: [],
	data: function() {
		return {			
			email: '',
			password: '',
			siteInfo: eNursery.siteInfo,
			authenticationFailed: true
		}
	},
	computed: {
		validEmail() {
			if(this.email.length > 0) {
				if(!this.mxValidEmail(this.email)) {
					return false
				}
			}
			return true
		},
		validPassword() {
			if(this.password.length > 0 && !(this.password.length >= 4)) {				
				return false				
			}
			return true
		},
		validForm() {
			if(this.email.length > 0 && this.password.length > 0 && this.validEmail && this.validPassword) {
				return true
			}
			return false
		}
	},
	methods: {		
		login() {
			this.authenticationFailed = false
			if(this.validForm) {
				let url = '//www.letsgreenify.com/api/auth/'+this.siteInfo.id
				let data = {
					email: this.email,
					password: this.password
				}
				this.apiPost(url, data).then( (jsonResponse) => {					
					if(jsonResponse.result && jsonResponse.result.isAuthenticated) {
						this.setUserDetails(jsonResponse.result)
						let message = {
							type: 'success',
							message: 'You are logged in now.'
						}
						this.$store.commit('alert', message)
						this.$router.push({ name: 'home' });
					} else {
						this.authenticationFailed = true
						let message = {
							type: 'error',
							message: 'Invalid login credentials'
						}
						this.$store.commit('alert', message)
					}
				})
			}			
		}
	}
})

export {LoginComponent}
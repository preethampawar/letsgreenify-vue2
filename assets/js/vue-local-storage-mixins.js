const localstoragemixin = Vue.mixin({
   created: function () {
      //var myOption = this.$options.myOption
      
   },
   methods: {      
      getShoppingCartId: function() {
         if(!browserDb.getItem('shoppingCartId')) {
            this.setShoppingCartId('')
         }
         return browserDb.getItem('shoppingCartId')
      },
      setShoppingCartId(shoppingCartId) {
         browserDb.setItem('shoppingCartId', shoppingCartId)
         return true
      },
      getShoppingCartAddress() {
         if(!browserDb.getItem('shoppingCartAddress')) {
            let shoppingCartAddress = {
               userName: '',
               userEmail: '',
               userMobile: '',
               userAddress: ''
            }
            this.setShoppingCartAddress(shoppingCartAddress)
         }
         let address = browserDb.getItem('shoppingCartAddress')            
         return JSON.parse(address)            
      },         
      setShoppingCartAddress(shoppingCartAddress) {
         let address = JSON.stringify(shoppingCartAddress)
         browserDb.setItem('shoppingCartAddress', address)
         return true
      },
      setUserDetails(userInfo) {
         let userDetails = JSON.stringify(userInfo)
         browserDb.setItem('userDetails', userDetails)
         return true 
      },
      getUserDetails() {
         if(!browserDb.getItem('userDetails')) {
            this.setUserDetails('')
         }
         let userDetails = browserDb.getItem('userDetails')
         return JSON.parse(userDetails)
      },

   }
})

export {localstoragemixin}
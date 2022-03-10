const mixin = Vue.mixin({
   created: function () {
      var myOption = this.$options.myOption
      if (myOption) {
         console.log(myOption)
      }
   },
   methods: {
      mxValidEmail(email) {
         var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         return re.test(email);
      },

   }
})

export {mixin}
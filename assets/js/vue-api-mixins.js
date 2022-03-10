const apimixin = Vue.mixin({
   created: function () {
      //this.$options.myOption      
   },
   methods: {
      apiGet: function(url) {
         var promise = fetch(url, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            }
         })
         promise.catch((error) => {
            console.error('Error:', error);
         });
         return promise.then((response) => response.json())
      },
      apiPut: function(url, data) {
         var promise = fetch(url, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
         })
         promise.catch((error) => {
            console.error('Error:', error);
         });
         return promise.then((response) => response.json())
      },
      apiPost: function(url, data) {
         var promise = fetch(url, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
         })
         promise.catch((error) => {
            console.error('Error:', error);
         });
         return promise.then((response) => response.json())
      },
   }
})

export {apimixin}
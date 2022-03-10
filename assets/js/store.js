const store = new Vuex.Store({
    state: {
        count: 0,
        cartUpdated: 0,
        alertMessage: '',
        showRequestPriceQuoteForm: false 
    },
    mutations: {
        increment (state) {
            state.count++
        },
        updateCart (state) {
            state.cartUpdated++
        },
        alert (state, message) {
            console.log(message)
            state.alertMessage = message
        },
        showRequestPriceQuoteForm (state, showRequestPriceQuoteForm) {
            state.showRequestPriceQuoteForm = showRequestPriceQuoteForm
        }
    }
})

export {store}
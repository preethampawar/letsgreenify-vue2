const addToCartTemplate = `
	<div>
        <div class="mb-3">
            <label for="Quantity">Quantity</label>
            <input 
                v-model.number="quantity"                     
                type="number" 
                :class="[(quantity > 0 ? '' : 'is-invalid')]"
                class="form-control"                      
                id="Quantity" 
                placeholder="Enter Quantity" 
                required >
            <div v-if="quantity > 0" class="text-muted small font-italic">
                Click "Add to Cart" button to place an order.
            </div>
            <div v-else class="invalid-feedback">
                Please enter a valid number
            </div>
        </div>

        <div v-if="!processing">
            <div v-if="quantity > 0">            
                <button class="btn btn-primary btn-md w-100" @click="addToCart()">Add to Cart</button>
                <button class="btn btn-secondary btn-md w-100 mt-3" @click="requestPriceQuote()">Request Price Quote</button>
            </div>
            <div v-else>
                <button class="btn btn-disabled btn-md w-100">Add to Cart</button>
                <button class="btn btn-disabled btn-md w-100 mt-3"">Request Price Quote</button>
            </div>
        </div>
        <div v-else>        
            <button class="btn btn-primary btn-md w-100" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Processing...
            </button>        
        </div>
        
	</div>
`
export {addToCartTemplate}
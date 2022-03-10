const cartNavTemplate = `
<div>
    <div v-if="shoppingCartId > 0 && !hideCartNav" class="shadow p-3 mb-3 bg-white rounded text-dark" id="cartNav">
        <div class="col">
            <div>
                <div data-toggle="collapse" href="#collapseTopNavCart" aria-expanded="false" aria-controls="collapseTopNavCart">
                    <div class="row">
                        <div class="col-xs-2 text-left p-0 pr-2">
                            <span class="text-left">
                                <i class="fa fa-shopping-cart p-1 mr-1"></i>
                                <strong class="d-none d-sm-inline">Shopping Cart</strong>
                            </span>                            
                        </div>
                        <div class="col text-center p-0">
                            <span>
                                <i class="fa fa-chevron-circle-down"></i>
                                Total <b>{{ cartTotal }}</b> item(s) in <a href="#">cart</a>.
                                
                            </span>
                        </div>
                        <div class="col-xs-2 text-right p-0">
                            <span>
                                <i class="fa fa-bars"></i>
                            </span>       
                        </div>
                    </div>
                </div>
                <div class="collapse" id="collapseTopNavCart">
                    <hr>          
                    <div class="row">
                        <div class="col">
                            <table class="table table-hover table-md small">
                                <thead class="thead-light">
                                    <tr>
                                        <th>Category</th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in shoppingCartProduct">
                                        <td>
                                            {{ item.category_name }}
                                        </td>
                                        <td>
                                            {{ item.product_name }}
                                        </td>
                                        <td class="text-center w-25">
                                            <input v-model.number="item.quantity" type="number" class="form-control form-control-sm pr-0">
                                        </td>
                                        <td class="text-center">
                                            <i class="fa fa-times" aria-label="Close" @click="removeProductFromCart(index)"></i>
                                        </td>
                                    </tr>
                                    <tr v-if="cartTotal > 0"class="table-secondary font-weight-bold">
                                        <td colspan='2' class="text-center">Total Item(s)</td>
                                        <td class="text-center">                                            
                                            {{ cartTotal }}
                                        </td>
                                        <td>&nbsp;</td>
                                    </tr>
                                    <tr v-else>
                                        <td colspan='4' class="text-center">All items will be removed from the cart</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="text-center">                                
                                <div v-if="updateProcessing">
                                    <button class="btn btn-primary btn-sm" type="button" disabled>
                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Processing...
                                    </button>
                                </div>
                                <div v-else-if="enableUpdate">
                                    <span v-if="enableUpdate" class="text-info font-italic small">Click 'Update Cart' button to save changes </span><br>
                                    <button class="btn btn-sm btn-primary" @click="updateCart">Update Cart</button><br><br>
                                    <a @click="loadData" href="#">Click here to cancel changes</a>

                                </div>
                                <div v-else>
                                    <button class="btn btn-sm btn-disabled">Update Cart</button>
                                </div>
                                
                                
                            </div>
                        </div>                        
                        <div class="col small">
                            <div>
                                <h5>Book Order (OR) Request Price Quote</h5>
                                <hr>
                                <form>                        
                                    <div class="form-group mb-2">
                                        <label for="userName" class="mb-0 col-form-label col-form-label-sm">Name*</label>                                        
                                            <input                                                
                                                v-model="userName"                     
                                                type="text"
                                                :class="{'is-invalid': errors.userName}"
                                                class="form-control form-control-sm"
                                                id="userName" 
                                                name="userName"
                                                placeholder="Enter your name" 
                                                >
                                        <div v-if="errors.userName > 0" class="invalid-feedback">
                                            Please enter your name
                                        </div>
                                    </div>
                                    <div class="form-group mb-2">
                                        <label for="userEmail" class="mb-0 col-form-label col-form-label-sm">Email Address*</label>
                                        <input 
                                            v-model="userEmail"
                                            type="email" 
                                            :class="{'is-invalid': errors.userEmail}"
                                            class="form-control form-control-sm"
                                            id="userEmail" 
                                            placeholder="Enter you email address" 
                                            >
                                        <div v-if="errors.userEmail" class="invalid-feedback">
                                            Please enter valid email address
                                        </div>
                                    </div>
                                    <div class="form-group mb-2">
                                        <label for="userMobile" class="mb-0 col-form-label col-form-label-sm">Mobile*</label>
                                        <input 
                                            v-model.number="userMobile"                     
                                            type="number" 
                                            :class="{'is-invalid': errors.userMobile}"
                                            class="form-control form-control-sm"
                                            id="userMobile" 
                                            placeholder="Enter your 10 digit mobile no." 
                                            >
                                        <div v-if="errors.userMobile" class="invalid-feedback">
                                            Please enter a valid 10 digit mobile no.
                                        </div>
                                    </div>
                                    <div class="form-group mb-2">
                                        <label for="userAddress" class="mb-0 col-form-label col-form-label-sm">Address*</label>
                                        <textarea 
                                            v-model="userAddress"                     
                                            type="textarea" 
                                            :class="{'is-invalid': errors.userAddress}"
                                            class="form-control form-control-sm"
                                            id="userAddress" 
                                            placeholder="Enter your address" 
                                            ></textarea>
                                        <div v-if="errors.userAddress" class="invalid-feedback">
                                            Please enter your address
                                        </div>
                                    </div>
                                    <div class="form-group mb-2">
                                        <label for="userMessage" class="mb-0 col-form-label col-form-label-sm">Message <i>(Optional)</i></label>
                                        <textarea 
                                            v-model="userMessage"                     
                                            type="textarea"
                                            class="form-control form-control-sm"
                                            id="userMessage" 
                                            placeholder="Enter your message" 
                                        ></textarea>
                                    </div>
                                    <div class="form-group mt-4 text-center">
                                        <div v-if="processing">
                                            <button class="btn btn-primary btn-sm" type="button" disabled>
                                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Processing...
                                            </button>
                                        </div>
                                        <div v-else-if="!enableUpdate">
                                            <input @click="bookNow('order')" type="button" class="btn btn-sm btn-primary mr-2" value="Book Order" data-toggle="modal" data-target="#cartModalCenter">
                                            <input @click="bookNow('quote')" type="button" class="btn btn-sm btn-secondary" value="Request Price Quote" data-toggle="modal" data-target="#cartModalCenter">
                                        </div>
                                        <div v-else>
                                            <input type="button" class="btn btn-sm btn-disabled mr-2" value="Book Order">
                                            <input type="button" class="btn btn-sm btn-disabled" value="Request Price Quote">
                                        </div>
                                    </div>
                                </form>    
                            </div>
                        </div>
                    </div>
                    <div class="text-center mt-2 bg-light rounded p-1" role="button" data-toggle="collapse" href="#collapseTopNavCart">
                        Hide <i class="fa fa-chevron-circle-up"></i>
                    </div>
                </div>
                    
            </div>        
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="cartModalCenter" tabindex="-1" role="dialog" aria-labelledby="cartModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="cartModalCenterTitle">{{ (orderType == 'order' ? 'Book Now' : 'Request Price Quote') }}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>You are about to place an order request for the below {{ cartTotal }} item(s).</p>
                <table class="table table-hover table-md small">
                    <thead class="thead-light">
                        <tr>
                            <th>Product</th>
                            <th class="text-center">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in shoppingCartProduct">                            
                            <td>
                                {{ item.product_name }}
                            </td>
                            <td class="text-center w-25">
                                {{ item.quantity }}
                            </td>
                        </tr>
                        <tr class="table-secondary font-weight-bold">
                            <td class="text-center">Total Item(s)</td>
                            <td class="text-center">                                            
                                {{ cartTotal }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <div v-if="!processing">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn-sm ml-3" @click="confirmOrder">Continue</button>
                </div>
                <div v-else>
                    <button class="btn btn-primary btn-sm" type="button" disabled>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Processing...
                    </button>
                </div>
            </div>
            </div>
        </div>
    </div>
</div>
`

export {cartNavTemplate}
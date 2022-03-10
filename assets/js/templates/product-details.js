const productsDetailsTemplate = `
    <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link to="/">Home</router-link>
                </li>
                <li class="breadcrumb-item">
                    <router-link to="/products">Products</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">{{ product.name }}</li>
            </ol>
        </nav>
        <page-title :title="product.name"></page-title>
        <div class="row">
            
            <div class="d-none d-sm-block col-sm-2 col-md-1 col-lg-1 col-xl-1 m-1" style="max-height:400px; overflow: overlay">
                <div v-for="(image, index) in product.Image">
                    <div class="d-flex justify-content-center mb-1">
                        <img 
                            :id="getClass('image-tile-', index)" 
                            :src="image.thumb_url" 
                            :alt="image.caption" 
                            :class="{'border border-warning': index < 1 }" 
                            class="image-tile d-block"                             
                            @click = "setActiveImage(index)" >
                    </div>
                </div>
            </div>
            

            <div class="col-sm-9 col-md-6 col-lg-5 col-xl-4">

                <div class="shadow rounded p-1 mb-3">
                    <div v-if="product.Image" id="carouselExampleSlidesOnly" class="carousel slide">
                        <ol class="carousel-indicators">
                            <li v-for="(image, index) in product.Image" data-target="#carouselExampleSlidesOnly" :data-slide-to="index" :class="{'active': index < 1 }" @click = "setActiveImage(index)"></li>            
                        </ol>
                        <div class="carousel-inner bg-dark">
                            <div v-for="(image, index) in product.Image" class="carousel-item" :class="{'active': index < 1 }">
                                <div class="d-flex justify-content-center">
                                    <img :src="image.medium_url" :alt="image.caption" class="d-block" @click="openModal('exampleModal', index)">
                                </div>
                            </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleSlidesOnly" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleSlidesOnly" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>                    
                </div>

            </div>

            <div class="col-md-4">                
                <add-to-cart :product="product"></add-to-cart>                
            </div>
        
        </div>
        <div v-if=" product.description != '' " class="product-description mt-4">
            <h4>Product description</h4>
            <hr>
            <div v-html="product.description" class="text-justify"></div>
        </div>
        
        <!-- Image Modal -->
        <div>
            <div v-for="(image, index) in product.Image" :id="getClass('modal', index)">                

                <!-- Modal -->
                <div class="modal fade" :id="getClass('exampleModal', index)" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="p-2">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="d-flex justify-content-center">
                                    <img :src="image.ori_url" alt="" class="d-block" @click="openModal('exampleModal', index)">
                                </div>
                                <div v-if=" image.caption != '' "class="text-center">{{image.caption}}</div>
                            </div>
                            <div class="modal-footer text-center">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>                                
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
`

export {productsDetailsTemplate}
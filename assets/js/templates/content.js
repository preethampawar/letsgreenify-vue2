const contentTemplate = `
<div>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">Home</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">{{ contentInfo.title }}</li>
        </ol>
    </nav>
    <page-title :title="contentInfo.title"></page-title>    
    <!--
    <div v-if="contentImages.length > 0" class="card-group mb-4">
        <div v-for="(image, index) in contentImages" class="card">
            <img :src="siteInfo.image_path+image.url" :alt="image.caption" class="card-img-top">            
            <div v-if="image.caption != ''" class="card-body">                
                <p v-html="image.caption" class="card-text"></p>                
            </div>
        </div>               
    </div>
    -->
    
    
    


    <div class="row" v-if="contentImages.length > 0">
        
        <div class="d-none d-md-block col-md-3 col-lg-2 col-xl-2 m-1" style="max-height:600px; overflow: overlay">
            <div v-for="(image, index) in contentImages">
                <div class="d-flex justify-content-center mb-1">
                    <img 
                        :id="getClass('image-tile-', index)" 
                        :src="image.small_url" 
                        :alt="image.caption" 
                        :class="{'border border-warning': index < 1 }" 
                        class="image-tile d-block"
                        style="height:150px;"                             
                        @click = "setActiveImage(index)" >
                </div>
            </div>
        </div>
        

        <div class="col-md-8 col-lg-9 col-xl-9">

            <div class="shadow rounded p-1 mb-3">
                <div v-if="contentImages" id="carouselExampleSlidesOnly" class="carousel slide">
                    <ol class="carousel-indicators">
                        <li v-for="(image, index) in contentImages" data-target="#carouselExampleSlidesOnly" :data-slide-to="index" :class="{'active': index < 1 }" @click = "setActiveImage(index)"></li>            
                    </ol>
                    <div class="carousel-inner bg-dark">
                        <div v-for="(image, index) in contentImages" class="carousel-item" :class="{'active': index < 1 }">
                            <div class="d-flex justify-content-center">
                                <img :src="image.large_url" :alt="image.caption" class="d-block" @click="openModal('contentImageModal', index)">
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
    
    </div>
    <!-- Image Modal -->
    <div>
        <div v-for="(image, index) in contentImages" :id="getClass('modal', index)">                

            <!-- Modal -->
            <div class="modal fade" :id="getClass('contentImageModal', index)" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl" role="document">
                    <div class="modal-content">
                        <div class="p-2">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="d-flex justify-content-center">
                                <img :src="image.ori_url" alt="" class="d-block w-100" @click="openModal('contentImageModal', index)">
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






    <div v-html="contentInfo.description" class="mt-4"></div>    
</div>
`

export {contentTemplate}
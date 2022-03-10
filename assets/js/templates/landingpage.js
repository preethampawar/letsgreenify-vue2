const landingPageTemplate = `
<div>
    <div v-if="contentImages.length > 0" id="carouselExampleSlidesOnly" class="carousel slide mb-3">
        <ol class="carousel-indicators">
            <li v-for="(image, index) in contentImages" data-target="#carouselExampleSlidesOnly" :data-slide-to="index" :class="{'active': index < 1 }"></li>            
        </ol>
        <div class="carousel-inner">
            <div v-for="(image, index) in contentImages" class="carousel-item" :class="{'active': index < 1 }">
                <img :src="siteInfo.image_path+image.url" :alt="image.caption" class="d-block w-100" v-on:load="showCarousel = true">
                <template v-show="showCarousel" >
                    <div v-if="image.caption != ''" class="carousel-caption d-none d-md-block">
                        <p v-html="image.caption" class="text-dark bg-light rounded opacity-3"></p>
                    </div>
                </template>
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
    <div v-html="contentInfo.description"></div>    
</div>
`

export {landingPageTemplate}
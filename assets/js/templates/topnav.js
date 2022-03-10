const topNavTemplate = `
    <nav class="navbar navbar-expand-md navbar-dark bg-dark shadow " >
        <a class="navbar-brand" href="#">{{siteinfo.siteInfo.title}}</a><br>
        
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExampleDefault">

            <ul class="navbar-nav mr-auto">
                <li class="nav-item" id="homeTopNavLink">
                    <router-link to="/" class="nav-link" >Home</router-link>
                </li>
                <li v-if="siteinfo && siteinfo.siteInfo && siteinfo.siteInfo.show_products > 0" id="productsTopNavLink" class="nav-item">            
                    <router-link to="/products" class="nav-link" >Products</router-link>				
                </li>            
                    
                <li v-if="false && siteinfo && siteinfo.siteInfo && siteinfo.siteInfo.image_gallery > 0" class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Photo Gallery</a>
                    <div class="dropdown-menu" aria-labelledby="dropdown01">
                        <template v-if="siteinfo && siteinfo.siteInfo && siteinfo.siteInfo.show_products">
                            <router-link to="/ImageGallery/productsGallery" class="dropdown-item" >Products Gallery</router-link>
                        </template>
                        <template v-if="siteinfo && siteinfo.siteInfo.show_landing_page">
                            <router-link to="/ImageGallery/highlights" class="dropdown-item" >Highlights</router-link>
                        </template>
                    </div>
                </li>
                <li v-if="false && siteinfo && siteinfo.siteInfo && siteinfo.siteInfo.show_blog > 0" class="nav-item">
                    <router-link to="/blog" class="nav-link" >Blog</router-link>				
                </li>
                <li v-if="false && siteinfo && siteinfo.siteInfo && siteinfo.siteInfo.embed_map != ''" class="nav-item">
                    <router-link to="/routemap" class="nav-link" >Route map</router-link>				
                </li>
                <template v-if="navLinks.length > 0">
                    <li v-for="link in navLinks" class="nav-item" :id="'contentTopNavLink'+link.contentTitleSlug">
                        <router-link :to="link.url" class="nav-link" >{{link.contentTitle}}</router-link>
                    </li>
                </template>
                <li v-if="showLoginLink" class="nav-item" id="'loginTopNavLink'">
                    <router-link to="/login" class="nav-link" >Login</router-link>
                </li>
                <li v-else class="nav-item" id="'logoutTopNavLink'">
                    <router-link to="/logout" class="nav-link" >Logout</router-link>
                </li>
                

                <!-- 
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#">Disabled</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="https://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                    <div class="dropdown-menu" aria-labelledby="dropdown01">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </li>
                -->
            </ul>
            <span v-if="!showLoginLink" class="navbar-text">
            <i class="fa fa-user"></i> {{userInfo.firstname+' '+userInfo.lastname}}
            </span>
            
            <!--         
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            -->
        </div>
    </nav>
`

export {topNavTemplate}
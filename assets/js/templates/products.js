const productsTemplate = `
    <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link to="/">Home</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Products</li>
            </ol>
        </nav>
        <page-title :title="'Products'"></page-title>

        <div v-for="(row, categoryId) in products" class="mb-3">
            <h2>{{ categories[categoryId] }}</h2>
            <div class="row">
                <div v-for="product in row" class="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-3 p-1">
                    <product-box :product="product"></product-box>
                </div>
            </div>
        </div>
    </div>
`

export {productsTemplate}
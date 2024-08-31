

<template>
    <main>
        <h1>Product page</h1>
        <div>
            <product
                v-if="product"
                :product="product"
            />
        </div>
        <div class="description1">
            <p class="description2" v-if="product">{{ product.description }}</p>
            <p class="description2">quality - best</p>
            <p class="description2">produced - by best jewellers</p>
        </div>
    </main>
</template>


<script module>
import product from '@/components/product.vue';
import axiosInstance from '@/services/axios';

export default {
    name: 'productPage',
    data() {
        return {
            products: [],
        }
    },
    methods: {
        getProducts(){
            axiosInstance.get('products/category/jewelery')
                .then(response => {
                    this.products = response.data;
                })
                .catch(error => {
                    console.log(error)
                })        
        },
    },
    created() {
        if (!this.products.length){
            this.getProducts();
        }
    },
    computed: {
        product(){
            let id = +this.$route.params.id;
            return this.products.find(product => product.id === id);
        }
    },
    components: {
        product,
    }
}
</script>


<style scoped>
.description1 {
    background-color: rgb(177, 200, 203);
    box-shadow: 3px -3px 5px rgb(95, 95, 95);
    border-radius: 15px;
    margin: 15px;
    padding: 15px;
}
.description2 {
    background-color: white;
    box-shadow: 3px -3px 5px rgb(95, 95, 95);
    border-radius: 15px;
    margin: 15px;
    padding: 15px;
    color: black;
    font-size: 20px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
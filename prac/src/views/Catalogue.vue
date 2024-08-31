

<template>
    <main>
        <h1>Catalogue:</h1>
        <product v-for="product in products"
            @click="goToProduct(product.id)"
            :product="product"
        />
    </main>
</template>

<script module>
import product from '@/components/product.vue';
import axiosInstance from '@/services/axios';

export default {
    name: 'catalogue',
    data(){
    return{
        products: [
            {name: '1', index: 1},
            {name: '2', index: 2},
            {name: '2', index: 3},
        ],
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
        goToProduct(id){
            this.$router.push({
                name: 'product-page',
                params: {
                    id: id
                }
            })
        },
    },
    components: {
        product,
    },
    created() {
        this.getProducts()
    }
}
</script>



<style scoped>
.bubble{
    background-color: white;
    border-radius: 15px;
    margin: 15px;
    padding: 15px;
    border: solid 1px rgb(69, 69, 69)
}
</style>
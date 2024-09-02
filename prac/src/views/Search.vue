<template>
    <input class="searchbar" type="text" v-model="searchTerm" />
    <v-btn @click="findProduct">Search</v-btn>
    <div v-for="(product, index) in productToShow" :key="index">
        <product 
            @click="goToProduct(product.id)"
            :product="product"
        />
    </div>
</template>
  
<script type="module">
import axiosInstance from '@/services/axios';
import product from '@/components/product.vue';
export default {
    name: 'Admin',
    data(){
        return{
            products: [],
            productToShow: [],
            searchTerm: '',
        }
    },
    // props:{
    //     searchTerm: {
    //         type: String,
    //         required: false,
    //         default: `John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet`,
    //     }
    // },
    methods: {
        getProducts(){
            axiosInstance.get(`products/category/jewelery`)
                .then(response => {
                    this.products = response.data;
                    this.productToShow = response.data;
                })
                .catch(error => {
                    console.log(error)
                })        
        },
        findProduct(){
            this.productToShow = []
            for (let product of this.products){
                console.log(product.title)
                console.log(this.searchTerm)
                if (product.title.toLowerCase().trim().includes(this.searchTerm.toLowerCase().trim())){
                    this.productToShow.push(product);
                }
            }
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
    mounted(){
        this.getProducts();
    },
    components: {
        product,
    },
};
</script>
<style scoped>
.searchbar{
    margin-top: 15px;
    min-width: 350px;
    border-radius: 15px;
    background-color: rgb(102, 102, 102);
    padding: 5px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: large;
}
</style>

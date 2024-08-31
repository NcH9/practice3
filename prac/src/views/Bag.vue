<template>
    <main>
        <h1>Bag</h1>
        <product v-for="product in products"
            @click="goToProduct(product.id)"
            :product="product"
            @delete-product="toggleInBag(product.id)"
        />
    </main>
</template>
<script type="module">
import product from '@/components/product.vue';
    export default {
        name: 'bag',
        data(){
            return {
                products: [],
                productInBag: '',
            }
        },
        methods: {
            getProducts(){
                this.products = JSON.parse(localStorage.getItem('bag'));
                this.products.forEach(product => {
                    product.inBag = true;
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
            toggleInBag(id){
                this.products = this.products.filter(product => product.id != id)
            }
        },
        mounted(){
            this.getProducts()
        },
        components: {
            product,
        }
    }
</script>
<style>
.bubble{
    background-color: white;
    border-radius: 15px;
    margin: 15px;
    padding: 15px;
    border: solid 1px rgb(69, 69, 69)
}
</style>
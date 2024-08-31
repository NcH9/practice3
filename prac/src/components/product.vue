<template>
    <div class="bubble">
        <div class="grid2" >
            <div class="margin"><img class="img" :src="product.image"/></div>
            <div class="title">{{product.title}}</div>
        </div>
        <div>price $: {{product.price}}</div>
        <div v-if="isProductInBag"><v-btn @click.stop="deleteFromBag(product.id)">Delete</v-btn></div>
        <div v-if="!isProductInBag"><v-btn @click.stop="addToBag">Add To Bag</v-btn></div>
    </div>
</template>

<script type="module">
export default {
    name: 'product',
    data() {
        return {
            isProductInBag: '',
        }
    },
    props: {
        product: {
            type: Object,
            required: true,
        },
    },
    methods: {
        goToProduct(id){
            this.$router.push({
                name: 'product-page',
                params: {
                    id: id
                }
            })
        },
        toggleInBag() {
            this.$emit('delete-product', this.product.id);
        },
        getIfProductInBag(){
            const savedProducts = localStorage.getItem('bag');
            if (savedProducts) {
                const products = JSON.parse(savedProducts);
                for (let product of products ){
                    if (product.id == this.product.id){
                        return true;
                    }
                }
            }
            return false;
        },
        addToBag(){
            let bag = [];

            if (localStorage.getItem('bag')) {
                bag = JSON.parse(localStorage.getItem('bag'));
            }
            bag.push(this.product);
            localStorage.setItem('bag', JSON.stringify(bag));
            this.isProductInBag = !this.isProductInBag;
        },
        deleteFromBag(id){
            let bag = [];

            if (localStorage.getItem('bag')) {
                bag = JSON.parse(localStorage.getItem('bag'));
            }
            bag = bag.filter(product => product.id != id)

            localStorage.setItem('bag', JSON.stringify(bag));
            this.isProductInBag = !this.isProductInBag;
            this.toggleInBag()
        }
    },
    watch: {
        product: {
            immediate: true,
                handler(newVal) {
                    if (newVal) {
                        this.isProductInBag = this.getIfProductInBag();
                    }
            }
        }
    },
    mounted(){
        this.isProductInBag = this.getIfProductInBag();
    },
}
</script>

<style scoped>
button {
    border-radius: 15px;
    background-color: rgb(78, 180, 78);
    margin-top: 10px;
    min-width: 100px;
    color: white;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.bubble{
    background-color: white;
    border-radius: 15px;
    margin: 15px;
    padding: 15px;
    color: black;
    box-shadow: 3px -3px 5px rgb(140, 140, 140);
}
.img {
    max-width: 100px;
    max-height: 100px;

}
.flex-around {
    display: flex;
    justify-content: space-around;
}
.grid2 {
    display: grid;
    grid-template-columns: 120px 2fr;
}
.margin {
    margin: 10px;
    padding: 10px;
}
.title {
    margin: 10px;
    padding: 10px;
    font-size: 20px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
</style>
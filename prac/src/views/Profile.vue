
<template>
    <main>
        <h1>Profile page</h1>
        <div>
            <p class="info">Your email: {{ currentUser.email }}</p>
        </div>
        <div>
            <p>Make me admin:</p>
            <button v-if="!isUserAdmin" @click="makeAdmin">Make me admin</button>
            <button v-else @click="makeAdmin">Make me user</button>
        </div>
        <button type="submit" v-if="isLoggedIn" @click="logout">Log out</button>
    </main>
</template>

<script module>
import { auth } from '@/main'
import { signOut, onAuthStateChanged } from 'firebase/auth';

export default {
    
    name: 'Profile',
    data(){
        return{
            currentUser: '',
            isLoggedIn: false,
            isUserAdmin: '',
        }
    },
    methods: {
        async logout(){
            if (this.isLoggedIn){
                try {
                    await signOut(auth);
                    this.isLoggedIn = !this.isLoggedIn;
                    console.log('logout successful!');
                } catch (error){
                    console.log(error);
                }
                this.$router.push({name: 'home'});
            }
        },
        checkAuthState() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.isLoggedIn = true;
                    this.getCurrentUser();
                } else {
                    this.isLoggedIn = false;
                }
            })
        },
        getCurrentUser() {
            this.currentUser = auth.currentUser;
            console.log(this.currentUser.email)
        },
        makeAdmin(){
            this.$isAdmin = !this.$isAdmin;
            this.isUserAdmin = this.$isAdmin;
            this.setCookie('isAdmin', this.isUserAdmin);
            console.log(this.$isAdmin)
        },
        setCookie(name, value, days = 365) {
            let expires = "";
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/";
        }
    },
    mounted(){
        // test@test.test
        // 123qwe
        this.checkAuthState();
        this.isUserAdmin = this.$isAdmin; 

    },
}
</script>

<style scoped>
button{
    background-color: rgb(196, 196, 196);
    margin: 15px;
    padding: 10px;
    border-radius: 15px;
    color: rgb(21, 21, 21);
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 20px;
    font-weight: 600;
}
.info{
    font-size: 25px;
    margin: 15px;
}
</style>

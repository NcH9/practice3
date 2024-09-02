
<template>
    <main>
        <RouterLink v-if="isLoggedIn" :to="{name: 'profile'}">Profile</RouterLink>
        <div v-if="!isLoggedIn">
            <RouterLink :to="{name: 'register'}">Register</RouterLink>/
            <RouterLink :to="{name: 'login'}">Login</RouterLink>
        </div>
    </main>
</template>

<script type="module">
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/main'

export default {
    name: 'signModule',
    data(){
        return {
            isLoggedIn: false,
        }
    },
    methods: {
        checkAuthState() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.isLoggedIn = true;
                } else {
                    this.isLoggedIn = false;
                }
            })
        },
    },
    mounted(){
        // test@test.test
        // 123qwe
        this.checkAuthState()
    },
}

</script>



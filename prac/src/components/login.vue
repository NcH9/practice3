<template>
    <form @submit.prevent="validateForm">
        <div class="grid">

            <div class="grid2">
                <label>Email</label>
                <input type="email" v-model.lazy="form.email" @blur="validateEmail"/>
                <span>{{ form.email }}</span>
                <span class="error">{{ error.email }}</span>
            </div>

            <div class="grid2">
                <label>Password</label>
                <input type="password" v-model.lazy="form.password" @blur="validatePassword"/>
                <span>{{ form.password }}</span>
                <span class="error">{{ error.password }}</span>
            </div>
            <button type="submit" v-if="!isLoggedIn" @click="login">Log in</button>
            <button type="submit" v-if="isLoggedIn" @click="login">Log out</button>
        </div>
    </form>
</template>
  
<script>
    import { auth } from '@/main'
    import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
    export default {
        name: 'login',
        
        data(){
            return {
                form: {
                    password: '',
                    email: '',
                },
                error: {
                    password: '',
                    email: '',
                },
                isLoggedIn: false,
            }
        },
        methods: {
            async login(){
                if (this.isLoggedIn){
                    try {
                        await signOut(auth);
                        this.isLoggedIn = !this.isLoggedIn;
                        console.log('logout successful!')
                    } catch (error){
                        console.log(error)
                    }
                    
                } else {
                    signInWithEmailAndPassword(auth, this.form.email, this.form.password)
                        .then(userCredential => {
                            const user = userCredential.user;
                            console.log(auth.currentUser);
                            console.log('login successful!');
                        })
                        .catch(error => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            console.log(errorCode, errorMessage);
                        })
                }
                this.$router.push({name: 'home'});
            },
            submitForm(){
                console.log('formsubmitted');
                this.resetForm();
            },
            resetForm(){
                this.form = {
                    password: '',
                    email: '',
                };
                this.error = {
                    password: '',
                    email: '',
                };
            },
            validatePassword() {
                if (this.form.password.length < 5) {
                    this.error.password = 'Password must be at least 5 characters long.';
                } else {
                    this.error.password = '';
                }
            },
            validateEmail() {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(this.form.email)) {
                    this.error.email = 'Please enter a valid email address.';
                } else {
                    this.error.email = '';
                }
            },
            validateForm() {
                this.validateEmail();
                this.validatePassword();
                if (!this.error.email && !this.error.password){
                    this.submitForm();
                }
            }
        },
        mounted() {
            if (auth.currentUser){
                this.isLoggedIn = true;
                console.log(auth.currentUser)
            }
        }
    };
</script>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input {
    padding: 5px;
    margin: 5px;
    background-color: rgb(138, 137, 137);
    border-radius: 15px;
}
input:focus {
    background-color: white;
}
button {
    background-color: white;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: rgb(31, 31, 31);
    border-radius: 10px;
}
.error {
    color: rgb(255, 110, 110)
}
.grid {
    display: grid;
}
.grid2 {
    display: grid;
    grid-template-columns: 70px repeat(2, 1fr) 3fr;
    margin: 10px;
    margin-left: -10px
}
label {
    display: flex;
    place-items: center;
}
span{
    display: flex;
    place-items: center; 
}
</style>
  
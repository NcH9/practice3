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

            <div class="grid2">
                <label>Admin</label>
                <input type="checkbox" v-model.lazy="form.worship" @input="validateOtter"/>
                <span>{{ form.worship }}</span>
                <span class="error">{{ error.worship }}</span>
            </div>

            <button type="submit" @click="login">Register</button>
        </div>
    </form>
</template>
  
<script>
    import{ auth } from '@/main'
    import { createUserWithEmailAndPassword } from 'firebase/auth';
    export default {
        name: 'register',
        data(){
            return {
                form: {
                    password: '',
                    email: '',
                    worship: false,
                },
                error: {
                    password: '',
                    email: '',
                },
            }
        },
        methods: {
            login(){
                createUserWithEmailAndPassword(auth, this.form.email, this.form.password)
                    .then(userCredential => {
                        const user = userCredential.user;
                        console.log(auth.currentUser)
                    })
                    .catch(error => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode, errorMessage);
                    })
            },
            submitForm(){
                console.log('formsubmitted');
                this.resetForm();
            },
            resetForm(){
                this.form = {
                    password: '',
                    email: '',
                    worship: false,
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
  
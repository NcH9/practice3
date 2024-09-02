import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2zorpRvmrb4bBGHpt_80CUfiTtOCcOWo",
  authDomain: "practice3-uni.firebaseapp.com",
  projectId: "practice3-uni",
  storageBucket: "practice3-uni.appspot.com",
  messagingSenderId: "758619408305",
  appId: "1:758619408305:web:a7f48925d489f66c411f90",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp)

export { auth }

const vuetify = createVuetify({
    components,
    directives
})
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
const app = createApp(App)
if(getCookie('isAdmin')){
  app.config.globalProperties.$isAdmin = getCookie('isAdmin');
} else {
  app.config.globalProperties.$isAdmin = false;
}
app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')

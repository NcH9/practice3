<script setup>
import '@/assets/slider.css'
</script>

<template>
  <main class="main">
    <div class="grid">
      <div>
        <div class="flex-center">
          <input class="searchbar" type="text" />
        </div>
          <nav>
            <v-tabs class="flex-between">
              <v-tab>ENG
                <label class="switch">
                  <input type="checkbox">
                  <span class="slider round"></span>
                </label>
                UA
              </v-tab>
              <RouterLink :to="{name: 'home'}"><v-tab>Home</v-tab></RouterLink>
              <RouterLink to="/catalogue"><v-tab>Catalogue</v-tab></RouterLink>
              <RouterLink to="/bag"><v-tab>Bag</v-tab></RouterLink>
              <RouterLink :to="{name: 'custom-form'}"><v-tab>Profile</v-tab></RouterLink>
            </v-tabs>
          </nav>
        <RouterView />
      </div>
      <footer>
        <RouterLink to="/about">About us</RouterLink>
      </footer>
    </div>
  </main>
  
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
.grid {
  display: grid;
}
.main {
  display: flex;
  justify-content: center;
  width: 100%;
}
footer {
  display: flex;
  justify-content: center;
  /* position: absolute;
  bottom: 0; */
  margin: 20px;
}
.flex-center{
  display: flex;
  justify-content: center;
}
.searchbar{
  margin-top: 15px;
  min-width: 350px;
  border-radius: 15px;
  background-color: rgb(102, 102, 102);
  padding: 5px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: large;
}
.searchbar:focus{
  background-color: rgb(184, 184, 184);
}
.flex-between{
  display: flex;
  justify-content: space-between;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  margin: 10px;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

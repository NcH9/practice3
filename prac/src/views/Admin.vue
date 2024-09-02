<template>
    <div>
      <h3>Active users: {{ activeUsersCount }}</h3>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { getDatabase, ref as dbRef, onValue } from "firebase/database";
  
  export default {
    name: 'Admin',
    setup() {
      const activeUsersCount = ref(1);
  
      onMounted(() => {
        const db = getDatabase();
        const activeUsersRef = dbRef(db, '/activeUsers');
  
        onValue(activeUsersRef, (snapshot) => {
          activeUsersCount.value = snapshot.size;
        });
      });
  
      return { activeUsersCount };
    },
  };
  </script>

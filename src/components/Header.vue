<template>
  <header>
    <div v-if="isLoggedIn">
      {{ userEmail }}
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      userEmail: ''
    }
  },
  computed: {
    ...mapState(['isAuthenticated'])
  },
  mounted() {
    const sessionData = localStorage.getItem("email");
    console.log("sessionData " + sessionData);
    if (sessionData) {
      const data = JSON.parse(sessionData);
      this.userEmail = data.email || "";
    }
  }
};
</script>

<style>
header {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.user-email {
  font-size: 14px;
  color: #333;
}
</style>
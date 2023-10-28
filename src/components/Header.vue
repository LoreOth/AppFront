<template>
  <header>
    <div v-if="isLoggedIn" class="user-email">
     {{ userRole }}
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';
import userSessionManager from "../UserSessionManager";
export default {
  data() {
    return {
      userEmail: '',
      userRole: ''
    }
  },
  computed: {
    ...mapState(['isAuthenticated'])
  },
  mounted() {
    const session = userSessionManager.getSessionData();
    console.log("session " +session)
    console.log("session.roles " +session.roles)
  if (session && session.roles) {
    this.userRole = session.roles;
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
  color: #fcf9f9;
}
</style>

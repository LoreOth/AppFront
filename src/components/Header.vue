<template>
  <header>
    <div class="user-email"> Bienvenido {{ this.userEmail}}</div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      userEmail: "",
    };
  },
  mounted() {
  const sessionData = localStorage.getItem("email");
  console.log("sessionData " + sessionData);
  if (sessionData) {
    const data = JSON.parse(sessionData); 
    this.userEmail = data.email || ""; 
  }
},
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
  
  
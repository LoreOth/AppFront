<template>
	<div class="app">
	  <!-- Sidebar -->
	  <Sidebar />
	  <div class="content-wrapper">
      <AppHeader />  <!-- Componente Header -->
	  <!-- Content -->
	 		 <router-view />
			  <AppFooter />  <!-- Componente Footer -->
			</div>
		</div>
  </template>

<script setup>
import AppHeader from "./components/Header.vue";
import AppFooter from "./components/Footer.vue";
import Sidebar from './components/Sidebar.vue'

components: {
          AppHeader,  // Registra el componente Header
          AppFooter   // Registra el componente Footer
  }
</script>

<style lang="scss">
:root {
	--primary: #4ade80;
	--primary-alt: #22c55e;
	--grey: #64748b;
	--dark: #1e293b;
	--dark-alt: #334155;
	--light: #f1f5f9;
	--sidebar-width: 300px;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Fira sans', sans-serif;
}

body {
	background: var(--light);
	min-height: 100vh;
	display: flex;
    flex-direction: column;
}

button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}

.app {
  display: flex;
  flex: 1;  // Ocupa todo el espacio disponible en la dirección vertical
  height: 100vh; // Ocupa toda la altura de la ventana
  
  .content-wrapper {
    flex: 1;
    
   
display: flex;
    flex-direction: column;
  }

  AppHeader, AppFooter {
    flex-shrink: 0; // Asegurarse de que no se reduzcan en tamaño
  }

  router-view {
    
 
flex: 1; // Ocupa el espacio restante entre el header y el footer
    
   
padding: 2rem; // o el valor que prefieras
  }
}


</style>
<template>
    <footer>
      <p>© 2023 My App</p>
      <!-- Agrega más contenido al footer aquí si lo deseas -->
    </footer>
  </template>
  
  <script>
  export default {
    name: "AppFooter", // Es una buena práctica nombrar el componente
  };
  </script>
  
  <style>
footer {
    height: 80px; /* Ajusta este valor según tus necesidades para la altura del header */
    display: flex;
    align-items: center; /* Centra verticalmente el contenido */
    justify-content: center; /* Centra horizontalmente el contenido */
}
  </style>
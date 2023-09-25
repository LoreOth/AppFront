<template>
    <div id="register">
      <h1>Register</h1>
      <div class="form-inputs">
        <label for="firstname">Nombre</label>
        <input type="text" id="firstName" name="firstname" v-model="input.firstname" placeholder="Nombre" />
      </div>
      <div class="form-inputs">
        <label for="lastname">Apellido</label>
        <input type="text" id="lastName" name="lastname" v-model="input.lastname" placeholder="Apellido" />
      </div>
      <div class="form-inputs">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" v-model="input.email" placeholder="Email" />
      </div>
      <div class="form-inputs">
        <label for="password">Contraseña</label>
        <input type="password" id="password" name="password" v-model="input.password" placeholder="Contraseña" />
      </div>
      <button type="button" v-on:click="register">Register</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RegisterPage',
    data() {
      return {
        input: {
          firstName: "",
          lastName: "",
          email: "",
          password: ""
        }
      }
    },
    methods: {
      register() {
        // Construir el objeto de datos a enviar en formato JSON
        const data = {
          firstName: this.input.firstname,
          lastName: this.input.lastname,
          email: this.input.email,
          password: this.input.password
        };
        // Realizar la solicitud HTTP POST
        fetch('http://localhost:8080/register/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
    .then(result => {
        console.log(result);

        // Cambia la forma de verificar la respuesta exitosa
        if (result.message === "Registration successful") {
            this.$router.push('/login');
        } else {
            // Puedes mostrar un mensaje de error basado en result.message
            console.error(result.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
}
  }
  </script>
  
  <style>


  #register {
    display: flex;
    flex-direction: column;
    
  justify-content: center;
    
   
  align-items: center;
    height: 100vh;
    width: 600px; 
    
  
  
  width: 600px; 
    margin: 0 auto;
  
  background-color: #2c3e50; /* Un color oscuro de fondo */
      
     
  border-radius: 8px; /* Bordes redondeados */
  
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23); /* Sombra para darle profundidad */
      
     
  padding: 2rem; /* Padding alrededor del contenido */
  }
  
  #register h1 {
      color: #ecf0f1; /* Color claro para el título */
      margin-bottom: 1rem; /* Espaciado debajo del título */
      
     
  font-weight: bold; /* Texto en negrita */
  }
  
  #register .form-inputs {
    width: 100%;
    max-width: 300px;
    padding-bottom: 10px;
  }
  
  #register .form-inputs label {
    padding-right: 10px;
    display: block; /* Hacer que el label sea un bloque para que ocupe toda la línea */
      
     
  color: #bdc3c7; /* Color más claro para el label */
      
     
  margin-bottom: 0.5rem; /* Espaciado entre el label y el input */
  }
  
  #register .form-inputs input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }
  button {
      padding: 10px 15px;
      
     
  background-color: #8e44ad; /* Color de fondo del botón */
      
     
  color: #ecf0f1; /* Color del texto del botón */
      
     
  border: none;
      
     
  border-radius: 4px; /* Bordes redondeados para el botón */
      
     
  cursor: pointer;
      transition: background-color 0.3s; /* Transición suave para el hover del botón */
  }
  
  button:hover {
      
     
      background-color: #9b59b6; /* Color de fondo más claro en hover */
      }
  
  </style>

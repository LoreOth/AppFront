<template>
    <div id="profile">
      <h1>Mi Perfil</h1>
      <div class="form-inputs">
        <label for="firstname">Nombre</label>
        <input type="text" id="firstname" name="firstname" v-model="user.firstName" />
      </div>
      <div class="form-inputs">
        <label for="lastname">Apellido</label>
        <input type="text" id="lastname" name="lastname" v-model="user.lastName" />
      </div>
      <div class="form-inputs">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" v-model="user.email" />
      </div>
      <div class="form-inputs">
        <label for="phone">Teléfono</label>
        <input type="tel" id="phone" name="phone" v-model="user.phone" />
      </div>
      <div class="form-inputs">
        <label for="address">Dirección</label>
        <input type="text" id="address" name="address" v-model="user.address" />
      </div>
      <div class="form-inputs">
        <label for="province">Provincia</label>
        <select id="province" v-model="user.province">
          <option v-for="province in provinces" :key="province" :value="province">{{ province }}</option>
        </select>
      </div>
      <button type="button" v-on:click="updateProfile">Guardar Cambios</button>
    </div>
</template>

<script>
import userSessionManager from '../UserSessionManager';

export default {
  name: 'ProfilePage',
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        province: ""
      },
      provinces: [
        "Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba",
        "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa",
        "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro",
        "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe",
        "Santiago del Estero", "Tierra del Fuego", "Tucumán"
      ]
    };
  },

  // Lifecycle hooks
  mounted() {
    this.fetchUserData();
  },

  // Methods
  methods: {
    fetchUserData() {
      const userEmail = userSessionManager.getSessionItem('email');
      console.log("mail" + userEmail)
      fetch(`http://localhost:8080/register/getCurrentUser?email=${userEmail}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
      
        }
      })
        .then(response => response.json())
        .then(data => {
          this.user.firstName = data.firstName;
          this.user.lastName = data.lastName;
          this.user.email = data.email;
          this.user.phone = data.phone;
          this.user.address = data.address;
          this.user.province = data.province;
          console.log("Datos del usuario:", data);
        })
        .catch(error => {
          console.error('Error al cargar los datos del usuario:', error);
        });
    },

    updateProfile() {
      const data = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: userSessionManager.getSessionItem('email'), // Asumiendo que el email no cambia
        phone: this.user.phone,
        address: this.user.address,
        province: this.user.province
      };

      console.log("data del post " + JSON.stringify(data));
      fetch('http://localhost:8080/register/updateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            console.log("Perfil actualizado con éxito!");
            this.fetchUserData(); // Fetch user data again after successful update
          } else {
            console.error("Error al actualizar el perfil:", result.message);
          }
        })
        .catch(error => {
          console.error('Error al hacer la solicitud:', error);
        });
    }
  }
}
</script>

<!-- Los estilos serían muy similares al formulario de registro que proporcionaste -->
<style>


#profile {
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

#profile h1 {
	color: #ecf0f1; /* Color claro para el título */
	margin-bottom: 1rem; /* Espaciado debajo del título */
	
   
font-weight: bold; /* Texto en negrita */
}

#profile .form-inputs {
  width: 100%;
  max-width: 300px;
  padding-bottom: 10px;
}

#profile .form-inputs label {
  padding-right: 10px;
  display: block; /* Hacer que el label sea un bloque para que ocupe toda la línea */
	
   
color: #bdc3c7; /* Color más claro para el label */
	
   
margin-bottom: 0.5rem; /* Espaciado entre el label y el input */
}

#profile .form-inputs input {
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


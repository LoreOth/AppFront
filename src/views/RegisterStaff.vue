<template>
  <div id="register-certificate-form">
    <div v-if="notification" :class="['notification', notificationType]">
      {{ notification }}
    </div>
    <h1>Registrar usuario del sistema</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>Nombre:</label>
        <input type="text" v-model="form.name" />
      </div>

      <div class="form-group">
        <label>Apellido:</label>
        <input type="text" v-model="form.lastName" />
      </div>

      <div class="form-group">
        <label>Email:</label>
        <input type="email" v-model="form.email" />
      </div>
      <div class="form-group">
        <label>Teléfono:</label>
        <input type="text" v-model="form.phone" />
      </div>
      <div class="form-group">
        <label>Provincias que desea administrar:</label>
        <select v-model="selectedProvince" @change="addProvince">
          <option
            v-for="province in provinces"
            :key="province"
            :value="province"
          >
            {{ province }}
          </option>
        </select>
        <ul>
          <li v-for="(province, index) in form.provinces" :key="index">
            {{ province }}
            <button @click="removeProvince(index)">Eliminar</button>
          </li>
        </ul>
      </div>
      <div class="form-group">
        <label>Tipo de usuario:</label>
        <select v-model="form.userType">
          <option value="CERT">Certificante</option>
          <option value="PROV">Administrador Provincial</option>
        </select>
      </div>
      <button type="submit">Registrar</button>
      <button type="button" @click="goToHome">Cancelar</button>
    </form>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      form: {
        name: "",
        lastName: "",
        email: "",
        provinces: [],
        userType: "CERT",
        notification: null,
        notificationType: null,
      },
      selectedProvince: "",
      provinces: [
        "Buenos Aires",
        "Catamarca",
        "Chaco",
        "Chubut",
        "Córdoba",
        "Corrientes",
        "Entre Ríos",
        "Formosa",
        "Jujuy",
        "La Pampa",
        "La Rioja",
        "Mendoza",
        "Misiones",
        "Neuquén",
        "Río Negro",
        "Salta",
        "San Juan",
        "San Luis",
        "Santa Cruz",
        "Santa Fe",
        "Santiago del Estero",
        "Tierra del Fuego",
        "Tucumán",
      ],
    };
  },
  methods: {
    goToHome() {
      this.$router.push("/");
    },
    async submitForm() {
      try {
        const payload = {
          ...this.form,
          role: this.form.userType,
        };

        const response = await fetch(
          "http://localhost:8080/staff/userCreation",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          console.log("Usuario registrado con éxito:", responseData);
          this.notification = "Usuario registrado con éxito!";
          this.notificationType = "success";
          this.goToHome();
        } else {
          console.error("Error registrando el usuario:", await response.text());
        }
      } catch (error) {
        console.error("Hubo un error al enviar el formulario:", error);
      }
    },
    addProvince() {
      if (
        this.selectedProvince &&
        !this.form.provinces.includes(this.selectedProvince)
      ) {
        this.form.provinces.push(this.selectedProvince);
      }
    },
    removeProvince(index) {
      this.form.provinces.splice(index, 1);
    },
  },
};
</script>
  

  <style>
#register-certificate-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 600px; /* Reducido */
  margin: 0 auto;
  background-color: #2c3e50;
  border-radius: 6px; /* Reducido */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.19), 0 4px 4px rgba(0, 0, 0, 0.23);
  padding: 1.5rem; /* Reducido */
}

#register-certificate-form h1 {
  color: #ecf0f1;
  margin-bottom: 0.5rem; /* Reducido */
  font-size: 1.2rem; /* Reducido */
  font-weight: bold;
}

#register-certificate-form .form-group {
  width: 90%; /* Reducido */
  max-width: 280px; /* Reducido */
  padding-bottom: 8px; /* Reducido */
  text-align: right;
}

#register-certificate-form .form-group label {
  padding-right: 8px; /* Reducido */
  display: block;
  color: #ecf0f1;
  margin-bottom: 0.3rem; /* Reducido */
  font-size: 0.8rem; /* Reducido */
}

#register-certificate-form .form-group input,
#register-certificate-form .form-group select {
  width: 100%;
  padding: 8px; /* Reducido */
  font-size: 0.8rem; /* Reducido */
  margin-bottom: 8px;
  box-sizing: border-box;
}

button {
  padding: 8px 12px; /* Reducido */
  background-color: #8e44ad;
  color: #ecf0f1;
  border: none;
  border-radius: 3px; /* Reducido */
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 0.8rem; /* Reducido */
}

#register-certificate-form ul {
  list-style-type: none;
  padding: 0;
}

#register-certificate-form ul li button {
  padding: 3px 7px; /* Reducido */
  font-size: 0.6rem; /* Reducido */
}

#register-certificate-form ul li {
  color: #ecf0f1;
  font-size: 0.8rem; /* Reducido */
}
</style>

  
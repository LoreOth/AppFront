<template>
  <div id="suddenDeath-form">
    <h2>Ingrese evento de muerte súbita</h2>

    <form @submit.prevent="submitForm">
      <!-- Campo de Name -->
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="form.name" />
      </div>

      <!-- Campo de Age -->
      <div class="form-group">
        <label for="age">Edad:</label>
        <input type="text" id="age" v-model="form.age" />
      </div>

      <!-- Campo de RCP -->
      <div class="form-group">
        <label for="rcp">Se realizó RCP</label>
        <input type="checkbox" id="rcp" v-model="form.rcp" />
      </div>

      <!-- Campo de DEA -->
      <div class="form-group">
        <label for="dea">Se utilizó DEA</label>
        <input type="checkbox" id="dea" v-model="form.dea" />
      </div>

      <!-- Campo de Date -->
      <div class="form-group">
        <label for="date">Fecha del evento:</label>
        <input type="date" id="date" v-model="form.date" />
      </div>
      <div class="form-group">
        <label for="observations">Observaciones:</label>
        <input type="text" id="observations" v-model="form.observations" />
      </div>

      <!-- Botón de envío -->
      <button type="submit">Enviar</button>
      <button @click.prevent="goBack">Cancelar</button>

    </form>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      form: {
        observations: "",
        age: "",
        name: "",
        rcp: false,
        dea: false,
        date: "",
      },
    };
  },
  methods: {
    async submitForm() {
        const response = await fetch("http://localhost:8080/suddenDeath", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...this.form,
                campus_id: this.$route.params.campusId,
            }),
        });
        
        if(response.ok) {
            console.log("Data saved successfully!");
        } else {
            console.error("Error saving data");
        }
    },
    goBack() {
        this.$router.go(-1);
    }
},

};
</script>
  
<style>
#suddenDeath-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 600px;
  margin: 0 auto;
  background-color: #2c3e50;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: 2rem;
}

#suddenDeath-form h1,
#suddenDeath-form h2 {
  color: #ecf0f1;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}

#suddenDeath-form .form-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

#suddenDeath-form .form-group label {
  color: #ecf0f1;
  font-weight: 600;
  flex: 1;
}

#suddenDeath-form .form-group input {
  flex: 2;
  padding: 8px;
  border: 2px solid #8e44ad;
  border-radius: 5px;
  background: #34495e;
  color: #ecf0f1;
  font-size: 1rem;
  text-align: right;
}

button {
  padding: 10px 20px;
  background-color: #8e44ad;
  color: #ecf0f1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #9b59b6;
}

.header-row,
.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.column {
  flex: 1;
  padding: 0 1rem;
  text-align: center;
}

.header-row .column {
  font-weight: bold;
  color: #bdc3c7;
  border-bottom: 1px solid #bdc3c7;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.row .column {
  color: #ecf0f1;
  border-bottom: 1px solid #ecf0f1;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}

.row {
  cursor: pointer;
}

</style>
  
  
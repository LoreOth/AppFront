<template>
  <div id="spaces">
    <h1>Información de Sede</h1>
    <div class="scrollable-inputs">
      <div class="form-inputs">
        <label for="name">Nombre</label>
        <input v-model="campus.name" id="name" type="text" />

        <label for="cuit">CUIT</label>
        <input v-model="campus.cuit" id="cuit" type="text" readonly />

        <label for="latitude">Latitud</label>
        <input
          v-model="campus.latitude"
          id="latitude"
          type="number"
          step="any"
        />

        <label for="longitude">Longitud</label>
        <input
          v-model="campus.longitude"
          id="longitude"
          type="number"
          step="any"
        />

        <label for="province">Provincia</label>
        <input v-model="campus.province" id="province" type="text" />

        <label for="city">Ciudad</label>
        <input v-model="campus.city" id="city" type="text" />

        <label for="address">Domicilio</label>
        <input v-model="campus.address" id="address" type="text" />

        <label for="area">Superficie</label>
        <input v-model="campus.area" id="area" type="text" />

        <label for="floors">Pisos</label>
        <input v-model="campus.floors" id="floors" type="number" />

        <label for="staff">Cantidad de Personal Estable</label>
        <input v-model="campus.staff" id="staff" type="number" />

        <label for="visits">Cantidad Promedio de Visitas</label>
        <input v-model="campus.visits" id="visits" type="number" />
      </div>
    </div>

    <div class="button-group">
  <button @click="updateCampus">GUARDAR</button>
  <button @click="$router.go(-1)">CANCELAR</button>
</div>

  </div>
</template>


<script>
export default {
  data() {
    return {
      campus: {
        id: this.$route.params.id,
        name: "",
        latitude: "",
        longitude: "",
        city: "",
        address: "",
        area: "",
        floors: "",
        cuit: "",
        staff: "",
        averageVisits: "",
        visits: 0,
      },
    };
  },
  async mounted() {
    await this.fetchCampusData();
  },
  methods: {
    async fetchCampusData() {
      const baseURL = "http://localhost:8080/campus/";
      try {
        const response = await fetch(`${baseURL}${this.campus.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        this.campus = { ...this.campus, ...data };
      } catch (error) {
        console.error("Error fetching campus data", error);
      }
    },
    async updateCampus() {
      const baseURL = "http://localhost:8080/campus/updateCampusData";
      try {
        const response = await fetch(baseURL, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.campus),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        alert("Datos actualizados correctamente");
        this.$router.go(-1); // Esto redirige a la vista anterior
      } catch (error) {
        console.error("Error updating campus data", error);
      }
    },
  },
};
</script>
<style>
#spaces {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0 auto;
  background-color: #2c3e50;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: 2rem;
  width: 800px;
}

#spaces h1,
#spaces h2 {
  color: #ecf0f1;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
}
  .button {
    display: inline-block;
  }

#spaces .form-inputs {
  width: 800%;
  max-width: 200%;
  padding-bottom: 1px;
}

#spaces .form-inputs label {
  display: block;
  font-size: 0.8rem;
  color: #bdc3c7;
  margin-bottom: 1.3rem;
}
.scrollable-inputs {
  max-height: 320px;
  overflow-y: auto;
  padding-right: 1rem;
}

#spaces .form-inputs {
  width: 100%;
  max-width: 200%;
  padding-bottom: 10px;
}
.button-group button:not(:last-child) {
  margin-right: 1rem; /* Ajusta este valor según la cantidad de espacio que desees */
}
button {
  padding: 10px 15px;
  background-color: #8e44ad;
  color: #ecf0f1;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #9b59b6;
}
.input {
  width: 90%;
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

.column.province {
  white-space: nowrap;
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
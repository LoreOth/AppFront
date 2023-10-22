<template>
  <div class="certificante">
    <h1>Certificante</h1>
    <h2>Certificar Sedes</h2>
    <div class="form-group">
      <label for="province">Elige Provincia(s):</label>
      <select
        id="province"
        v-model="selectedProvinces"
        multiple
        @change="onProvincesChanged"
      >
        <option v-for="province in provinces" :key="province" :value="province">
          {{ province }}
        </option>
      </select>
      <div v-if="selectedProvinces.length" class="selected-box">
        <span
          v-for="province in selectedProvinces"
          :key="province"
          class="selected-item"
        >{{ province }}</span
        >
      </div>
    </div>
    <button @click="fetchData">Consultar</button>
    <table>
      <thead>
        <tr>

        </tr>
      </thead>
      <tbody>
        <tr v-for="declaration in pendingDeclarations" :key="declaration.id">
          <td>{{ declaration.campusName ? declaration.campusName : 'Desconocido' }}</td>
          <td>
            <button @click="viewDeclaration(declaration)">Ver</button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>


<script>
export default {
  name: "CertManagment",
  data() {
    return {
      selectedProvinces: [],
      provinces: [
        "Buenos Aires",
        "Córdoba",
        "Santa Fe",
        "Mendoza",
        "Tucumán",
        "Entre Ríos",
        "Salta",
        "Chaco",
        "Corrientes",
        "Santiago del Estero",
        "Jujuy",
        "San Juan",
        "Río Negro",
        "Formosa",
        "Neuquén",
        "Chubut",
        "San Luis",
        "Catamarca",
        "La Rioja",
        "La Pampa",
        "Santa Cruz",
        "Tierra del Fuego",
        "Misiones",
      ],
      pendingDeclarations: []
    };
  },
  methods: {
    onProvincesChanged() {
      console.log(this.selectedProvinces);
    },
    fetchData() {
  const selectedProvincesCSV = this.selectedProvinces.join(',');

  const url = `http://localhost:8080/documentation/pendingDeclarations?provinces=${selectedProvincesCSV}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      this.pendingDeclarations = data; 
      console.log(JSON.stringify(this.pendingDeclarations))
      console.log("this.pendingDeclarations", JSON.stringify(this.pendingDeclarations, null, 2));

    })
    .catch((error) => {
      console.error("Error obteniendo la data:", error);
    });
},
cancel() {
  
    
  },
viewDeclaration(declaration) {
  const declarationJSON = JSON.stringify(declaration);
  this.$router.push({
    name: "showSwornDeclaration",
    query: { declaration: declarationJSON },
  });
},

  }
};
</script>
<style>
.certificante .selected-box {
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  padding: 0.5rem;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
}

.certificante .selected-item {
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #3498db;
  border-radius: 5px;
  color: #ecf0f1;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.certificante .selected-item:hover {
  background-color: #2980b9;
}

.certificante {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 650px;
  margin: 2rem auto;
  background: linear-gradient(135deg, #2c3e50, #34495e);
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  overflow: hidden;
}

.certificante h1,
.certificante h2 {
  color: #ecf0f1;
  margin-bottom: 1rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.certificante h1 {
  font-size: 2rem;
}

.certificante h2 {
  font-size: 1.5rem;
}

.certificante .form-group {
  width: 100%;
  margin-bottom: 1rem;
  position: relative;
}

.certificante .form-group label {
  display: block;
  color: #bdc3c7;
  margin-bottom: 0.5rem;
}

.certificante .form-group select {
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: #ecf0f1;
  border: 1px solid #7f8c8d;
  border-radius: 5px;
  appearance: none;
  outline: none;
  transition: border 0.3s, box-shadow 0.3s;
}

.certificante .form-group select:focus {
  border: 1px solid #3498db;
  box-shadow: 0 0 10px rgba(52, 152, 219, 0.5);
}

.certificante button {
  padding: 10px 15px;
  background-color: #e74c3c;
  color: #ecf0f1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  font-weight: bold;
}

.certificante button:hover {
  background-color: #c0392b;
  transform: scale(1.05);
}
</style>

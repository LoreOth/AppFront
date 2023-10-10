<template>
  <div id="deas">
    <h2 title="Desfibrilador Externo Automático">DEA</h2>
    <label for="brands">Marca:</label>
    <select
      id="brands"
      v-model="selectedBrandId"
      @change="updateBrandNameAndFetchModels"
    >
      <option disabled value="">Seleccione una marca</option>
      <option v-for="brand in brands" :key="brand.id" :value="brand.id">
        {{ brand.marca }}
      </option>
    </select>

    <label v-if="selectedBrand" for="models">Modelo:</label>
    <select
      v-if="selectedBrandId && models.length > 0"
      id="models"
      v-model="selectedModel"
    >
      <option disabled value="">Seleccione un modelo</option>
      <option v-for="model in models" :key="model.nombre">
        {{ model.nombre }}
      </option>
    </select>
    <div class="action-buttons">
      <button @click="saveData">Guardar</button>
      <button @click="cancel">Cancelar</button>
    </div>
    <div v-if="deasAssigned.length > 0">
    <h2>DEAs Asignados:</h2>
    <ul>
        <li v-for="dea in deasAssigned" :key="dea.id">
            Marca: <span v-if="dea.brand">{{ dea.brand }}</span><span v-else>--</span>,
            Modelo: <span v-if="dea.model">{{ dea.model }}</span><span v-else>--</span>,
            Último mantenimiento: <span v-if="dea.dateMaintenance">{{ dea.dateMaintenance }}</span><span v-else>--</span>
        </li>
    </ul>
</div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      brands: [],
      models: [],
      selectedBrandId: "",
      selectedBrandName: "",
      deasAssigned: [],
    };
  },
  methods: {
    updateBrandNameAndFetchModels() {
      console.log("Updating brand name and fetching models...");
      const brand = this.brands.find((b) => b.id === this.selectedBrandId); // usa selectedBrandId o selectedBrandID, pero sé consistente
      if (brand) {
        this.selectedBrandName = brand.marca;
      }
      console.log("Selected Brand Name: ", this.selectedBrandName);
      this.fetchModels();
    },
    async saveData() {
      // Verificación de datos seleccionados
      if (!this.selectedBrandId || !this.selectedModel) {
        alert("Por favor, selecciona una marca y un modelo antes de guardar.");
        return;
      }

      // Datos a enviar
      const payload = {
        brand: this.selectedBrandName,
        model: this.selectedModel,
        campusId: this.$route.params.id,
      };
      console.log("brand: " + this.selectedBrand);
      console.log("model: " + this.selectedModel);
      console.log("campusId: " + payload.campusId);
      try {
        const response = await fetch("http://localhost:8080/dea/saveDea", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Una vez guardado, regresar a la ventana anterior
        this.$router.go(-1);
      } catch (error) {
        console.error("Error saving data:", error);
      }
    },

    async fetchBrands() {
      try {
        const response = await fetch("http://api.claudioraverta.com/deas/");
        this.brands = await response.json();
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    },
    cancel() {
      this.$router.go(-1);
    },
    async fetchModels() {
      console.log("this.selectedBrandId" + this.selectedBrandId);
      try {
        const response = await fetch(
          `http://api.claudioraverta.com/deas/${this.selectedBrandId}/modelos`
        );
        this.models = await response.json();
        console.log("Received models:", this.models);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    },
    async fetchAssignedDEAs() {
    try {
        const response = await fetch(`http://localhost:8080/campus/${this.$route.params.id}/deas`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        this.deasAssigned = await response.json();
    } catch (error) {
        console.error("Error fetching assigned DEAs:", error);
    }
}

  },
  mounted() {
    this.fetchBrands();
    this.fetchAssignedDEAs();
  },
};
</script>
  
<style>
.action-buttons {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
}
.deas-button {
  padding: 4px 6px; /* Ajusta el padding del botón */
  font-size: 0.7rem;
  margin-left: 10px;
  background-color: #8e44ad;
  color: #ecf0f1;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
#deas {
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

#deas h1,
#deas h2 {
  color: #ecf0f1;
  margin-bottom: 1rem;
  font-size: 1.0rem;
  font-weight: bold;
}
#deas ul li {
  color: #ecf0f1;
  font-size: 0.8rem;
}
#deas .form-inputs {
  width: 100%;
  max-width: 300px;
  padding-bottom: 10px;
}

#deas .form-inputs label {
  display: block;
  font-size: 0.8rem;
  color: #bdc3c7;
  margin-bottom: 0.5rem;
}

#deas .form-inputs input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  font-size: 0.8rem;
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
.status-button-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Esta propiedad empuja el botón hacia la derecha */
  flex-grow: 1;
}
.estado-column {
  flex-grow: 1.2; /* Ajustar este valor si es necesario */
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
  flex: 1.2; /* Ajusta este valor para incrementar el espacio entre columnas */
  padding: 0 1.5rem; /* Aumenta el padding para separar las columnas */
  text-align: center;
}
#deas label[for="models"] {
  margin-top: 1.5rem; /* Ajusta este valor según lo que necesites */
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
#deas select {
  font-size: 1rem;
  padding: 10px;
}
.row .column {
  color: #ecf0f1;
  border-bottom: 1px solid #ecf0f1;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}
#deas label {
  color: #ecf0f1; /* #ecf0f1 es blanco */
}

.row {
  cursor: pointer;
}
</style>

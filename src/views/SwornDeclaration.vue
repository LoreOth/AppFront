<template>
  <div class="showDeclaration"  id="sworn-declaration-form">
    <h1>Declaración Jurada</h1>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>¿Cuenta con personal capacitado?</label>
        <input
          type="checkbox"
          v-model="form.hasTrainedStaff"
          class="checkbox-input"
        />
      </div>

      <div class="form-group">
        <label>¿Tiene señalitica adecuada?</label>
        <input
          type="checkbox"
          v-model="form.hasAppropriateSignage"
          class="checkbox-input"
        />
      </div>

      <div class="form-group">
        <label>¿Tiene protocolo de acción en caso de muerte súbita?</label>
        <input
          type="checkbox"
          v-model="form.hasSuddenDeathProtocol"
          class="checkbox-input"
        />
      </div>

      <div class="form-group">
        <label>¿Tiene sistema de emergencia médica?</label>
        <input
          type="checkbox"
          v-model="form.hasMedicalEmergencySystem"
          class="checkbox-input"
        />
      </div>

      <div
        class="form-group"
        v-for="(maintenance, index) in form.maintenanceStaff"
        :key="index"
      >
        <label>Responsable de mantenimiento:</label>
        <input type="text" v-model="maintenance.name" placeholder="Nombre" />
        <input type="email" v-model="maintenance.email" placeholder="Email" />
        <input type="tel" v-model="maintenance.phone" placeholder="Teléfono" />
        <button
          @click.prevent="removeMaintenance(index)"
          v-if="form.maintenanceStaff.length > 1"
        >
          Eliminar
        </button>
      </div>
      <button @click.prevent="addMaintenance">Ingresar otro responsable</button>

      <div class="form-group">
        <label>Cantidad de DEAs:</label>
        <input type="number" v-model.number="form.deaCount" min="0" />
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <button type="submit" class="validate-button">Validar</button>
      <button
        @click="sendFormData"
        :disabled="!isFormValid"
        class="validate-button"
      >
        Aceptar
      </button>
      <button @click="cancel">Cancelar</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        hasTrainedStaff: false,
        hasAppropriateSignage: false,
        hasSuddenDeathProtocol: false,
        hasMedicalEmergencySystem: false,
        maintenanceStaff: [{ name: "", email: "", phone: "" }],
        deaCount: 0,
      },
      error: null,
      campusDeas: [], // fetched from API
      actualDeaCount: 0,
      isFormValid: false,
    };
  },
  computed: {
    isDeaCountValid() {
      return this.form.deaCount === this.actualDeaCount;
    },
  },
  methods: {
    addMaintenance() {
      this.form.maintenanceStaff.push({ name: "", email: "", phone: "" });
    },
    removeMaintenance(index) {
      this.form.maintenanceStaff.splice(index, 1);
    },
    cancel() {
      this.$router.go(-1);
    },
    async sendFormData() {
      console.log("campusId " + this.$route.params.id);
      console.log("this.form", JSON.stringify(this.form, null, 2));


      const payload = {
        hasTrainedStaff: this.form.hasTrainedStaff,
        hasAppropriateSignage: this.form.hasAppropriateSignage,
        hasSuddenDeathProtocol: this.form.hasSuddenDeathProtocol,
        hasMedicalEmergencySystem: this.form.hasMedicalEmergencySystem,
        deaCount: this.form.deaCount,
        campusId: this.$route.params.id,
        maintenanceStaff: this.form.maintenanceStaff,
      };

      if (this.isFormValid) {
        const response = await fetch(
          "http://localhost:8080/documentation/SwornDeclarationSave",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...payload,
              campusId: this.$route.params.id,
            }),
          }
        );

        if (!response.ok) {
          this.error = "Error al enviar los datos.";
        } else {
        }
      }
    },
    async fetchCampusDeas(campusId) {
      const response = await fetch(
        `http://localhost:8080/campus/${campusId}/deaCount`
      );
      if (response.ok) {
        this.actualDeaCount = parseInt(await response.json());
      } else {
        console.error("Failed to fetch campus DEA count");
      }
    },
    submitForm() {
      if (!this.isDeaCountValid) {
        this.error =
          "La cantidad de DEAs ingresada no coincide con la base de datos.";
        this.isFormValid = false;
      } else {
        this.isFormValid = true;
        alert("Validación exitosa, puede aceptar.");
      }
    },
  },

  mounted() {
    this.fetchCampusDeas(this.$route.params.id);
  },
};
</script>
<style>

.showDeclaration{

width: 900px;


}
#sworn-declaration-form {
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
}

#sworn-declaration-form h1 {
  color: #ecf0f1;
  margin-bottom: 1rem;
  font-weight: bold;
}

#sworn-declaration-form .form-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #ecf0f1;
  margin-bottom: 1rem;
}

#sworn-declaration-form .form-group label {
  flex: 1;
}

.checkbox-input {
  align-self: flex-end;
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
.validate-button {
  margin-right: 10px;
}
.error-message {
  color: red;
  margin-bottom: 20px;
}
</style>
  
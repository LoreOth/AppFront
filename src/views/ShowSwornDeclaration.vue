<template>
  <div class="declaration-details">
    <h1>Detalles de la Declaración Jurada</h1>
    <form @submit.prevent="onSubmit">
      <!-- Mostrar todos los datos de la declaración aquí -->
      <div class="form-group">
        <label for="hasTrainedStaff">¿Cuenta con personal capacitado?</label>
        <input
          type="checkbox"
          v-model="declaration.hasTrainedStaff"
          id="hasTrainedStaff"
        />
      </div>
      <div class="form-group">
        <label for="hasAppropriateSignage">¿Tiene señalítica adecuada?</label>
        <input
          type="checkbox"
          v-model="declaration.hasAppropriateSignage"
          id="hasAppropriateSignage"
        />
      </div>
      <div class="form-group">
        <label for="hasSuddenDeathProtocol"
          >¿Tiene protocolo de acción en caso de muerte súbita?</label
        >
        <input
          type="checkbox"
          v-model="declaration.hasSuddenDeathProtocol"
          id="hasSuddenDeathProtocol"
        />
      </div>
      <div class="form-group">
        <label for="hasMedicalEmergencySystem"
          >¿Tiene sistema de emergencia médica?</label
        >
        <input
          type="checkbox"
          v-model="declaration.hasMedicalEmergencySystem"
          id="hasMedicalEmergencySystem"
        />
      </div>
      <div class="form-group">
        <label for="deaCount">¿Cantidad de DEAs?</label>
        <input type="number" v-model="declaration.deaCount" id="deaCount" />
      </div>
      <div class="form-group">
        <label for="observations">Observaciones</label>
        <textarea
          v-model="declaration.observations"
          id="observations"
        ></textarea>
      </div>

      <div class="button-group">
        <button type="button" @click="sendRequest" class="accept-button">Aceptar</button>
        <button @click="rejectRequest" class="cancel-button">Rechazar</button>
        <button @click="cancel" class="cancel-button">Cancelar</button>
      </div>
    </form>
    <!-- Notificación personalizada -->
    <div v-if="showSuccessNotification" class="notification success">
      Declaración aprobada con éxito. Redirigiendo...
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "ShowSwornDeclaration",
  props: {
    declaration: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showSuccessNotification: false,
      showConfirmationDialog: false,
    };
  },
  methods: {
    async onSubmit() {
      if (
        !this.declaration.hasTrainedStaff ||
        !this.declaration.hasAppropriateSignage ||
        !this.declaration.hasSuddenDeathProtocol ||
        !this.declaration.hasMedicalEmergencySystem ||
        this.declaration.deaCount === 0
      ) {
        this.showConfirmationDialog = true;
      } else {
        await this.sendRequest();
      }
    },
    acceptDeclaration() {
      this.sendRequest();
      this.showConfirmationDialog = true;
    },

    cancelDeclaration() {
      this.showConfirmationDialog = false;
    },

    async sendRequest() {
      const declarationId = this.declaration.id;
      const campusId = this.declaration.campusId;
      const updatedDeclaration = {
        ...this.declaration,
      };
      try {
        const declarationResponse = await fetch(
          "http://localhost:8080/documentation/updateDeclarationStatus",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedDeclaration),
          }
        );

        if (!declarationResponse.ok) {
          throw new Error(`HTTP error! Status: ${declarationResponse.status}`);
        }

        const campusResponse = await fetch(
          "http://localhost:8080/campus/updateCampusStatus",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `campusId=${campusId}&status=2`,
          }
        );

        if (!campusResponse.ok) {
          throw new Error(`HTTP error! Status: ${campusResponse.status}`);
        }

        this.showSuccessNotification = true;

        setTimeout(() => {
          this.$router.go(-1);
        }, 2000);
      } catch (error) {
        console.error("Error updating declaration and campus status:", error);
      }
    },
    async rejectRequest() {
      const declarationId = this.declaration.id;
      const campusId = this.declaration.campusId;
      const updatedDeclaration = {
        ...this.declaration,
      };
      try {
        const declarationResponse = await fetch(
          "http://localhost:8080/documentation/rejectDeclarationStatus",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedDeclaration),
          }
        );

        if (!declarationResponse.ok) {
          throw new Error(`HTTP error! Status: ${declarationResponse.status}`);
        }

        setTimeout(() => {
          this.$router.go(-1);
        }, 2000);
      } catch (error) {
        console.error("Error updating declaration and campus status:", error);
      }
    },

    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.declaration-details {
  background-color: #f7f7f7;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
}

.declaration-details h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.form-group label {
  font-weight: bold;
  color: #666;
}

.form-group .answer {
  font-weight: bold;
  color: #4caf50; /* Verde para respuestas afirmativas */
}

.button-group {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.accept-button,
.cancel-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.3s;
}

.accept-button {
  background-color: #4caf50; /* Verde para botón de aceptar */
  color: #fff;
}

.cancel-button {
  background-color: #f44336; /* Rojo para botón de cancelar */
  color: #fff;
}

.button-group button:hover {
  transform: scale(1.05);
}

.confirmation-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.confirmation-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.confirmation-content p {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.confirmation-content ul {
  list-style: none;
  padding: 0;
}

.confirmation-content li {
  color: #f44336; /* Rojo para elementos de lista de confirmación */
  font-weight: bold;
  margin: 0.5rem 0;
}
</style>

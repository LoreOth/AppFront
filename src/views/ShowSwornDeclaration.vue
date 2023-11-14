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
          readonly
        />
      </div>
      <div class="form-group">
        <label for="hasAppropriateSignage">¿Tiene señalítica adecuada?</label>
        <input
          type="checkbox"
          v-model="declaration.hasAppropriateSignage"
          id="hasAppropriateSignage"
          readonly
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
          readonly
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
          readonly
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
        <button type="button" @click="sendRequest" class="accept-button">
          Aceptar
        </button>
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
        await this.sendRequest();
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
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 1.5rem; /* Disminuir el padding */
  width: 90%; /* Ajuste de ancho al 90% */
  max-width: 600px;
  margin: 1rem auto;
}

.declaration-details h1 {
  font-size: 2rem; /* Tamaño de fuente reducido */
  color: #2c3e50;
  margin-bottom: 1rem; /* Margen inferior reducido */
  text-align: left;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem; /* Margen inferior reducido */
}

.form-group label {
  font-weight: 600;
  color: #34495e;
  margin-bottom: 0.5rem;
}

.button-group {
  display: flex;
  flex-direction: row; /* Cambiado de column a row */
  align-items: center; /* Centra los botones verticalmente */
  justify-content: space-between; /* Distribuye los botones uniformemente */
  gap: 0.5rem; /* Espaciado entre botones */
}

/* Estilo base para botones */
.accept-button,
.cancel-button {
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
  margin: 0;
  background-color: #8e44ad;
  color: white; /* Color de texto blanco para contraste */
  border: none; /* Eliminar bordes por defecto */
  cursor: pointer; /* Cambiar el cursor a mano al pasar sobre el botón */
}

/* Efecto al hacer clic en el botón */
.accept-button:active,
.cancel-button:active {
  transform: scale(0.95); /* Reducir el tamaño ligeramente al presionar */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* Sombra más suave para dar efecto de presión */
}

.notification {
  margin-top: 1rem; /* Margen superior reducido */
  padding: 1rem;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  font-size: 1rem; /* Tamaño de fuente reducido para la notificación */
}

/* Resto de estilos permanecen igual */
</style>

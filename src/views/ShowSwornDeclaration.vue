<template>
    <div class="declaration-details">
      <h1>Detalles de la Declaración Jurada</h1>
      <form @submit.prevent="onSubmit">
        <!-- Mostrar todos los datos de la declaración aquí -->
        <div class="form-group">
          <label>¿Cuenta con personal capacitado?:</label>
          <span v-if="declaration && declaration.hasTrainedStaff" class="answer">
            {{ declaration.hasTrainedStaff ? "Sí" : "No" }}
          </span>
          <span v-else>No disponible</span>
        </div>
      <div class="form-group">
        <label>¿Tiene señalitica adecuada?:</label>
        <span v-if="declaration && declaration.hasAppropriateSignage">{{
          declaration.hasAppropriateSignage ? "Sí" : "No"
        }}</span>
        <span v-else>No disponible</span>
      </div>
      <div class="form-group">
        <label>¿Tiene protocolo de acción en caso de muerte súbita?:</label>
        <span v-if="declaration && declaration.hasSuddenDeathProtocol">{{
          declaration.hasSuddenDeathProtocol ? "Sí" : "No"
        }}</span>
        <span v-else>No disponible</span>
      </div>
      <div class="form-group">
        <label>¿Tiene sistema de emergencia médica?:</label>
        <span v-if="declaration && declaration.hasMedicalEmergencySystem">{{
          declaration.hasMedicalEmergencySystem ? "Sí" : "No"
        }}</span>
        <span v-else>No disponible</span>
      </div>
      <div class="form-group">
        <label>¿Cantidad de DEAs?:</label>
        <span v-if="declaration">{{ declaration.deaCount }}</span>
        <span v-else>No disponible</span>
      </div>

      <div class="button-group">
        <button type="button" @click="showConfirmationDialog = true" class="accept-button">Aceptar</button>
        <button @click="cancel" class="cancel-button">Cancelar</button>
      </div>
      <div v-if="showConfirmationDialog" class="confirmation-dialog">
        <div class="confirmation-content">
          <p>
            ¿Está seguro que quiere aceptar la declaración jurada con los siguientes datos?
          </p>
          <ul>
          <li v-if="!declaration.hasTrainedStaff">
            No cuenta con personal capacitado
          </li>
          <li v-if="!declaration.hasAppropriateSignage">
            No tiene señalítica adecuada
          </li>
          <li v-if="!declaration.hasSuddenDeathProtocol">
            No tiene protocolo de acción en caso de muerte súbita
          </li>
          <li v-if="!declaration.hasMedicalEmergencySystem">
            No tiene sistema de emergencia médica
          </li>
          <li v-if="declaration.deaCount === 0">Cantidad de DEAs es 0</li>
        </ul>
          <div class="button-group">
            <button @click="sendRequest" class="accept-button">Aceptar</button>
            <button @click="cancel" class="cancel-button">Cancelar</button>
          </div>
        </div>
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
  const campusId = this.declaration.campusId; // Supongo que tienes el ID del campus en la declaración

  try {
    // Primero, actualiza el estado de la declaración jurada
    const declarationResponse = await fetch(
      "http://localhost:8080/documentation/updateDeclarationStatus",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `declarationId=${declarationId}`,
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

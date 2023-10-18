<template>
  <div id="spaces">
    <h1>Espacios Obligados</h1>

    <div class="header-row">
      <div class="column">Nombre</div>
      <div class="column">Provincia</div>
      <div class="column">CUIT</div>
      <div class="column">Estado</div>
    </div>

    <div
      v-for="space in spaces"
      :key="space.CUIT"
      class="row"
      @click="fetchSedes(space)"
    >
      <div class="column">{{ space.name }}</div>
      <div class="column province">{{ space.province }}</div>
      <div class="column">{{ space.cuit }}</div>
      <div class="column">{{ space.estado }}</div>
    </div>

    <button @click="openEntityForm">Solicitar Entidad</button>

    <!-- Formulario para la entidad, inicialmente oculto -->
    <div v-if="showEntityForm">
      <div class="form-inputs">
        <label>Nombre:</label>
        <input type="text" v-model="newEntity.name" />
        <label>Provincia:</label>
        <select v-model="newEntity.province">
          <option v-for="province in provinces" :key="province">
            {{ province }}
          </option>
        </select>
        <label>CUIT:</label>
        <input type="text" v-model="newEntity.cuit" />
        <button @click="cancelEntityForm">Cancelar</button>
        <button @click="submitEntity">Enviar</button>
      </div>
    </div>

    <!-- Listado de sedes para un espacio obligado seleccionado -->
    <div v-if="selectedSpace">
      <h2>Sedes : {{ selectedSpace.name }}</h2>

      <!-- Encabezado de las sedes -->
      <div class="header-row">
        <div class="column">Nombre</div>
        <div class="column">Provincia</div>
        <div class="column">Estado</div>
      </div>

      <div v-for="sede in selectedSpace.sedes" :key="sede.id" class="row">
        <div class="column">{{ sede.name }}</div>
        <div class="column province">{{ sede.province }}</div>
        <div class="status-button-wrapper">
          <div class="column estado-column">
            {{ sede.estado ? "Aprobado" : "Pendiente" }}
          </div>
          <button
            class="sede-button"
            @click="representSede(sede)"
            v-if="!sede.isRepresented"
          >
            Representar
          </button>
        </div>
      </div>
      <button @click="openSedeForm" v-if="selectedSpace">
        Crear Nueva Sede
      </button>
      <div class="form-inputs" v-if="showSedeForm">
        <label>Nombre:</label>
        <input type="text" v-model="newSede.name" />
        <label>CUIT:</label>
        <input type="text" v-model="newSede.cuit" />
        <button @click="submitSede">Crear Sede</button>
      </div>
    </div>
  </div>
</template>

<script>
import UserSessionManager from "../UserSessionManager";
export default {
  data() {
    return {
      spaces: [],
      selectedSpace: null,
      showEntityForm: false,
      showSedeForm: false,
      newEntity: {
        name: "",
        province: "",
        cuit: "",
      },
      newSede: {
        name: "",
        cuit: "",
      },
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
    };
  },

  methods: {
    cancelEntityForm() {
      this.showEntityForm = false;
    },
    showSuccessNotification(message) {
      this.showNotification = true;
      this.notificationMessage = message;
      setTimeout(() => {
        this.showNotification = false;
        this.notificationMessage = "";
      }, 2000);
    },
    fetchSpaces() {
      fetch("http://localhost:8080/obligatory-spaces")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          this.spaces = data.map((space) => ({
            ...space,
            estado: space.status ? "Aprobado" : "Pendiente",
            cuit: space.cuit,
          }));
        })
        .catch((error) => {
          console.log(
            "There was a problem with the fetch operation:",
            error.message
          );
        });
    },
    fetchSedes(space) {
  this.selectedSpace = space;
  const userId = UserSessionManager.getSessionItem("id");

  fetch(`http://localhost:8080/campus/${space.id}/sedes?userId=${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      // Mapeo de datos para establecer el estado y la representación de cada sede.
      this.selectedSpace.sedes = data.map(sede => ({
        ...sede,
        estado: sede.approved ? "Aprobado" : "Pendiente",
        isRepresented: localStorage.getItem(`sede-${sede.id}`) === "true" ? true : false
      }));
    })
    .catch(error => {
      console.log("There was a problem fetching sedes:", error.message);
    });
},


    openEntityForm() {
      this.showEntityForm = true;
      this.showSedeForm = false;
    },
    openSedeForm() {
      this.showSedeForm = true;
    },
    submitSede() {
      this.newSede.estado = false;

      const dataToSend = {
        name: this.newSede.name,
        cuit: this.newSede.cuit,
        estado: this.newSede.estado,
        obligatorySpaceId: this.selectedSpace.id,
        representativeId: UserSessionManager.getSessionItem("id"),
      };

      fetch("http://localhost:8080/campus/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          this.selectedSpace.sedes.push(data);
          this.showSedeForm = false;
          console.log(this.showSedeForm)
          this.$router.push({
            name: "campus",
            params: { id: this.selectedSpace.id },
          });
        })
        .catch((error) => {
          console.log(
            "There was a problem submitting the new sede:",
            error.message
          );
        });
    },
    submitEntity() {
      fetch(
        `http://localhost:8080/obligatory-spaces/cuit/${this.newEntity.cuit}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 404) {
            return null;
          } else {
            throw new Error("Network response was not ok");
          }
        })
        .then((data) => {
          console.log(UserSessionManager.getSessionItem("id"));
          if (data) {
            alert("Ya existe un espacio obligado con ese CUIT.");
          } else {
            const dataToSend = {
              name: this.newEntity.name,
              province: this.newEntity.province,
              representativeId: UserSessionManager.getSessionItem("id"),
              cuit: this.newEntity.cuit,
            };

            fetch("http://localhost:8080/obligatory-spaces/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(dataToSend),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                return response.json();
              })
              .then((data) => {
                this.spaces.push(data);
                this.showEntityForm = false;
                this.$router.push({ name: "campus", params: { id: data.id } });
              })
              .catch((error) => {
                console.log(
                  "There was a problem submitting the new entity:",
                  error.message
                );
              });
          }
        })
        .catch((error) => {
          console.log("Error:", error.message);
        });
    },
    representSede(sede) {
  const representativeId = UserSessionManager.getSessionItem("id");

  const dataToSend = {
    campus_id: sede.id,
    user_id: representativeId,
  };

  fetch("http://localhost:8080/campus/representatives/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Establecer la sede como representada en el almacenamiento local.
      localStorage.setItem(`sede-${sede.id}`, true);
      sede.isRepresented = true;
    })
    .catch(error => {
      console.log("Error while representing sede:", error.message);
    });
}

  },
  mounted() {
    this.fetchSpaces();
  },
};
</script>

<style>
.sede-button {
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
#spaces {
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

#spaces h1,
#spaces h2 {
  color: #ecf0f1;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
}

#spaces .form-inputs {
  width: 100%;
  max-width: 300px;
  padding-bottom: 10px;
}

#spaces .form-inputs label {
  display: block;
  font-size: 0.8rem;
  color: #bdc3c7;
  margin-bottom: 0.5rem;
}

#spaces .form-inputs input {
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
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
      <!-- Asumiendo que el formulario de entidad tiene campos como nombre, provincia y cuit -->
      <div class="form-inputs">
        <label>Nombre:</label>
        <input type="text" v-model="newEntity.name" />
        <label>Provincia:</label>
        <input type="text" v-model="newEntity.province" />
        <label>CUIT:</label>
        <input type="text" v-model="newEntity.CUIT" />
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

      <!-- Listado de sedes -->
      <div v-for="sede in selectedSpace.sedes" :key="sede.id" class="row">
        <div class="column">{{ sede.name }}</div>
        <div class="column province">{{ sede.province }}</div>
        <div class="column">{{ sede.estado ? "Aprobado" : "Pendiente" }}</div>
      </div>

      <button @click="representSede">Representar Sede</button>
      <button @click="openSedeForm" v-if="selectedSpace">
        Crear Nueva Sede
      </button>
      <div class="form-inputs" v-if="showSedeForm">
        <label>Nombre:</label>
        <input type="text" v-model="newSede.name" />
        <label>Provincia:</label>
        <input type="text" v-model="newSede.province" />
        <label>Estado:</label>
        <input type="text" v-model="newSede.estado" readonly />
        <!-- Hice este campo de solo lectura porque asumí que no querrías que los usuarios lo cambien. Si quieres que lo cambien, simplemente quita el atributo readonly. -->
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
      representativeId: null,
      spaces: [], // Lista de espacios obtenidos del back
      showEntityForm: false,
      newEntity: {
        name: "",
        province: "",
        CUIT: "",
      },
      selectedSpace: null, // Espacio seleccionado para mostrar sedes
      showSedeForm: false, // Añade esta línea
      newSede: {
        name: "",
        province: "",
        estado: "pendiente",
      },
    };
  },
  methods: {
    cancelEntityForm() {
      this.showEntityForm = false;
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
          // Transformar los datos aquí
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
      console.log(space);
      this.selectedSpace = space; // Establece el espacio seleccionado
      fetch(`http://localhost:8080/campus/${space.id}/sedes`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          this.selectedSpace.sedes = data;
          this.selectedSpace.sedes = data.map((sede) => ({
            ...sede,
            estado: sede.approved ? true : false,
          }));
        })
        .catch((error) => {
          console.log("There was a problem fetching sedes:", error.message);
        });
      console.log("data " + data);
    },
    openEntityForm() {
      this.showEntityForm = true;
      this.showSedeForm = false;
    },

    openSedeForm() {
      this.showSedeForm = true;
    },
    submitSede() {
      // Establecer el valor predeterminado de estado en false
      this.newSede.estado = false;

      // Aquí puedes usar fetch para enviar la nueva sede al backend
      const dataToSend = {
        name: this.newSede.name,
        province: this.newSede.province,
        estado: this.newSede.estado,
        obligatorySpaceId: this.selectedSpace.id,
      };

      // Resto del código para enviar los datos al backend

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
          // Aquí puedes actualizar la lista de sedes o hacer cualquier otra cosa
          this.selectedSpace.sedes.push(data);
          this.showSedeForm = false;
        })
        .catch((error) => {
          console.log(
            "There was a problem submitting the new sede:",
            error.message
          );
        });
    },

    submitEntity() {
      // Primero verificamos si ya existe un espacio con ese CUIT
      fetch(
        `http://localhost:8080/obligatory-spaces/cuit/${this.newEntity.CUIT}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 404) {
            // Si el status es 404, significa que no existe el espacio obligado con ese CUIT
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
              cuit: this.newEntity.CUIT,
            };
            console.log("json stri" + JSON.stringify(dataToSend));
            // Si no hay data, procedemos a crear el espacio obligado
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
                // Aquí puedes hacer cualquier otra acción posterior a la creación, como resetear el formulario o actualizar la lista de espacios
                this.fetchSpaces();
                this.showEntityForm = false;
              });
          }
        })
        .catch((error) => {
          console.log("Error:", error.message);
        });
    },
    representSede() {
      representativeId = UserSessionManager.getSessionItem("id");
    },
  },
  mounted() {
    this.fetchSpaces();
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
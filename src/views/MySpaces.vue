<template>
  <div class="space" id="spaces">
    <h1>Mis sedes</h1>
    <div class="row header-row">
      <div class="column">Nombre</div>
      <div class="column">Provincia</div>
      <div class="column">Acciones</div>
      <div class="column">Estado</div>
    </div>
    <div
      v-for="campus in campuses"
      :key="campus.id"
      class="row"
      @click="selectCampus(campus)"
    >
      <div class="column">{{ campus.name }}</div>
      <div class="column">{{ campus.province }}</div>
      <div class="column action-buttons">
        <div class="column action-buttons">
          <button
            v-if="campus.status != 1"
            @click.stop="redirectToCampusData(campus.id)"
          >
            Info
          </button>
          <button
            v-if="campus.status != 1"
            @click.stop="redirectToDEA(campus.id)"
          >
            DEAs
          </button>
          <button
            v-if="campus.status != 1"
            title="Declaración Jurada"
            @click.stop="redirectToSwornDeclaration(campus.id)"
          >
            D.J
          </button>
          <button
            v-if="campus.status != 1"
            title="Ingreso muerte súbita"
            @click.stop="redirectSuddenDeath(campus.id)"
          >
           MS
          </button>
          <button
            v-if="campus.status != 1"
            title="Ver visitas en la sede"
            @click.stop="redirectVisit(campus.id)"
          >
           Visitas
          </button>
        </div>
      </div>
      <div class="column">{{ campus.statusName }}</div>
    </div>
  </div>
</template>



  <script>
import UserSessionManager from "../UserSessionManager";
export default {
  data() {
    return {
      campuses: [],
      selectedCampus: null,
      statusNames: {}
    };
  },
  async mounted() {
    const userId = UserSessionManager.getSessionItem("id");
  const baseURL = "http://localhost:8080/campus/";

  try {
    const response = await fetch(
      `${baseURL}representatives/${userId}/campuses`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    this.campuses = await response.json();

    // Mover el bucle forEach aquí
    for (const campus of this.campuses) {
      await this.loadStatusName(campus);
    }
  } catch (error) {
    console.error("Error fetching campuses", error);
  }
},
  methods: {
    async loadStatusName(campus) {
    try {
      const response = await fetch(`http://localhost:8080/status/get-name?status=${campus.status}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const statusName = await response.text();

      // Asignar el nombre del estado al campus
      campus.statusName = statusName;
    } catch (error) {
      console.error("Error fetching status name", error);
    }
  },
    async fetchCampuses() {
      const userId = UserSessionManager.getSessionItem("id");
      const baseURL = "http://localhost:8080/campus/";
      try {
        const response = await fetch(
          `${baseURL}representatives/${userId}/campuses`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        this.campuses = await response.json();
      } catch (error) {
        console.error("Error fetching campuses", error);
      }
    },
    redirectToSwornDeclaration(campusId) {
      console.log("Selected Campus ID for Sworn Declaration:" + campusId);
      if (campusId) {
        this.$router.push({
          name: "swornDeclaration",
          params: { id: campusId },
        });
      } else {
        console.error(
          "Error navigating to Sworn Declaration. Campus ID not found."
        );
      }
    },
    redirectVisit(campusId) {
      console.log("Selected Campus ID for visits info:" + campusId);
    this.$router.push({ name: 'visits', params: { campusId: campusId }});
  },

    redirectSuddenDeath(campusId) {
      console.log("Selected Campus ID for SuddenDeath:" + campusId);
    this.$router.push({ name: 'suddenDeath', params: { campusId: campusId }});
  },
    selectCampus(campus) {
      this.selectedCampus = campus;
    },
    redirectToCampusData(campusId) {
      this.$router.push({ name: "campusData", params: { id: campusId } });
    },
    redirectToDEA(campusId) {
      console.log("Selected Campus ID:" + campusId);
      if (campusId) {
        this.$router.push({ name: "Dea", params: { id: campusId } });
      } else {
        console.error("Error navigating to DEA. Campus ID not found.");
      }
    },
  },
};
</script>
<style>
.space{

  width: 900px;


}
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

.header-row,
.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.action-buttons {
  display: flex;
  gap: 5px;
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
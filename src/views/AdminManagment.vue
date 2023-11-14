<template>
  <div class="admin">
    <div v-if="notification" class="notification">
        {{ notification }}
      </div>
    <h1>Administrador provincial</h1>
    <h2>Aprobar solicitudes</h2>
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
    <button @click="fetchData" class="white-text">Consultar</button>
    <div v-for="campus in campuses" :key="campus.campusId" class="campus-item">
      {{ campus.campusName }} ({{ campus.campusProvince }}) -
      {{ campus.representativeFirstName }} {{ campus.representativeLastName }}
      <button @click="approveCampus(campus.campusId)">Approve</button>
      <button @click="cancelApproval">Cancelar</button>
    </div>
  </div>
</template>


<script>
import UserSessionManager from "../UserSessionManager";
export default {
    name: "AdminProvincial",
  data() {
    return {
      selectedProvinces: [],
      provinces: [], 
      campuses: [],
      staffId: UserSessionManager.getSessionItem("id"), 
      notification: null
    };
  },
  mounted() {
    this.fetchProvincesForStaff();
},
  methods: {
    onProvincesChanged() {
      console.log(this.selectedProvinces);
    },
    fetchData() {
      const queryString = this.selectedProvinces
        .map((p) => `provinces=${p}`)
        .join("&");
      fetch(`http://localhost:8080/campus/byProvinces?${queryString}`)
        .then((response) => response.json())
        .then((data) => {
          this.campuses = data;
        })
        .catch((error) => {
          console.error("Error fetching the data:", error);
        });
    },
    fetchProvincesForStaff() {
        fetch(`http://localhost:8080/staff/${this.staffId}/provinces`)
        .then(response => response.json())
        .then(data => {
            this.provinces = data;
        })
        .catch(error => {
            console.error("Error fetching provinces for staff:", error);
        });
    },
    cancelApproval() {
      this.selectedProvinces = [];
      this.campuses = [];
    },
    approveCampus(campusId) {
        console.log("Campus ID:", campusId);
      fetch(`http://localhost:8080/campus/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({ request: campusId })
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
        console.log("Campus approved:", data);
        this.campuses = this.campuses.filter(
          (campus) => campus.campusId !== campusId
        );
        this.notification = "Relación del usuario y la sede aprobada";
      })
        .catch((error) => {
          console.error("Error approving the campus:", error);
        });
    },
  },
};
</script>
<style>
.admin .selected-box {
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  padding: 0.5rem;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
}

.admin .selected-item {
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #3498db;
  border-radius: 5px;
  color: #ecf0f1;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.admin .selected-item:hover {
  background-color: #2980b9;
}

.admin {
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

.admin h1,
.admin h2 {
  color: #ecf0f1;
  margin-bottom: 1rem;
  font-size: 0.9;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.admin h1 {
  font-size: 1.5rem;
}

.admin h2 {
  font-size: 1rem;
}
.white-text {
  color: white; 
}
.admin .form-group {
  width: 100%;
  margin-bottom: 1rem;
  position: relative;
}

.admin .form-group label {
  display: block;
  color: #bdc3c7;
  margin-bottom: 0.5rem;
}

.admin .form-group select {
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

.admin .form-group select:focus {
  border: 1px solid #3498db;
  box-shadow: 0 0 10px rgba(52, 152, 219, 0.5);
}

.admin button {
  padding: 10px 15px;
  background-color: #e74c3c;
  color: #ecf0f1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  font-weight: bold;
}

.admin button:hover {
  background-color: #c0392b;
  transform: scale(1.05);
}

.admin button {
  padding: 10px 15px;
  background-color: #8e44ad; /* Color de fondo cambiado a violeta */
  color: #ecf0f1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  font-weight: bold;
}

.admin button:hover {
  background-color: #7a1de2;
}
.admin .campus-item {
  color: #FFFFFF; /* Color del texto cambiado a blanco */
}


</style>

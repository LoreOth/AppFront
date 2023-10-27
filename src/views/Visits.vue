<template>
  <div id="visits-form">
    <h2>Detalles de las Visitas</h2>

    <div class="form-group">
      <label for="visit-date">Fecha de la visita:</label>
      <input type="date" id="visit-date" v-model="visitData.createdDate" readonly />
    </div>

    <div class="form-group">
      <label for="visit-status">Estado de la visita:</label>
      <input type="text" id="visit-status" v-model="visitStatus" readonly />
    </div>

    <button @click.prevent="goBack">Volver</button>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      campusId: this.$route.params.campusId,
      visitData: {
        createdDate: "",
        visitStatus: 0,
      },
    };
  },
  computed: {
    visitStatus() {
  return this.visitData.visitStatus ? "Aprobado" : "Rechazado";
}
  },
  created() {
    this.fetchVisitData();
  },
  methods: {
    async fetchVisitData() {
  try {
    const response = await fetch(
      `http://localhost:8080/documentation/getVisitStatusAndDateByCampusId?campusId=${this.campusId}`
    );
    const data = await response.json();
    
    const rawDate = new Date(data[0].createdDate);
    const formattedDate = `${rawDate.getFullYear()}-${String(rawDate.getMonth() + 1).padStart(2, '0')}-${String(rawDate.getDate()).padStart(2, '0')}`;

    this.visitData = {
      ...data[0],
      createdDate: formattedDate
    };
    console.log(this.visitData);
  } catch (error) {
    console.error("Error fetching visit data:", error);
  }
},


    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
  
  <style>
#visits-form {
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

#visits-form h2 {
  color: #ecf0f1;
  margin-bottom: 2rem;
  text-align: center;
}

#visits-form .form-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

#visits-form .form-group label {
  color: #ecf0f1;
  flex: 1;
}

#visits-form .form-group input {
  flex: 2;
  padding: 8px;
  border: 2px solid #8e44ad;
  border-radius: 5px;
  background: #34495e;
  color: #ecf0f1;
  text-align: right;
}

button {
  padding: 10px 20px;
  background-color: #8e44ad;
  color: #ecf0f1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #9b59b6;
}
</style>
  
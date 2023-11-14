<template>
<div id="visits-form">
    <h2>Detalles de las Visitas</h2>

    <table>
      <thead>
        <tr>
          <th>Fecha de la visita</th>
          <th>Estado de la visita</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="visit in visits" :key="visit.createdDate">
        <td>{{ visit.createdDate }}</td>
        <td>{{ visit.visitStatus ? "Aprobado" : "Rechazado" }}</td>
        <td><button @click="deleteVisit(visit.createdDate)">Eliminar</button></td>
    </tr>
      </tbody>
    </table>

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
    visits: [], 
  };
},

  computed: {
    visitStatus() {
  return this.visitData.visitStatus ? "Aprobado" : "Rechazado";
}
  },
  created() {
  const savedVisits = localStorage.getItem("visits");
  if (savedVisits) {
    this.visits = JSON.parse(savedVisits);
  }
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

    const newVisit = {
      ...data[0],
      createdDate: formattedDate
    };

    if (this.visits.length === 0 || (this.visits[0].createdDate !== newVisit.createdDate || this.visits[0].visitStatus !== newVisit.visitStatus)) {
      this.visits = [newVisit, ...this.visits].slice(0, 5);
      localStorage.setItem("visits", JSON.stringify(this.visits));
    }
  } catch (error) {
    console.error("Error fetching visit data:", error);
  }
},

deleteVisit(dateToDelete) {
        this.visits = this.visits.filter(visit => visit.createdDate !== dateToDelete);
        localStorage.setItem("visits", JSON.stringify(this.visits));
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
  width: 650px;
  margin: 0 auto;
  background-color: #2c3e50;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
}

#visits-form h2 {
  color: #ffffff;
  margin-bottom: 2.5rem;
  text-align: center;
  font-weight: 500;
  font-size: 1.8rem;
}

#visits-form table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 25px;
}

#visits-form th, #visits-form td {
  padding: 12px;
  border: 1px solid #8e44ad;
  text-align: center;
  color: #ffffff; /* Texto en blanco */
  transition: background-color 0.3s; /* Agregada transición */
}

#visits-form th {
  background-color: #8e44ad;
  color: #ffffff; /* Texto en blanco */
}

#visits-form tbody tr:hover {
  background-color: rgba(142, 68, 173, 0.1); /* Efecto hover para las filas */
}

#visits-form .form-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

#visits-form .form-group label {
  color: #ffffff; /* Texto en blanco */
  flex: 1;
}

#visits-form .form-group input {
  flex: 2;
  padding: 8px;
  border: 2px solid #8e44ad;
  border-radius: 5px;
  background: #34495e;
  color: #ffffff; /* Texto en blanco */
  text-align: right;
  transition: border-color 0.3s; /* Agregada transición */
}

#visits-form .form-group input:focus {
  border-color: #9b59b6; /* Cambio de color al enfocar */
}

button {
  padding: 12px 24px;
  background-color: #8e44ad;
  color: #ffffff; /* Texto en blanco */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s; /* Agregada transición */
  font-weight: 500;
}

button:hover {
  background-color: #9b59b6;
  transform: translateY(-2px); /* Efecto levitación al hacer hover */
}

button:active {
  transform: translateY(0); /* Devuelve el botón a su posición original al presionar */
}

</style>
  
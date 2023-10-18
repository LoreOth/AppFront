<template>
  <div id="campus-form">
    <h1>Sede</h1>
    <div class="warning">
    <p>**Para crear un espacio, es obligatorio asignar una sede.**</p>
</div>
    <div class="form-inputs">
      <label>Nombre:</label>
      <input type="text" v-model="campusData.name" />

      <label>CUIT:</label>
      <input type="text" v-model="campusData.cuit" />
    
    </div>
    <button @click="submitForm">Enviar</button>
  </div>
</template>
  
<script>
import UserSessionManager from "../UserSessionManager";
export default {
  data() {
    return {
      campusData: {
        name: "",
        cuit: "",
        representativeId: null, 
        obligatorySpaceId: null 
      },
      spaceId: null,

    };
  },
  methods: {
    submitForm() {

      
      this.campusData.obligatorySpaceId = this.spaceId; // Establece el ID del espacio obligatorio
      this.campusData.representativeId = UserSessionManager.getSessionItem("id"); // Establece el ID del representante
  
      
      console.log("this.campusData.representativeId" + this.campusData.representativeId)


      fetch("http://localhost:8080/campus/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.campusData)
      })
      .then(response => response.json())
      .then(data => {
        this.$router.push({ name: 'mySpaces' });
      })
      .catch(error => {
        console.error("Error:", error);
      });
    }
  },
  mounted() {
    this.spaceId = this.$route.params.id;
  },
};

</script>
  
  <style>
#campus-form {
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

#campus-form h1,
#campus-form h2 {
  color: #ecf0f1;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
}

.warning {
  background-color: #e74c3c;
  color: white;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 1rem;
}

#campus-form .form-inputs {
  width: 100%;
  max-width: 300px;
  padding-bottom: 10px;
}

#campus-form .form-inputs label {
  display: block;
  font-size: 0.8rem;
  color: #bdc3c7;
  margin-bottom: 0.5rem;
}

#campus-form .form-inputs input {
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
  
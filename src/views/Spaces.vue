<template>
    <div id="spaces">
      <h1>Espacios Obligados</h1>
  
      <div class="header-row">
      <div class="column">Nombre</div>
      <div class="column">Provincia</div>
      <div class="column">CUIT</div>
    </div>

    <div v-for="space in spaces" :key="space.CUIT" class="row"  @click="fetchSedes(space)">
      <div class="column">{{ space.name }}</div>
      <div class="column province">{{ space.province }}</div>
      <div class="column">{{ space.CUIT }}</div>
    </div>
  
      <button @click="openEntityForm">Solicitar Entidad</button>
  
      <!-- Formulario para la entidad, inicialmente oculto -->
      <div v-if="showEntityForm">
        <!-- Asumiendo que el formulario de entidad tiene campos como nombre, provincia y cuit -->
        <div class="form-inputs">
          <label>Nombre:</label>
          <input type="text" v-model="newEntity.nombre"/>
          <label>Provincia:</label>
          <input type="text" v-model="newEntity.provincia"/>
          <label>CUIT:</label>
          <input type="text" v-model="newEntity.CUIT"/>
          <button @click="submitEntity">Enviar</button>
        </div>
      </div>
  
      <!-- Listado de sedes para un espacio obligado seleccionado -->
      <div v-if="selectedSpace" >
    <h2>Sedes :  {{ selectedSpace.name }}</h2>
    
    <!-- Encabezado de las sedes -->
    <div class="header-row">
        <div class="column">Nombre</div>
        <div class="column">Provincia</div>
    </div>

    <!-- Listado de sedes -->
    <div v-for="sede in selectedSpace.sedes" :key="sede.id" class="row">
        <div class="column">{{ sede.name }}</div>
        <div class="column province">{{ sede.province }}</div>
    </div>
  
        <button @click="representSede">Representar Sede</button>
        <button @click="openSedeForm">Crear Nueva Sede</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        spaces: [], // Lista de espacios obtenidos del back
        showEntityForm: false,
        newEntity: {
          name: '',
          province: '',
          CUIT: ''
        },
        selectedSpace: null // Espacio seleccionado para mostrar sedes
      };
    },
    methods: {

        fetchSpaces() {
        fetch('http://localhost:8080/obligatory-spaces')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            this.spaces = data;
        })
        .catch(error => {
            console.log('There was a problem with the fetch operation:', error.message);
        });
    },
    fetchSedes(space) {
        console.log(space);
        this.selectedSpace = space; // Establece el espacio seleccionado
        fetch(`http://localhost:8080/campus/${space.id}/sedes`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            this.selectedSpace.sedes = data;
        })
        .catch(error => {
            console.log('There was a problem fetching sedes:', error.message);
        });
    },
      openEntityForm() {
        this.showEntityForm = true;
      },
      submitEntity() {
        // Implementación para enviar la nueva entidad al backend
      },
      representSede() {
        // Implementación para representar sede
      },
      openSedeForm() {
        // Implementación para abrir el formulario de sede
      }
    },
    mounted() {
        this.fetchSpaces();
    }
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
  
width: 600px; 
  margin: 0 auto;

background-color: #2c3e50; /* Un color oscuro de fondo */
    
   
border-radius: 8px; /* Bordes redondeados */

box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23); /* Sombra para darle profundidad */
    
display: flex;
  flex-direction: column;
  align-items: center;  /* Alinea el contenido al centro horizontalmente */   
padding: 2rem; /* Padding alrededor del contenido */
}



#spaces h1,h2 {
    color: #ecf0f1; /* Color claro para el título */
    margin-bottom: 1rem; /* Espaciado debajo del título */
    font-size: 1.1rem;  /* Reduce el tamaño del título */
    
   
font-weight: bold; /* Texto en negrita */
}

#spaces .form-inputs {
  width: 100%;
  max-width: 300px;
  padding-bottom: 10px;
}


#spaces .column {
    flex: 1; 
    padding: 0 1rem; 
    text-align: center; 
    font-size: 0.8rem; /* Reducir el tamaño de fuente de las columnas para que sea un poco más pequeño */
}

#spaces .form-inputs label {
  padding-right: 10px;
  display: block; /* Hacer que el label sea un bloque para que ocupe toda la línea */
  font-size: 0.8rem;
   
color: #bdc3c7; /* Color más claro para el label */
    
   
margin-bottom: 0.5rem; /* Espaciado entre el label y el input */
}

.row:not(:last-child) {
  margin-bottom: 1rem;
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
    
   
background-color: #8e44ad; /* Color de fondo del botón */
    
   
color: #ecf0f1; /* Color del texto del botón */
    
   
border: none;
    
   
border-radius: 4px; /* Bordes redondeados para el botón */
    
   
cursor: pointer;
    transition: background-color 0.3s; /* Transición suave para el hover del botón */
}

button:hover {
    
   
    background-color: #9b59b6; /* Color de fondo más claro en hover */
    }
    .row, .header-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.column {
  flex: 1; /* Da igualdad de espacio a todas las columnas */
  padding: 0 1rem; /* Añade espacio a los lados de cada columna */
  text-align: center; /* Centra el texto de las columnas */
}

/* Estilos para los encabezados de las columnas */
.header-row .column {
  font-weight: bold;
  color: #bdc3c7;
  border-bottom: 1px solid #bdc3c7; /* Añade una línea debajo de los encabezados */
  padding-bottom: 0.5rem; /* Espacio debajo del encabezado */
  margin-bottom: 1rem; /* Separación entre los encabezados y las filas */
}
.column.province {
  white-space: nowrap;
}
.row .column {
  color: #ecf0f1; /* Cambia el color del texto a blanco */
  border-bottom: 1px solid #ecf0f1; /* Añade una línea delgada blanca en la parte inferior */
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}
.row {
    cursor: pointer; /* Cambia el cursor a una mano cuando pasa por encima de la fila */
}

.row, .header-row {
  /* ... (otros estilos que ya existen) ... */
  width: 80%;  /* Establece un ancho máximo para las filas. Puedes ajustar según tus necesidades. */
  margin-left: auto;
  margin-right: auto;  /* Centra las filas horizontalmente */
}

</style>
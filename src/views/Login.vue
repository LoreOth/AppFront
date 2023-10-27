<template>
  <div id="login">
    <div class="login-box">
      <h1>Login</h1>
      <div class="form-inputs">
        <label for="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          v-model="input.email"
          placeholder="Email"
        />
      </div>
      <div class="form-inputs">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="input.password"
          placeholder="Password"
        />
      </div>
      <button type="button" v-on:click="login()">Login</button>
    </div>
  </div>
</template>

<script>
import UserSessionManager from "../UserSessionManager";
export default {
  name: "LoginPage",

  data() {
    return {
      input: {
        email: "",
        password: "",
        roles: [],
      },
    };
  },
  methods: {
    login() {
      if (this.input.email !== "" && this.input.password !== "") {
        fetch("http://localhost:8080/register/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.input.email,
            password: this.input.password,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((err) => {
                throw err;
              });
            }
            return response.json();
          })
          .then((data) => {
            if (data.error) {
              console.log("Inicio de sesión fallido:", data.error);
            } else if (data.data && data.data.email) {
              console.log("Inicio de sesión exitoso");
              this.$emit("authenticated", true);
              this.$store.dispatch("authenticate", {
                isAuthenticated: true,
                email: data.data.email,
              });
              UserSessionManager.setSessionData({
                email: data.data.email,
                roles: data.data.roles,
                id: data.data.id,
              });
              this.$root.$emit('userLoggedIn', data.data);
              this.$router.push("/myhome");
              console.log(UserSessionManager.getSessionData());
            }
          })
          .catch((error) => {
            console.log(
              "Error al procesar la solicitud:",
              error.message || error
            );
          });
      }
    },
  },
};
</script>

<style>
#login {
  display: flex;
  flex-direction: column;

  justify-content: center;

  align-items: center;
  height: 100vh;
  width: 600px;

  width: 600px;
  margin: 0 auto;

  background-color: #2c3e50;

  border-radius: 8px;

  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23); /* Sombra para darle profundidad */

  padding: 2rem;
}

#login h1 {
  color: #ecf0f1; /* Color claro para el título */
  margin-bottom: 1rem; /* Espaciado debajo del título */

  font-weight: bold; /* Texto en negrita */
}

#login .form-inputs {
  width: 100%;
  max-width: 300px;
  padding-bottom: 10px;
}

#login .form-inputs label {
  padding-right: 10px;
  display: block; /* Hacer que el label sea un bloque para que ocupe toda la línea */

  color: #bdc3c7; /* Color más claro para el label */

  margin-bottom: 0.5rem; /* Espaciado entre el label y el input */
}

#login .form-inputs input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
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
</style>
<template>
    <div id="login">
      <div class="login-box">
        <h1>Acceso administrativo</h1>
        <h2>Administrador provincial o usuario certificante</h2>
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
          fetch("http://localhost:8080/staff/managment/register/login", {
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
        this.$store.dispatch('authenticate', true);
        localStorage.setItem("email", JSON.stringify({ email: this.input.email }));

        UserSessionManager.setSessionData({
            email: data.data.email, 
            roles: data.data.roles, 
            id: data.data.id, 
        });
        this.$root.$emit('userLoggedIn', data.data);
        if (data.data.roles.includes("ADMIN")) {
            this.$router.push("/adminManagment");
        } else if (data.data.roles.includes("CERT")) {
            this.$router.push("/certManagment");
        } else {
            this.$router.push("/myhome");
        }
        console.log(UserSessionManager.getSessionData());
    }
})
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
    width: 700px;
    margin: 0 auto;
    background-color: #34495e; /* Color más neutral */
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    padding: 2rem;
}

#login h1, #login h2 {
    color: #ecf0f1;
    margin-bottom: 1.5rem;
    align-content: center;
    font-weight: 500; /* No tan negrita */
}

#login h1 {
    font-size: 1.7rem;
}

#login h2 {
    font-size: 1.3rem;
}

#login .form-inputs {
    width: 100%;
    max-width: 280px;
    padding-bottom: 10px;
}

#login .form-inputs label {
    display: block;
    color: #bdc3c7;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
}

#login .form-inputs input {
    width: 100%;
    padding: 8px;
    margin-bottom: 8px;
    border: 1px solid #7f8c8d; /* Borde neutral */
    border-radius: 4px;
    font-size: 0.9rem;
    background-color: #ecf0f1;
    color: #2c3e50;
    box-sizing: border-box;
}

button {
    padding: 8px 12px;
    background-color: #7f8c8d; /* Color más neutral */
    color: #ecf0f1;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #95a5a6; /* Un poco más claro en hover */
}

  </style>
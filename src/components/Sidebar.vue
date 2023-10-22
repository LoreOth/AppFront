<template>
  <aside :class="`${is_expanded ? 'is-expanded' : ''}`">
    <div class="logo">
      <img :src="logoURL" alt="Vue" />
    </div>

    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <span class="material-icons">keyboard_double_arrow_right</span>
      </button>
    </div>

    <h3>Menu</h3>
    <div class="menu">
      <router-link to="/" class="button">
        <span class="material-icons">home</span>
        <span class="text">Home</span>
      </router-link>
      <router-link
        v-if="userRoles.includes('ROLE_ADMIN', 'REPRE_EO')"
        to="/MyHome"
        class="button"
      >
        <span class="material-icons">description</span>
        <span class="text">Perfil</span>
      </router-link>
      <router-link v-if="!isLoggedIn" to="/register" class="button">
        <span class="material-icons">login</span>
        <span class="text">Registrarse</span>
      </router-link>
      <router-link v-if="!isLoggedIn" to="/login" class="button">
        <span class="material-icons">login</span>
        <span class="text">Iniciar Sesión</span>
      </router-link>
      <router-link  v-if="userRoles.includes('USER')" to="/spaces" class="button">
        <span class="material-icons">group</span>
        <span class="text">Espacios</span>
      </router-link>
      <router-link v-if="!isLoggedIn" to="/managmentLogin" class="button">
        <span class="material-icons">group</span>
        <span class="text">Administración</span>
      </router-link>
      <router-link v-if="userRoles.includes('ADMIN')" to="/registerStaff" class="button">
        <span class="material-icons">login</span>
        <span class="text">Registrar Administrador Provincial / Certificante</span>
      </router-link>
      <router-link  v-if="userRoles.includes('ADMIN_PROV')" to="/requests" class="button">
        <span class="material-icons">description</span>
        <span class="text">Solicitudes</span>
      </router-link>
      <router-link  v-if="userRoles.includes('USER')" to="/mySpaces" class="button">
        <span class="material-icons">group</span>
        <span class="text">Mis espacios</span>
      </router-link>
      <router-link
        v-if="isLoggedIn"
        to="/"
        class="button"
        @click="ToggleLogoutPopup"
      >
        <span class="material-icons">logout</span>
        <div v-if="showLogoutPopup" class="logout-popup">
          <p class="logout-message">¿cerrar sesión?</p>
          <button @click="handleLogout">Sí, cerrar sesión</button>
          <button @click="showLogoutPopup = false">Cancelar</button>
        </div>
        <span class="text">Cerrar Sesión</span>
      </router-link>
      <router-link to="/contact" class="button">
        <span class="material-icons">email</span>
        <span class="text">Contact</span>
      </router-link>
    </div>

    <div class="flex"></div>

    <div class="menu">
      <router-link to="/settings" class="button">
        <span class="material-icons">settings</span>
        <span class="text">Settings</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup>



import { ref, onMounted } from "vue";
import logoURL from "../assets/logo.png";
import userSessionManager from "../UserSessionManager";

const is_expanded = ref(localStorage.getItem("is_expanded") === "true");
const userRoles = ref([]);
const isLoggedIn = ref(false); 

const fetchUserRoles = () => {
  const session = userSessionManager.getSessionData();
  if (session && session.roles) {
    userRoles.value = session.roles;
    isLoggedIn.value = true;
  } else {
    isLoggedIn.value = false;
  }
};

const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value;
  localStorage.setItem("is_expanded", is_expanded.value);
};

const showLogoutPopup = ref(false);

const ToggleLogoutPopup = () => {
  showLogoutPopup.value = !showLogoutPopup.value;
};

const handleLogout = () => {
  showLogoutPopup.value = false;
  userSessionManager.clearSession();
  isLoggedIn.value = false;
};

onMounted(fetchUserRoles);
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;

  background-color: var(--dark);
  color: var(--light);

  width: calc(2rem + 32px);
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;

  transition: 0.2s ease-in-out;

  .flex {
    flex: 1 1 0%;
  }

  .logo {
    margin-bottom: 1rem;

    img {
      width: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    transition: 0.2s ease-in-out;

    .menu-toggle {
      transition: 0.2s ease-in-out;
      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--primary);
          transform: translateX(0.5rem);
        }
      }
    }
  }

  h3,
  .button .text {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  h3 {
    color: var(--grey);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;

      transition: 0.2s ease-in-out;
      padding: 0.5rem 1rem;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-in-out;
      }
      .text {
        color: var(--light);
        transition: 0.2s ease-in-out;
      }

      &:hover {
        background-color: var(--dark-alt);

        .material-icons,
        .text {
          color: var(--primary);
        }
      }

      &.router-link-exact-active {
        background-color: var(--dark-alt);
        border-right: 5px solid var(--primary);

        .material-icons,
        .text {
          color: var(--primary);
        }
      }
    }
  }

  .footer {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    p {
      font-size: 0.875rem;
      color: var(--grey);
    }
  }

  &.is-expanded {
    width: var(--sidebar-width);

    .menu-toggle-wrap {
      top: -3rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    h3,
    .button .text {
      opacity: 1;
    }

    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }

    .footer {
      opacity: 0;
    }
  }

  @media (max-width: 1024px) {
    position: absolute;
    z-index: 99;
  }
  .logout-message {
    font-size: 0.875rem;
    color: var(--grey);
  }
}
</style>
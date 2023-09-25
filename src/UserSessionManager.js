class UserSessionManager {
    constructor() {
        this.SESSION_KEY = 'user_session_data';
    }

    // Guardar datos de sesióna
    setSessionData(data) {
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(data));
    }

    // Obtener datos de sesión
    getSessionData() {
        const sessionData = localStorage.getItem(this.SESSION_KEY);
        return sessionData ? JSON.parse(sessionData) : null;
    }

    // Establecer un dato específico de la sesión (por clave)
    setSessionItem(key, value) {
        const sessionData = this.getSessionData() || {};
        sessionData[key] = value;
        this.setSessionData(sessionData);
    }

    // Obtener un dato específico de la sesión (por clave)
    getSessionItem(key) {
        const sessionData = this.getSessionData();
        return sessionData ? sessionData[key] : null;
    }

    // Borrar datos de sesión
    clearSession() {
        localStorage.removeItem(this.SESSION_KEY);
    }

    // Verificar si hay datos de sesión almacenados
    hasSession() {
        return !!this.getSessionData();
    }
}

// Instancia para usar en otros archivos o módulos
const userSessionManager = new UserSessionManager();

export default userSessionManager;
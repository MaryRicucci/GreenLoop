const BASE_URL = "http://localhost:3000";

// Funzione helper per tutte le chiamate
async function request(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  // Se la sessione è scaduta → 401
  if (res.status === 401) {
    return { unauthorized: true };
  }

  return res.json();
}

// LOGIN
export function login(email, password) {
  return request("/login", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ email, password })
  });
}

// REGISTER
export function register(nome, email, password) {
  return request("/register", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ nome, email, password })
  });
}

// DASHBOARD
export function getDashboard() {
  return request("/utente/me");
}

// MISSIONI
export function getMissioni() {
  return request("/missioni");
}

// PREMI
export function getPremi() {
  return request("/premi");
}

// STORICO
export function getStorico() {
  return request("/storico");
}

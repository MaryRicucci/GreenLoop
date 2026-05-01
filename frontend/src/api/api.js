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

export function getMissioni(id){
  return request('/missioni/${id}');
}

// PREMI
export function getPremi() {
  return request("/premi");
}

// STORICO
export function getStorico() {
  return request("/storico");
}

//Upload foto
export async function uploadFoto(missioneId, file) {
  const formData = new FormData();
  formData.append("foto", file);

  return fetch(`${BASE_URL}/missioni/${missioneId}/upload`, {
    method: "POST",
    credentials: "include",
    body: formData
  }).then(async (res) => {
    if (res.status === 401) return { unauthorized: true };
    return res.json();
  });
}

export function getMissioniCompletate(){
  return request("/missioni/completate");
}
//Get premi
export function getPremi(){
  return request("/premi");
}
//Get premi/:id
export async  function getPremio(id){
  const res = await request("/premi");
  if(res.unauthorized){
    return res;
  }
  const premio = res.premi?.find(p=>p.id_Premio===id);
  if(!premio){
    return {
      succcess : false ,
      nessage: "Premio non trovato"
    };
  }
  return {success: true, premio};
}
//Riscatta premio
export function riscattaPremio(id_Premio){
  return request("/premi/riscatta");
}
export function getStorico(){
  return request("/storico");
}

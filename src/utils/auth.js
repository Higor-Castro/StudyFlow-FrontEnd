// Nome da chave de criptografia
const TOKEN_KEY = 'Studyflow_token'


// Salva o token JWT no navegador
export function saveToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

// Recupera o token JWT do navegador
export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

// Remove o token JWT do navegador
export function removeToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

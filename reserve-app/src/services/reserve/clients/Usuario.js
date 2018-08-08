export default class Usuario {
  constructor(axios) {
    this.axios = axios
    this.URL_BASE = '/usuario'
  }

  registrarUsuario(comando) {   
    const URL = `${this.URL_BASE}`
    return this.axios.post(URL, comando)
  }

  logarUsuario(usuario) {
    const URL = `${this.URL_BASE}/login`
    return this.axios.post(URL, usuario)
  }

  listarCartao(usuarioId) {
    const URL = `${this.URL_BASE}/${usuarioId}/cartoes`
    return this.axios.get(URL)
  }
}
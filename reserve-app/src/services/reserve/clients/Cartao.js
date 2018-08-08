export default class Cartao {
  constructor(axios) {
    this.axios = axios
    this.URL_BASE = '/cartao'
  }

  salvarCartao(usuarioId, cartao) {
    const URL = `${this.URL_BASE}/usuario/${usuarioId}`    
    return this.axios.post(URL, cartao)
  }
}
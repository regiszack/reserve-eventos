export default class Pedido {
  constructor(axios) {
    this.axios = axios
    this.URL_BASE = '/pedido'
  }

  efetuarPedido(comando, idUsuario) {  
    const URL = `${this.URL_BASE}/usuario/${idUsuario}`    
    return this.axios.post(URL, comando)
  }
}
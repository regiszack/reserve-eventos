export default class Evento {
    constructor(axios) {
      this.axios = axios
      this.URL_BASE = '/evento'
    }
  
    listarEventos() {   
      return this.axios.get(this.URL_BASE)
    }
  
    obterEvento(id) {
      const URL = `${this.URL_BASE}/${id}`
      return this.axios.get(URL)
    }
  }
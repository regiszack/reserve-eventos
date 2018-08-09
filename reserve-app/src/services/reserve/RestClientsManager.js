import axios from 'axios'
import { Cartao, Evento, Pedido, Usuario } from './clients'

export default class RestClientsManager {

  constructor() {
    
    this.config = {
      "baseURL": 'http://localhost:58951/api',
    }

    this.axios = axios.create(this.config)

    this.axios.interceptors.response.use(
      resposta => {       
        return resposta
      },
      erro => {
        return Promise.reject(erro)
        }
    )

    this.cartaoClient = new Cartao(this.axios)
    this.eventoClient = new Evento(this.axios)
    this.pedidoClient = new Pedido(this.axios)
    this.usuarioClient = new Usuario(this.axios)
  }

  get cartao() {
    return this.cartaoClient
  }

  get evento() {
    return this.eventoClient
  }

  get pedido() {
    return this.pedidoClient
  }

  get usuario() {
    return this.usuarioClient
  }
}

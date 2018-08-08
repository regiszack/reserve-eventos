const DEBUG = [
  {
    "caminho": "/",
    "caminhoCompleto": "/",
    "componente": "EventoListar",
    "filhos": [
      {
        "caminho": "evento",
        "caminhoCompleto": "/evento/:id",
        "componente": "EventoDetalhe",
        "filhos": [
          {
            "caminho": "reserve",
            "caminhoCompleto": "/usuario",
            "componente": "",
            "filhos": [
              {
                "caminho": "cadastro",
                "caminhoCompleto": "/usuario/cadastro",
                "componente": "UsuarioCadastro",
                "filhos": [],
                "folha": false,
                "icone": "plus",
                "id": 14,
                "paiId": 13,
                "raiz": false,
                "rotulo": "Cadastro"
              },
              {
                "caminho": "entrar",
                "caminhoCompleto": "/usuario/login",
                "componente": "UsuarioLogin",
                "filhos": [

                ],
                "folha": false,
                "icone": null,
                "id": 17,
                "paiId": 13,
                "raiz": false,
                "rotulo": "Entrar"
              }
            ],
            "folha": false,
            "icone": "user",
            "id": 13,
            "paiId": 2,
            "raiz": false,
            "rotulo": "Usuario"
          }
        ],
        "folha": false,
        "icone": "",
        "id": 2,
        "paiId": 1,
        "raiz": false,
        "rotulo": "Evento"
      },
      {
        "caminho": "pedido",
        "caminhoCompleto": "/pedido/",
        "componente": "Pedido",
        "filhos": [],
        "folha": false,
        "icone": "",
        "id": 2,
        "paiId": 1,
        "raiz": false,
        "rotulo": "Pedido"
      }
    ],
    "folha": false,
    "icone": "home",
    "id": 1,
    "paiId": null,
    "raiz": true,
    "rotulo": "Reserve"
  }
]

const MAiS = window.MAiS || {}
const ARVORE_ROTAS = MAiS.ROTAS || DEBUG

const rotaPossuiFilhos = rota => (rota.filhos && rota.filhos.length > 0)

const achatar = rotas => {
  return rotas.reduce((inicial, atual) => {
    return (rotaPossuiFilhos(atual)) ?
      inicial.concat(atual, achatar(atual.filhos)) :
      inicial.concat(atual)
  }, [])
}

const ROTAS = achatar(ARVORE_ROTAS)

export { ARVORE_ROTAS, ROTAS }
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Entidades;
using WebApi.Helpers;

namespace WebApi.AcessoDados
{
    public class CartaoRepository : ICartaoRepository
    {
        private readonly AppContext _appContext;

        public CartaoRepository(AppContext appContext)
        {
            _appContext = appContext;
        }

        public void Salvar(int IdUsuario, Cartao cartao)
        {
            cartao.Usuario = _appContext.Usuarios.FirstOrDefault(p => p.Id == IdUsuario);
            cartao.Numero = CriptografarDados.Criptografar(cartao.Numero);
            cartao.Cvv = CriptografarDados.Criptografar(cartao.Cvv);
            
            _appContext.Cartoes.Add(cartao);
            _appContext.SaveChanges();
        }
    }
}

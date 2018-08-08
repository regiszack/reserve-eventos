using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Entidades;

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

            _appContext.Cartoes.Add(cartao);
            _appContext.SaveChanges();
        }
    }
}

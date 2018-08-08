using System.Linq;
using WebApi.Entidades;

namespace WebApi.AcessoDados
{
    public interface ICartaoRepository
    {
        void Salvar(int IdUsuario, Cartao cartao);
    }
}
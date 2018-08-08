using System.Linq;
using WebApi.Entidades;
using WebApi.Helpers;

namespace WebApi.AcessoDados
{
    public interface IUsuarioRepository
    {
        IQueryable<Cartao> ListarCartaoPorUsuario(int IdUsuario);
        void Salvar(CriarUsuarioComando comando);
        Usuario Login(string login); 
    }
}
using System.Collections.Generic;
using WebApi.Entidades;

namespace WebApi.AcessoDados
{
    public interface IEventoRepository
    {
        List<Evento> ListarEventos();

        Evento ObterEvento(int id);

        void Salvar(Evento evento);
    }
}
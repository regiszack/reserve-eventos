using System.Collections.Generic;
using System.Linq;
using WebApi.Entidades;

namespace WebApi.AcessoDados
{
    public class EventoRepository : IEventoRepository
    {
        private readonly AppContext _appContext;

        public EventoRepository(AppContext appContext)
        {
            _appContext = appContext;
        }

        public List<Evento> ListarEventos()
        {
            return _appContext.Eventos.ToList();
        }

        public Evento ObterEvento(int id)
        {
            return _appContext.Eventos.FirstOrDefault(p => p.Id == id);
        }

        public void Salvar(Evento evento)
        {
            _appContext.Eventos.Add(evento);
            _appContext.SaveChanges();
        }
    }
}

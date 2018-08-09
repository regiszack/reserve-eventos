using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entidades;
using WebApi.Helpers;

namespace WebApi.AcessoDados
{
    public class PedidoRepository : IPedidoRepository
    {
        private readonly AppContext _appContext;

        public PedidoRepository(AppContext appContext)
        {
            _appContext = appContext;
        }

        public void Salvar(CriarPedidoComando comando, int idUsuario)
        {
            Usuario usuario = _appContext.Usuarios.FirstOrDefault(p => p.Id == idUsuario);
            Evento evento = _appContext.Eventos.FirstOrDefault(p => p.Nome == comando.NomeEvento);

            Pedido pedido = new Pedido();
            pedido.DataPedido = DateTime.Now;
            pedido.Usuario = usuario;
            pedido.Evento = evento;
            pedido.QuantidadeIngresso = comando.QuantidadeIngresso;

            _appContext.Pedidos.Add(pedido);

            EnviarEmail enviarEmail = new EnviarEmail();
            enviarEmail.SendMail(usuario);

            _appContext.SaveChanges();
        }
    }
}

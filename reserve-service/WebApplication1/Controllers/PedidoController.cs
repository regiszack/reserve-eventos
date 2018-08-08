using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.AspNetCore.Cors;
using WebApi.AcessoDados;
using WebApi.Helpers;

namespace WebApi.Controllers
{
    [Route("api/[Controller]")]
    [EnableCors("MyPolicy")]
    public class PedidoController : Controller
    {
        private readonly IPedidoRepository _pedidoRepository;

        public PedidoController(IPedidoRepository eventoRepository)
        {
            _pedidoRepository = eventoRepository;
        }

        [HttpPost("usuario/{idUsuario:int}")]
        public IActionResult CriarPedido([FromBody]QuantEEventoCommand comando, int idUsuario)
        {
            try
            {
                _pedidoRepository.Salvar(comando, idUsuario);
                return Created("/api/pedido", comando);

            }
            catch (Exception e)
            {
                return BadRequest($"Erro: {e.Message}");
            }
        }
    }
}
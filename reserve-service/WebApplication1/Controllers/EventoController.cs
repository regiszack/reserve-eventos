using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.AspNetCore.Cors;
using WebApi.AcessoDados;
using WebApi.Entidades;

namespace WebApi.Controllers
{
    [Route("api/[Controller]")]
    [EnableCors("MyPolicy")]
    public class EventoController : Controller
    {
        private readonly IEventoRepository _eventoRepository;

        public EventoController(IEventoRepository eventoRepository)
        {
            _eventoRepository = eventoRepository;
        }

        [HttpGet]
        public IActionResult ObterEventos()
        {
            try
            {
                return Ok(_eventoRepository.ListarEventos());

            }catch(Exception e)
            {
                return BadRequest($"Erro: {e.Message}");
            }
        }

        [HttpGet("{id:int}")]
        public IActionResult ObterEvento(int id)
        {
            try
            {
                var evento = _eventoRepository.ObterEvento(id);
                return Ok(evento);

            }
            catch (Exception e)
            {
                return BadRequest($"Erro: {e.Message}");
            }
        }

        [HttpPost]
        public IActionResult CriarEvento([FromBody]Evento evento)
        {
            try
            {
                _eventoRepository.Salvar(evento);
                return Created("/api/evento", evento);

            }
            catch (Exception e)
            {
                return BadRequest($"Erro: {e.Message}");
            }
        }
    }
}

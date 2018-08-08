using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using WebApi.AcessoDados;
using WebApi.Entidades;

namespace WebApi.Controllers
{
    [Route("api/[Controller]")]
    [EnableCors("MyPolicy")]
    public class CartaoController: Controller
    {
        private readonly ICartaoRepository _cartaoRepository;

        public CartaoController(ICartaoRepository cartaoRepository)
        {
            _cartaoRepository = cartaoRepository;
        }

        [HttpPost("usuario/{idUsuario:int}")]
        public IActionResult Salvar(int idUsuario, [FromBody] Cartao cartao)
        {
            try
            {
                _cartaoRepository.Salvar(idUsuario, cartao);
                return Created("/api/cartao", cartao);
            }
            catch(Exception e)
            {
                return BadRequest($"Erro: {e.Message}");
            }
        }
    }

}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using WebApi.AcessoDados;
using WebApi.AcessoDados.Entidades;
using WebApi.Entidades;
using WebApi.Helpers;

namespace WebApi.Controllers
{
    [Route("api/[Controller]")]
    [EnableCors("MyPolicy")]
    public class UsuarioController: Controller
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public UsuarioController(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        [HttpPost]
        public IActionResult CriarUsuario([FromBody]CriarUsuarioComando comando)
        {
            try
            {
                _usuarioRepository.Salvar(comando);
                return Created("/api/usuario", comando);

            }
            catch (Exception e)
            {
                return BadRequest($"Erro: {e.Message}");
            }
        }

        [Route("{idUsuario:int}/cartoes")]
        public IActionResult ListarCartoesPorUsuario(int idUsuario)
        {
            try
            {
                return Ok(_usuarioRepository.ListarCartaoPorUsuario(idUsuario));
            }
            catch (Exception e)
            {
                return BadRequest($"Erro: {e.Message}");
            }
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public object Login(
            [FromBody]Usuario usuario,
            [FromServices]IUsuarioRepository iUsuarioRepository,
            [FromServices]ConfiguracaoLogin configuracaoLogin,
            [FromServices]ConfiguracoesToken configuracoesToken)
        {
            bool credenciaisValidas = false;
            Usuario usuarioLogado = new Usuario();

            if (usuario != null && !String.IsNullOrWhiteSpace(usuario.Login))
            {
                var usuarioBase = iUsuarioRepository.Login(usuario.Login);
                credenciaisValidas = (usuarioBase != null &&
                    usuario.Login == usuarioBase.Login &&
                    usuario.Senha == usuarioBase.Senha);

                usuarioLogado.Id = usuarioBase.Id;
                usuarioLogado.Nome = usuarioBase.Nome;
            }

            if (credenciaisValidas)
            {
                ClaimsIdentity identity = new ClaimsIdentity(
                    new GenericIdentity(usuario.Login, "Login"),
                    new[] {
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
                        new Claim(JwtRegisteredClaimNames.UniqueName, usuario.Login)
                    }
                );

                DateTime dataCriacao = DateTime.Now;
                DateTime dataExpiracao = dataCriacao +
                    TimeSpan.FromSeconds(configuracoesToken.Seconds);

                var handler = new JwtSecurityTokenHandler();
                var securityToken = handler.CreateToken(new SecurityTokenDescriptor
                {
                    Issuer = configuracoesToken.Issuer,
                    Audience = configuracoesToken.Audience,
                    SigningCredentials = configuracaoLogin.SigningCredentials,
                    Subject = identity,
                    NotBefore = dataCriacao,
                    Expires = dataExpiracao
                });
                var token = handler.WriteToken(securityToken);

                return new
                {
                    authenticated = true,
                    created = dataCriacao.ToString("yyyy-MM-dd HH:mm:ss"),
                    expiration = dataExpiracao.ToString("yyyy-MM-dd HH:mm:ss"),
                    accessToken = token,
                    message = "OK",
                    usuarioLogado
                };
            }
            else
            {
                return new
                {
                    authenticated = false,
                    message = "Falha ao autenticar"
                };
            }
        }
    }
}

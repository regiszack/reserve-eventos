using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entidades;
using WebApi.Helpers;

namespace WebApi.AcessoDados
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly AppContext _appContext;

        public UsuarioRepository(AppContext appContext)
        {
            _appContext = appContext;
        }

        public void Salvar(CriarUsuarioComando comando)
        {
            Endereco endereco = CriarEndereco(comando);

            _appContext.Enderecos.Add(endereco);
            _appContext.SaveChanges();

            Endereco enderecoSalvo = _appContext.Enderecos.FirstOrDefault(p => p.Cep == endereco.Cep && p.Numero == endereco.Numero);

            Usuario usuario = CriarUsuario(comando, enderecoSalvo);

            _appContext.Usuarios.Add(usuario);
            _appContext.SaveChanges();
        }

        public List<String> ListarCartaoPorUsuario(int IdUsuario)
        {
            Usuario usuario = _appContext.Usuarios.FirstOrDefault(p => p.Id == IdUsuario);
            IQueryable<Cartao> cartoes = _appContext.Cartoes.Where(p => p.Usuario == usuario);

            List<String> numeroCartao = new List<String>();

            for(int i = 0; i < cartoes.ToArray().Length; i++)
            {
                Cartao cartao = new Cartao();
                cartao.Numero = CriptografarDados.Desciptografar(cartoes.ToArray()[i].Numero);
                numeroCartao.Add(cartao.Numero);
            }

            return numeroCartao;
        }

        public Usuario Login(string login)
        {
            {
                return _appContext.Usuarios.FirstOrDefault(p => p.Login == login);
            }
        }

        private Endereco CriarEndereco(CriarUsuarioComando comando)
        {
            Endereco endereco = new Endereco();
            endereco.Logradouro = comando.Logradouro;
            endereco.Numero = comando.Numero;
            endereco.Complemento = comando.Complemento;
            endereco.Cep = comando.Cep;
            endereco.Cidade = comando.Cidade;
            endereco.Estado = comando.Estado;

            return endereco;
        }

        private Usuario CriarUsuario(CriarUsuarioComando comando, Endereco enderecoSalvo)
        {
            Usuario usuario = new Usuario();
            usuario.Nome = comando.Nome;
            usuario.Login = comando.Login;
            usuario.Senha = comando.Senha;
            usuario.Cpf = comando.Cpf;
            usuario.DataNascimento = comando.DataNascimento;
            usuario.Sexo = comando.Sexo;
            usuario.Email = comando.Email;
            usuario.Endereco = enderecoSalvo;

            return usuario;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Helpers
{
    public class CriarUsuarioComando
    {
        public string Nome { get; set; }
        public string Login { get; set; }
        public string Senha { get; set; }
        public long Cpf { get; set; }
        public DateTime DataNascimento { get; set; }
        public int Sexo { get; set; }
        public string Email { get; set; }
        public string Logradouro { get; set; }
        public string Complemento { get; set; }
        public int Numero { get; set; }
        public long Cep { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
    }
}

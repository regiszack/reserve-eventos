using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Entidades
{
    public class Endereco
    {
        public int Id { get; set; }
        public string Logradouro { get; set; }
        public string Complemento { get; set; }
        public int Numero { get; set; }
        public long Cep { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
    }
}
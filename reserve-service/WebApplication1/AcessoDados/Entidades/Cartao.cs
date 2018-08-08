using Newtonsoft.Json;

namespace WebApi.Entidades
{
    public class Cartao
    {
        public int Id { get; set; }

        public long Numero { get; set; }

        public string Validade { get; set; }

        public int Cvv { get; set; }
        public string Titular { get; set; }

        [JsonIgnore]
        public Usuario Usuario { get; set; }
    }
}

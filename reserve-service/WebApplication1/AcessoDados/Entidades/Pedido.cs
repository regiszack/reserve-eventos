using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace WebApi.Entidades
{
    public class Pedido
    {
        public int Id { get; set; }
        public DateTime DataPedido { get; set; }

        [JsonIgnore]
        public Usuario Usuario { get; set; }

        public Evento Evento { get; set; }
        public int QuantidadeIngresso{ get;set; }
    }
}

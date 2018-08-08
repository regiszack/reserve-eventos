using System;
using System.Collections.Generic;

namespace WebApi.Entidades
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Login { get; set; }
        public string Senha { get; set; }
        public long Cpf { get; set; }
        public DateTime DataNascimento { get; set; }
        public int Sexo { get; set; }
        public string Email { get; set; }

        public Endereco Endereco { get; set; }

        public ICollection<Cartao> Cartoes { get; set; }
        public ICollection<Pedido> Pedidos { get; set; }
    }
}

namespace WebApi.Entidades
{
    public class Evento
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public decimal Preco { get; set; }
        public string Local { get; set; }
        public string DataInicio { get; set; }
        public string DataFim { get; set; }
        public string Imagem { get; set; }
        public string Producao { get; set; }
        public string FaixaEtaria { get; set; }
        public string Horario { get; set; }
    }
}


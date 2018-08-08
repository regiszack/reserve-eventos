using System;
using WebApi.Entidades;
using WebApi.Helpers;

namespace WebApi.AcessoDados
{
    public interface IPedidoRepository
    {
        void Salvar(QuantEEventoCommand comando, int idUsuario);
    }
}
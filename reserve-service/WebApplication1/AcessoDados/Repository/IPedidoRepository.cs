using System;
using WebApi.Entidades;
using WebApi.Helpers;

namespace WebApi.AcessoDados
{
    public interface IPedidoRepository
    {
        void Salvar(CriarPedidoComando comando, int idUsuario);
    }
}
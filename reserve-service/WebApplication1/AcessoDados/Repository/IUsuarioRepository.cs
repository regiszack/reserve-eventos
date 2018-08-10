using System;
using System.Collections.Generic;
using WebApi.Entidades;
using WebApi.Helpers;

namespace WebApi.AcessoDados
{
    public interface IUsuarioRepository
    {
        List<String> ListarCartaoPorUsuario(int IdUsuario);
        void Salvar(CriarUsuarioComando comando);
        Usuario Login(string login); 
    }
}
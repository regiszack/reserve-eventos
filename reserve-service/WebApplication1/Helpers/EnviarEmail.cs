using System.Net;
using System.Net.Mail;
using WebApi.Entidades;

namespace WebApi.Helpers
{
    public class EnviarEmail
    {
        public void SendMail(Usuario usuario, CriarPedidoComando comando)
        {
            MailMessage email = new MailMessage();
            email.From = new MailAddress("testereserve@gmail.com");
            SmtpClient smtp = new SmtpClient();
            smtp.Port = 587;
            smtp.EnableSsl = true;
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new NetworkCredential(email.From.Address, "Testereserve#");
            smtp.Host = "smtp.gmail.com";

            email.To.Add(new MailAddress(usuario.Email));

            email.IsBodyHtml = true;
            string st = "Ola!, Voce acabou de comprar "+ comando.QuantidadeIngresso + " ingressos para " + comando.NomeEvento + " na Reserve Eventos, divirta-se!!";

            email.Body = st;
            smtp.Send(email);
        }
    }
}

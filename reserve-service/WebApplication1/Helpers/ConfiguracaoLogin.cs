using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;

namespace WebApi.Helpers
{
    public class ConfiguracaoLogin
    {
        public SecurityKey Key { get; }
        public SigningCredentials SigningCredentials { get; }

        public ConfiguracaoLogin()
        {
            using (var provider = new RSACryptoServiceProvider(2048))
            {
                Key = new RsaSecurityKey(provider.ExportParameters(true));
            }

            SigningCredentials = new SigningCredentials(
                Key, SecurityAlgorithms.RsaSha256Signature);
        }
    }
}

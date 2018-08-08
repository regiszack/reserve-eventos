using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WebApi.AcessoDados;
using WebApi.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using WebApi.AcessoDados.Entidades;
using Microsoft.Extensions.Logging;

namespace WebApi
{
    public class Startup
    {
        public IConfiguration _configuration { get; }
        public object RecurringJob { get; private set; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsetting.json", optional: true, reloadOnChange: true)
                .AddJsonFile("config.json", optional: true, reloadOnChange: true);

            _configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            var configuracaoLogin = new ConfiguracaoLogin();
            services.AddSingleton(configuracaoLogin);

            var configuracoesToken = new ConfiguracoesToken();
            new ConfigureFromConfigurationOptions<ConfiguracoesToken>(
                _configuration.GetSection("TokenConfigurations"))
                    .Configure(configuracoesToken);
            services.AddSingleton(configuracoesToken);


            services.AddAuthentication(authOptions =>
            {
                authOptions.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                authOptions.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(bearerOptions =>
            {
                var paramsValidation = bearerOptions.TokenValidationParameters;
                paramsValidation.IssuerSigningKey = configuracaoLogin.Key;
                paramsValidation.ValidAudience = configuracoesToken.Audience;
                paramsValidation.ValidIssuer = configuracoesToken.Issuer;

                paramsValidation.ValidateIssuerSigningKey = true;

                paramsValidation.ValidateLifetime = true;

                paramsValidation.ClockSkew = TimeSpan.Zero;
            });


            services.AddAuthorization(auth =>
            {
                auth.AddPolicy("Bearer", new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                    .RequireAuthenticatedUser().Build());
            });

            var sqlConnection = _configuration.GetConnectionString("WebAppDB");
            services.AddDbContext<AppContext>(options => options.UseSqlServer(sqlConnection, b => b.MigrationsAssembly("WebApi")));
            
            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
                {
                builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
            }));

            services.AddMvc();
            services.AddScoped<IEventoRepository, EventoRepository>();
            services.AddScoped<ICartaoRepository, CartaoRepository>();
            services.AddScoped<IPedidoRepository, PedidoRepository>();
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseAuthentication();
            app.UseMvc();
            app.UseMvcWithDefaultRoute();
        }
    }
}

using CustomerWebApi.Contracts;
using CustomerWebApi.Entities;
using CustomerWebApi.Repositories;
using Microsoft.EntityFrameworkCore;

namespace CustomerWebApi.Extensions
{
    public static class ServiceExtensions
    {

        public static void ConfigureIISIntegration(this IServiceCollection services)
        {
            services.Configure<IISOptions>(options =>
            {

            });
        }

        public static void ConfigureSqlContext(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<ApplicationContext>(opts =>
                opts.UseSqlServer(config.GetConnectionString("sqlConnection")));
        }
        public static void ConfigureRepositoryServices(this IServiceCollection services)
        {
            services.AddScoped<IRepositoryManager, RepositoryManager>();
        }
    }
}

using DataService;
using DataService.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PlanPoker.Models;
using PlanPoker.Services;

namespace PlanPoker
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddTransient<RoomService>();
            services.AddSingleton<InMemoryRoomRepository>();

            services.AddTransient<UserService>();
            services.AddSingleton<InMemoryUserRepository>();

            services.AddTransient<MarkService>();
            services.AddSingleton<InMemoryMarkRepository>();

            services.AddTransient<DiscussionService>();
            services.AddSingleton<InMemoryDiscussionRepository>();

            services.AddTransient<DeckService>();
            services.AddSingleton<InMemoryDeckRepository>();

            services.AddTransient<CardService>();
            services.AddSingleton<InMemoryCardRepository>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

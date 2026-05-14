using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace api.Data
{
    public class ApplicationDBContextFactory
        : IDesignTimeDbContextFactory<ApplicationDBContext>
    {
        public ApplicationDBContext CreateDbContext(string[] args)
        {
            var optionsBuilder =
                new DbContextOptionsBuilder<ApplicationDBContext>();

            optionsBuilder.UseNpgsql(
                "Host=localhost;Port=5432;Database=finshark_db;Username=postgres;Password=123456"
            );

            return new ApplicationDBContext(optionsBuilder.Options);
        }
    }
}
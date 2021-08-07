using MapApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MapApi.Models
{
    public class AppDbContext : DbContext
    {
        // Options seçeneği ne kullanılacağını belirtiyor(sqlserver, postgre vs.)
        // Api veya Web'in startup'ında bu option doldurulacak
        public DbSet<ClickInfo> ClickInfos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=DESKTOP-55PMRA7\SQLEXPRESS;Initial Catalog=MapApp;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
        }
    }
}

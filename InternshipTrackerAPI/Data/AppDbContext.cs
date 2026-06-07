using InternshipTrackerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace InternshipTrackerAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Internship> Internships => Set<Internship>();
    public DbSet<Skill> Skills => Set<Skill>();
    public DbSet<InternshipSkill> InternshipSkills => Set<InternshipSkill>();
    public DbSet<UserSkill> UserSkills => Set<UserSkill>();
}

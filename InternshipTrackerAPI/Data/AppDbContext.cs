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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Skill>(entity =>
        {
            entity.HasKey(e => e.SkillId);
            entity.Property(e => e.SkillName).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.HasIndex(e => e.SkillName).IsUnique();
        });

        modelBuilder.Entity<UserSkill>(entity =>
        {
            entity.HasKey(e => e.UserSkillId);
            entity.Property(e => e.YearsOfExperience).HasColumnType("decimal(4,2)");
            entity.Property(e => e.ProficiencyLevel).HasConversion<string>().HasMaxLength(20);

            entity.HasOne(e => e.User)
                .WithMany(u => u.UserSkills)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Skill)
                .WithMany(s => s.UserSkills)
                .HasForeignKey(e => e.SkillId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<InternshipSkill>(entity =>
        {
            entity.HasKey(e => e.InternshipSkillId);
            entity.Property(e => e.IsRequired).HasDefaultValue(false);

            entity.HasOne(e => e.Internship)
                .WithMany(i => i.InternshipSkills)
                .HasForeignKey(e => e.InternshipId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Skill)
                .WithMany(s => s.InternshipSkills)
                .HasForeignKey(e => e.SkillId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}

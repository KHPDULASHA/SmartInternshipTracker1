using System.ComponentModel.DataAnnotations;

namespace InternshipTrackerAPI.Models;

public class UserSkill
{
    [Key]
    public int UserSkillId { get; set; }

    [Required]
    public int UserId { get; set; }

    [Required]
    public int SkillId { get; set; }

    [Required]
    public ProficiencyLevel ProficiencyLevel { get; set; }

    [Range(0, 60)]
    public decimal YearsOfExperience { get; set; }

    public User User { get; set; } = null!;
    public Skill Skill { get; set; } = null!;
}

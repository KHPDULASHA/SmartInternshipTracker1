using System.ComponentModel.DataAnnotations;

namespace InternshipTrackerAPI.Models;

public class InternshipSkill
{
    [Key]
    public int InternshipSkillId { get; set; }

    [Required]
    public int InternshipId { get; set; }

    [Required]
    public int SkillId { get; set; }

    public bool IsRequired { get; set; }

    public Internship Internship { get; set; } = null!;
    public Skill Skill { get; set; } = null!;
}

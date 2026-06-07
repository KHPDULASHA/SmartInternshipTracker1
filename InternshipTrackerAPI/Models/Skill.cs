using System.ComponentModel.DataAnnotations;

namespace InternshipTrackerAPI.Models;

public class Skill
{
    [Key]
    public int SkillId { get; set; }

    [Required]
    [StringLength(100)]
    public string SkillName { get; set; } = string.Empty;

    [StringLength(500)]
    public string? Description { get; set; }

    public ICollection<UserSkill> UserSkills { get; set; } = new List<UserSkill>();
    public ICollection<InternshipSkill> InternshipSkills { get; set; } = new List<InternshipSkill>();
}

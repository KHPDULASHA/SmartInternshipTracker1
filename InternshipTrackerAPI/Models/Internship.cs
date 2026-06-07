using System.ComponentModel.DataAnnotations;

namespace InternshipTrackerAPI.Models;

public class Internship
{
    [Key]
    public int InternshipId { get; set; }

    [Required]
    [StringLength(200)]
    public string CompanyName { get; set; } = string.Empty;

    [Required]
    [StringLength(200)]
    public string Role { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string Status { get; set; } = string.Empty;

    [DataType(DataType.Date)]
    public DateTime AppliedDate { get; set; }

    [DataType(DataType.Date)]
    public DateTime Deadline { get; set; }

    [StringLength(1000)]
    public string? Notes { get; set; }

    [Url]
    [StringLength(500)]
    public string? JobLink { get; set; }

    public ICollection<InternshipSkill> InternshipSkills { get; set; } = new List<InternshipSkill>();
}

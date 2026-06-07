using InternshipTrackerAPI.Data;
using InternshipTrackerAPI.Models;
using InternshipTrackerAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InternshipTrackerAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SkillController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ISkillMatchingService _skillMatchingService;

    public SkillController(AppDbContext context, ISkillMatchingService skillMatchingService)
    {
        _context = context;
        _skillMatchingService = skillMatchingService;
    }

    [HttpGet]
    public async Task<IActionResult> GetSkills()
    {
        var skills = await _context.Skills
            .Include(s => s.UserSkills)
            .Include(s => s.InternshipSkills)
            .ToListAsync();

        return Ok(skills);
    }

    [HttpPost("user")]
    public async Task<IActionResult> AddSkillToUser([FromBody] UserSkillRequest request)
    {
        var userExists = await _context.Users.AnyAsync(u => u.Id == request.UserId);
        var skillExists = await _context.Skills.AnyAsync(s => s.SkillId == request.SkillId);

        if (!userExists || !skillExists)
        {
            return BadRequest("Invalid UserId or SkillId.");
        }

        var existing = await _context.UserSkills
            .AnyAsync(us => us.UserId == request.UserId && us.SkillId == request.SkillId);

        if (existing)
        {
            return Conflict("This skill is already assigned to the user.");
        }

        var userSkill = new UserSkill
        {
            UserId = request.UserId,
            SkillId = request.SkillId,
            ProficiencyLevel = request.ProficiencyLevel,
            YearsOfExperience = request.YearsOfExperience
        };

        _context.UserSkills.Add(userSkill);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSkills), new { id = userSkill.UserSkillId }, userSkill);
    }

    [HttpGet("compare/{userId:int}/{internshipId:int}")]
    public async Task<IActionResult> CompareSkills(int userId, int internshipId)
    {
        var missingSkills = await _skillMatchingService.GetMissingSkillsAsync(userId, internshipId);

        return Ok(new
        {
            UserId = userId,
            InternshipId = internshipId,
            MissingSkills = missingSkills
        });
    }

    [HttpPost("internship")]
    public async Task<IActionResult> AddSkillToInternship([FromBody] InternshipSkillRequest request)
    {
        var internshipExists = await _context.Internships.AnyAsync(i => i.InternshipId == request.InternshipId);
        var skillExists = await _context.Skills.AnyAsync(s => s.SkillId == request.SkillId);

        if (!internshipExists || !skillExists)
        {
            return BadRequest("Invalid InternshipId or SkillId.");
        }

        var existing = await _context.InternshipSkills
            .AnyAsync(isc => isc.InternshipId == request.InternshipId && isc.SkillId == request.SkillId);

        if (existing)
        {
            return Conflict("This skill is already assigned to the internship.");
        }

        var internshipSkill = new InternshipSkill
        {
            InternshipId = request.InternshipId,
            SkillId = request.SkillId,
            IsRequired = request.IsRequired
        };

        _context.InternshipSkills.Add(internshipSkill);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSkills), new { id = internshipSkill.InternshipSkillId }, internshipSkill);
    }
}

public class UserSkillRequest
{
    public int UserId { get; set; }
    public int SkillId { get; set; }
    public ProficiencyLevel ProficiencyLevel { get; set; }
    public decimal YearsOfExperience { get; set; }
}

public class InternshipSkillRequest
{
    public int InternshipId { get; set; }
    public int SkillId { get; set; }
    public bool IsRequired { get; set; }
}

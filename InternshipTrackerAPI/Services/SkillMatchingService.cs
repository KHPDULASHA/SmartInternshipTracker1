using InternshipTrackerAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace InternshipTrackerAPI.Services;

public class SkillMatchingService : ISkillMatchingService
{
    private readonly AppDbContext _context;

    public SkillMatchingService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<string>> GetMissingSkillsAsync(int userId, int internshipId)
    {
        var userSkillIds = await _context.UserSkills
            .Where(us => us.UserId == userId)
            .Select(us => us.SkillId)
            .ToListAsync();

        var requiredSkillIds = await _context.InternshipSkills
            .Where(isc => isc.InternshipId == internshipId && isc.IsRequired)
            .Select(isc => isc.SkillId)
            .Distinct()
            .ToListAsync();

        var missingSkillIds = requiredSkillIds
            .Where(skillId => !userSkillIds.Contains(skillId))
            .ToList();

        if (missingSkillIds.Count == 0)
        {
            return Array.Empty<string>();
        }

        return await _context.Skills
            .Where(skill => missingSkillIds.Contains(skill.SkillId))
            .Select(skill => skill.SkillName)
            .ToListAsync();
    }
}

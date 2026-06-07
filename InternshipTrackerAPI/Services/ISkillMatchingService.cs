namespace InternshipTrackerAPI.Services;

public interface ISkillMatchingService
{
    Task<IReadOnlyList<string>> GetMissingSkillsAsync(int userId, int internshipId);
}

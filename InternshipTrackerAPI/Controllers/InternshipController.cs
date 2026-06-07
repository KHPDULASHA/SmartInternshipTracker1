using InternshipTrackerAPI.Data;
using InternshipTrackerAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InternshipTrackerAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InternshipController : ControllerBase
{
    private readonly AppDbContext _context;

    public InternshipController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetInternships()
    {
        var internships = await _context.Internships.ToListAsync();
        return Ok(internships);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetInternship(int id)
    {
        var internship = await _context.Internships.FindAsync(id);

        if (internship == null)
        {
            return NotFound();
        }

        return Ok(internship);
    }

    [HttpPost]
    public async Task<IActionResult> CreateInternship([FromBody] Internship internship)
    {
        _context.Internships.Add(internship);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetInternship), new { id = internship.InternshipId }, internship);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateInternship(int id, Internship internship)
    {
        if (id != internship.InternshipId)
        {
            return BadRequest();
        }

        _context.Entry(internship).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await InternshipExists(id))
            {
                return NotFound();
            }

            throw;
        }

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteInternship(int id)
    {
        var internship = await _context.Internships.FindAsync(id);
        if (internship == null)
        {
            return NotFound();
        }

        _context.Internships.Remove(internship);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private async Task<bool> InternshipExists(int id)
    {
        return await _context.Internships.AnyAsync(e => e.InternshipId == id);
    }
}

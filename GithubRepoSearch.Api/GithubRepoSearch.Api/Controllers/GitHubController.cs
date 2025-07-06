using Microsoft.AspNetCore.Mvc;
using GithubRepoSearch.Api.Services;
using Microsoft.AspNetCore.Authorization;

namespace GithubRepoSearch.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class GitHubController : ControllerBase
{
    private readonly IGitHubService _gitHubService;

    public GitHubController(IGitHubService gitHubService)
    {
        _gitHubService = gitHubService;
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string keyword)
    {
        if (string.IsNullOrWhiteSpace(keyword))
            return BadRequest("Keyword is required");

        var results = await _gitHubService.SearchRepositoriesAsync(keyword);
        return Ok(results);
    }
}

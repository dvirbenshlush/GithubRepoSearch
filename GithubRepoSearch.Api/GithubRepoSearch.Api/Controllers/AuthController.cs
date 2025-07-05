using Microsoft.AspNetCore.Mvc;
using GithubRepoSearch.Api.Models;
using GithubRepoSearch.Api.Services;

namespace GithubRepoSearch.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        var result = _authService.Authenticate(request);

        if (result == null)
            return Unauthorized(new { message = "Invalid credentials" });

        return Ok(result);
    }
}

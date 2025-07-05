using GithubRepoSearch.Api.Utils;
using GithubRepoSearch.Api.Models;

namespace GithubRepoSearch.Api.Services;

public class AuthService : IAuthService
{
    private readonly IConfiguration _config;

    //mock user data for authentication
    private readonly List<User> _users = new()
    {
        new User { Username = "admin", Role = "Admin" },
        new User { Username = "user", Role = "User" }
    };

    public AuthService(IConfiguration config)
    {
        _config = config;
    }

    public LoginResponse Authenticate(LoginRequest request)
    {
        //mock authentication logic should be replaced with real password validation
        var user = _users.SingleOrDefault(u =>
            u.Username == request.Username && request.Password == "1234");

        if (user == null)
            return null;

        var token = JwtHelper.GenerateJwtToken(user, _config["Jwt:Secret"]);

        return new LoginResponse
        {
            Username = user.Username,
            Token = token
        };
    }
}

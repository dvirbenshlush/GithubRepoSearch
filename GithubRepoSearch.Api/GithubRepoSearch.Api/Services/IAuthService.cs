using GithubRepoSearch.Api.Models;

namespace GithubRepoSearch.Api.Services
{
    public interface IAuthService
    {
        LoginResponse Authenticate(LoginRequest request);

    }
}

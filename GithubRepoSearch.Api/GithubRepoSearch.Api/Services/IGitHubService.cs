using GithubRepoSearch.Api.Models;

namespace GithubRepoSearch.Api.Services;

public interface IGitHubService
{
    Task<List<RepositoryDto>> SearchRepositoriesAsync(string keyword);
}

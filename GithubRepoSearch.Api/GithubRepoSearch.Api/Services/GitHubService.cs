using System.Text.Json;
using System.Net.Http.Headers;
using GithubRepoSearch.Api.Models;
using System.Text.Json.Serialization;

namespace GithubRepoSearch.Api.Services;

public class GitHubService : IGitHubService
{
    private readonly HttpClient _httpClient;

    public GitHubService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _httpClient.BaseAddress = new Uri("https://api.github.com/");
        _httpClient.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue("AppName", "1.0"));
    }

    public async Task<List<RepositoryDto>> SearchRepositoriesAsync(string keyword)
    {
        var response = await _httpClient.GetAsync($"search/repositories?q={Uri.EscapeDataString(keyword)}");
        response.EnsureSuccessStatusCode();

        using var contentStream = await response.Content.ReadAsStreamAsync();

        var root = await JsonSerializer.DeserializeAsync<GitHubSearchResponse>(
            contentStream,
            new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });

        return root?.Items.Select(repo => new RepositoryDto
        {
            Name = repo.Name,
            HtmlUrl = repo.HtmlUrl,
            OwnerAvatarUrl = repo.Owner.AvatarUrl
        }).ToList() ?? new List<RepositoryDto>();
    }

    // Internal models for GitHub API response
    private class GitHubSearchResponse
    {
        public List<GitHubRepository> Items { get; set; }
    }

    private class GitHubRepository
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("html_url")]
        public string HtmlUrl { get; set; }

        [JsonPropertyName("owner")]
        public GitHubOwner Owner { get; set; }
    }

    private class GitHubOwner
    {
        [JsonPropertyName("avatar_url")]
        public string AvatarUrl { get; set; }
    }
}

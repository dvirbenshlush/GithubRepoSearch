using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using GithubRepoSearch.Api.Models;
using System.Collections.Concurrent;

namespace GithubRepoSearch.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BookmarksController : ControllerBase
{
    // Use thread-safe dictionary for multi-user in-memory bookmark storage
    private static readonly ConcurrentDictionary<string, List<RepoResult>> _userBookmarks = new();

    [HttpGet]
    public IActionResult GetBookmarks()
    {
        var username = User.Identity?.Name;
        if (string.IsNullOrWhiteSpace(username))
            return Unauthorized();

        _userBookmarks.TryGetValue(username, out var bookmarks);
        return Ok(bookmarks ?? new List<RepoResult>());
    }

    [HttpPost]
    public IActionResult AddBookmark([FromBody] RepoResult repo)
    {
        var username = User.Identity?.Name;
        if (string.IsNullOrWhiteSpace(username))
            return Unauthorized();

        var list = _userBookmarks.GetOrAdd(username, _ => new List<RepoResult>());

        if (!list.Any(b => b.Name == repo.Name))
        {
            list.Add(repo);
        }

        return Ok();
    }

    [HttpDelete("{name}")]
    public IActionResult RemoveBookmark(string name)
    {
        var username = User.Identity?.Name;
        if (string.IsNullOrWhiteSpace(username))
            return Unauthorized();

        if (_userBookmarks.TryGetValue(username, out var list))
        {
            var updated = list.Where(b => b.Name != name).ToList();
            _userBookmarks[username] = updated;
        }

        return Ok();
    }
}

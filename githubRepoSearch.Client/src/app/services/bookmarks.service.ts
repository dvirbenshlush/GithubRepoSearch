import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RepoResult } from '../models/repo-result.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private readonly baseUrl = 'https://localhost:7231/api/bookmarks';

  constructor(private http: HttpClient) {}

  getBookmarks(): Observable<RepoResult[]> {
    return this.http.get<RepoResult[]>(this.baseUrl);
  }

  addBookmark(repo: RepoResult): Observable<void> {
    return this.http.post<void>(this.baseUrl, repo);
  }

  removeBookmark(repoName: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${encodeURIComponent(repoName)}`);
  }
}

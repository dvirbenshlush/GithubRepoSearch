import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class RepoService {
  private apiUrl = 'https://localhost:7231/api';

  constructor(private http: HttpClient) {}

  searchRepos(request: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/github/search?keyword=${request}`);
  }
}

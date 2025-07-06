import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RepoService } from '../../services/repo.service';
import { MatButtonModule } from '@angular/material/button';
import { RepoResult } from '../../models/repo-result.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BookmarkService } from '../../services/bookmarks.service';
import { RepoCardComponent } from '../repo-card/repo-card.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-search-repos',
  standalone: true,
  imports: [
    FormsModule, 
    RouterModule,
    CommonModule, 
    MatIconModule,
    MatInputModule, 
    MatButtonModule,
    RepoCardComponent, 
    MatFormFieldModule, 
    MatPaginatorModule, 
    MatProgressSpinnerModule
  ],
  templateUrl: './search-repos.component.html',
  styleUrl: './search-repos.component.scss'
})
export class SearchReposComponent {

  constructor(
    private repoService: RepoService,
    private bookmarkService: BookmarkService
  ) {}
  
  query = '';
  loading = false;
  results: any[] = [];
  pagedResults: any[] = [];
  
  pageSize = 10;
  pageIndex = 0;
  
  searchRepos() {
    this.loading = true;
    this.repoService.searchRepos(this.query).subscribe(res => {
      this.results = res;
      this.updatePagedResults();
      this.loading = false;
    });
  }

  bookmarkRepo(repo: RepoResult) {
    this.bookmarkService.addBookmark(repo).subscribe();
  }
  
  updatePagedResults() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedResults = this.results.slice(start, end);
  }
  
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedResults();
  }
}

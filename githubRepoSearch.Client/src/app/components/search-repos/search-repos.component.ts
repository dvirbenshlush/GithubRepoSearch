import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { RepoService } from '../../services/repo.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RepoCardComponent } from '../repo-card/repo-card.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-search-repos',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule, 
    MatInputModule, 
    MatButtonModule,
    RepoCardComponent, 
    MatFormFieldModule, 
    MatPaginatorModule, 
  ],
  templateUrl: './search-repos.component.html',
  styleUrl: './search-repos.component.scss'
})
export class SearchReposComponent {

  constructor(private repoService: RepoService) {}
  
  query = '';
  results: any[] = [];
  pagedResults: any[] = [];
  
  pageSize = 10;
  pageIndex = 0;
  
  searchRepos() {
    this.repoService.searchRepos(this.query).subscribe(res => {
      this.results = res;
      this.updatePagedResults();
    });
  }

  bookmarkRepo(repo: any) {
    //todo: Implement bookmark logic here
    console.log('Bookmarking repo:', repo);
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

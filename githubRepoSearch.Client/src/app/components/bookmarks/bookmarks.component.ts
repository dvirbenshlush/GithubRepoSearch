import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RepoResult } from '../../models/repo-result.model';
import { BookmarkService } from '../../services/bookmarks.service';
import { RepoCardComponent } from '../repo-card/repo-card.component';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [
    CommonModule, 
    RepoCardComponent
  ],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.scss'
})

export class BookmarksComponent implements OnInit {
  bookmarks: RepoResult[] = [];

  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit(): void {
    this.loadBookmarks();
  }

  loadBookmarks(): void {
    this.bookmarkService.getBookmarks().subscribe({
      next: (data) => this.bookmarks = data
    });
  }

  removeBookmark(name: string): void {
    this.bookmarkService.removeBookmark(name).subscribe({
      next: () => this.loadBookmarks()
    });
  }
}


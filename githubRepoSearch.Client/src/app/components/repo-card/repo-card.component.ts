import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RepoResult } from '../../models/repo-result.model';
import { Component, input, output, signal } from '@angular/core';
import { BookmarkService } from '../../services/bookmarks.service';

@Component({
  selector: 'app-repo-card',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatIconModule, 
    MatButtonModule
  ],
  templateUrl: './repo-card.component.html',
  styleUrl: './repo-card.component.scss',
})
export class RepoCardComponent {
  name = input<string>('');
  avatarUrl = input<string>('');
  htmlUrl =  input<string>('');
  isBookmarked = signal(false);

  description = input<string>('');
  bookmark = output<void>();
  bookmarks: RepoResult[] = [];

  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit(): void {
    this.loadBookmarks();
  }

  openRepo(event: MouseEvent): void {
    const isBookmarkButton = (event.target as HTMLElement).closest('button');
    if (!isBookmarkButton) {
      console.log('Opening repo:', this.htmlUrl());
      window.open(this.htmlUrl(), '_blank');
    }
  }

  onBookmarkClick(event: MouseEvent): void {
    event.stopPropagation(); 
    this.isBookmarked.set(true);
    this.bookmark.emit();
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

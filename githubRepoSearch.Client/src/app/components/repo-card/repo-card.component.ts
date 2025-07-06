import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-repo-card',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule
  ],
  templateUrl: './repo-card.component.html',
  styleUrl: './repo-card.component.scss'
})
export class RepoCardComponent {
  name = input<string>('');
  avatarUrl = input<string>('');
  description = input<string>('');
  bookmark = output<void>();
}

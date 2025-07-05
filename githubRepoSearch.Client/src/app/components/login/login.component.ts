import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { LoginRequest } from '../../models/user.model';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule, 
    MatCardModule,
    MatInputModule,
    MatButtonModule, 
    MatFormFieldModule,
],
  providers: [AuthService],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    const request: LoginRequest = {
      username: this.username,
      password: this.password
    };

    this.authService.login(request).subscribe({
      next: (res) => {
        this.authService.setToken(res.token);
        this.router.navigate(['/search']);
      },
      error: () => {
        this.error = 'Invalid username or password';
      }
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../Shared/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loginChanged.subscribe((respond) => {
      this.isAuthenticated = respond;
    });
  }

  onLogin() {
    // this.authService.login();
    this.authService.authLogin('Mick','MickPassword');
  }

  onLogout() {
    // this.authService.logout();
    this.authService.authLogout();
  }
}

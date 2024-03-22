import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-redirect-callback',
  standalone: true,
  imports: [],
  template: `<div></div>`,
  styleUrl: './signin-redirect-callback.component.css',
})
export class SigninRedirectCallbackComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.authService.finishLogin().then((_) => {
      this.router.navigate(['/todo'], { replaceUrl: true });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout-redirect-callback',
  standalone: true,
  imports: [],
  template: `<div></div>`,
  styleUrl: './signout-redirect-callback.component.css',
})
export class SignoutRedirectCallbackComponent implements OnInit {
  constructor(private _authService: AuthService, private _router: Router) {}
  ngOnInit(): void {
    this._authService.finishLogout().then((_) => {
      this._router.navigate(['/'], { replaceUrl: true });
    });
  }
}

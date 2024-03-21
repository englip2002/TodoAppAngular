import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  public tokenInformation: TokenInfomation;

  private tokenUrl = 'https://localhost:5001/connect/token';
  private logoutUrl = 'https://localhost:5001/connect/endsession';
  private clientId = 'todoClient';
  private clientSecret = 'todoSecret';
  public loginChanged = new Subject<boolean>();
  public isAuthenticated = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  authLogin(username: string, password: string) {
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', username);
    body.set('password', password);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set(
        'Authorization',
        'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`)
      );

    return this.http
      .post<TokenInfomation>(this.tokenUrl, body.toString(), { headers })
      .subscribe(
        (tokenInfo) => {
          this.tokenInformation = tokenInfo;
          this.isAuthenticated = true;
          this.loginChanged.next(true);
          console.log(this.tokenInformation);
        },
        (error) => {
          console.log(error);
          this.isAuthenticated = false;
        }
      );
  }

  authLogout() {
    const returnUrl = 'http://localhost:4200/'; // Redirect back to Angular after logout
    const logoutRedirectUrl = `${this.logoutUrl}?id_token_hint=&post_logout_redirect_uri=${returnUrl}&client_id=${this.clientId}`;
    window.location.href = logoutRedirectUrl;
  }
}

export class AuthRequestModel {
  public client_id: string;
  public grant_type: string;
  public username: string;
  public password: string;
  public scope: string;

  constructor(
    client_id: string,
    grant_type: string,
    username: string,
    password: string,
    scope: string
  ) {
    this.client_id = client_id;
    this.grant_type = grant_type;
    this.username = username;
    this.password = password;
    this.scope = scope;
  }
}

export class TokenInfomation {
  public access_token: string;
  public expires_in: number;
  public token_type: string;
  public scope: string;
}

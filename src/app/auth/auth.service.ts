import { Injectable } from '@angular/core';
import { User, UserManager, UserManagerSettings } from 'oidc-client';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userManager: UserManager;
  private _user: User;
  public loginChanged = new Subject<boolean>();
  // public loginChanged = this._loginChangedSubject.asObservable();

  private get idpSettings(): UserManagerSettings {
    return {
      authority: environment.idpAuthority,
      client_id: environment.clientId,
      redirect_uri: `${environment.clientRoot}/signin-callback`,
      scope: 'openid profile todoApi',
      response_type: 'code',
      post_logout_redirect_uri: `${environment.clientRoot}/signout-callback`,
      automaticSilentRenew: true,
      silent_redirect_uri: `${environment.clientRoot}/assets/silent-callback.html`,
    };
  }

  constructor() {
    this._userManager = new UserManager(this.idpSettings);
    this._userManager.events.addAccessTokenExpired((_) => {
      this.loginChanged.next(false);
      console.log('Token expired');
    });
  }

  public login = () => {
    return this._userManager.signinRedirect();
  };

  public isAuthenticated = (): Promise<boolean> => {
    return this._userManager.getUser().then((user) => {
      if (this._user !== user) {
        this.loginChanged.next(this.checkUser(user));
      }
      this._user = user;
      return this.checkUser(user);
    });
  };

  private checkUser = (user: User): boolean => {
    return !!user && !user.expired;
  };

  public finishLogin = (): Promise<User> => {
    return this._userManager.signinRedirectCallback().then((user) => {
      this._user = user;
      this.loginChanged.next(this.checkUser(user));
      return user;
    });
  };

  public logout = () => {
    this._userManager.signoutRedirect();
  };

  public finishLogout = () => {
    this._user = null;
    this.loginChanged.next(false);
    return this._userManager.signoutRedirectCallback();
  };

  // public getAccessToken = (): Promise<string> => {
  //   return this._userManager.getUser()
  //     .then(user => {
  //        return !!user && !user.expired ? user.access_token : null;
  //   })
  // }

  public getAccessToken() {
    if (!!this._user && this._user.expires_at < Date.now()) {
      return this._user.access_token;
    } else {
      console.log('Token Expired');
      return null;
    }
  }
}

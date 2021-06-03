import { Injectable } from '@angular/core';
import { Login } from 'src/app/model/login.model';

@Injectable({ providedIn: 'root' })
export class LoginService {
  user = 'user';
  admin = 'admin';
  pass = 'password';

  login(credentials: Login) {
    if (
      (credentials.username === this.user ||
        credentials.username === this.admin) &&
      credentials.password === this.pass
    ) {
      return true;
    }

    return false;
  }
}

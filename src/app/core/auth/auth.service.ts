import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private _role: 'user' | 'admin' | null = null;

  loginAs(role: 'user' | 'admin') {
    this._role = role;
  }

  logout() {
    this._role = null;
  }

  get role(): 'user' | 'admin' | null {
    return this._role;
  }

  isLoggedIn(): boolean {
    return this._role !== null;
  }
}

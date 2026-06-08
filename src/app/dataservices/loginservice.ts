import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { single } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Loginservice {

  private router = inject(Router)

  private userLogin = [
    { id: '1', pw: '1234', username: 'jonas.kummer' },
    { id: '2', pw: '2345', username: 'thomas.perschke' },
    { id: '3', pw: '3456', username: 'henry.hufgard' }
  ]

  private _isLoggedIn = signal<boolean>(true); // nur während entwickung auf true
  private _userId = signal<string | null>('1')

  public isLoggedIn = this._isLoggedIn.asReadonly(); // für die anderen komponenten 
  public currentUserId = this._userId.asReadonly() // damit die andern komponenten wissen wer eingeloggt ist.

  async verifyLogin(p_username: string, p_pw: string): Promise<string | null> {
    // ⏳ Simuliere 1 Sekunde Server-Wartezeit (perfekt für deinen Lade-Spinner!)
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Durchsuche das Array nach Übereinstimmung von Username UND Passwort
    const matchedUser = this.userLogin.find(
      user => user.username === p_username && user.pw === p_pw
    );

    if(matchedUser) {
      this._isLoggedIn.set(true);
      this._userId.set(this.getUserId(p_username, p_pw))
      return matchedUser.id // müsste man nicht unbedingt
    }else {
      return null
    }
  }

  logout(): void {
    this._isLoggedIn.set(false);
    this.router.navigate(['/loginwindow']);
  }

  getUserId(p_username: string, p_pw: string): string | null {
  const foundUser = this.userLogin.find(
    user => user.username === p_username && user.pw === p_pw
  );

  return foundUser ? foundUser.id : null;
}
}

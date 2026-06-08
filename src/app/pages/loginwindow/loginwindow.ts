import { Component, inject, signal } from '@angular/core';
import { Loginservice } from '../../dataservices/loginservice';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-loginwindow',
  imports: [CommonModule, FormsModule, RippleModule],
  templateUrl: './loginwindow.html',
  styleUrl: './loginwindow.css',
})
export class Loginwindow {
  private router = inject(Router);

  protected loginService = inject(Loginservice)
  public username = signal('');
  public password = signal('');
  public isLoading = signal(false);
  public errorMessage = signal('');
  public showPassword = signal(false);

  async onLoginSubmit(event: Event) {

    if (!this.username() || !this.password()) {
      this.errorMessage.set('Bitte fülle alle Felder aus.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      // 🌟 Hier startet dein Lade-Spinner!

      // "await" wartet brav, bis verifyLogin nach 1 Sekunde fertig ist
      const userId = await this.loginService.verifyLogin(this.username(), this.password());

      // 🌟 Hier stoppt dein Lade-Spinner wieder!

      if (userId !== null) {
        console.log('Login erfolgreich! User-ID ist:', userId);
        this.router.navigate(['/dashboard']);
        // Weiterleitung zum Dashboard...
      } else {
        this.errorMessage.set('Benutzername oder Passwort falsch.');
      }

    } catch (error) {
      console.error('Fehler beim Login', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}

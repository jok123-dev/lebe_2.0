import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Loginservice } from './loginservice';  

export const Authguardservice : CanActivateFn = (route, state) => {
  const loginService = inject(Loginservice);
  const router = inject(Router);

  // 🌟 Wir prüfen dein schreibgeschütztes Signal aus dem Service
  if (loginService.isLoggedIn()) {
    return true; // Benutzer ist eingeloggt -> Route darf geladen werden
  } else {
    // Benutzer ist NICHT eingeloggt -> Umleitung zum Login
    // 'createUrlTree' ist der moderne Angular-Weg für Umleitungen im Guard
    return router.createUrlTree(['/loginwindow']);
  }
}


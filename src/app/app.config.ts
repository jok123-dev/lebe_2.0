import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const MeinCustomTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#f0f7ff',
      100: '#e0effe',
      200: '#bae2fd',
      300: '#7ccbfa',
      400: '#38b0f8',
      500: '#0ea2e9', // <-- Das wird deine Haupt-Primary-Farbe!
      600: '#0285c7',
      700: '#036aa1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49'
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',    // Absolut reines Weiß für deine Karten/Hintergründe
          50: '#f8fafc',   // Minimales Graublau für Tabellenköpfe
          100: '#f1f5f9',
          900: '#0f172a'   // Sehr dunkles Anthrazit für knackig lesbaren Text
        }
      }
    }
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    providePrimeNG({
        theme: {
            preset: MeinCustomTheme,
            options: {
              darkModeSelector: 'none'
            }
        }
    }),
    provideAnimations()
  ]
};

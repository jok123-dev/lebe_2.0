import { Component, inject, signal, viewChild } from '@angular/core';
import { RouterOutlet, RouterLink} from '@angular/router';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { Menu } from './dialogs/menu/menu';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { Loginservice } from './dataservices/loginservice';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, AvatarModule, ButtonModule, ToolbarModule, Menu],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [
    // Sanftes Ein- und Ausblenden des Lade-Overlays
    trigger('fadeLoader', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class App {
  protected readonly title = signal('lebe_2.0');  
  private router = inject(Router);
  private loginService = inject(Loginservice)

  public isLoggedIn = this.loginService.isLoggedIn
  constructor() {
    // Wir abonnieren die Router-Events global
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Start des Wechsels (Daten werden geladen, Komponenten vorbereitet)
        this.isNavigating.set(true);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        // Wechsel fertig, abgebrochen oder fehlerhaft -> Loader weg
        this.isNavigating.set(false);
      }
    });
  }
  
  private menu = viewChild(Menu)

  public openSidebar(): void {
    // Da sidebar() ein Signal ist, rufen wir es auf und setzen das visible-Signal im Child
    this.menu()?.visible.set(true);
  }

  public isNavigating = signal(false);
}

import { Component, inject, signal} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { Loginservice } from '../../dataservices/loginservice';
@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  animations: [
    trigger('backdrop', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms linear', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('sidebar', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        // 🌟 300ms Laufzeit + die ultra-sanfte Bremskurve
        animate('600ms cubic-bezier(0.42, 0.11, 0.28, 0.96)', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        // Beim Rausgehen reicht ein normales, schnelles ease-in
        animate('200ms cubic-bezier(0.7, 0, 0.84, 0)', style({ transform: 'translateX(-100%)' }))
      ])
    ]),
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0px', opacity: 0, overflow: 'hidden', visibility: 'hidden' })),
      state('expanded', style({ height: '*', opacity: 1, overflow: 'hidden', visibility: 'visible' })),
      transition('collapsed <=> expanded', animate('280ms cubic-bezier(0.4, 0, 0.2, 1)'))
    ]),

    // 4. Drehen der Pfeile um 180 Grad
    trigger('rotateArrow', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(-180deg)' })),
      transition('collapsed <=> expanded', animate('250ms ease-in-out'))
    ])
  ]
})
export class Menu {
  
  private loginService = inject(Loginservice)
  abmelden() {
    this.loginService.logout()
  }

  visible = signal(false)
  public toggleMenu() {
    this.visible.set(true)
  }
  // Sichtbarkeiten der einzelnen Untermenüs (Vorgabewerte analog zu deinem Template)
  public personlichOpen = signal(true);
  public oeffentlichOpen = signal(true);
  public lernkontrolleOpen = signal(false);
  public verwaltungOpen = signal(false);
}


import { inject, Injectable } from '@angular/core';
import { Component, signal, computed } from '@angular/core';
import { Loginservice } from './loginservice';

@Injectable({
  providedIn: 'root',
})
export class Userlwlstatus {

  protected loginService = inject(Loginservice)

 public activeCourseUserIds = signal<string[]>([]);
  public lwlStatus = signal<{ id: string; lwlId: string; userId: string; status: string }[]>([]);

  /**
   * Wird einmalig beim Betreten des Kompetenzrasters aufgerufen.
   * Befüllt die Signals mit den schlanken, passgenauen Daten vom Server.
   */
  public loadGridContextFromServer(currentUserId: string, competencegridId: string) {
    // Später: HTTP-Request an das Backend
    // 1. Mitschüler-IDs holen (Beispielhaft für User '1' und '2')
    const geladeneMitschuelerIds = ['1', '2']; 
    this.activeCourseUserIds.set(geladeneMitschuelerIds);

    // 2. Nur die Stati für diese Schüler und dieses Raster laden (LWL 1 bis 13)
    const geladeneStati = [
      { id: 'm1', lwlId: '1', userId: '1', status: 'erledigt' },
      { id: 'm2', lwlId: '1', userId: '2', status: 'in_arbeit' },
      { id: 'm3', lwlId: '2', userId: '1', status: 'in_arbeit' },
      { id: 'm4', lwlId: '2', userId: '2', status: 'erledigt' },
      // ... (die restlichen Daten für deine LWLs bis ID 13)
      { id: 'm25', lwlId: '13', userId: '1', status: 'erledigt' },
      { id: 'm26', lwlId: '13', userId: '2', status: 'in_arbeit' }
    ];
    this.lwlStatus.set(geladeneStati);
  }

  /**
   * Für das Hauptgrid: Gibt die passenden Status-Farben zurück
   */
  public getUserStatus(userId: string, lwlIDs: string[]) {
    const statusMap: Record<string, 'offen' | 'in_arbeit' | 'erledigt'> = {};
    
    this.lwlStatus()
      .filter(status => status.userId === userId && lwlIDs.includes(status.lwlId))
      .forEach(item => {
        statusMap[item.lwlId] = item.status as 'offen' | 'in_arbeit' | 'erledigt';
      });
    return statusMap;
  }

  /**
   * Wenn der Nutzer im Statustab klickt, aktualisieren wir das zentrale lwlStatus-Signal.
   * Grid UND Balken reagieren reaktiv im selben Moment!
   */
  public handleStatusChange(event: { id: string; status: 'offen' | 'in_arbeit' | 'erledigt' }, currentUserId: string) {
    this.lwlStatus.update(aktuelleListe => {
      const bestehenderEintrag = aktuelleListe.find(
        item => item.lwlId === event.id && item.userId === currentUserId
      );

      if (bestehenderEintrag) {
        return aktuelleListe.map(item =>
          item.lwlId === event.id && item.userId === currentUserId
            ? { ...item, status: event.status }
            : item
        );
      } else {
        return [
          ...aktuelleListe,
          { id: Math.random().toString(), lwlId: event.id, userId: currentUserId, status: event.status }
        ];
      }
    });

    // Später: hier der HTTP-Call ans Backend -> this.http.put(...)
  }

  anzahlErledigt = computed(() => {
    return this.lwlStatus()
      .filter(item => item.userId === this.loginService.currentUserId() && item.status === 'erledigt')
      .length; // .length gibt uns die exakte Anzahl der Treffer
  });
}

import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Fileservice {

  protected files = signal([
    { id: '1', lwlId: '1', name: 'Merkblatt_Brueche.pdf', typ: 'pdf', groesse: '1.4 MB', url: '/files/abc', kategorie: 'Aufgabe', autor: 'Jk', zugriff: 'alle', geaendert: '2026-06-06' },
    { id: '2', lwlId: '1', name: 'Uebungen_Level1.docx', typ: 'docx', groesse: '420 KB', url: '/files/def', kategorie: 'Loesung', autor: 'Jk', zugriff: 'alle', geaendert: '2026-06-06' },
    { id: '3', lwlId: '1', name: 'Merkblatt_Brueche.pdf', typ: 'pdf', groesse: '1.4 MB', url: '/files/abc', kategorie: 'Aufgabe', autor: 'Jk', zugriff: 'alle', geaendert: '2026-06-06' },
  ])

  getFilesForLwl(lwlId: string) {
    return this.files().filter(file => file.lwlId === lwlId);
  }
}

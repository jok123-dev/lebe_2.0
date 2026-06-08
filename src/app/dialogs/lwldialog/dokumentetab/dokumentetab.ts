import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Fileservice } from '../../../dataservices/fileservice';
import { trigger, transition, style, animate } from '@angular/animations';
import { single } from 'rxjs';

@Component({
  selector: 'app-dokumentetab',
  imports: [CommonModule],
  templateUrl: './dokumentetab.html',
  styleUrl: './dokumentetab.css',
  animations: [
    trigger('tabFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(8px)' }),
        animate('250ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class Dokumentetab {
  protected fileService = inject(Fileservice)
  
  protected currentLwlId = signal<string>('')

  protected files = computed(() => {
    const id = this.currentLwlId();
    if (!id) return []; // Falls noch keine ID da ist, leeres Array zurückgeben

    return this.fileService.getFilesForLwl(id);
  });

  protected sortState = signal<'none' | 'category' | 'title' | 'date'>('none');
  protected displayedFiles = computed(() => {
    const aktuelleDateien = this.files(); // Holt sich die Daten aus dem oberen computed
    const status = this.sortState();

    if (status === 'none') return aktuelleDateien;

    return [...aktuelleDateien].sort((a, b) => {
      if (status === 'category') return a.kategorie.localeCompare(b.kategorie);
      if (status === 'title') return a.name.localeCompare(b.name);
      if (status === 'date') return b.geaendert.localeCompare(a.geaendert);
      return 0;
    });
  });

  protected toggleSort() {
    this.sortState.update(aktuell => {
      if (aktuell === 'none') return 'category';
      if (aktuell === 'category') return 'title';
      if (aktuell === 'title') return 'date';
      return 'none'; // Nach Datum geht es wieder von vorne los
    });
  }


  protected downloadAllFiles() {
    this.files().forEach((file, index) => {
      // WICHTIG: Ein minimaler Versatz (200ms pro Datei), damit der Browser den Massen-Download nicht als Pop-up-Spam blockiert!
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = file.url;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, index * 200);
    });
  }

  public resetSortState() {
    this.sortState.set('none')
  }

  public updateFiles(data: string) {
  this.currentLwlId.set(data); // ändert sich die id aktualisiert sich der rest automatisch
  this.resetSortState(); // Sinnvoll: Bei LWL-Wechsel die Sortierung zurücksetzen
  }
}

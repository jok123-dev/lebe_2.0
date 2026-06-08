import { Component, computed, EventEmitter, inject, output, Output, signal, viewChild, ViewChild } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Drawer } from 'primeng/drawer';
import { TabsModule } from 'primeng/tabs';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { CommonModule } from '@angular/common';
import { Copetencegriddataservice } from '../../dataservices/copetencegriddataservice';
import { Fileservice } from '../../dataservices/fileservice';
import { Uploadtab } from "./uploadtab/uploadtab";
import { Uploadservice } from '../../dataservices/uploadservice';
import { Dokumentetab } from './dokumentetab/dokumentetab';
import { Statustab } from './statustab/statustab';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-lwldialog',
  imports: [Drawer, CommonModule, TabsModule, ToastModule, Uploadtab, Dokumentetab, Statustab],
  templateUrl: './lwldialog.html',
  styleUrl: './lwldialog.css',
  providers: [MessageService],
  animations: [
    trigger('tabFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(8px)' }),
        animate('250ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class Lwldialog {

  protected competencegridDataService = inject(Copetencegriddataservice)
  protected fileService = inject(Fileservice)
  protected uploadService = inject(Uploadservice)

  private uploadComponente = viewChild(Uploadtab)
  private dokumenteTab = viewChild(Dokumentetab)
  private statusTab = viewChild(Statustab)

  protected isVisible = false;

  protected _data = signal<any>(null);
  public data = this._data.asReadonly()

  protected activeTab = signal<string>('0'); // standard für die tabs im fenster

  public onSaved = output<{ id: string; status: 'offen' | 'in_arbeit' | 'erledigt' }>(); // dasselbe wie in statustab zum weiterreichen an die competencegrid komponente

  // DIE ZENTRALE FUNKTION: Wird vom Grid aufgerufen
  public open(lwlData: any, currentStatus: string) {
    this._data.set(lwlData);
    this.activeTab.set('0'); // beim anklciken einer neuen lwl soll wieder bei status gestartet werden in den tabs

    this.statusTab()?.setStatusFromClickedLwl(currentStatus);

    this.dokumenteTab()?.resetSortState();//sortierreihenfolge bei neu angeclickter lwl zurücksetzten
    this.dokumenteTab()?.updateFiles(lwlData.id) // aktualisiert das signal currentLwlId in dokumentetab

    this.uploadService.uploadedFilesList.set([]);
    this.uploadService.uploadProgress.set(0);
    this.uploadComponente()?.clearQueue()

    this.isVisible = true; // Schiebt den Drawer hoch
  }

  activeTabAktualisieren(p_newTab: string) {
    this.activeTab.set(p_newTab)
  }
}

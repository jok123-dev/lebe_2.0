import { Component, computed, inject, input, OnInit, signal, viewChild, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';




import { Lwldialog } from '../../dialogs/lwldialog/lwldialog';
import { Copetencegriddataservice } from '../../dataservices/copetencegriddataservice';
import { Userlwlstatus } from '../../dataservices/userlwlstatus';
import { ThemeService } from '@primeuix/themes';
import { SkeletonModule } from 'primeng/skeleton';
import { AccordionModule } from 'primeng/accordion';
import { Userdataservice } from '../../dataservices/userdataservice';
import { RouterLink } from '@angular/router';
import { Loginservice } from '../../dataservices/loginservice';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-competencegrid',
  imports: [CommonModule, TableModule, Lwldialog, RouterLink, SkeletonModule, AccordionModule],
  templateUrl: './competencegrid.html',
  styleUrl: './competencegrid.css',
})
export class Competencegrid implements OnInit {

  private competenceGridDataService = inject(Copetencegriddataservice)
  private userlwlstatus = inject(Userlwlstatus)
  private userDataService = inject(Userdataservice)
  private loginService = inject(Loginservice)

  public competencegridId = input<string>() // liest die id des kompetenzrasters aus der url aus

  protected isLoading = signal(true);

  viewMode = signal<'auto' | 'table' | 'list'>('auto'); //umschalten zwischen tabellen und listenansicht
  activeThemaIndex = signal<string | number | number[] | string[] | null | undefined>(null);
  activeLernfeldIndex = signal<string | number | number[] | string[] | null | undefined>(null);

  ngOnInit() {
    // 1. Hole die aktuelle User-ID (z.B. '1')
    const currentUserId = this.loginService.currentUserId();
    const gridId = this.competencegridId();
    this.isLoading.set(true)
    if (gridId && currentUserId) {
      // Sobald diese Komponente geladen wird, befüllen wir den Service mit den passenden Schüler-IDs und den LWL-Statuswerten für dieses Raster.
      this.userlwlstatus.loadGridContextFromServer(currentUserId, gridId);

      setTimeout(() => {
        this.isLoading.set(false) // sobald die daten da sind -> muss noch angepasst werden
      }, 1000)
    }
  }

  competencegrid = computed(() => {
    return this.competenceGridDataService.getCompetencegrid(this.competencegridId()) //lädt hier das bestimmte kompetenzraster das ausgewählt wurde
  })

  // 2. Die Themen laden, sobald das Raster da ist (Reaktiv)
  themen = computed(() => {
    const grid = this.competencegrid();
    if (!grid) return [];
    return this.competenceGridDataService.getThemen(grid.id);
  });

  lernfelder = computed(() => {
    const themenListe = this.themen();
    if (themenListe.length === 0) return [];

    const verwendeteThemenIds = themenListe.map(thema => thema.id);
    return this.competenceGridDataService.getLernfelder(verwendeteThemenIds);
  });

  lernwegelisten = computed(() => {
    const lernfeldListe = this.lernfelder();
    if (lernfeldListe.length === 0) return [];

    const verwendeteLernfeldIds = lernfeldListe.map(feld => feld.lernfeldId);
    return this.competenceGridDataService.getLWLs(verwendeteLernfeldIds);
  });

  userStatus = computed<Record<string, string>>(() => {
    const lwlListe = this.lernwegelisten();
    if (lwlListe.length === 0) return {};

    const verwendeteLWLIds = lwlListe.map(lwl => lwl.id);
    return this.userlwlstatus.getUserStatus(this.userDataService.getUserId(), verwendeteLWLIds);
  });

  niveaus = computed(() => {
    const felder = this.lernfelder(); // Signal auslesen!
    if (!felder || felder.length === 0) {
      return ['1'];
    }
    const allePositionen = felder.map(lf => parseInt(lf.lfspos, 10));
    const maxLevel = Math.max(...allePositionen);
    return Array.from({ length: maxLevel }, (_, i) => (i + 1).toString());
  });

  protected selectedCompetencegrid(id: number): number {
    return id - 1
  }


  protected getLernfeld(themaId: string, levelId: string) {
    return this.lernfelder().find(lf => lf.bereichId === themaId && lf.lfspos === levelId);
  }

  // HELPER: Filtert die kleinen Aufgaben für das Lernfeld heraus
  protected getLWL(lernfeldId: string) {
    return this.lernwegelisten().filter(lwl => lwl.lernfeldId === lernfeldId);
  }

  // Prozentuale Berechnung anpassen
  protected calcAbgeschlossenPercentage() {
    const lwlgesamt = this.lernwegelisten().length;
    if (lwlgesamt === 0) return 0;

    const abgeschlosseneLwl = this.userlwlstatus.anzahlErledigt;
    return Math.round((abgeschlosseneLwl() / lwlgesamt) * 100);
  }

  // Logik für das öffnen und schließen der lwl fenster für dokumentverwaltung...

  // Wir greifen auf die Drawer-Komponente im HTML zu
  //@ViewChild('detailDrawer') detailDrawer!: Lwldialog;
  protected detailDrawer = viewChild(Lwldialog)

  // Diese Funktion wird im HTML beim Klick auf ein Kästchen aufgerufen
  protected handleLwlClick(item: any) {
    const aktuellerStatus = this.userStatus()[item.id] || 'offen';

    // DER FUNKTIONSAUFRUF: Wir rufen die 'open'-Methode der Kind-Komponente auf
    this.detailDrawer()?.open(item, aktuellerStatus);
  }

  // Wird gefeuert, wenn der User im Drawer einen Status klickt
  protected handleStatusChange(event: { id: string, status: any }) {
    this.userlwlstatus.handleStatusChange(event, this.userDataService.getUserId())
    //this.userStatus[event.id] = event.status;
  }

  // erstellt diese balken die in der kompletten übersicht für jede lwl sichtbar sind
  // Ergänze dieses computed-Signal in deiner CompetencegridComponent:
  protected lwlProgressMap = computed(() => {
    const userIds = this.userlwlstatus.activeCourseUserIds(); // Alle Schüler im Kurs
    const totalStudents = userIds.length;
    const statusList = this.userlwlstatus.lwlStatus();        // Alle geladenen Stati

    // Hier speichern wir das Ergebnis pro LWL-ID
    const map: Record<string, { erledigt: number; inArbeit: number }> = {};
    if (totalStudents === 0) return map;

    // 1. Zähle die Stati pro LWL zusammen
    for (const s of statusList) {
      // Nur zählen, wenn der User auch wirklich zum aktuellen Kurs gehört
      if (!userIds.includes(s.userId)) continue;

      if (!map[s.lwlId]) {
        map[s.lwlId] = { erledigt: 0, inArbeit: 0 };
      }

      if (s.status === 'erledigt') map[s.lwlId].erledigt++;
      if (s.status === 'in_arbeit') map[s.lwlId].inArbeit++;
    }

    // 2. Wandle die gezählten Werte direkt in Prozentwerte um
    for (const lwlId in map) {
      map[lwlId].erledigt = (map[lwlId].erledigt / totalStudents) * 100;
      map[lwlId].inArbeit = (map[lwlId].inArbeit / totalStudents) * 100;
    }

    return map;
  });

  // stuert button zum in der liste zu lwl zu springen
  scrollToLastEdited() {
  this.viewMode.set('list');
  
  // 1. Erzwinge einen harten Reset der Indizes (schließt alles, falls noch Reste offen waren)
  this.activeThemaIndex.set(undefined);
  this.activeLernfeldIndex.set(undefined);
  
  // 2. Erster kleiner Timeout: Warte, bis Angular den Reset im DOM verarbeitet hat
  setTimeout(() => {
    // Hier die Indizes setzen, die du ansteuern willst (z.B. Index 0 und Index 0)
    this.activeThemaIndex.set(0); 
    this.activeLernfeldIndex.set(7-1);

    // 3. Zweiter Timeout: Warte, bis die PrimeNG-Aufklapp-Animation läuft, 
    // damit die Höhe des Elements im Browser bekannt ist
    setTimeout(() => {
      // Nutze die ID der Kachel. Erinnere dich: Im HTML steht id="lwl-{{item.id}}" 
      // oder dein 'last-edited-lwl'
      const element = document.getElementById('last-edited-lwl'); 
      console.log(element)
      
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' // Scrollt so, dass das Element genau in der Mitte des Bildschirms landet
        });
      }
    }, 200); // 200ms gibt der Animation genug Zeit
  }, 50);
}

  getThemaProgress(themaId: string) {
    let total = 0;
    let done = 0;

    // Wir gehen alle Levels durch und holen die LWLs für dieses eine Thema
    this.niveaus().forEach(level => {
      const lf = this.getLernfeld(themaId, level);
      if (lf) {
        const lwls = this.getLWL(lf.lernfeldId) || [];
        total += lwls.length;
        done += lwls.filter(item => this.userStatus()[item.id] === 'erledigt').length;
      }
    });

    return {
      total,
      done,
      percent: total > 0 ? Math.round((done / total) * 100) : 0
    };
  }

  // Prüft, ob im aktuellen Level LWLs mit einem bestimmten Status existieren
  hasLwlStatusInLernfeld(lernfeldId: string, status: 'erledigt' | 'in_arbeit'): boolean {
    const lwls = this.getLWL(lernfeldId) || [];
    return lwls.some(item => this.userStatus()[item.id] === status);
  }

  countOpenLwls(lernfeldId: string): number {
    const lwls = this.getLWL(lernfeldId) || [];
    return lwls.filter(item => {
      const status = this.userStatus()[item.id];
      return status === 'offen' || !status; // 'offen' oder noch gar nicht angefasst
    }).length;
  }

}

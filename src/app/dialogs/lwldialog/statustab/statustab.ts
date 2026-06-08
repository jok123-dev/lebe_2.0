import { Component, computed, effect, inject, output, signal, viewChild } from '@angular/core';
import { Lwldialog } from '../lwldialog';
import { Copetencegriddataservice } from '../../../dataservices/copetencegriddataservice';
import { CommonModule } from '@angular/common';
import { Userlwlstatus } from '../../../dataservices/userlwlstatus';
import { Loginservice } from '../../../dataservices/loginservice';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-statustab',
  imports: [CommonModule],
  templateUrl: './statustab.html',
  styleUrl: './statustab.css',
})
export class Statustab {

  protected competencegridDataService = inject(Copetencegriddataservice);
  protected lwlStatusService = inject(Userlwlstatus)
  protected lwlDialog = inject(Lwldialog)
  protected loginService = inject(Loginservice)
  private route = inject(ActivatedRoute);

  protected data = computed(() => this.lwlDialog.data()); // enthält u.a. die id der lwl

  protected status = signal<'offen' | 'in_arbeit' | 'erledigt'>('offen');

  // 4. Das moderne Angular-Output (ersetzt @Output() und EventEmitter)
  public onSaved = output<{ id: string; status: 'offen' | 'in_arbeit' | 'erledigt' }>();

  public setStatusFromClickedLwl(p_status: any) {
    this.status.set(p_status || 'offen');
  }

  protected updateStatus(newStatus: 'offen' | 'in_arbeit' | 'erledigt') {
    this.status.set(newStatus);
    const currentId = this.data()?.id;
    
    if (currentId) {
      this.onSaved.emit({ id: currentId, status: newStatus });
    }

    if (newStatus === 'in_arbeit') {
      this.lwlDialog.activeTabAktualisieren('1');
    }
  }

  // macht die berechnung für den balken
  
  protected kursFortschritt = computed(() => {
    const currentLwl = this.data();
    if (!currentLwl) return null;

    // Wir holen uns die fertig gefilterten Kurs-IDs aus dem Service (z.B. ['1', '2'])
    const mitschuelerIds = this.lwlStatusService.activeCourseUserIds();
    const gesamtAnzahl = mitschuelerIds.length;
    if (gesamtAnzahl === 0) return null;

    // Wir filtern NUR NOCH die Stati für diese spezifische LWL-ID heraus
    const lwlStati = this.lwlStatusService.lwlStatus()
      .filter(s => s.lwlId === currentLwl.id && mitschuelerIds.includes(s.userId));

    const erledigt = lwlStati.filter(s => s.status === 'erledigt').length;
    const inArbeit = lwlStati.filter(s => s.status === 'in_arbeit').length;
    const offen = gesamtAnzahl - erledigt - inArbeit;

    return {
      erledigtProzent: (erledigt / gesamtAnzahl) * 100,
      inArbeitProzent: (inArbeit / gesamtAnzahl) * 100,
      details: { erledigt, inArbeit, offen, gesamt: gesamtAnzahl }
    };
  });
}

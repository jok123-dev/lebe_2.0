import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Copetencegriddataservice {
  private _competencegrids = signal([
    { id: '0', title: 'Informatik Eingangsklasse', class: '13', description: 'Excel und HTML Grundlagen.' },
    { id: '1', title: 'Mathe Eingangsklasse', class: '11', description: 'Kurvendiskussion und Vektoren.' },
    { id: '2', title: 'Informatik Oberstufe', class: '12', description: 'Fortgeschrittenes Angular.' },
    { id: '3', title: 'Chemie Eingangsklasse', class: '11', description: 'Molekulare Strukturen.' },
    { id: '4', title: 'Wirtschaft Grundlagen', class: '12', description: 'Marktwirtschaft und Verträge.' },
    { id: '5', title: 'Englisch Kommunikation', class: '13', description: 'Business English und Debatten.' }
  ]);

  private _userToCompetencegrids = signal([
  // Schüler 1, 2, 3 und 4 haben das Info-Raster (cgId: '0') über den Kurs '1' bekommen
  { id: '100', userId: '1', competencegridId: '0', courseId: '1', accessDate: '2026-02-01' },
  { id: '101', userId: '2', competencegridId: '0', courseId: '1', accessDate: '2026-02-01' },
  { id: '102', userId: '3', competencegridId: '0', courseId: '1', accessDate: '2026-02-01' },
  { id: '103', userId: '4', competencegridId: '0', courseId: '1', accessDate: '2026-02-01' },

  // Schüler 1 und 2 haben zusätzlich das Mathe-Raster (cgId: '1') über den Kurs '2' bekommen
  { id: '104', userId: '1', competencegridId: '1', courseId: '2', accessDate: '2026-03-15' },
  { id: '105', userId: '2', competencegridId: '1', courseId: '2', accessDate: '2026-03-15' }
]);

  //bestimmt die anzahl an zeilen (sind die großen tehmen) cgId ist die id des kompetenzrasters
  protected themen = signal([
    // --- Raster 0: Informatik ---
    { id: 't1', cgId: '0', name: 'Frontend Entwicklung' },
    { id: 't2', cgId: '0', name: 'Backend & Datenbanken' },
    { id: 't3', cgId: '0', name: 'Soft Skills & Tools' },
    
    // --- Raster 1: Mathe ---
    { id: 't4', cgId: '1', name: 'Arithmetik & Algebra' },
    { id: 't5', cgId: '1', name: 'Analysis (Kurvendiskussion)' },
    { id: 't6', cgId: '1', name: 'Analytische Geometrie (Vektoren)' }
  ]);

  //sind die ich kann formulierungen also schnittpunkte von themen mit lernfortschittstufen (lfs) und beherbergen die lwl
  protected lernfelder = signal([
   //informatik
    // Zeile 1: Frontend (t1)
    { lernfeldId: '1', bereichId: 't1', lfspos: '1', beschreibung: 'Ich kann grundlegend mit HTML und CSS arbeiten.' },
    { lernfeldId: '2', bereichId: 't1', lfspos: '2', beschreibung: 'Ich kann komplexe Formulare und moderne Layouts erstellen.' },
    { lernfeldId: '3', bereichId: 't1', lfspos: '3', beschreibung: 'Ich kann reaktive Single-Page-Apps mit Angular bauen.' },
    { lernfeldId: '4', bereichId: 't1', lfspos: '4', beschreibung: 'Ich kann reaktive Single-Page-Apps mit Angular bauen.' },
    { lernfeldId: '5', bereichId: 't1', lfspos: '5', beschreibung: 'Ich kann reaktive Single-Page-Apps mit Angular bauen.' },
    { lernfeldId: '5', bereichId: 't1', lfspos: '6', beschreibung: 'Ich kann reaktive Single-Page-Apps mit Angular bauen.' },
    { lernfeldId: '5', bereichId: 't1', lfspos: '7', beschreibung: 'Ich kann reaktive Single-Page-Apps mit Angular bauen.' },
    
    // Zeile 2: Backend (t2)
    { lernfeldId: '4', bereichId: 't2', lfspos: '1', beschreibung: 'Ich kann einen lokalen Node.js Server aufsetzen.' },
    { lernfeldId: '5', bereichId: 't2', lfspos: '2', beschreibung: 'Ich kann eine REST-API mit Express programmieren.' },
    { lernfeldId: '6', bereichId: 't2', lfspos: '3', beschreibung: 'Ich kann relationale Datenbanken designen und abfragen.' },
    
    // Zeile 3: Soft Skills (t3)
    { lernfeldId: '7', bereichId: 't3', lfspos: '1', beschreibung: 'Ich kann Git für die Versionsverwaltung nutzen.' },
    { lernfeldId: '8', bereichId: 't3', lfspos: '2', beschreibung: 'Ich verstehe das agile Arbeiten nach Scrum.' },
    { lernfeldId: '9', bereichId: 't3', lfspos: '3', beschreibung: 'Ich kann Code-Reviews im Team strukturiert durchführen.' },
    //mathe
    // Zeile 1: Arithmetik (t4)
    { lernfeldId: '10', bereichId: 't4', lfspos: '1', beschreibung: 'Ich beherrsche die Grundrechenarten im Kopf und schriftlich.' },
    { lernfeldId: '11', bereichId: 't4', lfspos: '2', beschreibung: 'Ich kann sicher mit Brüchen und Dezimalzahlen operieren.' },
    { lernfeldId: '12', bereichId: 't4', lfspos: '3', beschreibung: 'Ich kann Gleichungssysteme mit mehreren Variablen lösen.' },
    
    // Zeile 2: Analysis (t5)
    { lernfeldId: '13', bereichId: 't5', lfspos: '1', beschreibung: 'Ich kann lineare und quadratische Funktionen analysieren.' },
    { lernfeldId: '14', bereichId: 't5', lfspos: '2', beschreibung: 'Ich kann die Ableitungsregeln sicher anwenden.' },
    { lernfeldId: '15', bereichId: 't5', lfspos: '3', beschreibung: 'Ich kann eine vollständige Kurvendiskussion durchführen.' },
    
    // Zeile 3: Vektoren (t6)
    { lernfeldId: '16', bereichId: 't6', lfspos: '1', beschreibung: 'Ich kann Punkte im dreidimensionalen Raum eintragen.' },
    { lernfeldId: '17', bereichId: 't6', lfspos: '2', beschreibung: 'Ich kann Vektoren addieren und grafisch darstellen.' },
    { lernfeldId: '18', bereichId: 't6', lfspos: '3', beschreibung: 'Ich kann das Skalarprodukt für Winkelberechnungen nutzen.' }
  ]);

  // füllen dann die lernfelder
  protected lernwegelisten = signal([
    // LWLs für Informatik (Grid 0)
    { id: '1', lernfeldId: '1', text: 'HTML-Grundgerüst aufsetzen' },
    { id: '2', lernfeldId: '1', text: 'Einfache CSS-Stylings anwenden' },
    
    { id: '3', lernfeldId: '2', text: 'Formulare und Validierungen erstellen' },
    { id: '4', lernfeldId: '2', text: 'Tailwind CSS im Projekt integrieren' },
    { id: '5', lernfeldId: '2', text: 'Verständnis von Flexbox & Grid-Layouts' },
    
    { id: '6', lernfeldId: '3', text: 'Angular CLI installieren und App initialisieren' },
    { id: '7', lernfeldId: '3', text: 'Komponenten-Kommunikation mit Signals umsetzen' },
    
    { id: '8', lernfeldId: '4', text: 'Node.js Laufzeitumgebung lokal installieren' },
    { id: '9', lernfeldId: '4', text: 'Ein einfaches HTTP-Server-Skript ausführen' },
    
    { id: '10', lernfeldId: '5', text: 'Express-Routen für GET und POST definieren' },
    { id: '11', lernfeldId: '5', text: 'API-Endpunkte mit Postman testen' },
    
    { id: '12', lernfeldId: '6', text: 'Ein Entity-Relationship-Diagramm (ERD) entwerfen' },
    { id: '13', lernfeldId: '6', text: 'Komplexe SQL-Joins über drei Tabellen schreiben' },
    
    { id: '14', lernfeldId: '7', text: 'Ein lokales Git-Repository initialisieren & Commits erstellen' },
    { id: '15', lernfeldId: '7', text: 'Branches erstellen und Merge-Konflikte lösen' },
    
    { id: '16', lernfeldId: '8', text: 'Die Kern-Rollen im Scrum (Product Owner, Scrum Master) erklären' },
    { id: '17', lernfeldId: '8', text: 'Ein Sprint-Planning simulieren und Aufwände schätzen' },
    
    { id: '18', lernfeldId: '9', text: 'Einen Pull Request auf GitHub einreichen' },
    { id: '19', lernfeldId: '9', text: 'Konstruktive Code-Kritik anhand von Guidelines verfassen' },

    // LWLs für Mathe (Grid 1)
    { id: '20', lernfeldId: '10', text: 'Arbeitsblatt: Schriftliche Multiplikation großer Zahlen' },
    { id: '21', lernfeldId: '10', text: 'Kopfrechen-Challenge: Punkt-vor-Strich und Klammerregeln' },
    
    { id: '22', lernfeldId: '11', text: 'Brüche auf denselben Nenner erweitern und kürzen' },
    { id: '23', lernfeldId: '11', text: 'Textaufgaben mit Dezimalbrüchen lösen' },
    
    { id: '24', lernfeldId: '12', text: 'Das Additions- und Einsetzungsverfahren anwenden' },
    { id: '25', lernfeldId: '12', text: 'Gleichungssysteme mit dem Gauss-Verfahren lösen' },
    
    { id: '26', lernfeldId: '13', text: 'Steigungsdreiecke von linearen Funktionen zeichnen' },
    { id: '27', lernfeldId: '13', text: 'Die Scheitelpunktform einer Parabel berechnen' },
    
    { id: '28', lernfeldId: '14', text: 'Potenz-, Faktor- und Summenregel trainieren' },
    { id: '29', lernfeldId: '14', text: 'Schwierige Ableitungen mit der Produkt- und Kettenregel lösen' },
    
    { id: '30', lernfeldId: '15', text: 'Nullstellen mithilfe der pq-Formel bestimmen' },
    { id: '31', lernfeldId: '15', text: 'Extrempunkte (Hoch-/Tiefpunkte) rechnerisch nachweisen' },
    
    { id: '32', lernfeldId: '16', text: 'Punkte in ein dreidimensionales Koordinatensystem einzeichnen' },
    { id: '33', lernfeldId: '16', text: 'Abstand zwischen zwei Punkten im Raum berechnen' },
    
    { id: '34', lernfeldId: '17', text: 'Vektoren rechnerisch addieren und subtrahieren' },
    { id: '35', lernfeldId: '17', text: 'Pfeilketten im Koordinatensystem zeichnerisch verbinden' },
    
    { id: '36', lernfeldId: '18', text: 'Prüfen, ob zwei Vektoren orthogonal (senkrecht) zueinander stehen' },
    { id: '37', lernfeldId: '18', text: 'Den Schnittwinkel zwischen zwei Geraden im Raum ermitteln' }
  ]);

  // Nach außen hin als schreibgeschützte Signals freigeben // macht keins sinnn da später immer gefilterte tabellen zurück kommen
  public competencegrids = this._competencegrids.asReadonly();
  public userToCompetencegrids = this._userToCompetencegrids.asReadonly();

  getCompetencegrid(id: string | undefined) {
    if (!id) return null;
    const foundGrid = this.competencegrids().find(grid => String(grid.id) === String(id));
    return foundGrid || null;
  }
  
  getThemen(cgId: string) {
    return this.themen().filter(lwl => lwl.cgId === cgId)
  }

  getLernfelder(themenId: string[]) {
    let gesLernfelder = this.lernfelder().filter(feld => themenId.includes(feld.bereichId))
    return gesLernfelder
  }

  getLernfeldNachId(id: string) {
    const lernfeld = this.lernfelder().filter(feld => feld.lernfeldId === id)
    return lernfeld[0]
  }

  getLWLs(lernfeldIds: string[]) {
    let gesLWLs = this.lernwegelisten().filter(lwl => lernfeldIds.includes(lwl.lernfeldId))
    return gesLWLs
  }

  // was nun kommt dient der berechnung der balken die den status des kurses anzeigen
  /*
  // Diese Signale werden beim Öffnen des Rasters frisch vom Server befüllt und enthalten NUR die Daten für das aktuelle Raster und den aktuellen Kurs!
  public activeCourseUserIds = signal<string[]>([]);
  public activeGridLwlStatuses = signal<{id: string, lwlId: string, userId: string, status: string}[]>([]);

  public loadGridContextFromServer(currentUserId: string, competencegridId: string) {
    // 1. Hole exakt die Mitschüler-IDs für DIESEN Kurs und DIESES Raster
    // SQL im Hintergrund: SELECT userId FROM user_to_competencegrid WHERE courseId = ...
    const geladeneMitschuelerIds = ['1', '2', '3', '4', '0']; // '0' ist der aktuelle User erfolgt säper natürlich auch durch eine passende abfrage
    this.activeCourseUserIds.set(geladeneMitschuelerIds);

    // 2. Hole exakt die LWL-Stati NUR für diese Schüler und NUR für dieses Raster
    // SQL im Hintergrund: SELECT * FROM lwl_status WHERE userId IN (...) AND lwlId IN (...)
    const geladeneStati = [
      { id: '2', lwlId: '4', userId: '1', status: 'erledigt' },
      { id: '3', lwlId: '3', userId: '1', status: 'in_arbeit' },
      { id: '1', lwlId: '0', userId: '1', status: 'erledigt' },
      { id: '4', lwlId: '1', userId: '1', status: 'erledigt' },
      { id: '5', lwlId: '2', userId: '1', status: 'in_arbeit' },
      // ... nur die paar Zeilen, die für dieses 3x3 Grid gebraucht werden!
    ];
    this.activeGridLwlStatuses.set(geladeneStati);
  }

  public handleStatusChange(lwlId: string, currentUserId: string, neuerStatus: string) {
    this.activeGridLwlStatuses.update(liste => {
      const existiert = liste.find(i => i.lwlId === lwlId && i.userId === currentUserId);
      if (existiert) {
        return liste.map(i => i.lwlId === lwlId && i.userId === currentUserId ? { ...i, status: neuerStatus } : i);
      } else {
        return [...liste, { id: Math.random().toString(), lwlId, userId: currentUserId, status: neuerStatus }];
      }
    });
    // Später hier zusätzlich: this.http.put('/api/status', {lwlId, status: neuerStatus}).subscribe();
  }
*/
}

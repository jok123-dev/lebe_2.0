import { Component, inject, signal, ViewChild } from '@angular/core';
import { Fileservice } from '../../../dataservices/fileservice';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { Uploadservice } from '../../../dataservices/uploadservice';

@Component({
  selector: 'app-uploadtab',
  imports: [FileUploadModule, CommonModule],
  templateUrl: './uploadtab.html',
  styleUrl: './uploadtab.css',
})
export class Uploadtab {

  protected fileService = inject(Fileservice)
  protected uploadService = inject(Uploadservice)

  @ViewChild('uploader') uploader?: any;

  //protected uploadedFiles: any[] = [];

  protected onUpload(event: any) {
    this.uploadService.uploadProgress.set(0);

    // --- DEIN ECHTER HTTP-UPLOAD ODER SIMULATION ---
    const interval = setInterval(() => {
      const aktuellerFortschritt = this.uploadService.uploadProgress();

      if (aktuellerFortschritt < 100) {
        // ⏳ WUNSCH 1: Fortschritt steigt kontinuierlich an
        this.uploadService.uploadProgress.set(aktuellerFortschritt + 10);
      } else {
        clearInterval(interval);

        // 🟢 WUNSCH 2: Dateien wandern SOFORT (ohne 2. Klick) in die grüne Liste
        this.uploadService.uploadedFilesList.update(aktuelleListe => [...aktuelleListe, ...event.files]);

        // Warteschlange von PrimeNG leeren, damit die grauen "Wartend"-Einträge verschwinden
        if (this.uploader) {
          this.uploader.clear();
        }

        // Ladebalken wieder auf 0 setzen (blendet ihn im HTML aus)
        this.uploadService.uploadProgress.set(0);

        // TIPP: Hier kannst du optional auch deine Hauptliste aktualisieren,
        // damit die Dateien direkt oben bei den Dokumenten erscheinen:
        // this.fileService.getFilesForLwl(this.data.id).subscribe(d => this.files.set(d));
      }
    }, 100);
  }

  public clearQueue() {
    if (this.uploader) {
      this.uploader.clear();
    }
  }
}

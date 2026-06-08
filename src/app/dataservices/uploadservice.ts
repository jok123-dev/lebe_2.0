import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Uploadservice {

  uploadProgress = signal<number>(0);
  uploadedFilesList = signal<any[]>([]);
}

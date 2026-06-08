import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Coursservice {
  
  protected courses = signal([
    { id: '1', name: 'Informatik 11 24/25 Pe', createdate: '2023-02-23', deletedate: '' },
    { id: '2', name: 'Mathe 11 Grundkurs', createdate: '2023-09-01', deletedate: '' },
    { id: '3', name: 'Alter Info-Kurs von 2024', createdate: '2024-02-01', deletedate: '2025-07-31' } // 💡 Soft-deleted!
  ]);

}

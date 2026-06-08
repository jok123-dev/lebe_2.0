import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Userdataservice {
  getUserId(): string {
    return '1'
  }



  private userData = [
    {
      id: '1',
      name: 'Kummer',
      prename: 'Jonas',
      midname: 'Dion',
      birthday: '01.01.2020',
      email1: 'jokummer@test.de',
      email2: '',
      role: 'admin'
    },
    {
      id: '2',
      name: 'Perschke',
      prename: 'Thomas',
      midname: '',
      birthday: '03.01.2020',
      email1: 'perschke@test.de',
      email2: '',
      role: 'teacher'
    },
    {
      id: '3',
      name: 'Hufgard',
      prename: 'Henry',
      midname: '',
      birthday: '01.01.2030',
      email1: 'hufgardhenry@test.de',
      email2: '',
      role: 'student'
    }
  ]

  
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, map } from 'rxjs';
import { Contact } from './contact.model';
import { nanoid } from 'nanoid'

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private http: HttpClient) { }
  //toma un contacto como parámetro y carga el contact desde la api (servicio de llamadas http)
  getContact(id: string): Observable<Contact | undefined> {
    return this.http.get<Contact>(`api/contacts/${id}`)
    //########   cambia el formato de la fecha de nacimiento ##########
      .pipe(map(c => {
       const dob = c.dateOfBirth ? new Date(c.dateOfBirth) : null;
        return { ...c, dateOfBirth: dob }
      }));
  }

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('api/contacts');
  }

  saveContact(contact: Contact): Observable<Contact> {
    const headers = { headers: { 'Content-Type': 'application/json' } };
//cuando llama al saveContact, si el contacto tiene un id existe o esta vacio. Si no existe(vacio) crea un nuevo contacto con un id generado por nanoid
    if (!contact.id || contact.id === '') {
      let newContact: Contact = { ...contact, id: nanoid(5) };
      //llama al http post que guardara el nuevo contacto en la api
      return this.http.post<Contact>('api/contacts/', newContact, headers)
    }
    else
    //si ya tiene id, llama al put para actualizar el contacto existente
      return this.http.put<Contact>('api/contacts/', contact, headers).pipe(delay(0))
  }
}

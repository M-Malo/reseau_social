import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from './model/event';


@Injectable({
  providedIn: 'root'
})
export class EventsBackService {

  private apiUrl = 'http://localhost:5000/event';

  constructor(private http: HttpClient) { }

  addEvent(eventData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/new`, eventData);
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}`);
  }

  getEventsFiltred(prix: number, nom: string, theme: string): Observable<Event[]> {
    let url = `${this.apiUrl}/filtre/${prix}/`;
  
    // Ajouter le paramètre nomEvent s'il est renseigné, passer à -1 sinon
    if (nom) {
      url += `${nom}/`;
    } else {
      url += `-1/`; 
    }
  
    // Ajouter le paramètre themeEvent s'il est renseigné, passer à -1 sinon
    if (theme) {
      url += `${theme}`;
    } else {
      url += `-1`;
    }
  
    return this.http.get<Event[]>(url);
  }
  

  getEventById(eventId : String): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${eventId}`);
  }

  getEventsByUser(userId : String): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/get/${userId}`);
  }

}

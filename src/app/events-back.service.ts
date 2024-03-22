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

  async addEvent(eventData: any): Promise<Observable<any>> {
    return this.http.post<any>(`${this.apiUrl}/new`, eventData);
  }

  async updateEvent(eventData: any): Promise<Observable<any>> {
    return this.http.post<any>(`${this.apiUrl}/update/${eventData._id}`, eventData);
  }

  async getEvents(): Promise<Observable<Event[]>> {
    return this.http.get<Event[]>(`${this.apiUrl}`);
  }

  async getEventsFiltered(prix: number, nom: string, theme: string): Promise<Observable<Event[]>> {
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

  // async getEventsFiltered(filters: any): Promise<Observable<Event[]>> {
  //   return this.http.post<Event[]>(`${this.apiUrl}/filter`, filters);
  // }

  async getEventById(eventId : String): Promise<Observable<Event>> {
    return this.http.get<Event>(`${this.apiUrl}/${eventId}`);
  }

  async getEventsByUser(userId : String): Promise<Observable<Event[]>> {
    return this.http.get<Event[]>(`${this.apiUrl}/get/${userId}`);
  }

}

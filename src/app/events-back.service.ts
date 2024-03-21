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

  getEventsFiltred(filtres: any): Observable<Event[]> {
    return this.http.post<Event[]>(`${this.apiUrl}/filtre`, filtres);
  }

  getEventById(eventId : String): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${eventId}`);
  }

  getEventsByUser(userId : String): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/get/${userId}`);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favori } from './model/favori';


@Injectable({
  providedIn: 'root'
})
export class FavorisBackService {

  private apiUrl = 'http://localhost:5000/favori/';

  constructor(private http: HttpClient) { }

  async getFavorisByUser(userId : string): Promise<Observable<Favori[]>> {
    return this.http.get<Favori[]>(`${this.apiUrl}user/${userId}`);
  }

  async getFavorisByEvent(eventId : string): Promise<Observable<Favori[]>> {
    return this.http.get<Favori[]>(`${this.apiUrl}event/${eventId}`);
  }

  async addFavoris(favoriData : Favori): Promise<Observable<Favori[]>> {
    return this.http.post<Favori[]>(`${this.apiUrl}event`, favoriData);
  }

}

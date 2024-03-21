import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FavorisBackService {

  private apiUrl = 'http://localhost:5000/favori/';

  constructor(private http: HttpClient) { }

  // getFavorisByUser(): Observable<Favori[]> {
  //   return this.http.get<Favori[]>(`${this.apiUrl}user`);
  // }

  // getFavorisByEvent(): Observable<Favori[]> {
  //   return this.http.get<Favori[]>(`${this.apiUrl}event`);
  // }

  // addFavorisByEvent(): Observable<Favori[]> {
  //   return this.http.post<Favori[]>(`${this.apiUrl}event`); //Voir comment post
  // }

}

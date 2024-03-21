import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class UsersBackService {

  private apiUrl = 'http://localhost:5000/user';

  constructor(private http: HttpClient) { }

  addUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/new`, userData);
  }

  getUserById(userId : String): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

}

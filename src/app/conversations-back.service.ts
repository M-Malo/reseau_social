import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversation } from './model/conversation';

@Injectable({
  providedIn: 'root'
})
export class ConversationsBackService {

  private apiUrl = 'http://localhost:5000/conversation';

  constructor(private http: HttpClient) { }

  getConversationById(conversationId : String): Observable<Conversation> {
    return this.http.get<Conversation>(`${this.apiUrl}/${conversationId}`);
  }

  getConversationsByUser(userId : String): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${this.apiUrl}/get/${userId}`);
  }

}

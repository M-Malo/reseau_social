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

  async getConversationById(conversationId : String): Promise<Observable<Conversation>> {
    return this.http.get<Conversation>(`${this.apiUrl}/${conversationId}`);
  }

  async getConversationsByUser(userId : String): Promise<Observable<Conversation[]>> {
    return this.http.get<Conversation[]>(`${this.apiUrl}/get/${userId}`);
  }

}

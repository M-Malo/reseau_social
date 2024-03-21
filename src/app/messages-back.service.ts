import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from './model/message';

@Injectable({
  providedIn: 'root'
})
export class MessagesBackService {

  private apiUrl = 'http://localhost:5000/message';

  constructor(private http: HttpClient) { }

  getMessagesByConversation(conversationId : String): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/${conversationId}`);
  }
  
  addMessage(messageData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${messageData.id_conversation}/new`, messageData);
  }
}

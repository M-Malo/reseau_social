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

  async getMessagesByConversation(conversationId : String): Promise<Observable<Message[]>> {
    return this.http.get<Message[]>(`${this.apiUrl}/${conversationId}`);
  }

  async getLastMessageForConversation(conversationId : String): Promise<Observable<Message>> {
    return this.http.get<Message>(`${this.apiUrl}/last/${conversationId}`);
  }
  
  async addMessage(messageData: any): Promise<Observable<any>> {
    return this.http.post<any>(`${this.apiUrl}/${messageData.id_conversation}/new`, messageData);
  }
}

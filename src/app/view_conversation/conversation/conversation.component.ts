import { Component } from '@angular/core';
import { Conversation } from 'src/app/model/conversation';
import { Message } from 'src/app/model/message';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent {
  conversationListe: Conversation[] = [new Conversation(0,0,1),new Conversation(1,0,2),new Conversation(2,0,3)]
  dernierMessage: Message = new Message(0,0,0,"C'est mon dernier message",new Date())
  user = "M-Malo"
}

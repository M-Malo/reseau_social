import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConversationsBackService } from 'src/app/conversations-back.service';
import { Conversation } from 'src/app/model/conversation';
import { Message } from 'src/app/model/message';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent {
  conversationListe: Conversation[] = [new Conversation("0","0","1"),new Conversation("1","0","2"),new Conversation("2","0","3")]
  dernierMessage: Message = new Message("0","0","0","C'est mon dernier message","2024-03-19")
  user = "M-Malo"

  constructor(private conversationBackservice: ConversationsBackService, private router: Router) {
    //this.getConversations();
  }

  getConversations() {

    this.conversationBackservice.getConversationsByUser("userId").subscribe( //TODO comment récupérer userId ??
      (events: Conversation[]) => {
        this.conversationListe = events;
        console.log(this.conversationListe);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des événements :', error);
      }
    );
  }

  navigateTo(idConversation: string) {
    idConversation = "65fadeacb1072c2526f04e82"; //TODO retirer pour avoi le bon id du composant
    const url = "conversation"
    this.router.navigateByUrl(url);
    this.router.navigate([url, idConversation]);
  }
}

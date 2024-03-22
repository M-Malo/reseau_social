import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConversationsBackService } from 'src/app/conversations-back.service';
import { MessagesBackService } from 'src/app/messages-back.service';
import { Conversation } from 'src/app/model/conversation';
import { Message } from 'src/app/model/message';
import { User } from 'src/app/model/user';
import { UsersBackService } from 'src/app/users-back.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent {
  conversationListe: Conversation[] = [];
  user = "M-Malo"
  userId = "65fc83aa45a227143bff25d4" //TODO mettre l'Id de user

  constructor(private conversationBackservice: ConversationsBackService, private messageBackService : MessagesBackService, private userBackService: UsersBackService, private router: Router) {
    this.getConversations();
  }
  
  async getConversations() {

    (await this.conversationBackservice.getConversationsByUser(this.userId)).subscribe(
      async (conversations: Conversation[]) => {
        await this.updateInfosConversations(conversations);
        console.log(this.conversationListe);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des événements :', error);
      }
    );
  }

  async updateInfosConversations(conversations: Conversation[]) {
    for (let conversation of conversations){
      await (await this.messageBackService.getLastMessageForConversation(conversation._id)).subscribe(
        async (message: Message) => {

          await (await this.userBackService.getUserById(conversation.id_user1===this.userId ? conversation.id_user2 : conversation.id_user1)).subscribe(
            async (user: User) => {
              conversation.dernier_message = message;
              conversation.otherUser = user;
              this.conversationListe.push(conversation);
            },
            (error) => {
              console.error('Une erreur s\'est produite lors de la récupération des événements :', error);        
            }
          );
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la récupération des événements :', error);
        }
      );
    }
  }


  navigateTo(idConversation: string) {
    idConversation = "65fadeacb1072c2526f04e82"; //TODO retirer pour avoi le bon id du composant
    const url = "conversation"
    this.router.navigateByUrl(url);
    this.router.navigate([url, idConversation]);
  }
}

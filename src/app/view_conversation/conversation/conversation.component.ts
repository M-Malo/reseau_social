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
  userId: string = "";
  username: string = "";

  constructor(private conversationBackservice: ConversationsBackService, private messageBackService : MessagesBackService, private userBackService: UsersBackService, private router: Router) {
    if(localStorage.getItem("userId")){
      this.userId = JSON.stringify(localStorage.getItem("userId"))
      this.username = JSON.stringify(localStorage.getItem("username"))
      this.userId = this.userId.split('"')[1]
      this.username = this.username.split('"')[1]
    }
    this.getConversations();
  }
  
  async getConversations() {

    (await this.conversationBackservice.getConversationsByUser(this.userId)).subscribe(
      async (conversations: Conversation[]) => {
        await this.updateInfosConversations(conversations);
        console.log(this.conversationListe);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des conversations :', error);
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
              console.error('Une erreur s\'est produite lors de la récupération de l\'utilisateur :', error);        
            }
          );
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la récupération de la conversation :', error);
        }
      );
    }
  }


  navigateTo(idConversation: string) {
    const url = "conversation"
    this.router.navigateByUrl(url);
    this.router.navigate([url, idConversation]);
  }
}

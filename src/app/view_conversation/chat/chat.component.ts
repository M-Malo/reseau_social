import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/model/message';
import { WebSocketService } from 'src/app/web-socket.service';
import { MessagesBackService } from 'src/app/messages-back.service'; 
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  id_conversation: string = "65fadeacb1072c2526f04e82";

  messages: Message[] = [];
  newMessageText: string = '';

  constructor(private route: ActivatedRoute, private router: Router,private messagesBackService: MessagesBackService, private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      //this.id_conversation = params['id']; // Récupère l'ID de l'URL
      this.id_conversation = "65fadeacb1072c2526f04e82";
    });
    this.getMessages();
    
    // Écouter les nouveaux messages via WebSocket
    this.webSocketService.listen('new-message').subscribe((message: Message) => {
      if (message.id_conversation === this.id_conversation) {
        this.messages.push(message);
        console.log(this.messages);
      }
    });
  }

  getMessages() {
    console.log("recuperation des messages");
    this.messagesBackService.getMessagesByConversation("65fadeacb1072c2526f04e82").subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        console.log(messages);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des messages de la conversation :', error);
      }
    );
  }

  sendMessage() {
    console.log('Envoi du message en cours...');
    const newMessageData = {
      id_conversation: "65fadeacb1072c2526f04e82",
      id_user: "65fadeacb1072c2526f04e82",
      contenu: this.newMessageText,
      date_envoi: "2024-02-02"
    };
  
    console.log('Données du nouveau message :', newMessageData);
  
    this.messagesBackService.addMessage(newMessageData).subscribe(
      (response) => {
        console.log('Message envoyé avec succès :', response);
        // Effacer le champ de saisie après l'envoi du message
        this.newMessageText = '';
        this.webSocketService.emit('new-message', newMessageData);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de l\'envoi du message :', error);
      }
    );
  }
  
}

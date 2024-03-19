import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './view_accueil/accueil/accueil.component';
import { HeaderComponent } from './header/header.component';
import { AccountComponent } from './account/account.component';
import { ConversationComponent } from './view_conversation/conversation/conversation.component';
import { ChatComponent } from './view_conversation/chat/chat.component';
import { EventFormComponent } from './event/event-form/event-form.component';
import { EventViewComponent } from './event/event-view/event-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccueilComponent,
    HeaderComponent,
    AccountComponent,
    ConversationComponent,
    ChatComponent,
    EventFormComponent,
    EventViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

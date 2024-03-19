import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './view_accueil/accueil/accueil.component';
import { AccountComponent } from './account/account.component';
import { ConversationComponent } from './view_conversation/conversation/conversation.component';
import { EventFormComponent } from './event/event-form/event-form.component';
import { EventViewComponent } from './event/event-view/event-view.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'account', component: AccountComponent },
  { path: 'conversation', component: ConversationComponent },
  { path: 'eventForm', component: EventFormComponent },
  { path: 'eventDetail', component: EventViewComponent },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', redirectTo: 'accueil', pathMatch: 'full' },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from './component/admin/admin.component';
import {BotChatComponent} from './component/bot-chat/bot-chat.component';
import {ResumeComponent} from './component/resume/resume.component';
import {LoginComponent} from './component/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'resume', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'bot', component: BotChatComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: 'resume' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

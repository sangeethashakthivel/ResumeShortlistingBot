import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {ResumeComponent} from './component/resume/resume.component';
import {LoginComponent} from './component/login/login.component';
import {RouterModule} from '@angular/router';
import {AdminComponent} from './component/admin/admin.component';
import {BotChatComponent} from './component/bot-chat/bot-chat.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {AdminPopupFormComponent} from './component/admin-popup-form/admin-popup-form.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    ResumeComponent,
    LoginComponent,
    BotChatComponent,
    AdminComponent,
    AdminPopupFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    RouterModule.forRoot([
      {path: 'bot', component: BotChatComponent},
      {path: 'login', component: LoginComponent},
      {path: 'admin', component: AdminComponent}
    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

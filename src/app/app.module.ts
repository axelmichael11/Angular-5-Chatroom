import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router'
import { FormsModule } from '@angular/forms';
import { RoutingModule } from './routing/routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';




import { ChatEntryComponent } from './chat-entry/chat-entry.component';
import { ChatroomComponent } from './chatroom/chatroom.component'
import { MessagesComponent } from './messages/messages.component'
import { CurrentUsersComponent } from './current-users/current-users.component';
import { UserComponent } from './user/user.component';

//Services

import { ChatService } from './services/chat.service'
import { WebsocketService } from './services/websocket.service';
import {CurrentusersService} from './services/currentusers.service'
import { MessagingHistoryService } from './services/messaginghistory.service';

//Covalent UI Framework...

import { SharedModule } from './shared/shared.module';
import { CovalentLayoutModule, CovalentStepsModule /*, any other modules */ } from '@covalent/core';

import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { MessagehistoryComponent } from './messagehistory/messagehistory.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatEntryComponent,
    UserComponent,
    ChatroomComponent,
    CurrentUsersComponent,
    MessagesComponent,
    MessagehistoryComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    BrowserAnimationsModule,
    // (optional) Additional Covalent Modules imports
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule,
    SharedModule,
  ],
  providers: [ Title, WebsocketService, CurrentusersService, ChatService, MessagingHistoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }

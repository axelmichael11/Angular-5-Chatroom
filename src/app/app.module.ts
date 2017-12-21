import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router'
import { FormsModule } from '@angular/forms';
import { RoutingModule } from './routing/routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

// import { SocketService } from './services/socket.service'


import { ChatEntryComponent } from './chat-entry/chat-entry.component';
import { ChatroomComponent } from './chatroom/chatroom.component'
import { MessagesComponent } from './messages/messages.component'
import { CurrentUsersComponent } from './current-users/current-users.component';
import { UserComponent } from './user/user.component';





import { EnterchatroomService } from './services/enterchatroom.service';
import { ChatService } from './services/chat.service'
import { WebsocketService } from './services/websocket.service';
import {CurrentusersService} from './services/currentusers.service'
import { MessagingHistoryService } from './services/messaginghistory.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatEntryComponent,
    UserComponent,
    ChatroomComponent,
    CurrentUsersComponent,
    MessagesComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RoutingModule,
    HttpClientModule,
  ],
  providers: [ EnterchatroomService, WebsocketService, CurrentusersService, ChatService, MessagingHistoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }

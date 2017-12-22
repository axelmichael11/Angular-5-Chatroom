import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import {Observable, Subject} from 'rxjs'
// import { WebsocketService } from '../services/websocket.service';
// import {EnterchatroomService} from '../services/enterchatroom.service'


import { NgModule } from '@angular/core';
// import { CovalentFileModule } from '@covalent/core';

import { ChatService } from '../services/chat.service'
import {User} from '../services/user/user.service.model'

@Component({
  selector: 'app-chat-entry',
  templateUrl: './chat-entry.component.html',
  styleUrls: ['./chat-entry.component.scss']
})
//

export class ChatEntryComponent implements OnInit {
  nickNameEntry: User;
  currentUser: string;
  // connectionStatus: string;
  constructor(private ChatService: ChatService){ }

  onSubmit(f: NgForm) {
      this.nickNameEntry = f.value.nick
      console.log('this is the on the submission form',this.nickNameEntry);
      // submitUserName(f.value.nickname)
      this.enterChatroom(this.nickNameEntry)
      f.reset()
    }

  ngOnInit(){
    this.ChatService.userSubmission.subscribe((response) => {
      console.log('this is the result...',response)
      this.result(response)
    })

    this.ChatService.CurrentNickname.subscribe(msg => {
      console.log('hitting the currentnickname subscribing..',msg)
      this.currentUser = msg

    });
  }


  result(response){
    this.ChatService.setUser(response, this.nickNameEntry)
  }

   enterChatroom(nick){
     console.log('this is hitting the enterChatroom attempt', nick)
     this.ChatService.submitUserName(nick);
  }
}

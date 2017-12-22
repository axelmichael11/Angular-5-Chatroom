import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import {Observable, Subject} from 'rxjs'
import { NgModule } from '@angular/core';


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

  constructor(private ChatService: ChatService){ }

  onSubmit(f: NgForm) {
      this.nickNameEntry = f.value.nick
      this.enterChatroom(this.nickNameEntry)
      f.reset()
    }

  ngOnInit(){
    this.ChatService.userSubmission.subscribe((response) => {

      this.result(response)
    })
    this.ChatService.CurrentNickname.subscribe(msg => {
      this.currentUser = msg
    });
  }


  result(response){
    this.ChatService.setUser(response, this.nickNameEntry)
  }

   enterChatroom(nick){
     this.ChatService.submitUserName(nick);
  }
}

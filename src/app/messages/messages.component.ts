import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Control } from '@angular/common';



import { ChatService } from '../services/chat.service'
import { MessagingHistoryService } from '../services/messaginghistory.service';


import {NgForm} from '@angular/forms'


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
  currentUser: <string>;
  messages = [];
  message: <string>;
  // connection;
  // message: <string>;

  onSubmit(f: NgForm) {
      this.message = f.value.messageText
      console.log('this is the on the submission form',this.message);
      // submitUserName(f.value.nickname)
      this.sendMessage(f.value.messageText)
      f.reset()
    }

  constructor(private ChatService: ChatService, private MessagingHistoryService: MessagingHistoryService ) { }

  ngOnInit() {

    this.MessagingHistoryService.newGetHistory().subscribe(response=>{
      this.messages = response;
    })

    this.ChatService.messages.subscribe(message=>{
      this.messages.push(message)

    })


  }

  sendMessage(message){
    this.ChatService.sendMessage(message);
    message = '';
  }

}

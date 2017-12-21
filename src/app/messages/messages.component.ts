import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Control } from '@angular/common';

// import { WebsocketService } from '../services/websocket.service';

import { ChatService } from '../services/chat.service'
import { MessagingHistoryService } from '../services/messaginghistory.service';


import {NgForm} from '@angular/forms'
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

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
    // this.ChatService.CurrentNickname.subscribe(msg => {
    //   console.log('hitting the currentnickname subscribing..',msg)
    //   this.currentUser = msg
    //
    // });

    // this.MessagingHistoryService.getHistory().subscribe(message=>{
    //
    //   message.data.map(message=>this.messages.push(message))
    //   // this.messages.push(message.data)
    //   console.log('hitting the messageHistory API Call service method...this is the data!', message)
    //   // this.messages.push(message)
    // })

    this.ChatService.messages.subscribe(message=>{
      this.messages.push(message)
      console.log('hitting the subscribed messages...',message)
    })

    console.log('hitting the messageHistory API Call service method...this is the data! AFTER', this.messages)

  }

  sendMessage(message){
    console.log('hitting the chatservice.sendmessage METHOD')
    this.ChatService.sendMessage(message);
    message = '';
  }

}

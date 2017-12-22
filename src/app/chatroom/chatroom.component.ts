import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'


import { MessagingHistoryService } from '../services/messaginghistory.service'
import { CurrentusersService } from '../services/currentusers.service';
import { ChatService } from '../services/chat.service'
import {User} from '../services/user/user.service.model'

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  private currentUser: string;
  private message: Message;
  public messages: Message[];
  public usersResponse: <any>;
  constructor(private ChatService: ChatService,
    private CurrentUsersService: CurrentusersService,
    private MessagingHistoryService: MessagingHistoryService,
  ) { }
  currentUser:string;
  selectedUser: User;
  filteredHistory: [];

  ngOnInit() {

    this.ChatService.CurrentNickname.subscribe(msg => {

      this.currentUser = msg
    });
  }
  seeCurrentUsers(){
    this.CurrentUsersService.newGetUsers().subscribe(user=>{
      this.users = user;
    });
    this.MessagingHistoryService.newGetHistory().subscribe(response=>{
      this.chatHistory = response;
    })
}

onSelect(nick){
  this.filteredHistory = []
  this.selectedUser = nick
  this.chatHistory.map(message=>{
    if (message.from ===nick){
      this.filteredHistory.push(message)
    }
  })

}

returnGroupChat(){
  this.selectedUser = null;
  this.MessagingHistoryService.newGetHistory().subscribe(response=>{
    this.chatHistory = response;
  })
}



}

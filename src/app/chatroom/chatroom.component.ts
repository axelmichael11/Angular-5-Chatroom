import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'


import { MessagingHistoryService } from '../services/messaginghistory.service'
import { CurrentusersService } from '../services/currentusers.service';
import { ChatService } from '../services/chat.service'
// import { WebsocketService } from '../services/websocket.service';
// import { EnterchatroomService} from '../services/enterchatroom.service'
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
    console.log('this is the currentuser outside of the thing...',this.CurrentUser)
    // this.ChatService.messages.subscribe(message=>{
    //   this.messages.push(message)
    //   console.log('hitting the subscribed messages...',message)
    // });
    this.ChatService.CurrentNickname.subscribe(msg => {
      console.log('hitting the currentnickname subscribing..',msg)
      this.currentUser = msg
    });
  }
  seeCurrentUsers(){
    console.log('HITTING THE SEE CURRENT USERS')
    this.CurrentUsersService.newGetUsers().subscribe(user=>{
      console.log('this is the data...', user)
      this.users = user;
    })
    this.MessagingHistoryService.newGetHistory().subscribe(response=>{
      console.log('this is the response on the message history on select method',response)
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
  console.log('this is the filtered selectedUserHistory', this.filteredHistory)
}

returnGroupChat(){
  this.selectedUser = null;
}



}

  // ngOnDestroy() {
  //   this.currentUser.unsubscribe()
  // }

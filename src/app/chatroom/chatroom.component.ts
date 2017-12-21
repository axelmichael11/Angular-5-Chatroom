import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'


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
  private messages: Message[];

  constructor(private ChatService: ChatService) { }

  currentUser:string;

  ngOnInit() {
    console.log('this is the currentuser outside of the thing...',this.CurrentUser)

    this.ChatService.CurrentNickname.subscribe(msg => {
      console.log('hitting the currentnickname subscribing..',msg)
      this.currentUser = msg

    });


    // let currentUser = this.WebSocketService.currentNickname.subscribe(user =>{
    // console.log('this is the user on the chatroom componenet',user);
    // this.currentUser = user


  }

  }

  // ngOnDestroy() {
  //   this.currentUser.unsubscribe()
  // }

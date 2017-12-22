import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

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
  private messages: Message[];
  public usersResponse: <any>;
  constructor(private ChatService: ChatService, private CurrentUsersService: CurrentusersService) { }
  currentUser:string;

  ngOnInit() {
    console.log('this is the currentuser outside of the thing...',this.CurrentUser)

    this.ChatService.CurrentNickname.subscribe(msg => {
      console.log('hitting the currentnickname subscribing..',msg)
      this.currentUser = msg
    });

    // this.CurrentUsersService.currentUsersSource.subscribe(message=>{
    //   this.users = message
    //   console.log('hitting the subscribed current users...',message )
    // })


    // let currentUser = this.WebSocketService.currentNickname.subscribe(user =>{
    // console.log('this is the user on the chatroom componenet',user);
    // this.currentUser = user
  }
  seeCurrentUsers(){

    console.log('HITTING THE SEE CURRENT USERS')
    this.CurrentUsersService.newGetUsers().subscribe(user=>{
      console.log('this is the data...', user)
      this.users = user;
    })
    // this.CurrentUsersService.setCurrentUsers();
}

}

  // ngOnDestroy() {
  //   this.currentUser.unsubscribe()
  // }

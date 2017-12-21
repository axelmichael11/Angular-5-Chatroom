import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from "rxjs/Observable";
// import { SocketService } from '../services/socket.service'
import {User} from '../services/user/user.service.model'

@Injectable()
export class EnterchatroomService {

  private nickNameSource= new BehaviorSubject<string>();

  // currentNickname= this.nickNameSource.asObservable();


  setCurrentUser(nick: string){
    this.nickNameSource.next(nick)
  }

  constructor() { }

  ngOnInit(){
    // this.SocketService.connect()
    // console.log('this is the currentUserName...',this.currentUserNickname)
  }



}

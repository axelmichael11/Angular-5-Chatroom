import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import {Router} from "@angular/router";
import 'rxjs/add/operator/map';

@Injectable()
export class ChatService {
    public messages: Subject<Message>;
    public userSubmission: Subject<User>;
    private URL = 'ws://localhost:8888';

    private NickNameSource = new BehaviorSubject<string>();
    CurrentNickname = this.NickNameSource.asObservable();




    constructor(WebSocketService: WebsocketService, private router:Router) {

        this.userSubmission = <Subject<User>>WebSocketService
            .connect(URL)
            .map((response: MessageEvent): User => {
                let data = JSON.parse(response.data);
                return data
            });

        this.messages = <Subject<Message>>WebSocketService
            .connect(URL)
            .map((response: MessageEvent): Message => {
                let data = JSON.parse(response.data);
                return data
            });

    }



    submitUserName(nick: string) {
        console.log(nick);
        console.log('new message from client to websocket: ', nick);
        let userNameEntry = '/nick '+nick
        this.userSubmission.next(userNameEntry);
    }

    setUser(e, nickNameEntry){
      console.log('hitting set user...', e, nickNameEntry)

      if (typeof e.message == 'string'){
        // let parsed = JSON.parse(e.data)
        let incomingNick = e.message.split(' ')[2]


        let msg = e.message.slice(0,8)


        console.log('this incoming nick compared to the entry!!!!', incomingNick, nickNameEntry, msg)

        if (msg = 'New user' && incomingNick === nickNameEntry){
          console.log('hitting the route because they should be equal!!')
          this.NickNameSource.next(nickNameEntry);
          // this.setCurrentUser(nick);
          this.router.navigateByUrl('/chatroom/'+nickNameEntry);
        }
      }
    }

    sendMessage(message:string){
      console.log('hitting the message method, and nexting')
      this.messages.next(message)
    }



}

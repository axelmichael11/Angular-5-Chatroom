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
        let userNameEntry = '/nick '+nick
        this.userSubmission.next(userNameEntry);
    }

    setUser(e, nickNameEntry){
      if (typeof e.message == 'string'){
        let incomingNick = e.message.split(' ')[2]

        let msg = e.message.slice(0,8)

        if (msg = 'New user' && incomingNick === nickNameEntry){
          this.NickNameSource.next(nickNameEntry);
          this.router.navigateByUrl('/chatroom/'+nickNameEntry);
        }
      }
    }

    sendMessage(message:string){

      this.messages.next(message)
    }



}

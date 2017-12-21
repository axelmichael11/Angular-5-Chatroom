import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import {Observable, BehaviorSubject} from 'rxjs'
import {EnterchatroomService} from '../services/enterchatroom.service'
import {Router} from "@angular/router";
// import WebSocket from 'ws'

@Injectable()
export class WebsocketService {
  constructor(private router: Router) { }

  // connectionStatus = new Observable<string>;
  private url = 'ws://localhost:8888';
  private subject: Rx.Subject<ConnectionEvent>;
  private connectionStatus = new BehaviorSubject<string>();
  private nickNameSource = new BehaviorSubject<string>();
  currentNickname = this.nickNameSource.asObservable();

  // setCurrentUser(nick: string){
  //   this.nickNameSource.next(nick)
  // }
  //
  // setConnectionStatus(msg: string){
  //   this.connectionStatus.next(msg)
  // }

  // private setConnectionStatus(e, nick){
  //   if (typeof e.data == 'string'){
  //     let parsed = JSON.parse(e.data)
  //     console.log('this the PARSEED JSON', parsed)
  //     let msg = parsed.message.slice(0,8)
  //     let incomingNick = parsed.message.split(' ')[2]
  //     console.log('hitting the set connection', nick,msg)
  //     if (msg = 'New user' && incomingNick == nick){
  //       this.connectionStatus.next(msg);
  //
  //       this.setCurrentUser(nick);
  //       this.router.navigateByUrl('/chatroom/'+nick);
  //     }
  //
  //   }
  // }

  public connect(url): Rx.Subject<ConnectionEvent> {
    if (!this.subject) {
      this.subject = this.joinChat(this.url);
      console.log("Successfully connected: " + this.url);
      console.log("this is this.subject... should have a response of success", this.subject)
    }
    console.log('this is the subject!!!',this.subject)
    return this.subject;
  }

  private joinChat(url: string): Rx.Subject<ConnectionEvent> {
    let ws = new WebSocket(this.url)


    // ws.onmessage = (e) => {
    //   console.log('this is the response...',e)
    //   this.setConnectionStatus(e, this.nick)
    // };
    //
    // ws.onopen = () => ws.send('/nick '+nick);
    //
    // ws.onerror = () =>{
    //   console.log('error establishing connection!')
    // }

    let observable = Rx.Observable.create(
	(obs: Rx.Observer<ConnectionEvent>) => {
		ws.onmessage = obs.next.bind(obs);
    console.log('this is the onmessage part of the observable', obs)
		ws.onerror = obs.error.bind(obs);
		ws.onclose = obs.complete.bind(obs);
		return ws.close.bind(ws);
	})
  console.log('this is hte observable defined', observable)
let observer = {
		next: (data: Object) => {
			if (ws.readyState === WebSocket.OPEN) {
        console.log('this is the case the websocket open is triggered...')
				ws.send(data);
			}
		}
	}
	return Rx.Subject.create(observer, observable);
  }

}

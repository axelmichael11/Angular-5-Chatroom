import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import {Observable, BehaviorSubject} from 'rxjs'

import {Router} from "@angular/router";


@Injectable()
export class WebsocketService {
  constructor(private router: Router) { }


  private url = 'ws://localhost:8888';
  private subject: Rx.Subject<ConnectionEvent>;
  private connectionStatus = new BehaviorSubject<string>();
  private nickNameSource = new BehaviorSubject<string>();
  currentNickname = this.nickNameSource.asObservable();

  public connect(url): Rx.Subject<ConnectionEvent> {
    if (!this.subject) {
      this.subject = this.joinChat(this.url);
    }
    return this.subject;
  }

  private joinChat(url: string): Rx.Subject<ConnectionEvent> {
    let ws = new WebSocket(this.url)

    let observable = Rx.Observable.create(
	(obs: Rx.Observer<ConnectionEvent>) => {
		ws.onmessage = obs.next.bind(obs);
		ws.onerror = obs.error.bind(obs);
		ws.onclose = obs.complete.bind(obs);
		return ws.close.bind(ws);
	})
let observer = {
		next: (data: Object) => {
			if (ws.readyState === WebSocket.OPEN) {
				ws.send(data);
			}
		}
	}
	return Rx.Subject.create(observer, observable);
  }

}

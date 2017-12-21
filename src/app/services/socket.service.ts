import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs'
import { QueueingSubject } from 'queueing-subject'
// import websocketConnect from 'rxjs-websockets'

import * as io from 'socket.io-client'




@Injectable()
export class SocketService {



  private inputStream: QueueingSubject<string>
  public messages: Observable<string>;

  public connect() {
    if (this.messages)
      return
      console.log('this.inputStream...',this.inputStream)

    this.messages = websocketConnect(
      'ws://localhost:8888',
      this.inputStream = new QueueingSubject<string>(),
    ).messages
  }



  public send(message: string):void {
    this.inputStream.next(message)
  }

  constructor() {

  }


}
